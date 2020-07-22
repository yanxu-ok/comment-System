<template>
  <div style="margin:0 50px">
    <Card :bordered="false">
      <Tabs value="0" @on-click="tabsHandleClick1">
        <TabPane
          :label="item.label"
          :name="item.id + ''"
          v-for="(item, index) in $store.state.statistics.tabsList"
          :key="index"
        >
          <!-- 动态渲染组件 -->
          <component
            v-if="$store.state.statistics.tabsIndex == item.id"
            :is="currentTab1"
          ></component>
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
    // 监听组件
    ...mapGetters(["currentTab1"])
  },
  methods: {
    ...mapActions(["tabsHandleClick1"])
  }
};
</script>

<style lang="less" scoped>
@import "./like-build.less";
</style>