<template>
  
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :collapse="home.navBool"
        router
    >
    <div v-if="!home.navBool">
      <div class="logo">
        <router-link to="./">
          <!-- <el-image src="../assets/logo.png"></el-image> -->
          <!-- <el-image src=""></el-image> -->
          <img src="../assets/logo.png" alt="">
        </router-link>
      </div>
      
      <div class="name">
        <p><router-link to="./">TextCreateVideo</router-link></p>
      </div>
      <hr>
    </div>

      <template v-for="item in router.options.routes[1].children" :key="item.path">

        <!-- 带下拉的导航 -->
        <el-sub-menu :index="item.path" v-if="item.children">
        <template #title>
          <el-icon><component :is="item.meta?.icon"/></el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <!-- <el-menu-item-group v-for="i in item.children" :key="i.path">
          
          <el-menu-item :index="i.path"><el-icon><component :is="item.meta?.icon"/></el-icon>{{ i.meta?.title }}</el-menu-item>
        </el-menu-item-group> -->
          <el-menu-item :index="i.path" v-for="i in item.children">
            <el-icon><component :is="i.meta?.icon"/></el-icon>
            {{ i.meta?.title }}</el-menu-item>
        
      </el-sub-menu>

      <!-- 不带下拉的导航 -->
      <el-menu-item :index="item.path" v-else>
        <el-icon><component :is="item.meta?.icon"/></el-icon>
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>

     
      </template>

      
    </el-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useStore from '../store'
const { home } = useStore()
const router = useRouter()

</script>

<style scoped lang="scss">
.el-menu{
  background: linear-gradient(to bottom, rgb(42, 51, 53), rgb(22, 27, 28));
}
.el-menu-vertical-demo{
  height: 100%;
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 0 0;
}
.name{
  display: flex;
  justify-content: center;
  align-items: center;
  p{
    color: white;
  }
  a{
    color: white;
  }
}
/*.el-image{*/
/*  top: 10px;*/
/*}*/

</style>