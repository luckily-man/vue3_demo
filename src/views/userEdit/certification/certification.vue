<template>
  <div class="name-input">
    <el-form :model="form" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="签名">
        <el-input v-model="form.autograph"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const form = reactive({
      name:'',
      phone: '',
      birthday: '',
      email: '',
      address: '',
      autograph: ''
    })
    const radio = ref('1')

    return {
      form,
      radio
    }
  },
})
</script>

<style lang="scss" scoped>
.name-input {
  width: 300px;
}
</style>
