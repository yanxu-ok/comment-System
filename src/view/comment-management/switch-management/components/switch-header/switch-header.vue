<template>
  <div class="switch_header">
    <Radio
      size="large"
      @click.native="radioChange"
      v-model="getSetting.addSetting"
      :true-value="true"
      :false-value="false"
      >全站禁止评论</Radio
    >
    <Radio
      v-model="getSetting.hideSetting"
      @click.native="radioChange1"
      size="large"
      >隐藏所有评论(包括历史数据)</Radio
    >
    <Radio
      v-model="getSetting.releaseSetting"
      @click.native="radioChange2"
      size="large"
      >全局先发后审</Radio
    >
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    radioChange() {
      this.getSetting.addSetting = !this.getSetting.addSetting;
      this.setGlobalSetting({ addSetting: this.getSetting.addSetting });
    },
    radioChange1() {
      this.getSetting.hideSetting = !this.getSetting.hideSetting;
      this.setGlobalSetting({ hideSetting: this.getSetting.hideSetting });
    },
    radioChange2() {
      this.getSetting.releaseSetting = !this.getSetting.releaseSetting;
      console.log(this.getSetting.releaseSetting);
      this.setGlobalSetting({ releaseSetting: this.getSetting.releaseSetting });
    },
    ...mapActions(["getGSetting", "setGlobalSetting"])
  },
  computed: {
    ...mapGetters(["getSetting"])
  },
  mounted() {
    // 获取全局设置
    this.getGSetting();
  }
};
</script>

<style lang="less" scoped>
@import "./switch-header.less";
</style>
