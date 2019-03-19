import React from 'react'
import ReactDOM from 'react-dom'
import ReactApp from './ReactApp'
import applyPlugins from 'src/sdk/apply_plugins'
import initStore from './init_store'

class App {

  views = []

  constructor() {
    window.getApp = () => this
  }

  insertView = (view, index) => {
    this.views.splice(index, 0, view)
  }

  loadModules = () => {
    // window.loadModule('userInfo')
    import('./modules/userInfo')
  }

  registerModule = (module) => {
    this.views = [...this.views, ...module.views]
    this.appToReactApp.emit('view-change', { views: this.views })
    return Promise.resolve()
  }

  applyPlugins = (plugins) => {
    applyPlugins(this, plugins)

    this.afterPlugins()
  }

  navigateTo(path) {
    this.appToReactApp.emit('navigate', { path })
  }

  afterPlugins = () => {
    this.appToReactApp = window.getApp().bus.connect('App-ReactApp', this)
    window.getApp().store.init(initStore)
  }

  mount(container) {
    ReactDOM.render(<ReactApp views={this.views} />, container, () => {
      this.loadModules()
    })
  }
}

export default new App()
