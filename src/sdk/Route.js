import React from 'react'
import { Route as ReactRoute } from 'react-router-dom'

 class RouteWithLifecycle extends React.Component {
  componentDidMount() {
    global.getApp().lifecycle.run('route-enter')
  }

  componentWillUnmount() {
    global.getApp().lifecycle.run('route-leave')
  }

  render() {
    return this.props.children
  }
}

class Route extends React.Component {
  
  render() {
    const { component: Component, render, ...restProps } = this.props
    return (
      <ReactRoute
        {...restProps}
        render={(props) => <RouteWithLifecycle>{render ? render(props) : <Component {...props}/>}</RouteWithLifecycle>}
      />
    )
  }
}

export default Route
