<template>

  <div class="common-layout">
    <el-container>
<!--      <el-aside width="auto">-->
      <el-aside width="auto">
        <Menu/>
      </el-aside>

      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
          <RouterView/>
        </el-main>
        <el-footer>
          <Footer/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.el-aside {
  background-color: palegreen;
  height: 100%;
}

// .el-header {
   //background-color: #f8f8f8;
// }

// .el-main {
  // background-color: sienna;
// }
// .el-footer {
  // background-color: salmon;
// }
.el-aside, .el-container, .common-layout, #app, body, html {
  height: 100%;
}
</style>
<script lang="ts" setup>
import Menu from "@/components/menu.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>