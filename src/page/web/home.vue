<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
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
</script>

<template>
  <quill-editor :modules="modules" toolbar="full" />
</template>

<style scoped>

</style>
