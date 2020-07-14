<template>
  <div style="width:500px;margin: 0 auto">
    <Card :bordered="false">
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
    <Modal
      v-model="modal1"
      title="模板选择"
      @on-ok="handleSelectOk"
      @on-cancel="cancel"
    >
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
      <Button type="primary" @click="handleZiDingYi" style="margin-top:20px"
        >自定义模板</Button
      >
    </Modal>
    <Modal v-model="modal2" title="自定义模板">
      <Button @click="handleAddRow" style="margin-bottom:20px">添加行</Button>
      <Button
        @click="handleDeleteRow"
        style="margin-left:20px;margin-bottom:20px"
        >删除行</Button
      >
      <Table :columns="columns2" :data="waterContentList">
        <template slot-scope="{ index }" slot="index">
          {{ index + 1 }}
        </template>
        <template slot-scope="{ row }" slot="input">
          <textarea :value="row.waterContent" rows="2" cols="50" />
        </template>
      </Table>
      <div class="muban_name">
        <input
          type="text"
          :value="row.waterTemplateName"
          placeholder="模板名称"
        />
        <Button type="primary" @click="handleSaveMuban">保存模板</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
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
      modal1: false,
      modal2: false,
      row: {}, //当前模板行信息
      selectCount: 0, //选择模板的所有条数
      waterContentList: [], //模板内容list
      waterList: [], //模板列表list
      selectList: [], //已选择的模板
      waterContentAllList: [], //选择所有的模板list
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
  methods: {
    ...mapActions(["getWaterList", "getWaterContent", "save_water"]),
    // 表单点击事件
    handleSubmit(name) {
      // console.log(this.formValidate);
      this.$refs[name].validate(valid => {
        if (valid) {
          let {
            name: programId,
            type: waterType,
            pinlv: waterRate,
            city: waterFrequency
          } = this.formValidate;
          let obj = {
            programId,
            waterType: parseInt(waterType),
            waterRate: parseInt(waterRate),
            waterFrequency: parseInt(waterFrequency),
            jsonStr: JSON.stringify(this.waterContentAllList)
          };
          this.save_water(obj);
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
      this.modal2 = !this.modal2;
    },
    // 取消
    cancel() {
      this.selectList = [];
      this.selectCount = 0;
      this.$Message.info("已取消");
    },

    // 选择完模板后确定
    handleSelectOk() {
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

    // 点击模板名称时打开自定义模板对话框
    handleBtnMuBanId(row) {
      console.log(row);
      this.row = row;
      this.modal2 = !this.modal2;
      // 发起请求当前模板下的列表
      this.getWaterContent(this.row.waterTemplateKey).then(res => {
        console.log(res, "灌水内容");
        this.waterContentList = res;
      });
    },
    // 添加行
    handleAddRow() {
      this.waterContentList.push({
        name: "",
        content: ""
      });
    },
    // 删除行
    handleDeleteRow() {
      this.waterContentList.splice(this.waterContentList.length - 1, 1);
    },
    // 保存模板
    handleSaveMuban() {
      // 关闭当前对话框
      this.modal2 = !this.modal2;
      // 重新发起请求刷新列表
    }
  }
};
</script>

<style lang="less" scoped>
@import "./comment-irrigation.less";
</style>

