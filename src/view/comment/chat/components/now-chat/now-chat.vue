<template>
  <div class="chat">
    <Card :bordered="false">
      <div class="pending_contain">
        <div>
          <!-- <Button
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
          > -->
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
      modal5: false,
      contentValue: "", //回复的内容
      currectRow: null, //当前行信息
      currectList: "", // 当前选中的数组列表
      currect: 1, //当前页的数据
      cateKey: "",
      time: null, //定时器
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
                        display: params.row.isTop == 1 ? "block" : "none"
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
                    // h(
                    //   "span",
                    //   {
                    //     on: {
                    //       click: () => {
                    //         _this.upComment({
                    //           commentkey: params.row,
                    //           isHot: 1
                    //         });
                    //       }
                    //     },
                    //     class: {
                    //       floor_contain_hot: true
                    //     },
                    //     style: {
                    //       display:
                    //         params.row.isHot == 0 ? "inile-block" : "none"
                    //     }
                    //   },
                    //   "设置为热门评论"
                    // ),
                    // h(
                    //   "span",
                    //   {
                    //     on: {
                    //       click: () => {
                    //         _this.upComment({
                    //           commentkey: params.row,
                    //           isHot: 0
                    //         });
                    //       }
                    //     },
                    //     class: {
                    //       floor_contain_hot: true
                    //     },
                    //     style: {
                    //       display:
                    //         params.row.isHot == 1 ? "inile-block" : "none"
                    //     }
                    //   },
                    //   "取消热门评论"
                    // ),
                    // h(
                    //   "span",
                    //   {
                    //     on: {
                    //       click() {
                    //         // 回复
                    //         _this.modalOpen1(params.row);
                    //       }
                    //     }
                    //   },
                    //   "回复"
                    // )
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
              // h("div", [
              //   // h(
              //   //   "Button",
              //   //   {
              //   //     props: {
              //   //       type: "primary",
              //   //       shape: "circle"
              //   //     },
              //   //     on: {
              //   //       click() {
              //   //         _this.pass({
              //   //           idListStr: params.row.commentKey,
              //   //           changeFlag: 1
              //   //         });
              //   //       }
              //   //     }
              //   //   },
              //   //   "通过"
              //   // )
              // ]),
              // h("div", [
              //   // h(
              //   //   "Button",
              //   //   {
              //   //     props: {
              //   //       type: "primary",
              //   //       shape: "circle"
              //   //     },
              //   //     style: {
              //   //       marginTop: "6px"
              //   //     },
              //   //     on: {
              //   //       click() {
              //   //         _this.pass({
              //   //           idListStr: params.row.commentKey,
              //   //           changeFlag: 2
              //   //         });
              //   //       }
              //   //     }
              //   //   },
              //   //   "下线"
              //   // )
              // ])
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
        this.$Message.info("禁言成功");
      });
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
    },

    // 定时器请求函数
    getCommentAList() {
      console.log(111);
      this.getHomeStationCommentVerify({
        offset: this.currect,
        status: 1,
        pageSize: 10,
        columnKey: this.getCurrectCateKey,
        selectIndex: this.selectValue ? this.selectValue : "1",
        selectValue: this.searchValue
      });
    }
  },
  // 页面一加载获取栏目列表 设置第一个栏目 然后请求本站列表
  mounted() {
    this.row = this.$route.query.obj;
    this.time = setInterval(this.getCommentAList, 5000);
  },
  // 页面销毁定时器
  destroyed() {
    clearInterval(this.time);
  }
};
</script>

<style lang="less" scoped>
@import "./now-chat.less";
</style>
