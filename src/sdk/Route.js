import React from 'react'
import { Route as ReactRoute } from 'react-router-dom'

 class RouteWithLifecycle extends React.Component {
  componentDidMount() {
    window.getApp().lifecycle.run('route-enter')
  }

  componentWillUnmount() {
    window.getApp().lifecycle.run('route-leave')
  }

  render() {
    return this.props.children
  }
}

class Route extends React.Component {
  
  render() {
    const { component: Component, ...restProps } = this.props
    return (
      <ReactRoute
        {...restProps}
        render={(props) => <RouteWithLifecycle><Component {...props}/></RouteWithLifecycle>}
      />
    )
  }
}

export default Route
