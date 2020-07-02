<template>
  <div class="tabs_contain">
    <Tabs value="0" @on-click="tabsHandleClick">
      <TabPane
        :label="item.label"
        :name="item.id + ''"
        v-for="(item, index) in $store.state.comment.tabsList"
        :key="index"
      >
        <!-- 动态渲染组件 -->
        <component
          v-if="$store.state.comment.tabsIndex == item.id"
          :is="currentTab"
        ></component>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import pendingReview from "./components/pending-review";
import passed from "./components/passed";
import offline from "./components/offline";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "local-audit",
  components: {
    pendingReview,
    passed,
    offline
  },
  computed: {
    // 监听组件
    ...mapGetters(["currentTab"])
  },
  methods: {
    ...mapActions(["tabsHandleClick"])
  }
};
</script>

<style lang="less" scoped>
@import "./local-audit.less";
</style>