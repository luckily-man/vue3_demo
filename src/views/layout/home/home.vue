<template>

  <div class="container">
    <my-header></my-header>
    <div class="mainer">
        <my-asids ></my-asids>
        <my-main></my-main>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import myHeader from './../header/header'
import myMain from './../main/main'
import myAsids from './../aside/aside'

export default defineComponent({
  components: {
    myHeader,
    myMain,
    myAsids
  },
  setup() {
    
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: calc(100vw);
  height: calc(100vh);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.mainer {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: space-between;
}
</style>
