<template>
  <div style="margin:0 50px">
    <Card :bordered="false">
      <Tabs value="1">
        <TabPane label="点赞排行" name="1">
          <like :columnList="newColumnList" :cateKey="getCurrectCateKey"></like>
        </TabPane>
        <TabPane label="盖楼排行" name="2">
          <build
            :columnList="newColumnList"
            :cateKey="getCurrectCateKey"
          ></build>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import build from "./components/build";
import like from "./components/like";
export default {
  components: {
    build,
    like
  },
  computed: {
    ...mapGetters(["getCurrectJigouId", "newColumnList", "getCurrectCateKey"])
  },
  methods: {
    ...mapActions([
      "getColumnList",
      "praiseAndFloorList",
      "praiseAndFloorList1"
    ]),
    ...mapMutations(["setCurrectCateKey"])
  },
  watch: {
    // 监听当前机构ID的变化 获取栏目分类列表
    getCurrectJigouId(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getColumnList(1).then(res => {
        console.log(res);
        if (res != null && res.length != 0) {
          this.setCurrectCateKey(res[0].columnKey);
          this.praiseAndFloorList({ pageSize: 10, offset: 1 });
          this.praiseAndFloorList1({ pageSize: 10, offset: 1 });
        }
      });
    }
  },
  mounted() {
    this.getColumnList(1).then(res => {
      console.log(res);
      if (res != null && res.length != 0) {
        this.setCurrectCateKey(res[0].columnKey);
        this.praiseAndFloorList({ pageSize: 10, offset: 1 });
        this.praiseAndFloorList1({ pageSize: 10, offset: 1 });
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "./like-build.less";
</style>