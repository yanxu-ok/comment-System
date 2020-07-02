<template>
  <div>
    <!-- 时间选择器 -->
    <div>
      <datePicker @dateValue="handleDate"></datePicker>
    </div>
    <template v-if="getSituationList != null">
      <div style="margin-top:20px">
        <Row :gutter="20">
          <i-col
            :xs="12"
            :md="8"
            :lg="4"
            v-for="(infor, i) in inforCardData"
            :key="`infor-${i}`"
            style="height: 120px;padding-bottom: 10px;"
          >
            <infoCard
              shadow
              :color="infor.color"
              :icon="infor.icon"
              :icon-size="36"
            >
              <count-to :end="infor.count" count-class="count-style" />
              <p>{{ infor.title }}</p>
            </infoCard>
          </i-col>
        </Row>
      </div>
    </template>

    <div>
      <Row>
        <Card shadow>
          <example :list="dateList" style="height: 310px;" />
        </Card>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import infoCard from "_c/info-card";
import CountTo from "_c/count-to";
import datePicker from "_c/date-picker";
import { time_dis, getAll, getRiqi, getdiffdate } from "@/libs/tools";
import Example from "./example";
export default {
  components: {
    datePicker,
    infoCard,
    CountTo,
    Example
  },
  data() {
    return {
      dateList: [],
      inforCardData: [
        {
          title: "评论总数",
          icon: "md-person-add",
          count: 0,
          color: "#2d8cf0"
        },
        {
          title: "评论人数",
          icon: "md-locate",
          count: 0,
          color: "#19be6b"
        },
        {
          title: "最高点击数",
          icon: "md-help-circle",
          count: 0,
          color: "#ff9900"
        },
        {
          title: "最高盖楼层",
          icon: "md-chatbubbles",
          count: 0,
          color: "#E46CBB"
        },
        {
          title: "已审评论",
          icon: "md-chatbubbles",
          count: 0,
          color: "#ff9900"
        },
        {
          title: "待审评论",
          icon: "md-chatbubbles",
          count: 0,
          color: "#E46CBB"
        },
        {
          title: "举报评论",
          icon: "md-chatbubbles",
          count: 0,
          color: "#9A66E4"
        }
      ]
    };
  },
  mounted() {
    let dateArr = getRiqi(15);
    this.commentSituation({ startTime: "", endTime: "" });
    this.auditStatus({ startTime: "", endTime: "" });
    this.visualization({
      startTime: dateArr[0],
      endTime: dateArr[14]
    });
  },
  watch: {
    // 监听
    getCurrectJigouId(newValue, oldValue) {
      let dateArr = getRiqi(15);
      this.commentSituation({ startTime: "", endTime: "" });
      this.auditStatus({ startTime: "", endTime: "" });
      this.visualization({
        startTime: dateArr[0],
        endTime: dateArr[14]
      });
    },
    // 监听概况
    getSituationList(newValue, oldValue) {
      this.inforCardData[0].count = newValue.commentCount;
      this.inforCardData[1].count = newValue.commentNumOfPeople;
      this.inforCardData[2].count = newValue.highestPraiseNum;
      this.inforCardData[3].count = newValue.highestFloorNum;
    },
    // 监听审核情况
    getShenHeObj(newValue, oldValue) {
      this.inforCardData[4].count = newValue.reviewedComments;
      this.inforCardData[5].count = newValue.commentsToBeReviewed;
      this.inforCardData[6].count = newValue.reportComments;
    }
  },
  computed: {
    ...mapGetters(["getCurrectJigouId", "getSituationList", "getShenHeObj"])
  },
  methods: {
    ...mapActions([
      "getColumnList",
      "commentSituation",
      "auditStatus",
      "visualization"
    ]),
    // 时间
    handleDate(date) {
      let list = getdiffdate(date[0], date[1]);
      console.log(list, "当前选择的天数");
      this.dateList = list;
      this.commentSituation({ startTime: date[0], endTime: date[1] });
      this.auditStatus({ startTime: date[0], endTime: date[1] });
      this.visualization({
        startTime: date[0],
        endTime: date[1]
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./comment-statistics.less";
</style>
