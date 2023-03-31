import { createSlice } from '@reduxjs/toolkit'

interface MessageState {
  historyMessage: any[] //历史消息，用来筛选出状态威未发送成功的消息
}
const initialState: MessageState = {
  historyMessage: []
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setHistoryMessage(state, { payload }) {
      state.historyMessage = payload
    }
  }
})

export const { setHistoryMessage } = messageSlice.actions

export default messageSlice.reducer
