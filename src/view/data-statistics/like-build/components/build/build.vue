<template>
  <div>
    <div class="ho_article_contain">
      <!-- 栏目 -->
      <template v-if="newColumnList && newColumnList.length != 0">
        <Select @on-change="selectChange" style="width:150px" v-model="colKey">
          <Option
            v-for="(item, index) in newColumnList"
            :value="item.columnKey"
            :key="index"
            >{{ item.columnName }}</Option
          >
        </Select>
      </template>
      <datePicker @dateValue="handleDate"></datePicker>
    </div>
    <div style="margin-top:20px">
      <Table stripe :columns="columns" :data="getFloorDataList">
        <template slot-scope="{ index }" slot="paiming">
          <div>{{ index + 1 }}</div>
        </template>
      </Table>
    </div>
    <div class="pagination_contain">
      <pagination
        :total="getNewTotal1"
        @pageChange="getCurrectPage"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import pagination from "_c/pagination";
import datePicker from "_c/date-picker";
export default {
  components: {
    datePicker,
    pagination
  },
  data() {
    return {
      date: null,
      columns: [
        {
          title: "排名",
          key: "name",
          slot: "paiming"
        },
        {
          title: "评论内容",
          key: "commentContent"
        },
        {
          title: "所在文章",
          key: "programName"
        },
        {
          title: "盖楼数",
          key: "floorNum"
        }
      ],
      colKey: ""
    };
  },
  computed: {
    ...mapGetters([
      "getNewTotal1",
      "getFloorDataList",
      "getCurrectCateKey",
      "newColumnList",
      "getCurrectJigouId"
    ])
  },
  methods: {
    // 时间变化
    handleDate(date) {
      this.date = date;
      this.praiseAndFloorList1({
        pageSize: 10,
        offset: 1,
        startTime: date[0],
        endTime: date[1]
      });
    },
    // 当前页发生变化时
    getCurrectPage(currect) {
      console.log(currect);
      if (!this.date) {
        this.praiseAndFloorList1({
          pageSize: 10,
          offset: currect
        });
      } else {
        this.praiseAndFloorList1({
          pageSize: 10,
          offset: currect,
          startTime: this.date[0],
          endTime: this.date[1]
        });
      }
    },
    // 下拉列表
    selectChange(value) {
      this.colKey = value;
      // 先改变栏目key 在请求
      this.setCurrectCateKey(value);
      this.praiseAndFloorList1({ pageSize: 10, offset: 1 });
    },
    ...mapActions(["getColumnList", "praiseAndFloorList1"]),
    ...mapMutations(["setCurrectCateKey"])
  },
  mounted() {
    this.getColumnList(1).then(res => {
      console.log(res);
      if (res != null && res.length != 0) {
        this.colKey = res[0].columnKey;
        this.setCurrectCateKey(res[0].columnKey);
        // this.praiseAndFloorList({ pageSize: 10, offset: 1 });
        this.praiseAndFloorList1({ pageSize: 10, offset: 1 });
      }
    });
  },
  watch: {
    getCurrectJigouId(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getColumnList(1).then(res => {
        console.log(res);
        if (res != null && res.length != 0) {
          this.colKey = res[0].columnKey;
          this.setCurrectCateKey(res[0].columnKey);
          // this.praiseAndFloorList({ pageSize: 10, offset: 1 });
          this.praiseAndFloorList1({ pageSize: 10, offset: 1 });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ho_article_contain {
  display: flex;
}

.pagination_contain {
  margin-top: 10px;
  float: right;
  margin-right: 300px;
}
</style>
