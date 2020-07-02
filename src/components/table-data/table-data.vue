<template>
  <div class="table_contain">
    <Table border ref="selection" :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import { data } from "./data";
import { mapState } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户详情",
          key: "user",
          width: 270,
          render: (h, params) => {
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
                    h("p", params.row.user.userName),
                    h(
                      "div",
                      {
                        class: {
                          id_jinyan: true
                        }
                      },
                      [
                        h("div", "ID:" + params.row.user.id),
                        h(
                          "div",
                          {
                            style: {
                              color: "#526BE3",
                              marginLeft: "10px"
                            }
                          },
                          "【禁言】"
                        )
                      ]
                    ),
                    h("p", "IP:" + params.row.user.ip)
                  ]
                ),
                h("img", {
                  attrs: {
                    src: params.row.user.img
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
                  h("div", "文章名：" + params.row.article.articleName),
                  h("div", "评论时间：" + params.row.article.commentDate)
                ]
              ),
              h(
                "div",
                {
                  class: {
                    article_content: true
                  }
                },
                params.row.article.articleContent
              ),
              h(
                "div",
                {
                  class: {
                    floor_contain: true
                  }
                },
                [
                  h("div", {}, "所属楼层:" + params.row.article.floor + "#"),
                  h("div", {}, [
                    h(
                      "span",
                      {
                        on: {
                          click() {
                            _this.hotComment();
                          }
                        },
                        class: {
                          floor_contain_hot: true
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
                            _this.reply();
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
                    on: {
                      click() {
                        _this.pass();
                      }
                    },
                    style: {
                      display:
                        _this.tabsIndex == "0" || _this.tabsIndex == "2"
                          ? "inline-block"
                          : "none"
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
                      marginTop: "6px",
                      display:
                        _this.tabsIndex == "0" || _this.tabsIndex == "1"
                          ? "inline-block"
                          : "none"
                    },
                    on: {
                      click() {
                        _this.articleOffline();
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
      data
    };
  },
  methods: {
    // 热门评论
    hotComment() {
      console.log(1);
    },
    // 回复
    reply() {},
    // 过去
    pass() {},
    // 下线
    articleOffline() {}
  },
  computed: {
    ...mapState({
      tabsIndex: state => state.comment.tabsIndex
    })
  }
};
</script>
<style lang="less" scoped>
@import "./table-data.less";
</style>
