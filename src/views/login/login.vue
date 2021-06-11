<!--
 * @Author: liuzhongkun
 * @Date: 2021-03-23 17:06:33
 * @LastEditors: liuzhongkun
 * @LastEditTime: 2021-06-11 16:04:45
-->
<template>
  <div class="mainer">
    <el-form ref="formRef" :model="loginForm" :rules="loginFormRules">
      <el-form-item prop="username">
        <el-input
          prefix-icon="el-icon-user"
          v-model="loginForm.username"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          show-password
          prefix-icon="el-icon-lock"
          v-model="loginForm.password"
          placeholder="密码"
          @keyup.enter="onSubmit"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form>
    
  </div>
</template>

<script>
import userServices from "../../servers/user";
import { setUserToken } from "@utils/auth/auth-token.js";
import { getCurrentInstance, defineComponent, reactive, ref, unref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { checkStrong } from "../../utils/myUtils";
export default defineComponent({
  setup() {
    const store = useStore()
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (checkStrong(value) == 1) {
        callback(new Error("密码不符合要求"));
      } else {
        callback();
      }
    };
    const loginForm = reactive({
      username: "admin",
      password: "admin123",
    });
    const loginFormRules = ref({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 2, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
      ],
      password: [
        { required: true, validator: validatePassword, trigger: "blur" },
      ],
    });
    const { proxy } = getCurrentInstance();
    const formRef = ref(null);
    const router = useRouter();
    const onSubmit = () => {
      const from = unref(formRef);
      from.validate((valid) => {
        if (valid) {
          const data = {
            name: loginForm.username,
            password: loginForm.password,
          };
          userServices.login(data)
            .then((res) => {
              if(res.status === 200) {
                console.log(res.permission);
                sessionStorage.setItem('type',res.permission)
                setUserToken("token", res.token);
                proxy.$message({
                  message: "登陆成功",
                  type: "success",
                });
                getUserData()
                router.replace("/");
              } else {
                proxy.$message({
                  message: res.data,
                  type: "error",
                });
              }
              
            })
            .catch((err) => {
              console.log(err);
              return false;
            });
        } else {
          return false;
        }
      });
    };
    const getUserData = () => {
      userServices
        .current()
        .then((res) => {
          store.commit("get_data",(res.data))
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    };

    return {
      loginForm,
      loginFormRules,
      onSubmit,
      validatePassword,
      formRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.mainer {
  position: relative;
  height: calc(100vh);
  width: 100%;
  background: url('../../assets/onload/start.jpg') no-repeat;
  background-size: cover;
  .el-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    transform: translate(-50%, -50%);
  }
  .el-button {
    width: 100%;
    background-image: linear-gradient(to right, #48c6ef 0%, #6f86d6 100%);
    color: white;
    border: none;
  }
  
}
</style>

