<script setup lang="ts">
import Delta from 'quill-delta'
import { QuillEditor } from '@vueup/vue-quill'
import ImageUploader from 'quill-image-uploader'
import { ref } from 'vue'
import { post } from '@/api'

const modules = ref({
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file: File) => {
      console.log(file)
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);

        post({
          url: 'image/upload',
          data: formData,
        }).then((res) => {
          resolve(res?.data?.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
const content = ref<Delta>(new Delta([
  { insert: '请输入' }
]))
</script>

<template>
  <div class="home">
    <quill-editor v-model:content="content" enable :modules="modules" toolbar="full" />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  padding: 32px;
  flex-direction: column;
  color: #2c3e50;;
}
</style>
