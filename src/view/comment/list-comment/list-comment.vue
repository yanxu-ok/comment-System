<template>
  <div class="all_contain">
    <Card :bordered="false">
      <!-- 头部条件 -->
      <div class="pending_contain">
        <Select
          v-model="searchValue"
          style="width:100px;margin-right:50px"
          @on-change="selectChange"
        >
          <Option
            v-for="item in cateList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>

        <div>
          <Button
            shape="circle"
            style="margin-right:20px;"
            @click="
              allPass({
                idListStr: currectList,
                changeFlag: 1
              })
            "
            >全部通过</Button
          >
          <Button
            shape="circle"
            @click="
              allPass({
                idListStr: currectList,
                changeFlag: 2
              })
            "
            >全部下线</Button
          >
        </div>
      </div>
      <!-- 表格 -->
      <div class="table_contain">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="commentList"
          @on-selection-change="tableSelectChange"
        ></Table>
      </div>
      <!-- 分页 -->
      <div class="pagination_contain">
        <pagination
          :page-size="10"
          :total="total"
          @pageChange="getCurrectPage"
        ></pagination>
      </div>

      <Modal v-model="modal1" title="评论列表">
        <Table :columns="columns1" :data="getCommentList">
          <template slot-scope="{ row }" slot="proname">
            <template v-if="row.status != 2">
              <div style="display:flex;align-items: center;">
                {{ row.floorNum + "#" }} {{ row.commentContent }}
                <template
                  v-if="
                    row.imgUrl && row.imgUrl.length != 0 && row.imgUrl != ''
                  "
                >
                  <img
                    :src="JSON.parse(row.imgUrl)[0].url"
                    style="width:50px;height:50px"
                  />
                </template>
              </div>
            </template>
            <template v-else>
              <div>{{ row.floorNum + "#" }} 该评论已被下线</div>
            </template>
          </template>
        </Table>
        <pagination
          :page-size="10"
          :total="getCurrectCommentTotal"
          @pageChange="getCurrectPage1"
        ></pagination>
      </Modal>
      <Modal
        v-model="modal5"
        title="回复"
        width="300"
        @on-ok="ok"
        @on-cancel="cancel"
      >
        <Input v-model="contentValue" size="small" placeholder="回复内容" />
      </Modal>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import pagination from "_c/pagination";
export default {
  name: "pending-review",
  components: {
    pagination
  },
  data() {
    return {
      searchValue: "0",
      modal5: false,
      contentValue: "", //回复的内容
      currectRow: null, //当前行信息
      currectList: "", // 当前选中的数组列表
      obj: {}, //当前传过来的指针
      commentList: [], //当前列表
      currect: 1, //当前页的数据
      total: 0,
      status: 0,
      cateList: [
        {
          value: "0",
          label: "待审"
        },
        {
          value: "1",
          label: "通过"
        },
        {
          value: "2",
          label: "下线"
        }
      ],
      cateKey: "",
      modal1: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "",
          width: 900,
          height: 300,
          renderHeader: (h, params) => {
            return h("div", {}, params.column.title);
          },
          render: (h, params) => {
            let _this = this;
            return h("div", [
              h(
                "div",
                {
                  class: {
                    article_name: true
                  }
                },
                [h("div", "评论时间：" + params.row.createTime)]
              ),
              h(
                "div",
                {
                  style: {
                    display: "flex"
                  }
                },
                [
                  h(
                    "div",
                    {
                      class: {
                        article_content: true
                      }
                    },
                    params.row.commentContent
                  ),
                  h("img", {
                    domProps: {
                      src:
                        params.row.imgUrl &&
                        JSON.parse(params.row.imgUrl) != "" &&
                        JSON.parse(params.row.imgUrl).length != 0
                          ? JSON.parse(params.row.imgUrl)[0].url
                          : "",
                      title: "img"
                    },
                    style: {
                      display:
                        params.row.imgUrl &&
                        JSON.parse(params.row.imgUrl) != "" &&
                        JSON.parse(params.row.imgUrl).length != 0
                          ? "block"
                          : "none",
                      "max-height": "100px"
                    }
                  })
                ]
              ),
              h(
                "div",
                {
                  class: {
                    floor_contain: true
                  }
                },
                [
                  h(
                    "div",
                    {
                      on: {
                        click() {
                          _this.modalOpen(params.row);
                        }
                      }
                    },
                    "所属楼层:" + params.row.floorNum + "#"
                  ),
                  h("div", {}, [
                    h(
                      "span",
                      {
                        on: {
                          click: () => {
                            _this.upComment({
                              commentkey: params.row,
                              isHot: 1
                            });
                          }
                        },
                        class: {
                          floor_contain_hot: true
                        },
                        style: {
                          display:
                            params.row.isHot == 0 ? "inile-block" : "none"
                        }
                      },
                      "设置为热门评论"
                    ),
                    h(
                      "span",
                      {
                        on: {
                          click: () => {
                            params.row.isHot = 1;
                            _this.upComment({
                              commentkey: params.row,
                              isHot: 0
                            });
                          }
                        },
                        class: {
                          floor_contain_hot: true
                        },
                        style: {
                          display:
                            params.row.isHot == 1 ? "inile-block" : "none"
                        }
                      },
                      "取消热门评论"
                    ),
                    h(
                      "span",
                      {
                        on: {
                          click() {
                            // 回复
                            _this.modalOpen1(params.row);
                          }
                        }
                      },
                      "回复"
                    )
                  ])
                ]
              )
            ]);
          }
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            let _this = this;
            return h("div", {}, [
              h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      shape: "circle"
                    },
                    on: {
                      click() {
                        _this.pass({
                          idListStr: params.row.commentKey,
                          changeFlag: 1
                        });
                      }
                    }
                  },
                  "通过"
                )
              ]),
              h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      shape: "circle"
                    },
                    style: {
                      marginTop: "6px"
                    },
                    on: {
                      click() {
                        _this.pass({
                          idListStr: params.row.commentKey,
                          changeFlag: 2
                        });
                      }
                    }
                  },
                  "下线"
                )
              ])
            ]);
          }
        }
      ],
      columns1: [
        {
          title: "评论列表",
          key: "name",
          slot: "proname"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "getCurrectJigouId",
      "newColumnList",
      "getCurrectTotal",
      "getCurrectCateKey",
      "getHomeList",
      "getCurrectCommentTotal",
      "getCommentList"
    ])
  },
  methods: {
    // 设置热门评论
    upComment(obj) {
      this.updateComment(obj).then(res => {
        console.log(res);
        if (res.data.ok) {
          this.commentList = [];
          this.$Message.info("操作成功");
          this.getCommentAllPage({
            row: this.obj,
            offset: this.currect,
            status: this.status
          }).then(res => {
            this.commentList = res.data.data;
            this.total = res.data.totalCount;
          });
        } else {
          this.$Message.info("操作失败");
        }
      });
    },

    // 禁言
    jinyanComment(obj) {
      this.saveBlack(obj).then(res => {
        if (res.data.totalCount === -1) {
          this.$Message.info("用户已被禁言");
          return;
        }
        this.$Message.info("禁言成功");
      });
    },
    nameChange(value) {
      console.log(value);
      this.selectValue = value;
    },
    ...mapActions([
      "getColumnList",
      "getHomeStationCommentVerify",
      "passOfflineAllComment",
      "passOfflineComment",
      "updateComment",
      "saveComment",
      "saveBlack",
      "getCommentPage",
      "getCommentAllPage"
    ]),

    ...mapMutations([
      "setCurrectCateKey",
      "setCommentList",
      "setCurrectCommentTotal"
    ]),

    // 当前页发生变化时
    getCurrectPage(currect) {
      this.currect = currect;
      console.log(currect);
      this.commentList = [];
      this.getCommentAllPage({
        row: this.obj,
        offset: currect,
        status: this.status
      }).then(res => {
        this.commentList = res.data.data;
        this.total = res.data.totalCount;
      });
    },

    // 评论列表下拉页
    getCurrectPage1(currect) {
      console.log(currect);
      this.getCommentPage({ row: this.currectRow, offset: currect });
    },

    //  下拉选择框状态改变状态
    selectChange(value) {
      console.log(value);
      this.commentList = [];
      this.status = parseInt(value);
      this.getCommentAllPage({
        row: this.obj,
        offset: 1,
        status: this.status
      }).then(res => {
        this.commentList = res.data.data;
        this.total = res.data.totalCount;
      });
    },

    // 选中发生变化
    tableSelectChange(selection) {
      console.log(selection);
      let str = "";
      selection.forEach((element, index) => {
        if (index == selection.length - 1) {
          str = str + element.commentKey;
        } else {
          str = str + element.commentKey + ",";
        }
      });
      this.currectList = str;
    },
    // 全部通过
    allPass({ idListStr, changeFlag }) {
      this.passOfflineAllComment({ idListStr, changeFlag }).then(res => {
        console.log(res);
        if (res.ok) {
          this.getCommentAllPage({
            row: this.obj,
            offset: 1,
            status: this.status
          }).then(res => {
            this.commentList = res.data.data;
            this.total = res.data.totalCount;
          });
          this.$Message.info("操作成功");
        } else {
          this.$Message.info("操作失败");
        }
      });
    },
    // 单个下线
    pass({ idListStr, changeFlag }) {
      this.passOfflineComment({ idListStr, changeFlag }).then(res => {
        if (res.data.ok) {
          this.commentList = [];
          this.getCommentAllPage({
            row: this.obj,
            offset: this.currect,
            status: this.status
          }).then(res => {
            this.commentList = res.data.data;
            this.total = res.data.totalCount;
          });
          this.$Message.info("操作成功");
        } else {
          this.$Message.info("操作失败");
        }
      });
    },
    // 打开模态框
    modalOpen(row) {
      this.modal1 = !this.modal1;
      this.currectRow = row;
      this.setCommentList([]);
      this.setCurrectCommentTotal(0);
      this.getCommentPage({ row: this.currectRow, offset: 1 });
    },

    // 回复模态框
    modalOpen1(row) {
      this.modal5 = !this.modal5;
      this.currectRow = row;
    },
    // 点击确定后 回复完之后重新刷新列表
    ok() {
      console.log(this.currectRow);
      this.saveComment({
        row: this.currectRow,
        contentValue:
          "回复" + this.currectRow.loginName + "：" + this.contentValue
      }).then(res => {
        this.$Message.info("回复成功");
        this.getCommentAllPage({
          row: this.obj,
          offset: 1,
          status: this.status
        }).then(res => {
          this.commentList = res.data.data;
          this.total = res.data.totalCount;
        });
      });
    },
    // 点击取消后
    cancel() {
      this.$Message.info("已取消");
    }
  },
  // 页面获取参数 默认请求待审的评论 然后请求文章内所有的评论
  mounted() {
    console.log(this.$route.query.obj, "111111111");
    this.columns[1].title =
      "文章名称:          " + this.$route.query.obj.programName;
    this.obj = this.$route.query.obj;
    this.getCommentAllPage({
      row: this.obj,
      offset: 1,
      status: this.status
    }).then(res => {
      this.commentList = res.data.data;
      this.total = res.data.totalCount;
    });
  }
};
</script>

<style lang="less" scoped>
@import "./list-comment.less";
</style>
