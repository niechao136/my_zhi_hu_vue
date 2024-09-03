import { ref } from 'vue'
import { defineStore } from 'pinia'
import { post } from '@/api'
import { Result, User } from '@/type'

export const useUser
  = defineStore('user', () => {

  const owner = ref<User.Info>({})

  const getOwner = async () => {
    const res = await post<Result.Msg<User.Info>>({
      url: 'user/info',
    })
    owner.value = res?.data?.data ?? {}
  }

  return {
    owner,
    getOwner,
  }
})
