<template>
  <div>
    <!-- 头部条件 -->
    <div class="pending_contain">
      <div>
        <!-- 栏目 -->
        <template v-if="newColumnList && newColumnList.length != 0">
          <Select
            @on-change="selectChange"
            style="width:150px"
            v-model="cateKey"
          >
            <Option
              v-for="(item, index) in newColumnList"
              :value="item.columnKey"
              :key="index"
              >{{ item.columnName }}</Option
            >
          </Select>
        </template>
        <!-- 按关键词搜索 -->
        <i-select
          v-model="selectValue"
          @on-change="nameChange"
          style="width:180px;margin-left:30px"
        >
          <i-option
            v-for="(item, index) in cateList"
            :value="item.value"
            :key="index"
            >{{ item.label }}</i-option
          >
        </i-select>
        <!-- 搜索框 -->
        <Input v-model="searchValue" placeholder="" style="width: 200px" />
        <Button type="primary" @click="handleBtnClick">搜索</Button>
      </div>
      <div>
        <Button
          shape="circle"
          style="margin-right:20px"
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
        :data="getHomeList"
        @on-selection-change="tableSelectChange"
      ></Table>
    </div>
    <!-- 分页 -->
    <div class="pagination_contain">
      <pagination
        :page-size="10"
        :total="getCurrectTotal"
        @pageChange="getCurrectPage"
      ></pagination>
    </div>

    <Modal v-model="modal1" title="评论列表">
      <Table :columns="columns1" :data="getCommentList">
        <template slot-scope="{ row }" slot="proname">
          <div>{{ row.floorNum + "#" }}{{ row.commentContent }}</div>
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
      searchValue: "",
      selectValue: "1",
      modal5: false,
      contentValue: "", //回复的内容
      currectRow: null, //当前行信息
      currectList: "", // 当前选中的数组列表
      cateList: [
        {
          value: "1",
          label: "按评论关键词"
        },
        {
          value: "2",
          label: "按用户名"
        },
        {
          value: "3",
          label: "按用户ID"
        },
        {
          value: "4",
          label: "按标题关键字"
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
          title: "用户详情",
          width: 270,
          render: (h, params) => {
            let _this = this;
            return h(
              "div",
              {
                class: {
                  font_style: true
                }
              },
              [
                h(
                  "div",
                  {
                    style: {
                      marginTop: "5px"
                    }
                  },
                  [
                    h("p", params.row.loginName),
                    h(
                      "div",
                      {
                        class: {
                          id_jinyan: true
                        }
                      },
                      [
                        h("div", "ID:" + params.row.loginId),
                        h(
                          "div",
                          {
                            style: {
                              color: "#526BE3",
                              marginLeft: "10px"
                            },
                            on: {
                              click() {
                                _this.jinyanComment(params.row);
                              }
                            }
                          },
                          "【禁言】"
                        )
                      ]
                    ),
                    h("p", "IP:" + params.row.ip)
                  ]
                ),
                h("img", {
                  attrs: {
                    src: params.row.headImg
                  },
                  style: {
                    width: "77px",
                    height: "77px",
                    margin: "5px 10px 25px 10px"
                  }
                })
              ]
            );
          }
        },
        {
          title: "评论详情",
          width: 800,
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
                [
                  h(
                    "div",
                    {
                      on: {
                        click() {
                          _this.$router.push({
                            name: "list-comment",
                            query: { obj: params.row }
                          });
                        }
                      }
                    },
                    "文章名：" + params.row.programName
                  ),
                  h("div", "评论时间：" + params.row.createTime)
                ]
              ),
              h(
                "div",
                {
                  class: {
                    article_content: true
                  }
                },
                params.row.commentContent
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
                        _this.passOfflineComment({
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
                        _this.passOfflineComment({
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
        this.$Message.info("设置成功");
      });
    },
    // 禁言
    jinyanComment(obj) {
      this.saveBlack(obj).then(res => {
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
      "getCommentPage"
    ]),
    ...mapMutations(["setCurrectCateKey"]),
    // 当前页发生变化时
    getCurrectPage(currect) {
      console.log(currect);
      this.getHomeStationCommentVerify({
        offset: currect,
        status: 0,
        pageSize: 10,
        columnKey: this.getCurrectCateKey,
        selectIndex: this.selectValue ? this.selectValue : "1",
        selectValue: this.searchValue
      });
    },
    // 评论列表下拉页
    getCurrectPage1(currect) {
      console.log(currect);
      this.getCommentPage({ row: this.currectRow, offset: currect });
    },
    //  下拉选择框状态改变时 value 是栏目key,存放当前栏目key
    selectChange(value) {
      this.setCurrectCateKey(value);
      this.cateKey = value;
      console.log(value, "当前选择的栏目key");
      this.getHomeStationCommentVerify({
        offset: 1,
        status: 0,
        pageSize: 10,
        columnKey: this.getCurrectCateKey,
        selectIndex: this.selectValue ? this.selectValue : "1",
        selectValue: this.searchValue
      }).then(res => {
        console.log(res);
        if (res == null || res.length == 0) {
          this.$Message.info("当前无数据");
        }
      });
    },
    // 搜索按钮点击事件
    handleBtnClick() {
      this.getHomeStationCommentVerify({
        offset: 1,
        status: 0,
        pageSize: 10,
        columnKey: this.getCurrectCateKey,
        selectIndex: this.selectValue ? this.selectValue : "1",
        selectValue: this.searchValue
      }).then(res => {
        console.log(res);
        if (res == null || res.length == 0) {
          this.$Message.info("当前无数据");
        }
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
          this.getHomeStationCommentVerify({
            offset: 1,
            status: 0,
            pageSize: 10,
            columnKey: this.getCurrectCateKey,
            selectIndex: this.selectValue ? this.selectValue : "1",
            selectValue: this.searchValue
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
        this.getHomeStationCommentVerify({
          offset: 1,
          status: 0,
          pageSize: 10,
          columnKey: this.currectRow.columnKey,
          selectIndex: this.selectValue ? this.selectValue : "1",
          selectValue: this.searchValue
        });
      });
    },
    // 点击取消后
    cancel() {
      this.$Message.info("已取消");
    }
  },
  watch: {
    // 监听当前机构ID的变化 获取栏目分类列表
    getCurrectJigouId(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getColumnList(1).then(res => {
        console.log(res, "监听的当前栏目列表");
        if (res != null && res.length != 0) {
          this.cateKey = res[0].columnKey;
          this.setCurrectCateKey(res[0].columnKey);
          this.getHomeStationCommentVerify({
            offset: 1,
            status: 0,
            pageSize: 10,
            columnKey: this.getCurrectCateKey,
            selectIndex: this.selectValue ? this.selectValue : "1",
            selectValue: this.searchValue
          }).then(res => {
            if (res == null || res.length == 0) {
              this.$Message.info("当前无数据");
            }
          });
        } else {
          this.$Message.info("当前没有栏目");
        }
      });
    }
  },
  // 页面一加载获取栏目列表 设置第一个栏目 然后请求本站列表
  mounted() {
    this.getColumnList(1).then(res => {
      console.log(res, "页面加载的栏目列表");
      if (res != null && res.length != 0) {
        this.cateKey = res[0].columnKey;
        this.setCurrectCateKey(res[0].columnKey);
        this.getHomeStationCommentVerify({
          offset: 1,
          status: 0,
          pageSize: 10,
          columnKey: this.getCurrectCateKey,
          selectIndex: this.selectValue ? this.selectValue : "1",
          selectValue: this.searchValue
        }).then(res => {
          if (res == null || res.length == 0) {
            this.$Message.info("当前无数据");
          }
        });
      } else {
        this.$Message.info("当前没有栏目");
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "./pending-review.less";
</style>
