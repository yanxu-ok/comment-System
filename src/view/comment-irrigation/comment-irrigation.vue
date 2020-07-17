<template>
  <div style="width:500px;margin: 0 auto" class="comment_guanshui">
    <Card :bordered="false">
      <div style="display:flex">
        <span class="span">请选择栏目</span>
        <i-select v-model="cateKey" @on-change="nameChange" class="slecet">
          <i-option
            v-for="(item, index) in newColumnList"
            :value="item.columnKey"
            :key="index"
            >{{ item.columnName }}</i-option
          >
        </i-select>
      </div>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="灌水范围" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入文章链接" />
        </FormItem>
        <FormItem label="灌水类型" prop="type">
          <Select v-model="formValidate.type" placeholder="请选择灌水类型">
            <Option value="0">本地灌水库</Option>
          </Select>
        </FormItem>
        <FormItem label="灌水内容" prop="city">
          <Button type="primary" @click="handleMubanModal">评论模板选择</Button>
        </FormItem>
        <FormItem label="灌水频率" prop="pinlv">
          <Select v-model="formValidate.pinlv" placeholder="请选择灌水频率">
            <Option
              :value="item.value"
              v-for="(item, index) in countList"
              :key="index"
              >{{ item.level }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="灌水次数" prop="count">
          <Select v-model="formValidate.count" placeholder="请选择灌水次数">
            <template v-for="(item, index) in lengthList">
              <Option
                :value="item.value"
                v-if="
                  selectCount * parseInt(item.value) <= 200 &&
                    selectCount * parseInt(item.value) != 0
                "
                :key="index"
                >{{ item.level }}</Option
              >
            </template>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >开始</Button
          >
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >重置</Button
          >
        </FormItem>
      </Form>
    </Card>
    <Modal v-model="modal1" title="模板选择">
      <Table
        :columns="columns1"
        :data="waterList"
        @on-selection-change="handleSelectChange"
      >
        <template slot-scope="{ row }" slot="proName">
          <div @click="handleBtnMuBanId(row)" class="name">
            {{ row.waterTemplateName }}
          </div>
        </template>
      </Table>
      <div slot="footer" style="display:flex;justify-content: space-between;">
        <div style="display:flex">
          <Button type="primary" @click="handleZiDingYi">新增模板</Button>
          <Button
            type="primary"
            @click="handleDeleteMuban"
            style="margin-left:10px"
            >删除模板</Button
          >
        </div>
        <div>
          <Button @click="cancel" style="margin-left:10px">取消</Button>
          <Button
            type="primary"
            @click="handleSelectOk"
            style="margin-left:10px"
            >确定</Button
          >
        </div>
      </div>
    </Modal>
    <Modal
      v-model="modal2"
      title="自定义模板"
      :footer-hide="true"
      @on-cancel="quxiao"
    >
      <Button @click="handleAddRow" style="margin-bottom:20px">添加行</Button>
      <Button
        @click="handleDeleteRow"
        style="margin-left:20px;margin-bottom:20px"
        >删除行</Button
      >
      <Table
        :columns="columns2"
        :data="waterContentList"
        @on-selection-change="handleZdySelectChange"
      >
        <template slot-scope="{ index }" slot="index">
          {{ index + 1 }}
        </template>
        <template slot-scope="{ row, index }" slot="input">
          <!-- <textarea v-model="row.waterContent" rows="2" cols="50" /> -->
          <!-- <div>{{ row.waterContent }}</div> -->
          <input type="text" v-model="waterContentList[index].waterContent" />
        </template>
      </Table>
      <div class="muban_name">
        <input
          type="text"
          placeholder="模板名称"
          v-model="row.waterTemplateName"
          disabled="true"
        />
        <Button type="primary" @click="handleSaveMuban()">保存模板</Button>
      </div>
    </Modal>

    <Modal
      v-model="modal3"
      title="新增模板"
      :footer-hide="true"
      @on-cancel="quxiao"
    >
      <div class="muban_name">
        <input type="text" placeholder="模板名称" v-model="waterTemplateName" />
        <Button type="primary" @click="handleSaveMuban('baocun')"
          >新增模板</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import { newGuid } from "@/libs/tools";
export default {
  data() {
    return {
      // 表单数据
      formValidate: {
        name: "",
        city: "",
        count: "",
        pinlv: "",
        type: ""
      },
      flag: true,
      modal3: false,
      modal1: false,
      modal2: false,
      selectContent: [],
      cateKey: "", //当前栏目key
      row: {}, //当前模板行信息
      selectCount: 0, //选择模板的所有条数
      waterContentList: [], //模板内容list
      waterList: [], //模板列表list
      selectList: [], //已选择的模板
      waterContentAllList: [], //选择所有的模板list
      waterTemplateName: "",
      arr: [], // 当前要添加的数组
      ruleValidate: {
        //表单验证数据
        name: [
          {
            required: true,
            message: "请输入文章链接",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "请选择灌水内容",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择灌水类型",
            trigger: "change"
          }
        ],
        count: [
          {
            required: true,
            message: "请选择灌水次数",
            trigger: "change"
          }
        ],
        pinlv: [
          {
            required: true,
            message: "请选择灌水频率",
            trigger: "change"
          }
        ]
      },
      countList: [
        { value: "60", level: "每隔1分钟一次" },
        { value: "120", level: "每隔2分钟一次" },
        { value: "1800", level: "每隔30分钟一次" },
        { value: "3600", level: "每隔1小时一次" },
        { value: "14400", level: "每隔4小时一次" },
        { value: "28800", level: "每隔8小时一次" }
      ],
      lengthList: [
        { value: "1", level: "1" },
        { value: "5", level: "5" },
        { value: "10", level: "10" },
        { value: "50", level: "50" },
        { value: "100", level: "100" }
      ],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "模板",
          slot: "proName"
        }
      ],
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          width: 60,
          align: "center",
          slot: "index"
        },
        {
          title: "模板内容",
          slot: "input"
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
    ...mapMutations(["setCurrectCateKey"]),
    ...mapActions([
      "getWaterList",
      "getWaterContent",
      "save_water",
      "getColumnList",
      "getPList",
      "deleteWaterTemplate",
      "saveWaterTemplate",
      "saveWaterContent",
      "deleteWaterContent"
    ]),

    // 栏目列表点下拉事件
    nameChange(value) {
      this.setCurrectCateKey(value);
      this.cateKey = value;
      console.log(value, "当前选择的栏目key");
    },

    // 表单点击事件
    handleSubmit(name) {
      // console.log(this.formValidate);
      this.$refs[name].validate(valid => {
        if (valid) {
          let {
            name: programId,
            type: waterType,
            pinlv: waterRate,
            count: waterFrequency
          } = this.formValidate;
          let obj = {
            programId,
            waterType: parseInt(waterType),
            waterRate: parseInt(waterRate),
            waterFrequency: parseInt(waterFrequency),
            jsonStr: JSON.stringify(this.waterContentAllList)
          };
          console.log(obj);

          this.save_water(obj).then(res => {
            console.log(res, "灌水");
            if (res.data.ok) {
              this.$Message.info("灌水成功!");
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    // 重置
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    //打开模板对话框
    handleMubanModal() {
      // 获取所有的模板
      this.modal1 = !this.modal1;
      // 发起请求所有的模板
      this.getWaterList().then(res => {
        console.log(res, "灌水模板列表");
        this.waterList = res;
      });
    },

    // 自定义模板对话框
    handleZiDingYi() {
      this.row = [];
      this.waterContentList = [];
      this.modal3 = !this.modal3;
    },

    // 取消
    cancel() {
      this.selectList = [];
      this.modal1 = !this.modal1;
      this.selectCount = 0;
      this.$Message.info("已取消");
    },

    // 自定义对话框消失
    quxiao() {
      this.flag = !this.flag;
    },

    // 选择完模板后确定
    handleSelectOk() {
      this.modal1 = !this.modal1;
      //组织选了哪些模板  闭包实现
      if (this.selectList.length != 0) {
        let List = [];
        this.selectList.forEach(element => {
          ((waterTemplateKey, arr) => {
            this.getWaterContent(waterTemplateKey).then(res => {
              if (res.length != 0) {
                let orderNum = res.length;
                res.forEach(item => {
                  List.push({
                    waterContent: item.waterContent,
                    waterTemplateKey: item.waterTemplateKey,
                    orderNum
                  });
                });
              }
            });
          })(element.waterTemplateKey, []);
          console.log(List, "选择的所有模板的拼接");
          this.waterContentAllList = List;
        });
      }
    },

    // 删除模板
    handleDeleteMuban() {
      if (this.selectList.length == 0) {
        this.$Message.info("请选择模板");
        return;
      }
      console.log(this.selectList);
      let waterTemplateKeyListStr = ""; //灌水模板的list
      this.selectList.forEach((item, index) => {
        if (index == this.selectList.length - 1) {
          waterTemplateKeyListStr += item.waterTemplateKey;
        } else {
          waterTemplateKeyListStr += item.waterTemplateKey + ",";
        }
      });
      this.deleteWaterTemplate({ waterTemplateKeyListStr }).then(res => {
        console.log(res);
        if (res.data.ok) {
          this.$Message.info("删除成功");
          this.getWaterList().then(res => {
            console.log(res, "灌水模板列表");
            this.waterList = res;
          });
        }
      });
    },

    // 多选框发生变化时
    handleSelectChange(selection) {
      if (selection.length == 0) {
        this.selectCount = 0;
        return;
      }
      this.selectCount = 0;
      // 选择的数组计算出所有的条数来 赋值给 selectCount
      selection.forEach(item => {
        this.selectCount += item.contentNum;
      });
      console.log(this.selectCount, "选择的所有模板内容条数");
      this.selectList = selection;
      this.formValidate.city = this.selectCount + "";
    },

    // 自定义多选框发生变化时
    handleZdySelectChange(selection) {
      if (selection.length == 0) {
        this.selectCount = [];
        return;
      }
      this.selectContent = selection;
      console.log(this.selectContent);
    },

    // 点击模板名称时打开自定义模板对话框
    handleBtnMuBanId(row) {
      console.log(row);
      this.row = row;
      this.arr = []; //每次点击打开对话框时把数组清空
      this.modal2 = !this.modal2;
      // 发起请求当前模板下的列表
      this.getWaterContent(this.row.waterTemplateKey).then(res => {
        console.log(res, "灌水内容");
        this.waterContentList = res;
      });
    },

    // 添加行
    handleAddRow() {
      let data = {
        waterContent: "",
        waterKey: newGuid()
      };
      this.arr.push(data);

      console.log(this.arr);

      this.waterContentList = [...this.waterContentList, data];
      // this.waterContentList.push({
      //   waterContent: "",
      //   waterKey: newGuid()
      // });
    },

    // 删除行
    handleDeleteRow() {
      if (this.selectContent.length == 0) {
        this.$Message.info("请选择至少一项");
        return;
      }
      if (this.selectContent.length != 0) {
        this.selectContent.forEach((item, index) => {
          this.waterContentList.forEach((i, j) => {
            if (item.waterKey == i.waterKey) {
              this.waterContentList.splice(j, 1);
            }
          });
        });

        this.selectContent.forEach((item, index) => {
          this.arr.forEach((i, j) => {
            if (item.waterKey == i.waterKey) {
              this.arr.splice(j, 1);
            }
          });
        });

        console.log(this.waterContentList, this.arr, "总的和需要保存的");

        let waterRecordKeyListStr = "";
        this.selectContent.forEach((item, index) => {
          if (index == this.selectContent.length - 1) {
            waterRecordKeyListStr += item.waterKey;
          } else {
            waterRecordKeyListStr += item.waterKey + ",";
          }
        });
        let obj = {
          waterRecordKeyListStr
        };
        this.deleteWaterContent(obj).then(res => {
          if (res.data.ok) {
            if (res.data.comment != "删除失败，没有该数据") {
              this.getWaterContent(this.row.waterTemplateKey).then(res => {
                this.$Message.info("删除成功");
                console.log(res);
              });
            } else {
              this.$Message.info("删除成功");
            }
          } else {
            this.$Message.info("删除失败");
          }
        });
      }
    },

    // 保存模板
    handleSaveMuban(str) {
      if (str == "baocun") {
        this.modal3 = !this.modal3;
        this.saveWaterTemplate({
          waterTemplateName: this.waterTemplateName
        }).then(res => {
          if (res.data.ok) {
            this.$Message.info("添加成功");
            this.getWaterList().then(res => {
              this.waterList = res;
            });
          }
        });
      } else {
        // 关闭当前对话框
        this.modal2 = !this.modal2;
        // 重新发起请求刷新列表
        this.abc = 0;
        let res = [];
        this.arr.forEach((item, index) => {
          res.push({
            waterContent: item.waterContent,
            waterTemplateKey: this.row.waterTemplateKey,
            orderNum: index + 1
          });
        });
        console.log(res);
        let obj = {
          jsonStr: JSON.stringify(res)
        };
        this.saveWaterContent(obj).then(res => {
          if (res.data.ok) {
            this.$Message.info("保存成功");
          }
        });
      }
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
          this.getPList({
            page: 1,
            pageSize: 10
          }).then(res => {
            this.crrectArticleList = res;
            console.log(res);
          });
        } else {
          this.$Message.info("当前没有栏目");
        }
      });
    }
  },
  mounted() {
    // 获取栏目分类列表
    this.getColumnList(1).then(res => {
      console.log(res, "页面加载的栏目列表");
      if (res != null && res.length != 0) {
        this.cateKey = res[0].columnKey;
        this.setCurrectCateKey(res[0].columnKey);
        this.getPList({
          page: 1,
          pageSize: 10
        }).then(res => {
          this.crrectArticleList = res;
          console.log(res);
        });
      } else {
        this.$Message.info("当前没有栏目");
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "./comment-irrigation.less";
</style>

