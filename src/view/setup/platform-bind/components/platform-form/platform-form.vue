<template>
  <div>
    <div>
      <Button type="primary" @click="add">添加</Button>
    </div>
    <Modal
      title="平台绑定"
      v-model="modal10"
      class-name="vertical-center-modal"
      @on-ok="ok"
    >
      <Form ref="formInline" :model="formInline">
        <FormItem>
          <Input
            type="text"
            v-model="formInline.platformName"
            placeholder="平台名称"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <!-- <Input type="text" v-model="formInline.imgUrl" placeholder="平台图标">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input> -->
          <Upload
            ref="upload"
            :format="['jpg', 'jpeg', 'png']"
            :show-upload-list="false"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
            action="http://10.0.117.248:8090/upload_image?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJvcmduYW1lIjoi54ix5piM5LmQIiwicm9sZWlkIjoiMSIsIm5pY2tuYW1lIjoi5byg5Lqa55S3MSIsImlkIjoiMjQ5IiwicHJpdiI6InN1cGVyIiwiYXZhdGFyIjoiaHR0cDovL2NodWFuZ3FpLnRlc3QucWlsdWRldi5jb20vcHVibGljL3VwbG9hZC9pbWFnZS8xLzIwMTkvMTIvMjQvMDJiYjY3MjczYThlNGUyYmNmZGZlMGJhMDQ2YjVlODUucG5nIiwidGltZSI6MTU5MjgyNDUyOSwiZXhwIjoxNTkyODMxNzMyLCJpYXQiOjE1OTI4MjQyMjksIm9yZ2lkIjoiMSIsInBsYXRmb3JtIjoiY2h1YW5ncWkifQ.hKfX02G5tBB6ilRdisbVsFeyxpMb2592tpQTWtBwdKk"
          >
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
          <FormItem>
            <Input
              type="text"
              v-model="formInline.imgUrl"
              placeholder="img url"
            >
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </FormItem>
        <FormItem>
          <Input type="text" v-model="formInline.appKey" placeholder="app key">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Input
            type="text"
            v-model="formInline.appSecret"
            placeholder="appSecret"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Input
            type="text"
            v-model="formInline.webSecret"
            placeholder="app key"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Input
            type="text"
            v-model="formInline.interfaceDomain"
            placeholder="interfaceDomain"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { newGuid } from "@/libs/tools";
export default {
  data() {
    return {
      modal10: false,
      formInline: {
        platformName: "",
        imgUrl: "",
        appKey: "",
        appSecret: "",
        interfaceDomain: "",
        webSecret: ""
      }
    };
  },
  methods: {
    // 表单框校验
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleBeforeUpload(file) {
      let _this = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        _this.formInline.imgUrl = this.result;
      };
    },
    handleSuccess(file) {
      console.log(file);
      this.formInline.imgUrl = file.data;
    },
    ...mapActions(["getPlatformAdd"]),
    ok() {
      this.getPlatformAdd(this.formInline);
    },
    add() {
      this.modal10 = !this.modal10;
      this.formInline.appKey = newGuid();
      this.formInline.appSecret = newGuid();
      this.formInline.webSecret = newGuid();
    }
  }
};
</script>

<style lang="less" scoped>
</style>

