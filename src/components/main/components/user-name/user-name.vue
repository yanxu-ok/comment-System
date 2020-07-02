<template>
  <div class="userName_contain">
    <Icon type="md-person" size="26" />
    <span>用户名:{{ userName }}</span>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userName: state => state.user.userName
    })
  }
};
</script>

<style lang="less" scoped>
@import "./user-name.less";
</style>

