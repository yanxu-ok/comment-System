<template>
  <div ref="dom"></div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import echarts from "echarts";
import {
  on,
  off,
  getRiqi,
  getUnion,
  getSortAtt,
  getA,
  getB
} from "@/libs/tools";
export default {
  name: "serviceRequests",
  data() {
    return {
      dom: null,
      dateList: []
    };
  },
  props: {
    list: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(["getVisualizationObj"])
  },
  methods: {
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    this.dateList = getRiqi(15);
  },
  beforeDestroy() {
    off(window, "resize", this.resize());
  },
  watch: {
    // 监听时间段
    list(newValue, oldValue) {
      this.dateList = newValue;
    },
    getVisualizationObj(newValue, oldValue) {
      let comment = [];
      let people = [];
      let praise = [];
      let floor = [];
      let date = (comment = JSON.parse(JSON.stringify(this.dateList)));
      comment = JSON.parse(JSON.stringify(newValue.commentCountMap));
      people = JSON.parse(JSON.stringify(newValue.commentNumOfPeopleMap));
      praise = JSON.parse(JSON.stringify(newValue.praiseNumMap));
      floor = JSON.parse(JSON.stringify(newValue.floorNumMap));

      let commentList = getA(this.dateList, newValue.commentCountMap);
      let floorList = getA(this.dateList, newValue.floorNumMap);
      let peopleList = getA(this.dateList, newValue.commentNumOfPeopleMap);
      let praiseList = getA(this.dateList, newValue.praiseNumMap);

      console.log(commentList, "差值");

      let commentCountCount = getB(commentList, comment, "comment");
      let floorNumMapCount = getB(floorList, floor, "floor");
      let commentNumOfPeopleMapCount = getB(peopleList, people, "people");
      let praiseNumMapCount = getB(praiseList, praise, "praise");

      console.log(
        commentCountCount,
        floorNumMapCount,
        commentNumOfPeopleMapCount,
        praiseNumMapCount
      );

      let floorCount = [],
        commentCount = [],
        peopleCount = [],
        praiseCount = [];

      floorNumMapCount.forEach(element => {
        floorCount.push(element.dailyCount);
      });

      commentCountCount.forEach(element => {
        commentCount.push(element.commentCount);
      });

      commentNumOfPeopleMapCount.forEach(element => {
        peopleCount.push(element.commentNumOfPeople);
      });

      praiseNumMapCount.forEach(element => {
        praiseCount.push(element.praiseNum);
      });
      console.log(floorCount, commentCount, peopleCount, praiseCount);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          top: "5%",
          left: "3%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: date,
            axisLabel: {
              interval: 0 //代表显示所有x轴标签显示
            }
          }
        ],
        yAxis: {},
        series: [
          {
            name: "评论总数",
            type: "line",
            data: commentCount
          },
          {
            name: "评论人数",
            type: "line",
            data: peopleCount
          },
          {
            name: "点赞数",
            type: "line",
            data: praiseCount
          },
          {
            name: "盖楼层数",
            type: "line",
            data: floorCount
          }
        ]
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
        on(window, "resize", this.resize());
      });
    }
  }
};
</script>
<style lang="less">
</style>
