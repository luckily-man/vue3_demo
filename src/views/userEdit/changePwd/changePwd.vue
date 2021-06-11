<template>
  <div class="mainer">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone">
        <el-input type="phone" v-model="ruleForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="yzm">
        <el-input type="phone" v-model="ruleForm.yzm" autocomplete="off" class="width-200 m-r-15"></el-input>
        <el-button type="primary" @click="getCountdown">
          <span>{{countdown}}</span>
        </el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCurrentInstance, defineComponent, reactive, ref, unref } from 'vue'
import { checkStrong, pwdLength } from "@utils/myUtils";
import { regExpConfig } from '@utils/regular'
import userServices from "@servers/user";
 
export default defineComponent({
  setup() {
    const ruleFormRef = ref(null)
    const countdown = ref('发送验证码')
    const ruleForm = reactive({
      phone: '',
      yzm: '',
      password: '',
      checkPassword: ''
    })
    let inde = 60
    const { proxy } = getCurrentInstance();
    const validatePhone = (rule, value, callback) => {
      if(!regExpConfig.regMobile.test(value)) {
        callback(new Error("请输入合法手机号"));
      } else{
        callback();
      }
    }
    const validateYzm = (rule, value, callback) => {
      let countdown = sessionStorage.getItem('countdown') 
        if(value !== countdown) {
          callback(new Error("验证码错误"))
        } else {
          callback();
        }
      
    }
    const validatePassword = (rule, value, callback) => {
      if (pwdLength(value) == null) {
        callback(new Error("密码不能为空"));
      } else if (checkStrong(value) == 1) {
        callback(new Error("密码必须包含、数组字母、特殊字符中的两种"));
      } else if(pwdLength(value) !== true) {
        callback(new Error("密码长度必须在3~18位"));
      }else {
        callback();
      }
    };
    let validateConfirmPassword = (rule, value, callback) => {
      if (pwdLength(value) == null) {
          callback(new Error('请输入新密码'));
      } else if (value !== ruleForm.password) {
          callback(new Error('两次密码输入不一致'));
      }else if (checkStrong(value) == 1) {
        callback(new Error('密码不符合要求')) 
      }else {
        callback();
      }
    }
    const rules = reactive({
      phone: [
        { required: true, validator: validatePhone, trigger: "blur" }
      ],
      yzm: [
        { required: true, validator: validateYzm, trigger: 'blur'}
      ],
      password: [
        { required: true, validator: validatePassword, trigger: "blur" }
      ],
      checkPassword: [
        { required: true, validator: validateConfirmPassword, trigger: 'blur' }
      ]
    })
    const getCountdown = () => {
      const data = {
        phone: ruleForm.phone
      }
      userServices.changePhone(data).then((res) => {
        if(res.status == 200) {
          sessionStorage.setItem('countdown',res.data)
          
          let timer = setInterval(() => {
          if(inde !== 0) {
            inde--;
            countdown.value = `${inde}秒后重新发送`
          } else {
            countdown.value = '发送验证码'
            clearInterval(timer)
            sessionStorage.removeItem('countdown')
          }
        }, 1000);
        }
      }).catch((err) => {
        console.log(err);
      });
      
    }
    const submitForm =() => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          let data = {
            password: ruleForm.password
          }
          userServices.editpwd(data).then((res) => {
            if(res.status === 200) {
              proxy.$message({
                message: "密码更新成功",
                type: "success",
              });
              sessionStorage.removeItem('countdown')
              resetForm()
              inde = 0
              countdown.value = '发送验证码'
            }
          }).catch((err) => {
            console.log(err)
            return false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    const resetForm =() => {
      ruleFormRef.value.resetFields();
    }
    
    return{
      countdown,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      resetForm,
      getCountdown
    }
  },
})
</script>

<style lang="scss" scoped>
.el-form {
  border: 1px solid #ccc;
  width: 500px;
  height: 300px;
}

</style>
