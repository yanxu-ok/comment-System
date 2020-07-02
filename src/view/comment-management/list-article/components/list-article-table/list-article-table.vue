<template>
  <div style="margin-top:20px">
    <Table
      row-key="id"
      :columns="columns"
      :data="data"
      border
      width="1105"
      style="margin: 0 auto"
      :highlight-row="true"
    >
      <template slot-scope="{ row, index }" slot="forbid">
        <i-switch v-model="row.forbid" @on-change="switchChange(row, index)" />
      </template>
      <template slot-scope="{ row, index }" slot="hide">
        <i-switch v-model="row.hide" @on-change="switchChange(row, index)" />
      </template>
      <template slot-scope="{ row, index }" slot="gloal">
        <i-switch v-model="row.gloal" @on-change="switchChange(row, index)" />
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "昌乐新闻",
          key: "jigou",
          width: "500",
          renderHeader: (h, params) => {
            return h("div", {}, params.column.title);
          }
        },
        {
          title: "禁止评论",
          key: "forbid",
          width: "200",
          align: "center",
          slot: "forbid"
        },
        {
          title: "隐藏评论",
          key: "hide",
          width: "200",
          align: "center",
          align: "center",
          slot: "hide"
        },
        {
          title: "先发后审",
          key: "gloal",
          align: "center",
          slot: "gloal"
        }
      ],
      data: [
        {
          id: 101,
          jigou: "新闻",
          forbid: false,
          hide: false,
          gloal: false
        },
        {
          id: 102,
          jigou: "栏目",
          forbid: false,
          hide: false,
          gloal: false
        },
        {
          id: 103,
          jigou: "文稿",
          forbid: false,
          hide: false,
          gloal: false
        },
        {
          id: 104,
          jigou: "随手拍",
          forbid: false,
          hide: false,
          gloal: false
        }
      ]
    };
  },
  methods: {
    // 点击开关时触发事件
    switchChange(row, index) {
      this.data[index] = row;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./list-article-table.less";
</style>

