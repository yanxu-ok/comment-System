 export const data = [{
     user: {
       id: "1",
       userName: "xxx",
       ip: "1.1.1.1",
       img: ""
     },
     article: {
       articleName: "青岛啤酒",
       commentDate: "2020-10-10 00-00-00",
       articleContent: "评论内容：例：孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来：店内外充满了快活的空气。",
       floor: 1
     },
     address: "New York No. 1 Lake Park",
     date: "2016-10-03"
   },
   {
     user: {
       id: "1",
       userName: "xxx",
       ip: "1.1.1.1",
       img: ""
     },
     article: {
       articleName: "青岛啤酒",
       commentDate: "2020-10-10 00-00-00",
       articleContent: "评论内容：例：孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来：店内外充满了快活的空气。",
       floor: 1
     },
     address: "London No. 1 Lake Park",
     date: "2016-10-01"
   },
   {
     user: {
       id: "1",
       userName: "xxx",
       ip: "1.1.1.1",
       img: ""
     },
     article: {
       articleName: "青岛啤酒",
       commentDate: "2020-10-10 00-00-00",
       articleContent: "评论内容：例：孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来：店内外充满了快活的空气。",
       floor: 1
     },
     address: "Sydney No. 1 Lake Park",
     date: "2016-10-02"
   },
   {
     user: {
       id: "1",
       userName: "xxx",
       ip: "1.1.1.1",
       img: ""
     },
     article: {
       articleName: "青岛啤酒",
       commentDate: "2020-10-10 00-00-00",
       articleContent: "评论内容：例：孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来：店内外充满了快活的空气。",
       floor: 1
     },
     address: "Ottawa No. 2 Lake Park",
     date: "2016-10-04"
   }
 ]

 export const columns = [{
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
         "div", {
           class: {
             font_style: true
           }
         },
         [
           h(
             "div", {
               style: {
                 marginTop: "5px"
               }
             },
             [
               h("p", params.row.loginName),
               h(
                 "div", {
                   class: {
                     id_jinyan: true
                   }
                 },
                 [
                   h("div", "ID:" + params.row.loginId),
                   h(
                     "div", {
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
           "div", {
             class: {
               article_name: true
             }
           },

           [
             h("div", "文章名：" + params.row.commentContent),
             h("div", "评论时间：" + params.row.createTime)
           ]
         ),
         h(
           "div", {
             class: {
               article_content: true
             }
           },
           params.row.commentContent
         ),
         h(
           "div", {
             class: {
               floor_contain: true
             }
           },
           [
             h(
               "div", {
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
                 "span", {
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
                     display: params.row.isHot == 0 ? "inile-block" : "none"
                   }
                 },
                 "设置为热门评论"
               ),
               h(
                 "span", {
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
             "Button", {
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
             "Button", {
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
 ]
