import { Spin } from 'antd'
import { lazy, ReactNode, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

export type RouterProps = {
  path?: string
  name?: string
  icon?: React.ReactNode
  children?: RouterProps[]
  index?: boolean
  redirect?: string
  isMenu?: boolean
  component?: string
  meta?: {
    title?: string
    needLogin?: boolean
  }
}
const routes: RouterProps[] = [
  {
    path: '/',
    component: '/Layout',
    children: []
  },
  { path: 'home', component: '/Home' },
  { path: 'login', component: '/Login' },
  { path: '404', component: '/NotFound' },
  { path: '*', component: '/NotFound' }
]

const lazyLoad = (children: ReactNode): ReactNode => {
  return (
    <Suspense fallback={<Spin spinning={true}></Spin>}>{children}</Suspense>
  )
}
//路由守卫
const RequireAuth = (props: { route: any; children: any }) => {
  if (props?.route?.meta?.title) {
    document.title = props.route.meta.title
  }
  const { route } = props
  //白名单设置
  const whiteList = ['login', 'preview', '404']
  const isLogin = localStorage.getItem('token')
  if (whiteList.includes(route.path)) {
    return <>{props.children}</>
  }
  if (!isLogin) {
    return <Navigate to="/login" />
  }
  return <>{props.children}</>
}

//懒加载处理
export const syncRouter = (routes: Array<RouterProps> = []): any => {
  const mRouteTable: RouteObject[] = []
  const comps = import.meta.glob('../pages/**/*.tsx')
  routes?.forEach((route) => {
    const RouteComponent = lazy(
      comps[`../pages${route.component}/index.tsx`] as any
    )
    mRouteTable.push({
      path: route?.path,
      index: route?.index,
      element: lazyLoad(
        <RequireAuth route={route}>
          {route?.index ? (
            <Navigate to={route?.redirect as string} />
          ) : (
            <RouteComponent />
          )}
        </RequireAuth>
      ),
      children: route.children && syncRouter(route.children)
    })
  })
  return mRouteTable
}

export default () => syncRouter(routes)
