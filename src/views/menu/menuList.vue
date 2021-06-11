<!--
 * @Author: liuzhongkun
 * @Date: 2021-04-22 10:12:40
 * @LastEditors: liuzhongkun
 * @LastEditTime: 2021-04-22 10:12:40
-->
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props" >
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item>
            <el-tag v-for="item in props.row.menu.children" :key="item._id">{{item.title}}</el-tag>
            <el-button class="button-new-tag" size="small" @click="showInput(props.row)">添加菜单</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="菜单ID" prop="_id"></el-table-column>
    <el-table-column label="菜单名称" prop="menu.title"></el-table-column>
    <el-table-column label="菜单图标"><template #default="props"><i :class='props.row.menu.icon'></i></template></el-table-column>
    <el-table-column label="菜单路由" prop="menu.path"></el-table-column>
    <el-table-column label="菜单权限">
      <template #default="props" >
        <el-select v-model="select" placeholder="请选择" v-if="props.row.role !== 'all'&& props.row._id == flag" @change="selRole">
          <el-option label="user" value="user"></el-option>
          <el-option label="admin" value="admin"></el-option>
          <el-option label="superAdmin" value="superAdmin"></el-option>
        </el-select>
        <span v-else>{{props.row.role}}</span>
      </template>      

    </el-table-column>
    <el-table-column label="操作" #default="props">
      <el-button type="primary" size="small" @click="editMenu(props.row)">修改权限</el-button>
    </el-table-column>
  </el-table>
   
  <!-- 添加二级菜单对话框 -->
  <el-dialog title="添加二级菜单" v-model="dialogVisible" width="27%" :before-close="handleClose">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="菜单标题" prop="title">
        <el-input v-model="form.title" class="w-250"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="form.icon" class="w-250" placeholder="请参考element-ui图标"></el-input>
      </el-form-item>
      <el-form-item label="菜单路由" prop="path">
        <el-input v-model="form.path" class="w-250" placeholder="请以/xxx格式"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSecondMenu">确 定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import menuServices from '@servers/menu'
import { getCurrentInstance, defineComponent,onMounted, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const  state = reactive({
      tableData:[{
        menu:{
          path: '/home',
          icon:'el-icon-s-home',
          title: '首页',
        },
        _id: '11111111111111111111111',
        role: 'all'
      }],
      form:{
        title:"",
        icon:"",
        path:"",
        id:""
      },
      menuData:{
        id:"",
        role:""
      }
    }) 
    const dialogVisible = ref(false)
    const flag = ref('')
    const inputValue = ref('')
    const formRef = ref(null)
    const select = ref('')

    onMounted(() => {
      getMenu()
    })

      // 获取菜单接口
    const getMenu = () => {
      const data ={
        role:sessionStorage.getItem('type')
      }
      menuServices.getAllMenu(data).then((res) => {
        state.tableData.push(...res.allData)
      }).catch((err) => {
        return false
      });
    }
    const showInput =(e) =>{
      dialogVisible.value = true
      state.form.id = e._id
    }
    // 添加二级菜单接口
    const addSecondMenu = () => {
      menuServices.addMenuTwo(state.form).then((res) => {
        const result = state.tableData.map(item => {
          if(item._id === res.data._id) {
            item = res.data 
          }
          return item
        })
        state.tableData = result
        proxy.$message({
          message: "添加成功",
          type: "success",
        });
        handleClose()
      }).catch((err) => {
        console.log(err)
        return false
      });
    }
    // 关闭添加二级菜单对话框
    const handleClose =(done) => {
      formRef.value.resetFields();
      dialogVisible.value = false
    }
    // 修改权限按钮
    const editMenu =(e) => {
      flag.value = e._id
      select.value = e.role
      state.menuData.id = e._id
    }
    // 修改权限按钮下拉框
    const selRole =() => {
      state.menuData.role = select.value
      menuServices.editMenu(state.menuData).then((res) => {
        console.log(res);
        if(res.status == 200) {
          proxy.$message({
            message: "修改成功",
            type: "success",
          });
          const result = state.tableData.map(item => {
          if(item._id === res.data._id) {
            item = res.data 
          }
          return item
        })
        state.tableData = result
        }else {
          proxy.$message({
            message: "修改失败",
            type: "success",
          });
        }
        flag.value = select.value
      }).catch((err) => {
        console.log(err);
        return false
      });
    }

    return {
      select,
      dialogVisible,
      inputValue,
      ...toRefs(state),
      formRef,
      flag,
      showInput,
      addSecondMenu,
      handleClose,
      editMenu,
      selRole
      
    }
  },
})
</script>

<style lang="scss" scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
