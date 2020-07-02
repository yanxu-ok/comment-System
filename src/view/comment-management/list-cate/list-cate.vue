<template>
  <div>
    <listCateTable></listCateTable>
  </div>
</template>

<script>
import listCateTable from "./components/list-cate-table";
export default {
  components: {
    listCateTable
  }
};
</script>

<style lang="less" scoped>
@import "./list-cate.less";
</style>
