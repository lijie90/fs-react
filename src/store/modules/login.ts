import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
interface UserInfoType {
  avatar?: string
  email?: string
  id?: number
  job?: string
  name?: string
  nickname?: string
  openId?: string
  permissions?: Array<Record<string, any>>
  token?: string
}
export interface LoginState {
  userInfo: UserInfoType
}

// 这里统一加载缓存的一些数据
export const loadLocalLogin = createAsyncThunk(
  'login/loadLocalLogin',
  (_, { dispatch }) => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      dispatch(changeUserInfoAction(JSON.parse(userInfo)))
    }
  }
)
const initialState: LoginState = {
  userInfo: {}
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeUserInfoAction(state, { payload }) {
      // 把数据存到redux里面，有点类似vuex
      state.userInfo = payload
      localStorage.setItem('userInfo', JSON.stringify(payload))
    }
  }
})

export const { changeUserInfoAction } = loginSlice.actions

export default loginSlice.reducer
