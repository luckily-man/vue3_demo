<!--
 * @Author: liuzhongkun
 * @Date: 2021-03-25 10:44:00
 * @LastEditors: liuzhongkun
 * @LastEditTime: 2021-04-22 10:07:07
-->
<template>
  <el-aside width="auto">
    <el-menu 
      class="el-menu-vertical-demo" 
      router
      :collapse="isCollapse" 
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened>
      <template v-for="(item, index) in state.asideMenu" :key="item.path">
        <el-submenu :index="item.path"  v-if="item.children && item.children.length !== 0">
          <template #title><i :class="item.icon"></i><span>{{item.title}}</span></template>
          <template v-for="(row, index) in item.children" :key="row.path">
            <el-menu-item-group v-if="row.children.length !== 0">
              <el-submenu :index="soun.path" v-for="soun in row.children" :key="soun.path">
                <template #title><i :class="row.icon"></i><span>{{row.title}}</span></template>
                <el-menu-item :index="soun.path"><i :class="soun.icon"></i><span>{{soun.title}}</span></el-menu-item>
              </el-submenu>
            </el-menu-item-group>
            <el-menu-item :index="row.path" v-else>
                <i :class="row.icon"></i><span>{{row.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <i :class="item.icon"></i><span>{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import menuServices from '@servers/menu'
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    let isCollapse = (false)
    const store = useStore()
    isCollapse = computed(() =>store.state.isCollapse.isCollapse)
    const state = reactive({
      asideMenu:[
      {
        path: '/home',
        icon:'el-icon-s-home',
        title: '首页',
      },
    ]
    })

    onMounted(() => {
      getMenu()
    })

    // 获取菜单接口
    const getMenu = () => {
      const data ={
        role:sessionStorage.getItem('type')
      }
      menuServices.getAllMenu(data).then((res) => {
        state.asideMenu.push(...res.data)
      }).catch((err) => {
        
      });
    }

    return {
      state,
      isCollapse
      
    }
  },
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-aside {
  background-color: #545c64;
  color: #333;
  .el-menu {
    border-right: none !important;
    .el-submenu{
      padding: 0 !important;
    }
  }
  ::v-deep .el-menu-item-group__title {
    padding: 0 !important;
  }
}
</style>
