<script setup lang="ts">
import { Lock, UserFilled } from '@element-plus/icons-vue'
import { FormRules, FormInstance } from 'element-plus'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCrypto, useLocal } from '@/hook'

const { push } = useRouter()
const { aesDecrypt, aesEncrypt, md5Encrypt } = useCrypto()
const { setLocal, getLocal, rmLocal } = useLocal()

const model = ref<User.Login>({
  username: '',
  password: '',
})
const remember = ref(false)
const form = ref<FormInstance>(null)
const rules: FormRules<User.Login> = {
  username: [
    { required: true, message: '请输入' }
  ],
  password: [
    { required: true, message: '请输入' }
  ],
}

const linkTo = () => push('/register')
const submitLogin = async () => {
  if (!form.value) return
  // form.value.resetFields()
  await form.value.validate((valid, fields) => {
    console.log(valid, fields)
    if (valid) {

    }
  })
}

onBeforeMount(() => {
  const local = getLocal('MY_ZHU_HU_LOGIN')

  if (!!local) {
    remember.value = true
    let login: User.Login = null
    try {
      login = JSON.parse(aesDecrypt(local, 'my_zhi_hu_login'))
    } catch (error) {
    }
    model.value.username = login?.username ?? ''
    model.value.password = login?.password ?? ''
  }
})
</script>

<template>
  <div class="login">
    <el-form class="form" :rules="rules" ref="form" :model="model">
      <el-form-item prop="username">
        <el-input :prefix-icon="UserFilled" v-model="model.username" type="text" placeholder="用户名: admin or user" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" v-model="model.password" type="password" placeholder="密码: abc123" show-password />
      </el-form-item>
      <div class="check">
        <el-checkbox v-model="remember">记住密码</el-checkbox>
        <el-button type="text" plain @click="linkTo">注册</el-button>
      </div>
      <div class="btn">
        <el-button type="primary" @click="submitLogin">登入</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.login {
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
    .check {
       display: flex;
       align-items: center;
       justify-content: space-between;
    }
    .btn {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
