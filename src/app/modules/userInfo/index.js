import Loadable from 'react-loadable'
import ModuleLoading from 'src/sdk/components/ModuleLoading/index.js'

class UserInfoModule {
  views = [
    {
      path: '/userInfo/:id',
      component: Loadable({
        loader: () => import('./views/UserInfoDetail' /* webpackChunkName: "UserInfoDetail" */),
        loading: ModuleLoading
      })
    }
  ]
}

const userInfoModule = new UserInfoModule()

const app = window.getApp()
app.registerModule(userInfoModule)
// .then(() => {
//   app.navigateTo('/userInfo/1')
// })
app.baseLayout.addNav({path: '/userInfo/12', text: '用户信息'})
