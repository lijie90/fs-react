import { configureStore } from '@reduxjs/toolkit'
import { loadLocalLogin } from './modules/login'
//批量导入
const modulesFiles = import.meta.glob('./modules/*.ts', {
  import: 'default',
  eager: true
})
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  //得到单文件的名，如login.ts => login
  const moduleName = modulePath
    .replace(/\.ts$/, '')
    .replace(/\.\/modules\//, '')
  modules[moduleName as string] = modulesFiles[modulePath]
  return modules
}, {} as { [key: string]: any })
// 创建一个 Redux
const store = configureStore({
  reducer: {
    ...modules
  },
  devTools: import.meta.env.MODE !== 'production'
})

// 统一在这里初始化一些缓存的数据
export function setupStore() {
  // 这里是缓存数据，程序加载会先调用这个
  store.dispatch(loadLocalLogin())
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
