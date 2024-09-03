import { User } from '@/type'

export type Add = {
  title?: string
  content?: string
}
export type Info = {
  title?: string
  content?: string
  id?: number
  owner_id?: number
  answers?: number[]
  watching?: number[]
  create_at?: string
  update_at?: string
  user?: User.Info
}
