<template>
  <div>
    <div class="sensitive_header">
      <div>
        <Input clearable style="width: 250px" v-model="filterWord" />
        <Button type="primary" @click="handleBtnClick">搜索</Button>
      </div>
      <Button type="primary" @click="handleAdd">添加</Button>
    </div>
    <div class="table_contain">
      <template v-if="getFilterList">
        <div>已经添加了{{ getFilterList.length }}个敏感词</div>
        <Table stripe :columns="columns" :data="getFilterList">
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="deleteFilterByKey(row)"
              >删除</Button
            >
          </template>
        </Table>
      </template>
    </div>
    <div class="pagination_contain">
      <pagination
        :total="getCurrectCommentTotal"
        @pageChange="getCurrectPage"
      ></pagination>
    </div>
    <Modal v-model="modal1" title="添加" @on-ok="ok" @on-cancel="cancel">
      <Input clearable style="width: 250px" v-model="filterAdd" />
    </Modal>
  </div>
</template>

<script>
import { getShijain } from "@/libs/tools";
import { mapMutations, mapActions, mapGetters } from "vuex";
import pagination from "_c/pagination";
export default {
  components: {
    pagination
  },
  data() {
    return {
      filterWord: "",
      modal1: false,
      filterAdd: "",
      columns: [
        {
          title: "敏感词",
          key: "filterContent"
        },
        {
          title: "最后添加时间",
          key: "createTime"
        },
        {
          title: "操作人员",
          key: "operatorName"
        },
        {
          title: "操作",
          key: "setup",
          slot: "action"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getFilterList", "getCurrectCommentTotal"])
  },
  methods: {
    ...mapActions(["getFilterPage", "saveFilter", "deleteFilterByKey"]),
    // 当前页发生变化时
    getCurrectPage(currect) {
      console.log(currect);
      this.getFilterPage({
        filterType: 1,
        filterContent: this.filterWord,
        pageSize: 10,
        offset: currect
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    // 搜索
    handleBtnClick() {
      this.getFilterPage({
        filterType: 1,
        filterContent: this.filterWord,
        pageSize: 10,
        offset: 1
      });
    },
    ok() {
      // 添加过滤词
      this.saveFilter({
        operatorName: "操作员1",
        filterContent: this.filterAdd,
        filterType: 1,
        createTime: getShijain()
      }).then(res => {
        this.getFilterPage({
          filterType: 1,
          filterContent: this.filterWord,
          pageSize: 10,
          offset: 1
        }).then(res => {
          this.$Message.info("添加成功");
        });
      });
    },
    cancel() {
      this.$Message.info("已取消");
    },
    // 过滤测添加
    handleAdd() {
      this.modal1 = !this.modal1;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./filter-words.less";
</style>
