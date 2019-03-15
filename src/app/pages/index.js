import Loadable from 'react-loadable'
import ModuleLoading from 'src/sdk/components/ModuleLoading/index.js'

export const _404 = {
  path: '/404',
  component: Loadable({
    loader: () => import('./404.js' /* webpackChunkName: "404" */),
    loading: ModuleLoading
  })
}
