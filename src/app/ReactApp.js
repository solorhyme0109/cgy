import React, { Component } from 'react'
import PageControler from 'src/sdk/components/PageControler'
import { _404 } from './pages'
import appEnhancer from 'src/sdk/app_enhancer'
import {
  withDragDropContext,
  antd,
  router,
  withRouter
} from './enhancers'
import './index.less' 

class ReactApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      views: props.views
    }
  }

  componentDidMount() {
    window.getApp().lifecycle.run('mounted')
    this.channel = window.getApp().bus.connect('App-ReactApp', this)
    this.channel.on('view-change', (payload) => {
      this.setState({
        views: payload.views
      })
    })
    this.channel.on('navigate', (payload) => {
      this.navigateTo(payload.path)
    })
  }

  componentWillUnmount() {
    this.channel.close()
  }

  navigateTo = (path) => {
    const {history} = this.props
    history.push(path)
  }

  render() {
    const { views } = this.state
    return (
      <PageControler
        pages={views}
        notFound={_404}
      />
    )
  }
}

export default appEnhancer(ReactApp, [
  withRouter,
  withDragDropContext,
  antd,
  router,
])

