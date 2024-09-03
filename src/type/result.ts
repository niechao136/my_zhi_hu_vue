
export type Base = {
  status?: number
  success?: string
}
export type Msg<T = string> = Base & {
  msg?: string
  data?: T
}
export type Page<T = string> = Base & {
  page?: number
  data?: T[]
  size?: number
  total?: number
}
