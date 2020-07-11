<template>
  <div class="chat">
    <Card :bordered="false">
      <i-select
        v-model="selectValue"
        @on-change="nameChange"
        style="width:180px;margin-left:30px"
      >
        <i-option
          v-for="(item, index) in cateList1"
          :value="item.value"
          :key="index"
          >{{ item.label }}</i-option
        >
      </i-select>
      <!-- 按条件搜索 -->
      <i-select
        v-model="selectValue"
        @on-change="nameChange"
        style="width:180px;margin-left:30px"
      >
        <i-option
          v-for="(item, index) in cateList"
          :value="item.value"
          :key="index"
          >{{ item.label }}</i-option
        >
      </i-select>
      <!-- 搜索框 -->
      <Input v-model="searchValue" placeholder="" style="width: 200px" />
      <Button type="primary" @click="handleBtnClick">搜索</Button>

      <!-- 表格 -->
      <Table :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="proName">
          <div @click="handleBtnPd(row)" class="name">
            文章名:{{ row.name }}
          </div>
        </template>
        <template slot-scope="{ row }" slot="date">
          <div>发布时间:{{ row.age }}</div>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      searchValue: "",
      selectValue: "",
      cateList: [
        {
          value: "1",
          label: "按评论关键词"
        },
        {
          value: "2",
          label: "按用户名"
        },
        {
          value: "3",
          label: "按用户ID"
        },
        {
          value: "4",
          label: "按标题关键字"
        }
      ],
      cateList1: [
        {
          value: "1",
          label: "直播"
        }
      ],
      columns1: [
        {
          title: "标题",
          align: "center",
          slot: "proName"
        },
        {
          title: "发布时间",
          slot: "date"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        }
      ]
    };
  },
  methods: {
    // 搜索按钮事件
    handleBtnClick() {},
    // 下拉改变的
    nameChange() {},
    // 点击文章跳转
    handleBtnPd(row) {
      this.$router.push({
        name: "now-chat",
        query: {
          obj: row
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./chat.less";
</style>
