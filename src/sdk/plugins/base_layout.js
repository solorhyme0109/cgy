import React from 'react'
import Link from 'src/sdk/Link'

class BaseLayoutView extends React.Component {
  state = {
    navs: []
  }

  componentDidMount() {
    const {onMounted} = this.props
    onMounted()
    this.channel = window.getApp().bus.connect('BaseLayoutView-BaseLayoutView', this)

    this.channel.pull('navs-storage', (payload) => {
      this.setState({
        navs: payload.navs
      })
    })
  }

  componentWillUnmount() {
    this.channel.emitAsync('navs-storage', { navs: this.state.navs })
    this.channel.close()
  }

  addNav = (nav) => {
    this.setState({
      navs: [...this.state.navs, nav]
    })
  }

  render() {
    const { navs } = this.state
    return (
      <div>
        baseLayout
        {
          navs.map((link) => <Link key={link.path} to={link.path}>{link.text}</Link>)
        }
      </div>
    )
  }
}

class BaseLayout {
  BaseLayoutView = (props) => <BaseLayoutView onMounted={this.onMounted} ref={(instance) => this.layoutElement = instance} {...props} />
  callbacks = []

  onMounted = () => {
    while(this.callbacks.length) {
      this.callbacks.pop()()
    }
  }

  addNav(nav) {
    if (this.layoutElement) {
      this.layoutElement.addNav(nav)
    } else {
      this.callbacks.push(() => this.addNav(nav))
    }
  }
}

class BaseLayoutPlugin {
  apply(app) {
    app.baseLayout = new BaseLayout()
    app.addView({
      path: '/',
      component: app.baseLayout.BaseLayoutView
    })
  }
}

export default BaseLayoutPlugin
