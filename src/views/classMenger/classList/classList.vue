<template>
  <div class="header">
    <el-input v-model="input" 
      placeholder="请输入内容" 
      suffix-icon="el-icon-search" 
      class="w-400" 
      @keyup.enter="selCourse" 
      @blur="selCourse">
      <template #prepend>
        <el-select v-model="select" placeholder="请选择" class="w-120">
          <el-option label="课程名称" value="courseTitle"></el-option>
          <el-option label="授课教师" value="teacher"></el-option>
          <el-option label="上课地点" value="classroom"></el-option>
          <el-option label="所属院系" value="college"></el-option>
        </el-select>
      </template>
    </el-input>
    <el-button type="primary" v-if="type !== 'user'" @click="addCourse">添加课程</el-button>
  </div>
  <el-table :data="tableData" stripe style="width: 100%" class="m-t-15">
    <el-table-column prop="courseTitle" label="课程名称" ></el-table-column>
    <el-table-column prop="teacher" label="授课教师"></el-table-column>
    <el-table-column prop="classroom" label="上课地点"></el-table-column>
    <el-table-column prop="college" label="所属院系"></el-table-column>
    <el-table-column prop="note" label="课程备注"></el-table-column>
    <el-table-column label="操作" v-if="type !== 'user'">
      <template #default="props">
        <el-button type="primary" icon="el-icon-edit" circle @click="editCourse(props.row)" 
          :disabled ="type == 'superAdmin' || props.row.teacher == form.teacher ? false : true">
        </el-button>
        <el-popconfirm confirmButtonText='确认' cancelButtonText='取消' icon="el-icon-info" iconColor="red" 
          title="确定删除此课程信息？" @confirm= "delCourse(props.row)">
          <template #reference>
            <el-button type="danger" icon="el-icon-delete" circle  
              :disabled ="type == 'superAdmin' || props.row.teacher == form.teacher ? false : true">
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div class="block f-r " v-if="tableData.length">
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
  <!-- 添加课程对话框 -->
  <el-dialog v-model="dialogVisible" width="30%" :title="sort === 'add' ? '添加课程' : '修改课程'" :before-close="handleClose">{{form}}
    <el-form :model="form" ref="formRef"  label-width="80px" :rules="rules">
      <el-form-item label="课程名称" prop="courseTitle">
        <el-input v-model="form.courseTitle" autocomplete="off" class="w-350"></el-input>
      </el-form-item>
      <el-form-item label="所属院系" prop="college">
        <el-input v-model="form.college" autocomplete="off" class="w-350"></el-input>
      </el-form-item>
      <el-form-item label="授课教师" prop="teacher">
        <el-input v-model="form.teacher" autocomplete="off" class="w-350" :disabled="type == 'superAdmin'? false: true"></el-input>
      </el-form-item>
      <el-form-item label="上课地点" prop="classroom">
        <el-input v-model="form.classroom" autocomplete="off" class="w-350" placeholder="样式为:某某教学楼+某某教师，如张衡楼101"></el-input>
      </el-form-item>
      <el-form-item label="课程补充" prop="note">
        <el-input v-model="form.note" autocomplete="off" class="w-350" placeholder="样式为:[x-xx周][x-x节]，如[1-22周][1-2节]"></el-input>
      </el-form-item>
      <el-form-item label="是否必修" prop="isPublic">
        <el-switch v-model="form.isPublic" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelCourse">取 消</el-button>
        <el-button type="primary" @click="submitCourse">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import courseServices from '@servers/course'
import userServices from "@servers/user"
import { nextTick, getCurrentInstance, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'

export default defineComponent ({
  setup() {
    const { proxy } = getCurrentInstance();
    const state = reactive({
      tableData: [],
      rules:{
        courseTitle: [
          { required: true, message: '请输入课程名称', trigger: "blur" }
        ],
        college: [
          { required: true, message: '请输入所属院系', trigger: "blur" }
        ],
        teacher: [
          { required: true, message: '请输入授课教师', trigger: "blur" }
        ],
        classroom: [
          { required: true, message: '请输入上课地点', trigger: "blur" }
        ]
      },
      params: {
        pageSize: '10',
        currentPage: '',
        role:sessionStorage.getItem('type')
      },
      form:{
        courseTitle: '',
        college:'',
        teacher:'',
        classroom:'',
        note:'',
        isPublic:true
      }
    })
    const total = ref(0)
    const dialogVisible = ref(false)
    const formRef = ref(null)
    const select = ref('')
    const input = ref('')
    const sort= ref('add')

    onMounted(()=> {
      getUserData()
      allCourse()
      pageOpton(state.params)
      
    })
    // 获取个人信息
    const getUserData = () => {
      userServices.current().then((res) => {
        state.form.teacher = res.data.name
      }).catch((err) => {
        console.log(err)
        return false
      });
    };
    // 获取课程
    const allCourse = (data) => {
      courseServices.selCourse(data).then((res) => {
        if(res.status == 200) {
          state.tableData = res.data
          total.value = res.data.length
        }else {
          proxy.$message({
            message: "未查询到有关数据",
            type: "error",
          });
          select.value = ''
          input.value = ''
        }
      }).catch((err) => {
        console.log(err)
        return false
      });
    }
    // 添加课程按钮
    const addCourse = () => {
      dialogVisible.value = true
      sort.value = 'add'
    }
    // 添加课程
    const addCourseServes = () => {
      courseServices.addCourse(state.form).then((res) => {
        if(res.status == 200) {
          proxy.$message({
            message: "添加成功",
            type: "success",
          });
          cancelCourse()
          allCourse()
        }else {
          proxy.$message({
            message: "添加失败",
            type: "error",
          });
        }
      }).catch((err) => {
        console.log(err)
        return false
      });
    }
    // 添加课程确定按钮
    const submitCourse =() => {
      formRef.value.validate((valid) => {
        if (valid) {
          if(sort.value == 'add') {
            addCourseServes()
          }else {
            editCourseServes()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
    // 添加/修改课程取消按钮
    const cancelCourse =() => {
      formRef.value.resetFields()
      dialogVisible.value = false
    }
    const handleClose =(done) => {
      cancelCourse()
    }
    // 查询课程
    const selCourse =() => {
      if(input.value) {
        if(select.value) {
          const data = {
            type:select.value,
            message:input.value
          }
          allCourse(data)
        }else {
          proxy.$message({
            message: "请选择查询条件",
            type: "error",
          });
          input.value = ''
        }
      }else {
        allCourse()
        select.value = ''
      }
    }
    // 删除课程
    const delCourse =(val) => {
      const params = {
        id: val._id
      }
      courseServices.delCourse(params).then((res) => {
        if(res.status == 200){
          proxy.$message({
            message: "删除成功",
            type: "success",
          });
          allCourse()
        }else{
          proxy.$message({
            message: "删除失败！",
            type: "error",
          });
        }
      }).catch((err) => {
        console.log(err)
        return false
      });
    }
    // 修改操作按钮
    const editCourse =(val) => {
      sort.value = 'edit'
      nextTick(() => {
        state.form = JSON.parse(JSON.stringify(val))
      });
      dialogVisible.value = true
    }
    // 修改课程
    const editCourseServes = () => {
      courseServices.updatCourse(state.form).then((res) => {
        if(res.status == 200) {
          proxy.$message({
            message: "修改成功",
            type: "success",
          });
          cancelCourse()
          allCourse()
        }else {
          proxy.$message({
            message: "添加失败",
            type: "error",
          });
        }
      }).catch((err) => {
        console.log(err)
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
    // 分页
    const pageOpton =(data) => {
      courseServices.pageOption(data).then((res) => {
        if(res.status == 200) {
          state.tableData = res.data
        }
      }).catch((err) => {
        return false
      });
    }

    return {
      input,
      currentPage4 : ref(4),
      type:sessionStorage.getItem('type'),
      ...toRefs(state),
      dialogVisible,
      formRef,
      select,
      input,
      sort,
      allCourse,
      addCourse,
      submitCourse,
      handleClose,
      cancelCourse,
      selCourse,
      delCourse,
      editCourse,
      handleSizeChange,
      handleCurrentChange,
      total
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  padding: 0 30px 0 10px;
  display: flex;
  justify-content: space-between;
}
</style>