<template>
  <div class="blacklist_contain">
    <Input
      placeholder="输入id"
      clearable
      style="width: 200px"
      v-model="loginId"
    />
    <Input
      placeholder="输入用户名"
      clearable
      style="width: 200px"
      v-model="loginName"
    />
    <Button type="primary" shape="circle" @click="blackAdd">添加</Button>
    <Tabs value="0">
      <TabPane label="黑名单" name="0">
        <Table stripe :columns="columns" :data="getBlackList">
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="deleteBlackByKey(row)"
              >恢复</Button
            >
          </template>
        </Table>
      </TabPane>
    </Tabs>
    <div class="pagination_contain">
      <pagination
        :total="getCurrectCommentTotal"
        @pageChange="getCurrectPage"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import pagination from "_c/pagination";
export default {
  components: {
    pagination
  },
  data() {
    return {
      loginId: "",
      loginName: "",
      columns: [
        {
          title: "用户ID",
          key: "loginId"
        },
        {
          title: "用户名称",
          key: "loginName"
        },
        {
          title: "操作人",
          key: "operatorName"
        },
        {
          title: "冻结时间",
          key: "createTime"
        },
        {
          title: "冻结理由",
          key: "blackReason"
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
    ...mapGetters([
      "getCurrectPlatFormId",
      "getBlackList",
      "getCurrectCommentTotal"
    ])
  },
  methods: {
    ...mapActions([
      "getBlackPage",
      "deleteBlackByKey",
      "saveBlack",
      "getBlackPage"
    ]),
    // 当前页发生变化时
    getCurrectPage(currect) {
      console.log(currect);
      this.getBlackPage({
        platformKey: this.getCurrectPlatFormId,
        offset: currect,
        pageSize: 10
      });
    },
    // 黑名单添加
    blackAdd() {
      if (this.loginName != "" && this.loginId != "") {
        this.saveBlack({
          loginName: this.loginName,
          loginId: this.loginId,
          platformKey: this.getCurrectPlatFormId
        }).then(res => {
          if (res.data.totalCount === -1) {
            this.$Message.info(res.data.comment);
            return;
          } else {
            this.getBlackPage({
              platformKey: this.getCurrectPlatFormId,
              offset: 1,
              pageSize: 10
            }).then(res => {
              console.log(res);
              if (res.data.ok) this.$Message.info("添加成功");
              else return;
            });
          }
        });
      } else {
        this.$Message.info("用户ID和用户名不能为空");
      }
    }
  },
  mounted() {
    // 页面一加载就获取
    if (!this.getCurrectPlatFormId) {
      return;
    } else {
      console.log(this.getCurrectPlatFormId, "当前平台ID");
      this.getBlackPage({
        platformKey: this.getCurrectPlatFormId,
        offset: 1,
        pageSize: 10
      });
    }
  },
  watch: {
    // 监听平台ID
    getCurrectPlatFormId(newvalue, oldvalue) {
      console.log(newvalue, "当前平台ID");
      if (newvalue != null) {
        this.getBlackPage({
          platformKey: newvalue,
          offset: 1,
          pageSize: 10
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./blacklist.less";
</style>
