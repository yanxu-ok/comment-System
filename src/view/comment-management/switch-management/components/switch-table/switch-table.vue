<template>
  <div style="margin-top:20px">
    <Table
      row-key="id"
      :columns="columns"
      :data="getJigouSetting"
      border
      width="1300"
      style="margin: 0 auto"
      :load-data="handleLoadData"
    >
      <template slot-scope="{ row }" slot="jigouName">
        <router-link
          :to="{
            name: 'list-cate',
            query: {
              platformKey: row.platformKey,
              orgKey: row.orgKey,
              parentColumnKey: row.columnKey
            }
          }"
          v-if="row.columnName && row.columnName != '政务号'"
        >
          <span>
            {{ row.orgName || row.columnName }}
          </span>
        </router-link>
        <router-link
          :to="{
            name: 'list-government',
            query: {
              platformKey: row.platformKey,
              orgKey: row.orgKey,
              parentColumnKey: row.columnKey
            }
          }"
          v-else
        >
          <span>
            {{ row.orgName || row.columnName }}
          </span>
        </router-link>
      </template>
      <template slot-scope="{ row }" slot="deepSetup">
        <router-link
          :to="{
            name: 'list-cate',
            query: {
              platformKey: row.platformKey,
              orgKey: row.orgKey,
              parentColumnKey: row.columnKey
            }
          }"
          v-if="row.columnName && row.columnName != '政务号'"
        >
          <div style="font-size:16px;color:#538FFB">
            栏目查看
          </div>
        </router-link>
        <router-link
          :to="{
            name: 'list-government',
            query: {
              platformKey: row.platformKey,
              orgKey: row.orgKey,
              parentColumnKey: row.columnKey
            }
          }"
          v-if="row.columnName && row.columnName == '政务号'"
        >
          <div style="font-size:16px;color:#538FFB">
            栏目查看
          </div>
        </router-link>
      </template>
      <template slot-scope="{ row }" slot="forbid">
        <i-switch
          v-model="row.addSetting"
          :disabled="getSetting.addSetting"
          @on-change="
            switchChange({ row, setting: 'addSetting', type: 'column' })
          "
          :true-value="0"
          :false-value="1"
          v-if="row.columnKey"
        />
        <i-switch
          v-model="row.addSetting"
          :disabled="getSetting.addSetting"
          @on-change="switchChange({ row, setting: 'addSetting', type: 'org' })"
          :true-value="0"
          :false-value="1"
          v-else
        />
      </template>
      <template slot-scope="{ row }" slot="hide">
        <i-switch
          v-model="row.hideSetting"
          :disabled="getSetting.hideSetting"
          @on-change="
            switchChange({ row, setting: 'hideSetting', type: 'column' })
          "
          :true-value="1"
          :false-value="0"
          v-if="row.columnKey"
        />
        <i-switch
          v-model="row.hideSetting"
          :disabled="getSetting.hideSetting"
          @on-change="
            switchChange({ row, setting: 'hideSetting', type: 'org' })
          "
          :true-value="1"
          :false-value="0"
          v-else
        />
      </template>
      <template slot-scope="{ row }" slot="gloal">
        <i-switch
          v-model="row.releaseSetting"
          :disabled="getSetting.releaseSetting"
          @on-change="
            switchChange({ row, setting: 'releaseSetting', type: 'column' })
          "
          :true-value="1"
          :false-value="0"
          v-if="row.columnKey"
        />
        <i-switch
          v-model="row.releaseSetting"
          :disabled="getSetting.releaseSetting"
          @on-change="
            switchChange({ row, setting: 'releaseSetting', type: 'org' })
          "
          :true-value="1"
          :false-value="0"
          v-else
        />
      </template>
    </Table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          title: "机构列表",
          tree: true,
          width: "500",
          slot: "jigouName"
        },
        {
          title: "禁止评论",
          width: "200",
          align: "center",
          slot: "forbid"
        },
        {
          title: "隐藏评论",
          width: "200",
          align: "center",
          align: "center",
          slot: "hide"
        },
        {
          title: "先发后审",
          width: "200",
          align: "center",
          slot: "gloal"
        },
        {
          title: "深层配置",
          slot: "deepSetup",
          align: "center"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      currectPlatFormId: state => state.comment.currectPlatFormId
    }),
    ...mapGetters(["getJigouSetting", "getCurrectPlatFormId", "getSetting"])
  },
  methods: {
    // 点击树形显示数据 获取栏目列表
    handleLoadData(item, callback) {
      this.getCatePageList({ item, callback });
    },
    ...mapActions(["getGlobalSetting", "setDetailSetting", "getCatePageList"]),
    // 点击开关时触发事件
    switchChange(obj) {
      this.setDetailSetting(obj);
    }
  },
  mounted() {
    // 页面一加载刷新
    this.getGlobalSetting(this.getCurrectPlatFormId);
    console.log(this.getSetting);
  },
  watch: {
    getCurrectPlatFormId(newValue, oldValue) {
      // 当前页面变了也刷新
      this.getGlobalSetting(newValue);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./switch-table.less";
</style>
