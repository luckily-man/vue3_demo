<!--
 * @Author: liuzhongkun
 * @Date: 2021-03-25 10:43:53
 * @LastEditors: liuzhongkun
 * @LastEditTime: 2021-03-31 11:38:21
-->
<template>
  <el-header>
    <!-- 左侧菜单闭合按钮 -->
    <div class="change">
      <i class="el-icon-s-unfold " @click="changeIsCollage"></i>
    </div>
    <!-- 头像 -->
    <div class="right">
        <div class="avatar cp"  @click="edit">
          <img :src="avatar" alt="">
        </div>
        <!-- 退出登录-->
        <div>
           <div class="back">
             <i class="el-icon-switch-button cp" @click="logOut">退出登录</i>
           </div>
        </div>
    </div>
  </el-header>
</template>

<script>
import { computed,defineComponent,ref } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { removeUserToken } from '@utils/auth/auth-token.js';
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    let avatar = computed(() =>store.state.userdata.avatar)
   
    let changeIsCollage = () => {
      store.commit("change_collapse")
    }; 
    const logOut =() => {
      removeUserToken('token')
      sessionStorage.clear()
      router.replace('/login')
    }
    const edit = () => {
      router.push('/user-edit')
    }
    
    return {
      changeIsCollage,
      logOut,
      edit,
      avatar,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-header {
  position: relative;
  background-color: #B3C0D1;
  color: #333;
  .change,
  .right {
    position: absolute;
  }
  .change {
    left: 70px;
    top: 30px;
  }
  .right{
    right: 30px;
    top: 12px;
    width: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      font-size: 10px;
      img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
    .back{
      font-size: 12px;
    }
  }
}



.el-icon-arrow-down {
  font-size: 12px;
}
</style>
