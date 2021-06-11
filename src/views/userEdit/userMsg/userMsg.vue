<template>
  <div class="mainer">
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="用户信息">用户信息</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const  tabPosition =ref('left')

    return {
      tabPosition,
    }
  },
})
</script>

<style lang="scss" scoped>
.mainer {
  display: flex;
  // justify-content: center;
  align-items: center;
}
</style>
