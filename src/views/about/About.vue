<!--
 * @Author: liuzhongkun
 * @Date: 2021-03-23 17:02:58
 * @LastEditors: liuzhongkun
 * @LastEditTime: 2021-04-23 09:45:11
-->
<template>
  <div class="mainer">
    <div class="demo-input-suffix f-r ">
      <!-- 搜索框 -->
        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input2" class="input-with-select" @blur="selectStu" @keyup.enter.native="selectStu">
          <template #append>
            <el-select v-model="select" placeholder="请选择">
              <el-option label="姓名" value="1"></el-option>
              <el-option label="学号" value="2"></el-option>
              <el-option label="手机号" value="3"></el-option>
            </el-select>
          </template>
        </el-input>
      <!-- 添加学生按钮 -->
      <el-button type="primary" plain size="small" @click="addStudents">添加学生</el-button>
    </div>
    <!-- 学生列表 -->
    <el-table :data="state.tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="stuId" label="学号" sortable></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="permission" label="权限" v-if="role == 'superAdmin'">
        <template #default="props" >
          <el-select v-model="selectTwo" placeholder="请选择" v-if="props.row._id == flag" @change="selType(props.row)" class="w-130">
            <el-option label="user" value="user"></el-option>
            <el-option label="admin" value="admin"></el-option>
            <el-option label="superAdmin" value="superAdmin"></el-option>
          </el-select>
          <span v-else  class="cp" @dblclick="changeType(props.row)">{{props.row.permission}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" plain size="small">查看</el-button>
          <el-popconfirm 
            confirmButtonText='确认' 
            cancelButtonText='取消' 
            icon="el-icon-info" 
            iconColor="red" 
            title="确定删除此人信息？"
            @confirm= "delStuConfirm(scope.row)"
          >
          <template #reference>
            <el-button type="danger" plain size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block f-r " v-if="state.tableData.length">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!-- 添加学生对话框 -->
    <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="form" ref="formRef" :rules="state.rules" label-width="60px" >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off" class="w-350"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="stuId"> 
          <el-input v-model="form.stuId" autocomplete="off" class="w-350"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" class="w-350" disabled></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="canaleAdd">取 消</el-button>
          <el-button type="primary" @click="submitAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
 
</template>


<script>

import { regExpConfig } from '@utils/regular'
import userServices from '../../servers/user'
import { getCurrentInstance, defineComponent, onMounted, reactive, ref} from "vue";

export default defineComponent({
  setup() {
    const validateStuId = (rule, value, callback) => {
      if(!regExpConfig.singlePwdValidateNum916.test(value)) {
        callback(new Error("学号长度在9~16位数字！"));
      } else{
        callback();
      }
    }
    const state = reactive({
      tableData:[],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: "blur" }
        ],
        stuId: [
          { required: true, validator: validateStuId, trigger: 'blur'}
        ],
      },
      params: {
        pageSize: '10',
        currentPage: '',
        role:sessionStorage.getItem('type')
      }
    })
    const formRef = ref(null)
    const { proxy } = getCurrentInstance();
    const currentPage4 = ref(4)
    const total = ref(0) 
    const dialogVisible = ref(false)
    const input2 = ref('')
    const select = ref('')
    const selectTwo = ref('')
    const flag = ref('')
    const form = reactive({
      name: "",
      password: "123456abc",
      stuId: ""
    })
    onMounted(() => {
      getAllMsg()
      
    })
    // 查询学生
    const selectStu =() => {
      let params = {
        keyword: '',
        data:input2.value,
        role:sessionStorage.getItem('type')
      }
      if (select.value == 1) {
        params.keyword = 'name'
      }else if(select.value == 2) {
        params.keyword = 'stuId'
      }else {
        params.keyword = 'phone'
      }
      if (input2.value) {
        userServices.select(params).then((res) => {
          if(res.status == 200) {
            state.tableData = res.data
          }else {
            proxy.$message({
              message: "未查到数据",
              type: "error",
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }else {
        getAllMsg()
        select.value = ''
      }
    }
    const pageOpton =(data) => {
      userServices.pageOption(data).then((res) => {
        if(res.status == 200) {
          state.tableData = res.data
        }
      }).catch((err) => {
        return false
      });
    }
    const handleSizeChange = (val) => {
      state.params.pageSize = val
      pageOpton(state.params)
    }
    const handleCurrentChange = (val) => {
      state.params.currentPage = val
      pageOpton(state.params)
    }
    // 获取学生列表
    const getAllMsg = () => {
      const data = {
        role : sessionStorage.getItem('type')
      }
      userServices.all(data).then((res) => {
        if(res.status == 200) {
          total.value = res.data.length
          pageOpton(state.params)
          
        }
      }).catch((err) => {
        return false
      });
    }
    const formatter =(row, column) => {
      return row.address;
    }
    // 添加学生事件
    const addStudents =() => {
      dialogVisible.value = true
    }
    // 添加学生确定事件
    const submitAdd =() => {
      formRef.value.validate((valid) => {
        if (valid) {
          userServices.register(form).then((res) => {
            if(res.status == 200) {
              getAllMsg()
              proxy.$message({
                message: "添加学生成功",
                type: "success",
              });
            }else if(res.status == 400) {
              proxy.$message({
                message: "该学号已被注册",
                type: "error",
              });
            } else {
              proxy.$message({
                message: "注册失败",
                type: "error",
              });
            }
          }).catch((err) => {
            return false
          });
          canaleAdd()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    // 添加学生取消事件
    const canaleAdd =() => {
      formRef.value.resetFields();
      dialogVisible.value = false
    }
    // 确认删除
    const delStuConfirm =(e) => {
      const data = {id:e._id}
      userServices.delOne(data).then((res) => {
        if (res.status == 200) {
          proxy.$message({
            message: "删除成功",
            type: "success",
          });
          getAllMsg()
        }else {
          proxy.$message({
            message: "删除失败",
            type: "error",
          });
        }
      }).catch((err) => {
        return false
      });
    }
    // 修改权限
    const selType =(val) => {
      console.log(val._id)
      const data = {
        id:val._id,
        permission:selectTwo.value
      }
      userServices.editPer(data).then((res) => {
        console.log(res)
        if(res.status == 200) {
          proxy.$message({
            message: "修改成功",
            type: "success",
          });
          getAllMsg()
        }
      }).catch((err) => {
        console.log(err);
        return err
      })
      flag.value = selectTwo.value
    }
    const changeType =(e) => {
      flag.value = e._id
      selectTwo.value = e.permission
    }
    const handleClose =(done) => {
      canaleAdd()
    }
    

   
    return {
      role: ref(sessionStorage.getItem('type')),
      input2,
      select,
      selectTwo,
      flag,
      dialogVisible,
      currentPage4,
      state,
      total,
      form,
      formRef,
      selectStu,
      handleSizeChange,
      handleCurrentChange,
      formatter,
      addStudents,
      canaleAdd,
      submitAdd,
      selType,
      changeType,
      delStuConfirm,
      handleClose

      
    }
   
  }
})
</script>

<style lang="scss" scoped>
.demo-input-suffix {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  .el-input {
    width: 400px;
    .el-select{
      width: 120px;
    }
  }
}

</style>