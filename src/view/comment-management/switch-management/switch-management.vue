<template>
  <div>
    <Card :bordered="false">
      <!-- 头部按钮 -->
      <switchHeader></switchHeader>
      <hr />
      <switchTable></switchTable>
    </Card>
  </div>
</template>

<script>
import switchHeader from "./components/switch-header";
import switchTable from "./components/switch-table";
export default {
  components: {
    switchHeader,
    switchTable
  }
};
</script>

<style lang="less" scoped>
@import "./switch-management.less";
</style>
