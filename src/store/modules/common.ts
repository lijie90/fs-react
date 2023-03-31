import { createSlice } from '@reduxjs/toolkit'

interface CommonState {
  loading: boolean
  messageApi: string | null
}
const initialState: CommonState = {
  loading: false,
  messageApi: null
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload
    },
    setMessageApi(state, { payload }) {
      state.messageApi = payload
    }
  }
})

export const { setLoading, setMessageApi } = commonSlice.actions

export default commonSlice.reducer
