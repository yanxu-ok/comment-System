<script>
export default {
  methods: {
    handleClick(date) {
      // console.log(date);
      this.$emit("dateValue", date);
    }
  }
};
</script><template>
  <div class="date_contain">
    <DatePicker
      type="daterange"
      split-panels
      placeholder="选择时间"
      style="width: 200px"
      @on-change="handleClick"
    ></DatePicker>
  </div>
</template>


<style lang="less" scoped>
@import "./date-picker.less";
</style>
