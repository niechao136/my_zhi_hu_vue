<script setup lang="ts">

import { ref, watch, watchEffect, onBeforeMount, toRefs } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import logo from '@/assets/image/logo.svg'
import { Avatar, BellFilled, Search } from '@element-plus/icons-vue'
import { post } from '@/api'
import { useLoading, useMsg } from '@/hook'
import { useToken, useUser } from '@/store'
import RichTextEditor from '@/components/RichTextEditor.vue'

const { currentRoute, push } = useRouter()
const { startLoading, stopLoading } = useLoading()
const { successMsg, errorMsg } = useMsg()
const { initToken, clearToken } = useToken()
const { getOwner } = useUser()
const { owner } = toRefs(useUser())

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
    default:
      index.value = ''
      break
  }
}, { immediate: true })

const show_ask = ref(false)
const question_title = ref('')
const question_content = ref('')
const allow_ask = ref(false)
watchEffect(() => {
  allow_ask.value = !!question_title.value.trim() && !!question_content.value.trim()
})
const askQuestion = () => {
  question_title.value = ''
  question_content.value = ''
  show_ask.value = true
}
const submitAsk = async () => {
  startLoading('ask')
  const res = await post({
    url: 'question/add',
    data: {
      title: question_title.value.trim(),
      content: question_content.value.trim(),
    }
  })
  if (res?.data?.status === 200) {
    show_ask.value = false
    successMsg('新增提问成功')
  } else {
    errorMsg('新增提问失败')
  }
  stopLoading('ask')
}

const show_avatar = ref(false)
const toMyPage = async () => {
  show_avatar.value = false
  await push({ name: 'people', params: { id: owner.value.id } })
}
const logout = async () => {
  startLoading('logout')
  const res = await post({
    url: 'auth/logout',
  })
  if (res?.data?.status === 200) {
    clearToken()
    await push('/login')
  }
  stopLoading('logout')
  show_avatar.value = false
}

onBeforeMount(async () => {
  initToken()
  startLoading('web')
  await getOwner()
  stopLoading('web')
})
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
          <el-button type="primary" @click="askQuestion">提问</el-button>
          <el-dialog v-model="show_ask" :title="'新增提问'">
            <div class="ask-content">
              <el-input
                v-model="question_title"
                :placeholder="'请输入您的问题'"
              />
              <rich-text-editor
                v-model="question_content"
                :placeholder="'请输入您的问题描述'"
              />
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button type="primary" :disabled="!allow_ask" @click="submitAsk">提交</el-button>
              </div>
            </template>
          </el-dialog>
          <el-popover trigger="click" placement="bottom">
            <template #reference>
              <el-button plain link :icon="BellFilled"/>
            </template>
            <div class="notify"></div>
          </el-popover>
          <el-popover v-model:visible="show_avatar" trigger="click" placement="bottom">
            <template #reference>
              <el-button plain link :icon="Avatar"/>
            </template>
            <div class="avatar">
              <el-button plain link @click="toMyPage">我的主页</el-button>
              <el-button plain link @click="logout">登出</el-button>
            </div>
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
      padding: 0 128px;
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
.avatar {
  display: flex;
  flex-direction: column;
  padding: 12px 20px;
  align-items: flex-start;
  gap: 24px;
  .el-button + .el-button {
    margin-left: 0;
  }
}
.ask-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
