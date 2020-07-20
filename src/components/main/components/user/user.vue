<template>
  <div class="user-avatar-dropdown">
    <Icon type="md-lock" size="26" />
    <template
      v-if="
        (userNamePlatFormList.length != 0 && access == 'super') ||
          access == 'platform_super'
      "
    >
      <Dropdown @on-click="handleClick">
        <a href="javascript:void(0)">
          {{ selectValue }}
          <Icon :size="18" type="md-arrow-dropdown"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem
            :name="item.platformName"
            v-for="(item, index) in userNamePlatFormList"
            :key="index"
            >{{ item.platformName }}</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
    </template>

    <template v-if="getCurrectJiGouList.length != 0">
      <Dropdown @on-click="jiGouHandleClick">
        <a href="javascript:void(0)">
          {{ selectJValue }}
          <Icon :size="18" type="md-arrow-dropdown"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem
            :name="item.orgName"
            v-for="(item, index) in getCurrectJiGouList"
            :key="index"
            >{{ item.orgName }}</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
    </template>
    <Icon type="md-home" :size="18" />
  </div>
</template>

<script>
import "./user.less";
import { deepClone } from "@/libs/util";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "User",
  computed: {
    ...mapGetters([
      "getPlatFormList",
      "getCurrectJiGouList",
      "getCurrectPlatFormId",
      "getCurrectJigouId"
    ]),
    ...mapState({
      access: state => state.user.access
    }),
    ...mapState({
      userNamePlatFormList: state => state.platform.userNamePlatFormList
    })
  },
  data() {
    return {
      selectPValue: "",
      selectJValue: "",
      selectValue: ""
    };
  },
  methods: {
    ...mapActions([
      "handleLogOut",
      "getCurrectJigouList",
      "getPlatforms",
      "getUser",
      "getImgToken"
    ]),
    ...mapMutations([
      "setCurrectJigouId",
      "setUserNamePlatFormList",
      "setCurrectJiGouList",
      "setHomeList"
    ]),
    logout() {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: "login"
        });
      });
    },
    // 下拉列表点击事件
    handleClick(name) {
      this.selectValue = name;
      console.log(name);
      // 根据名称找到索引 根据索引 找到平台ID 根据ID找到机构列表
      let platformKeyIndex = this.getPlatFormList.findIndex((item, index) => {
        return item.platformName == name;
      });
      let platformKey = this.getPlatFormList[platformKeyIndex].platformKey;
      this.getCurrectJigouList(platformKey).then(res => {
        if (res.length != 0) {
          this.setHomeList([]);
          this.setCurrectJigouId(res[0].orgKey);
          this.selectJValue = res[0].orgName;
        } else {
          this.setHomeList([]);
        }
      });
    },
    // 机构点击事件 改变当前机构ID
    jiGouHandleClick(name) {
      this.selectJValue = name;
      let jiGouId = this.getCurrectJiGouList.findIndex((item, index) => {
        return item.orgName == name;
      });
      let jiGouKey = this.getCurrectJiGouList[jiGouId].orgKey;
      this.setCurrectJigouId(jiGouKey);
    }
  },
  mounted() {
    // test 先获取用户的身份 然后在根据身份请求相应的平台列表，然后在请求机构列表
    this.getUser()
      .then(res => {
        console.log(res, "用户登录信息");
        if (res != null && this.access == "super") {
          this.getPlatforms().then(res => {
            console.log(res);
            this.setUserNamePlatFormList(res);
            res.forEach(element => {
              if (element.platformKey == this.getCurrectPlatFormId) {
                this.selectValue = element.platformName;
              }
            });
            // this.selectValue = this.userNamePlatFormList[0].platformName;
            this.getCurrectJigouList(this.getCurrectPlatFormId).then(res => {
              console.log(res, "当前机构列表");
              if (res.length != 0) {
                // this.selectJValue = res[0].orgName;
                // this.setCurrectJigouId(res[0].orgKey);
                this.selectJValue = this.getCurrectJigouId;
              }
            });
          });
        } else if (this.access == "platform_super") {
          console.log(this.access);
          //如果是平台管理员的话 根据当前用户的平台key，只显示当前用户所属的平台
          this.getPlatforms().then(res => {
            let jiGouId = this.getPlatFormList.findIndex((item, index) => {
              return item.platformKey == this.getCurrectPlatFormId;
            });
            let userPlatKey = this.getPlatFormList.slice(jiGouId, jiGouId + 1);
            console.log(userPlatKey, "当前用户平台key数组");
            this.setUserNamePlatFormList(userPlatKey);
            this.selectValue = this.userNamePlatFormList[0].platformName;
            this.getCurrectJigouList(
              this.userNamePlatFormList[0].platformKey
            ).then(res => {
              console.log(res, "当前机构列表");
              if (res.length != 0) {
                // this.selectJValue = res[0].orgName;
                this.selectJValue = this.getCurrectJigouId;
                // this.setCurrectJigouId(res[0].orgKey);
              }
            });
          });
        } else if (this.access == "admin" || this.access == "user") {
          // 设置用户管理员机构key  如果是机构管理员 和 审核管理员
          // 则根据用户管理员的平台key先获取机构列表，在根据用户的机构key获取当前一个数组
          console.log(
            this.getCurrectPlatFormId,
            this.getCurrectJigouId,
            "管理员当前的平台id和机构id"
          );
          this.getCurrectJigouList(this.getCurrectPlatFormId).then(res => {
            //获取当前机构列表
            let jiGouIdIndex = this.getCurrectJiGouList.findIndex(
              (item, index) => {
                return item.orgKey == this.getCurrectJigouId;
              }
            );
            let userJiGou = this.getCurrectJiGouList.slice(
              jiGouIdIndex,
              jiGouIdIndex + 1
            );
            this.setCurrectJiGouList(userJiGou);
            this.selectJValue = userJiGou[0].orgName;
            console.log(this.getCurrectJiGouList, "机构管理员所在的机构");
          });
        }
      })
      .catch(res => {
        this.$Message.info("用户登录信息过期，请重新登录！");
        console.log(res);
      });
  }
};
</script>
