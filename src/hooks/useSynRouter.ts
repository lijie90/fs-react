import { useEffect, useState } from 'react'
import router, { syncRouter } from '@/router/index'
import { RouteObject } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function useSynRouter() {
  const defaultRoutes = router()
  const userInfo = useSelector((state: any) => state.login.userInfo)
  const [routes, setRoutes] = useState<RouteObject[]>(defaultRoutes)
  const { permissions } = userInfo
  const module = import.meta.glob('../router/*.ts', { eager: true })
  //指定路由下加入子路由
  const addChildrenRoutes = (
    routes: RouteObject[],
    module: Record<string, any>
  ) => {
    const newModule: Record<string, any> = {}
    let newRoutesList: RouteObject[] = []
    Object.keys(module)?.forEach((key) => {
      newModule[key.replace('../router/', '').replace('.ts', '')] = syncRouter(
        module[key].default
      )
    })
    newRoutesList = routes?.map((item) => {
      let newItem: any = item
      if (newModule[item.path as string]) {
        newItem = { ...item, children: item?.children ?? [] }
        newItem.children = newModule[item.path as string]
      }
      return newItem
    })
    return newRoutesList
  }
  useEffect(() => {
    let serverRoutes = syncRouter(permissions)
    serverRoutes = addChildrenRoutes(serverRoutes, module)
    const newRoutes = [...defaultRoutes].map((item) => {
      let newItem = item
      if (item.path === '/') {
        newItem = { ...item, children: item?.children ?? [] }
        newItem.children = serverRoutes
      }
      return newItem
    })
    setRoutes(newRoutes)
  }, [permissions])
  return routes
}
