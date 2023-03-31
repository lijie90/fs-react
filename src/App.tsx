import './App.css'
import { useRoutes } from 'react-router-dom'
import useSynRouter from './hooks/useSynRouter'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import styles from '@/style/app.module.scss'
function App() {
  const routes = useSynRouter()
  const loading = useSelector((state: any) => state.common.loading)
  console.log(import.meta.env)
  return (
    <div className={styles.app_container}>
      <Spin
        spinning={loading}
        delay={500}
        style={{ height: '100%', width: '100%' }}
      >
        {useRoutes(routes)}
      </Spin>
    </div>
  )
}

export default App
