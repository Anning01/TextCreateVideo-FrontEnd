<template>
  <div>
    <el-icon @click="IconRetractLay">
      <CaretLeft v-if="home.navBool"/>
      <CaretRight v-else/>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import {
  CaretLeft, CaretRight,
} from '@element-plus/icons-vue'
import useStore from '../store'
const { home } = useStore()

let IconRetractLay = () => {
  home.SET_NAC_BOOL()
}

</script>

<style lang="scss">
.el-header {
  line-height: 70px;

  .el-icon {
    font-size: 20px;
  }
}
</style>