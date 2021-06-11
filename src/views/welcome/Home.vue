<!--
 * @Author: liuzhongkun
 * @Date: 2021-03-23 17:02:58
 * @LastEditors: liuzhongkun
 * @LastEditTime: 2021-05-08 17:57:53
-->
<template>
  <!-- <el-row :gutter="20">
    <el-col :span="14">
      <div class="grid-content bg-purple">
        <div class="block">
          <el-carousel trigger="click" height="300px">
            <el-carousel-item v-for="item in carouselList" :key="item">
              <img :src="item.src" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </el-col>

    <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
  </el-row> -->

  <!-- <el-row :gutter="20">
    <el-col :xs="11" :sm="6" :md="4" :lg="6" :xl="6">
      <div class="grid-content bg-purple">
        <el-card shadow="always"> 总是显示 </el-card>
      </div>
    </el-col>
    <el-col :xs="11" :sm="6" :md="8" :lg="6" :xl="6">
      <div class="grid-content bg-purple">
        <el-card shadow="always"> 总是显示 </el-card>
      </div></el-col>
    <el-col :xs="11" :sm="6" :md="8" :lg="6" :xl="6">
      <div class="grid-content bg-purple">
        <el-card shadow="hover"> 总是显示 </el-card>
      </div></el-col>
    <el-col :xs="11" :sm="6" :md="4" :lg="6" :xl="6">
      <div class="grid-content bg-purple">
        <el-card shadow="hover"> 总是显示 </el-card>
      </div></el-col>
  </el-row> -->

  <div class="ball-box">
    <div class="ball">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
      <div class="line4"></div>
      <div class="line5"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const carouselList = reactive([
      { src: require("../../assets/onload/1.png") },
      { src: require("../../assets/onload/2.jpg") },
      { src: require("../../assets/onload/3.jpg") },
      { src: require("../../assets/onload/4.jpg") },
      { src: require("../../assets/onload/5.jpg") },
      { src: require("../../assets/onload/6.jpg") },
    ]);
    return {
      carouselList,
    };
  },
});
</script>


<style lang="scss" scoped>
 body{
        background-color: #000000;
    }
.tagBall {
  width: 800px;
  height: 800px;
  margin: 50px auto;
  position: relative;
}
.tag {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  color: #000;
  text-decoration: none;
  font-size: 15px;
  font-family: "微软雅黑";
  font-weight: bold;
}
.tag:hover {
  border: 1px solid #666;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  // min-height: 36px;
  // height: 300px;
  height: 300px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-carousel__item {
  img {
    height: 100%;
    width: 100%;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.ball-box {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -150px 0 0 -150px;
  -webkit-perspective-origin: 50% 50%;
  -moz-perspective-origin: 50% 50%;
  -ms-perspective-origin: 50% 50%;
  -o-perspective-origin: 50% 50%;
  perspective-origin: 50% 50%;
  -webkit-perspective: 3000px;
  -moz-perspective: 3000px;
  -ms-perspective: 3000px;
  -o-perspective: 3000px;
  perspective: 3000px;
}
@-webkit-keyframes rotate3d {
  0% {
    -webkit-transform: rotateZ(-30deg) rotateY(0deg);
    -moz-transform: rotateZ(-30deg) rotateY(0deg);
    -ms-transform: rotateZ(-30deg) rotateY(0deg);
    -o-transform: rotateZ(-30deg) rotateY(0deg);
    transform: rotateZ(-30deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-30deg) rotateY(360deg);
    -moz-transform: rotateZ(-30deg) rotateY(360deg);
    -ms-transform: rotateZ(-30deg) rotateY(360deg);
    -o-transform: rotateZ(-30deg) rotateY(360deg);
    transform: rotateZ(-30deg) rotateY(360deg);
  }
}
@-moz-keyframes rotate3d {
  0% {
    -webkit-transform: rotateZ(-30deg) rotateY(0deg);
    -moz-transform: rotateZ(-30deg) rotateY(0deg);
    -ms-transform: rotateZ(-30deg) rotateY(0deg);
    -o-transform: rotateZ(-30deg) rotateY(0deg);
    transform: rotateZ(-30deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-30deg) rotateY(360deg);
    -moz-transform: rotateZ(-30deg) rotateY(360deg);
    -ms-transform: rotateZ(-30deg) rotateY(360deg);
    -o-transform: rotateZ(-30deg) rotateY(360deg);
    transform: rotateZ(-30deg) rotateY(360deg);
  }
}
@-ms-keyframes rotate3d {
  0% {
    -webkit-transform: rotateZ(-30deg) rotateY(0deg);
    -moz-transform: rotateZ(-30deg) rotateY(0deg);
    -ms-transform: rotateZ(-30deg) rotateY(0deg);
    -o-transform: rotateZ(-30deg) rotateY(0deg);
    transform: rotateZ(-30deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-30deg) rotateY(360deg);
    -moz-transform: rotateZ(-30deg) rotateY(360deg);
    -ms-transform: rotateZ(-30deg) rotateY(360deg);
    -o-transform: rotateZ(-30deg) rotateY(360deg);
    transform: rotateZ(-30deg) rotateY(360deg);
  }
}
@-o-keyframes rotate3d {
  0% {
    -webkit-transform: rotateZ(-30deg) rotateY(0deg);
    -moz-transform: rotateZ(-30deg) rotateY(0deg);
    -ms-transform: rotateZ(-30deg) rotateY(0deg);
    -o-transform: rotateZ(-30deg) rotateY(0deg);
    transform: rotateZ(-30deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-30deg) rotateY(360deg);
    -moz-transform: rotateZ(-30deg) rotateY(360deg);
    -ms-transform: rotateZ(-30deg) rotateY(360deg);
    -o-transform: rotateZ(-30deg) rotateY(360deg);
    transform: rotateZ(-30deg) rotateY(360deg);
  }
}
@keyframes rotate3d {
  0% {
    -webkit-transform: rotateZ(-30deg) rotateY(0deg);
    -moz-transform: rotateZ(-30deg) rotateY(0deg);
    -ms-transform: rotateZ(-30deg) rotateY(0deg);
    -o-transform: rotateZ(-30deg) rotateY(0deg);
    transform: rotateZ(-30deg) rotateY(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-30deg) rotateY(360deg);
    -moz-transform: rotateZ(-30deg) rotateY(360deg);
    -ms-transform: rotateZ(-30deg) rotateY(360deg);
    -o-transform: rotateZ(-30deg) rotateY(360deg);
    transform: rotateZ(-30deg) rotateY(360deg);
  }
}
.ball {
  height: 100%;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-animation: rotate3d 30s linear infinite;
  -moz-animation: rotate3d 30s linear infinite;
  -ms-animation: rotate3d 30s linear infinite;
  -o-animation: rotate3d 30s linear infinite;
  animation: rotate3d 30s linear infinite;
}
.ball:after {
  display: block;
  content: "";
  width: 1px;
  height: 500px;
  background-color: #ff0;
  position: absolute;
  top: -100px;
  left: 150px;
}
.ball > div {
  border: 1px #ffffff solid;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.ball .line1 {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.ball .line2 {
  -webkit-transform: rotateY(36deg);
  -moz-transform: rotateY(36deg);
  -ms-transform: rotateY(36deg);
  -o-transform: rotateY(36deg);
  transform: rotateY(36deg);
}
.ball .line3 {
  -webkit-transform: rotateY(72deg);
  -moz-transform: rotateY(72deg);
  -ms-transform: rotateY(72deg);
  -o-transform: rotateY(72deg);
  transform: rotateY(72deg);
}
.ball .line4 {
  -webkit-transform: rotateY(108deg);
  -moz-transform: rotateY(108deg);
  -ms-transform: rotateY(108deg);
  -o-transform: rotateY(108deg);
  transform: rotateY(108deg);
}
.ball .line1 {
  -webkit-transform: rotateY(144deg);
  -moz-transform: rotateY(144deg);
  -ms-transform: rotateY(144deg);
  -o-transform: rotateY(144deg);
  transform: rotateY(144deg);
}
</style>
