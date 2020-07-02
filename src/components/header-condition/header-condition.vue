<template>
  <div class="pending_contain">
    <div>
      <!-- 栏目 -->
      <Select v-model="model1" style="width:150px">
        <Option
          v-for="item in cateList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
      <!-- 按评论列表查看 -->
      <Select
        v-model="model1"
        style="width:280px;margin-left:30px"
        v-if="tabsIndex !== '0'"
      >
        <Option
          v-for="item in cateList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
      <!-- 按关键词搜索 -->
      <Select
        v-model="model1"
        style="width:180px;margin-left:30px"
        v-if="tabsIndex === '0'"
      >
        <Option
          v-for="item in cateList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
      <!-- 搜索框 -->
      <Input
        v-model="searchValue"
        placeholder=""
        style="width: 200px"
        v-if="tabsIndex === '0'"
      />
      <Button type="primary" v-if="tabsIndex === '0'">搜索</Button>
    </div>
    <div>
      <Button
        shape="circle"
        style="margin-right:20px"
        v-if="tabsIndex === '0' || tabsIndex === '2'"
        >全部通过</Button
      >
      <Button shape="circle" v-if="tabsIndex === '0' || tabsIndex === '1'"
        >全部下线</Button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {},
  data() {
    return {
      searchValue: "",
      cateList: [
        {
          value: "New York",
          label: "文稿"
        },
        {
          value: "London",
          label: "London"
        }
      ],
      model1: "New York"
    };
  },
  computed: {
    ...mapState({
      tabsIndex: state => state.comment.tabsIndex
    })
  }
};
</script>

<style lang="less" scoped>
</style>
