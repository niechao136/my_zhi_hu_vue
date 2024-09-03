<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/api'
import { useCrypto, useLoading, useMsg, useTip } from '@/hook'
import { User } from '@/type'

const { push } = useRouter()
const { md5Encrypt } = useCrypto()
const { startLoading, stopLoading } = useLoading()
const { errorMsg } = useMsg()
const { showTip } = useTip()

const model = ref<User.Register>({
  username: '',
  password: '',
  retry: '',
  nickname: '',
  phone: '',
  email: '',
})
const form = ref<FormInstance>(null as any)
const rules: FormRules<User.Register> = {
  username: [
    { required: true, message: '请输入' }
  ],
  password: [
    { required: true, message: '请输入' }
  ],
  retry: [
    { required: true, message: '请输入' },
    { trigger: 'change', validator: (rule, value, callback) => {
      if (value !== model.value.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }}
  ],
  nickname: [
    { required: true, message: '请输入' }
  ],
}

const submitRegister = async () => {
  if (!form.value) return
  await form.value.validate(async (valid) => {
    if (valid) {
      startLoading('register')
      const res = await post({
        url: 'user/register',
        data: {
          username: model.value.username,
          password: md5Encrypt(model.value?.password ?? ''),
          nickname: model.value.nickname,
          phone: model.value.phone,
          email: model.value.email,
          role: 2,
        }
      })
      if (res?.data?.status === 200) {
        await showTip({
          title: '注册成功',
          msg: '注册成功, 立即登入?',
          confirm_text: '前往登入',
          show_cancel: true,
          confirm: async () => {
            await push('/login')
          }
        })
      } else {
        errorMsg(res?.data?.msg ?? '注册失败')
      }
      stopLoading('register')
    }
  })
}
</script>

<template>
  <div class="register">
    <el-form class="form" ref="form" label-width="auto" :model="model" :rules="rules">
      <el-form-item label="用户名" required prop="username">
        <el-input v-model="model.username" placeholder="用户名" clearable />
      </el-form-item>
      <el-form-item label="密码" required prop="password">
        <el-input type="password" v-model="model.password" placeholder="密码" show-password />
      </el-form-item>
      <el-form-item label="重复密码" required prop="retry">
        <el-input type="password" v-model="model.retry" placeholder="重复密码" show-password />
      </el-form-item>
      <el-form-item label="昵称" required prop="nickname">
        <el-input v-model="model.nickname" placeholder="昵称" clearable />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="model.phone" placeholder="手机" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="model.email" placeholder="邮箱" clearable />
      </el-form-item>
      <div class="btn">
        <el-button type="primary" @click="submitRegister">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.register {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .form {
    width: 480px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    .btn {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
