import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <h1>FS React project template</h1>
      <h1>react+vite+redux+动态路由</h1>
      <Outlet />
    </div>
  )
}
