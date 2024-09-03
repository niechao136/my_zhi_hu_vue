
export type Info = {
  id?: number
  username?: string
  nickname?: string
}
export type Register = {
  username?: string
  password?: string
  retry?: string
  role?: number
  nickname?: string
  email?: string
  phone?: string
}
export type Login = {
  username?: string
  password?: string
}
