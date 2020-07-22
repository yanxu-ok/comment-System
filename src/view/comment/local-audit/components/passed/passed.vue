<template>
  <div>
    <!-- 头部条件 -->
    <div class="pending_contain">
      <div>
        <!-- 栏目 -->
        <template v-if="newColumnList.length != 0">
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
          <template v-if="row.status != 2">
            <div style="display:flex;align-items: center;">
              {{ row.floorNum + "#" }} {{ row.commentContent }}
              <template
                v-if="row.imgUrl && row.imgUrl.length != 0 && row.imgUrl != ''"
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
      contentValue: "",
      currectRow: null, //当前行信息
      currectList: "",
      currect: 1, //当前页的数据
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
          key: "user",
          width: 370,
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
                    h(
                      "p",
                      {
                        style: {
                          color: "#526BE3",
                          marginLeft: "10px",
                          cursor: "pointer"
                        },
                        on: {
                          click() {
                            _this.$router.push({
                              name: "user-comment",
                              query: { obj: params.row }
                            });
                          }
                        }
                      },
                      params.row.loginName
                    ),
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
                    margin: "5px 10px 25px 10px",
                    cursor: "pointer"
                  },
                  on: {
                    click() {
                      _this.$router.push({
                        name: "user-comment",
                        query: { obj: params.row }
                      });
                    }
                  }
                })
              ]
            );
          }
        },
        {
          title: "评论详情",
          key: "article",
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
                  h(
                    "div",
                    {
                      style: {
                        width: "70px",
                        height: "27px",
                        "background-color": "blue",
                        "border-radius": "4px",
                        color: "white",
                        "text-align": "center",
                        "line-height": "27px",
                        display: params.row.isAuthority == 1 ? "block" : "none"
                      }
                    },
                    "权威"
                  ),
                  h("div", "评论时间：" + params.row.createTime)
                ]
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
          key: "address",
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
    // 设置热门评论
    upComment(obj) {
      this.updateComment(obj).then(res => {
        console.log(res);
        if (res.data.ok) {
          this.$Message.info("操作成功");
          this.getHomeStationCommentVerify({
            offset: this.currect,
            status: 1,
            pageSize: 10,
            columnKey: this.getCurrectCateKey,
            selectIndex: this.selectValue ? this.selectValue : "1",
            selectValue: this.searchValue
          });
        } else {
          this.$Message.info("操作失败");
        }
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
    ...mapMutations([
      "setCurrectCateKey",
      "setCommentList",
      "setCurrectCommentTotal"
    ]),
    // 当前页发生变化时
    getCurrectPage(currect) {
      this.currect = currect;
      console.log(currect);
      this.getHomeStationCommentVerify({
        offset: currect,
        status: 1,
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
      console.log(value, "当前栏目key以改变");
      this.getHomeStationCommentVerify({
        offset: 1,
        status: 1,
        pageSize: 10,
        columnKey: this.getCurrectCateKey,
        selectIndex: this.selectValue ? this.selectValue : "1",
        selectValue: this.searchValue
      });
    },
    // 搜索按钮点击事件
    handleBtnClick() {
      this.getHomeStationCommentVerify({
        offset: 1,
        status: 1,
        pageSize: 10,
        columnKey: this.getCurrectCateKey,
        selectIndex: this.selectValue ? this.selectValue : "1",
        selectValue: this.searchValue
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
            status: 1,
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
    // 单个下线
    pass({ idListStr, changeFlag }) {
      this.passOfflineComment({ idListStr, changeFlag }).then(res => {
        if (res.data.ok) {
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
    // 点击确定后
    ok() {
      this.saveComment({
        row: this.currectRow,
        contentValue:
          "回复" + this.currectRow.loginName + "：" + this.contentValue
      }).then(res => {
        this.$Message.info("回复成功");
        this.getHomeStationCommentVerify({
          offset: 1,
          status: 1,
          pageSize: 10,
          columnKey: this.currectRow.columnKey,
          selectIndex: this.selectValue ? this.selectValue : "1",
          selectValue: this.searchValue
        });
      });
    },
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
        if (res.length != 0) {
          this.cateKey = res[0].columnKey;
          this.setCurrectCateKey(res[0].columnKey);
          this.getHomeStationCommentVerify({
            offset: 1,
            status: 1,
            pageSize: 10,
            columnKey: this.getCurrectCateKey,
            selectIndex: this.selectValue ? this.selectValue : "1",
            selectValue: this.searchValue
          });
        } else {
          this.$Message.info("当前没有栏目");
        }
      });
    }
  },
  // 页面一加载获取栏目列表然后请求
  mounted() {
    this.getColumnList(1).then(res => {
      console.log(res, "页面加载的栏目列表");
      if (res.length != 0) {
        this.cateKey = res[0].columnKey;
        this.setCurrectCateKey(res[0].columnKey);
        this.getHomeStationCommentVerify({
          offset: 1,
          status: 1,
          pageSize: 10,
          columnKey: this.getCurrectCateKey,
          selectIndex: this.selectValue ? this.selectValue : "1",
          selectValue: this.searchValue
        });
      } else {
        this.$Message.info("当前没有栏目");
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "./passed.less";
</style>
