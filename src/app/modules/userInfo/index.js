import Loadable from 'react-loadable'
import ModuleLoading from 'src/sdk/components/ModuleLoading/index.js'

class UserInfoModule {
  views = [
    {
      path: '/userInfo',
      component: Loadable({
        loader: () => import('./views/UserInfoDetail' /* webpackChunkName: "UserInfoDetail" */),
        loading: ModuleLoading
      })
    }
  ]
}

const userInfoModule = new UserInfoModule()

const app = window.getApp()
app.registerModule(userInfoModule).then(() => {
  app.navigateTo('/userInfo')
})
app.baseLayout.addNav({path: '/userInfo', text: '用户信息'})
