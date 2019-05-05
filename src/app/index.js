import React from 'react'
import ReactDOM from 'react-dom'
import ReactApp from './ReactApp'
import applyPlugins from 'src/sdk/apply_plugins'
import {STORE_KEY_MODULE} from './constants'

class App {

  constructor() {
    global.getApp = () => this
  }

  handleImportModule = (module, namespace) => {
    const _module = {
      namespace,
      render: ({mountNode, basePath, ...rest}) => {
        _module.basePath = basePath
        return module.default({namespace, mountNode, basePath, ...rest})
      }
    }
    global.getApp().store.update(STORE_KEY_MODULE, {[namespace]: _module})
  }

  handleImportModuleFail = (err) => {
    console.log(err)
  }

  importModules = () => {
    import(/* webpackChunkName: "inspect_list", webpackPrefetch: true */'./modules/inspect_list').then((module) => this.handleImportModule(module, 'inspect_list')).catch(this.handleImportModuleFail)
  }

  applyPlugins = (plugins) => {
    applyPlugins(this, plugins)
    this.afterPlugins()
  }

  navigateTo(path) {

  }

  afterPlugins = () => {
    global.getApp().store.inject(STORE_KEY_MODULE, {})

    this.importModules()
  }

  mount(container) {
    ReactDOM.render(<ReactApp />, container)
  }
}

export default new App()
