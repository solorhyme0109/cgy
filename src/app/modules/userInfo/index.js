import Loadable from 'react-loadable'
import ModuleLoading from 'src/sdk/components/ModuleLoading/index.js'

class UserInfoModule {
  namespace = 'userInfo'
  views = [
    {
      path: '/userInfo/:id',
      component: Loadable({
        loader: () => import('./views/UserInfoDetail' /* webpackChunkName: "UserInfoDetail" */),
        loading: ModuleLoading
      })
    }
  ]
  model = {
    username: '张三',
    age: '100'
  }
}

const userInfoModule = new UserInfoModule()

const app = window.getApp()
app.registerModule(userInfoModule)
// .then(() => {
//   app.navigateTo('/userInfo/1')
// })
app.baseLayout.addNav({path: '/userInfo/12', text: '用户信息'})
