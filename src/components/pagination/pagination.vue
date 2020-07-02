<template>
  <div>
    <Page :total="total" show-total @on-change="pageChange" />
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    // 页码发生变化
    pageChange(e) {
      this.$emit("pageChange", e);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
