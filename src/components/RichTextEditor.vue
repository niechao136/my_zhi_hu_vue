<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import ImageUploader from 'quill-image-uploader'
import BlotFormatter from 'quill-blot-formatter'
import { ref, watch } from 'vue'
import { post } from '@/api'

defineOptions({
  name: 'RichTextEditor'
})

const prop = defineProps({
  placeholder: {
    type: String,
    default: () => '',
  }
})

const editor = ref<QuillEditor>(null)
const model = defineModel<string>('html')
const content = defineModel<string>('content')
const modules = ref([
  {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      upload: (file: File) => {
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
  },
  {
    name: 'blotFormatter',
    module: BlotFormatter,
  }
])
watch(model, newVal => {
  content.value = editor.value.getText()
  if (newVal === '') {
    editor.value.setHTML('')
  }
})
</script>

<template>
  <div class="rich-text-editor">
    <quill-editor
      ref="editor"
      v-model:content="model"
      enable
      :modules="modules"
      :placeholder="prop.placeholder"
      toolbar="full"
      content-type="html"
    />
  </div>
</template>

<style scoped lang="scss">
.rich-text-editor {
  color: #282828;
}
</style>
