import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = {
    avatar:
      'https://s1-imfile.feishucdn.com/static-resource/v1/v2_940c590d-556c-4adc-8a4b-f60da49b7d7g~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp',
    email: '',
    id: 0,
    job: '',
    name: '',
    nickname: 'David',
    openId: '',
    token: 'token',
    permissions: [
      {
        redirect: '/main',
        index: true
      },
      {
        path: 'main',
        name: 'Main',
        component: '/Home', //这里是pages下组件的路径
        isMenu: true,
        meta: {
          title: 'Main',
          needLogin: true
        }
      }
    ]
  }
  const loginServe = () => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('permission', JSON.stringify(data.permissions))
    dispatch({
      type: 'login/changeUserInfoAction',
      payload: data
    })
    navigate('/main')
  }
  return (
    <div>
      <Button onClick={loginServe}>Login</Button>
    </div>
  )
}
