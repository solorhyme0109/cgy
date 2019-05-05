import React, { Component } from 'react'
import './index.less' 
import {STORE_KEY_MODULE} from './constants'
import { BrowserRouter } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import BaseLayout from './layouts/BaseLayout'
import Route from 'src/sdk/Route'
import Redirect from 'src/sdk/Redirect'
import Switch from 'src/sdk/Switch'
import dragDropContext from './appDecorators/drag_drop_context'

@dragDropContext
class ReactApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modules: {}
    }
  }

  componentDidMount() {
    global.getApp().lifecycle.run('mounted')
    this.storeConnection = global.getApp().store.connect(STORE_KEY_MODULE, {update: this.updateModules})
  }

  updateModules = (modules, modelKey) => {
    this.setState({modules})
  }

  componentWillUnmount() {
    this.storeConnection.disconnect()
  }

  render() {
    const {modules} = this.state
    return (
      <LocaleProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            {/* route for page/layout */}
            <Route path='/base' render={(props) => <BaseLayout path='/base' modules={modules} />} />
            <Redirect to='/base' />
          </Switch>
        </BrowserRouter>
      </LocaleProvider>
    )
  }
}

export default ReactApp
