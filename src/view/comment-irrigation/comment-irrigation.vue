<template>
  <div>
    <Card :bordered="false" style="width:500px;margin: 0 auto">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="灌水范围" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入文章链接" />
        </FormItem>
        <FormItem label="灌水类型" prop="city">
          <Select v-model="formValidate.city" placeholder="请选择灌水类型">
            <Option value="local">本地灌水库</Option>
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
                v-if="selectCount > 0 && selectCount > parseInt(item.value)"
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
        :data="data"
        @on-selection-change="handleSelectChange"
      >
        <template slot-scope="{ row }" slot="proName">
          <div @click="handleBtnMuBanId(row)" class="name">
            {{ row.name }}
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
      <Table :columns="columns2" :data="data1">
        <template slot-scope="{ index }" slot="index">
          {{ index + 1 }}
        </template>
        <template slot-scope="{ row }" slot="input">
          <textarea :value="row.content" rows="2" cols="50" />
        </template>
      </Table>
      <input type="text" :value="row" />
      <Button type="primary" @click="handleSaveMuban" style="margin-top:20px"
        >保存模板</Button
      >
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      formValidate: {
        name: "",
        city: "",
        count: "",
        pinlv: ""
      },
      modal1: false,
      modal2: false,
      row: {}, //当前模板行信息
      selectCount: 0, //选择模板的所有条数
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
        { value: "10", level: "每隔1分钟一次" },
        { value: "20", level: "每隔2小时一次" },
        { value: "30", level: "每隔30分钟一次" },
        { value: "40", level: "每隔1小时一次" },
        { value: "50", level: "每隔4小时一次" },
        { value: "60", level: "每隔8小时一次" }
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
      ],
      data: [
        {
          name: "John Brown",
          content: "1111"
        },
        {
          name: "Jim Green",
          content: "1112312"
        }
      ],
      data1: [
        {
          name: "John Brown",
          content: "1111"
        },
        {
          name: "Jim Green",
          content: "1112312"
        }
      ]
    };
  },
  methods: {
    // 表单点击事件
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
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
    },
    // 自定义模板对话框
    handleZiDingYi() {
      this.row = [];
      this.data1 = [];
      this.modal2 = !this.modal2;
    },
    // 取消
    cancel() {
      this.$Message.info("已取消");
    },
    // 选择完模板后确定
    handleSelectOk() {
      //组织选了哪些模板
    },
    // 多选框发生变化时
    handleSelectChange(selection) {
      if (selection.length == 0) {
        this.selectCount = 0;
        return;
      }
      console.log(selection);
      // 选择的数组计算出所有的条数来 赋值给 selectCount
    },
    // 点击模板名称时打开自定义模板对话框
    handleBtnMuBanId(row) {
      this.row = row;
      this.modal2 = !this.modal2;
      // 发起请求当前行
    },
    // 添加行
    handleAddRow() {
      this.data1.push({
        name: "",
        content: ""
      });
    },
    // 删除行
    handleDeleteRow() {
      this.data1.splice(this.data1.length - 1, 1);
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

