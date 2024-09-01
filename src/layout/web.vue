<script setup lang="ts">

import { ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import logo from '@/assets/image/logo.svg'
import { Avatar, BellFilled, Search } from '@element-plus/icons-vue'

const { currentRoute } = useRouter()
const index = ref('')
watch(currentRoute, newRoute => {
  switch (newRoute.fullPath) {
    case '/':
      index.value = 'home'
      break
    case '/watching':
      index.value = 'watching'
      break
    case '/ranking':
      index.value = 'ranking'
      break
  }
}, { immediate: true })
</script>

<template>
  <div class="container">
    <el-scrollbar>
      <div class="header">
        <div class="left">
          <router-link class="logo" :to="'/'">
            <img  :src="logo" alt="" />
          </router-link>
          <el-menu mode="horizontal" :default-active="index" :ellipsis="false">
            <el-menu-item index="watching">
              <router-link :to="'/watching'">关注</router-link>
            </el-menu-item>
            <el-menu-item index="home">
              <router-link :to="'/'">推荐</router-link>
            </el-menu-item>
            <el-menu-item index="ranking">
              <router-link :to="'/ranking'">热榜</router-link>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="right">
          <el-input
            class="search"
            type="text"
            size="large"
            placeholder="请输入关键字"
            :suffix-icon="Search"/>
          <el-button type="primary">提问</el-button>
          <el-popover trigger="click" placement="bottom">
            <template #reference>
              <el-button plain type="text" :icon="BellFilled"/>
            </template>
          </el-popover>
          <el-popover trigger="click" placement="bottom">
            <template #reference>
              <el-button plain type="text" :icon="Avatar"/>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="content">
        <router-view />
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  .el-scrollbar {
    width: 100%;
    .header {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid var(--el-border-color);
      z-index: 999;
      padding: 0 64px;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        gap: 32px;
        align-items: center;
      }
      .right {
        display: flex;
        gap: 32px;
        align-items: center;
        .search {
          height: 32px;
          width: 320px;
        }
      }
      .logo {
        padding: 0;
        height: 60px;
        img {
          height: 60px;
        }
      }
    }
    .content {
      padding-top: 61px;
      min-height: 100vh;
      background-color: #f2f3f5;
    }
  }
}
</style>
