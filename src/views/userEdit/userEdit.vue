<template>
  <div class="mainer">
    <div class="aside">
      <div class="avatar">
        <el-tooltip class="item" effect="dark" content="点击更换头像" placement="top">
          <el-upload class="upload-demo" :before-upload="uploadAvatar" action="">
            <img :src="avatar" alt="" />
          </el-upload>
        </el-tooltip>
      </div>
      <div class="nickname m-b-10">
        <el-tag v-if="flag" class="cp" @dblclick="editNickname">{{nickname}}</el-tag>
        <el-input v-else v-model="myName" placeholder="请输入内容" @blur="changeNickname"></el-input>
      </div>

      <div class="iconList">
        <el-tooltip class="item m-all-5" effect="dark" placement="bottom" v-for="(item, index) in iconList" :key="index" :content="item.title">
          <i :class="item.icon" @click="editMsg(item)"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  defineComponent,
  computed,
  ref,
  reactive,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import userServices from "../../servers/user";
export default defineComponent({
  setup() {
    let flag = ref(true);
    let myName = ref('')
    const iconList = reactive([
      {title: '实名认证', icon: 'el-icon-bank-card',path: '/user-edit/certification'},
      {title: '绑定手机', icon: 'el-icon-mobile-phone',path:'/user-edit/bind-phone'},
      {title: '修改密码', icon: 'el-icon-key',path: '/user-edit/change-pwd'},
      {title: '绑定邮箱', icon: 'el-icon-chat-dot-round',path: '/user-edit/bind-email'},
    ])
    const store = useStore();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    let avatar = computed(() => store.state.userdata.avatar);
    let nickname = computed(() => store.state.userdata.nickname);
    const uploadAvatar = (file) => {
      let formdata = new FormData();
      formdata.append("avatar", file);
      userServices.avatar(formdata).then((res) => {
        if (res.status === 200) {
          getMyMsg()
          proxy.$message({
            message: "头像上传成功",
            type: "success",
          });
        } else {
          proxy.$message({
            message: "头像未更新",
            type: "error",
          });
        }
      })
      .catch((err) => {
          console.log(err);
      });
      return false;
    };
    const getMyMsg = () => {
      userServices.current().then((response) => {
        store.commit("get_data", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    const editNickname = () => {
      flag.value = false;
      myName.value = nickname.value
    };
    const changeNickname = () => {
      flag.value = true;
      let params = {nickname:myName.value}
      userServices.nickname(params).then((res) => {
        getMyMsg()
        proxy.$message({
          message: "昵称更新成功",
          type: "success",
        });
      }).catch((err) => {
        console.log(err);
      });
    }
    const editMsg =(e) => {
      router.push(e.path);
    }
    return {
      myName,
      flag,
      avatar,
      nickname,
      iconList,
      uploadAvatar,
      editNickname,
      changeNickname,
      editMsg
    };
  },
});
</script>

<style lang="scss" scoped>
.mainer {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .aside {
    width: 30%;
    background-color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      height: 60px;
      width: 60px;
      margin-bottom: 10px;
      img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
      }
    }
  }
  .right {
    width: 70%;
  }
  
  
}
</style>
