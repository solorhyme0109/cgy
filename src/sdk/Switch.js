import React, { Component } from 'react'
import { Switch as ReactSwitch } from 'react-router-dom'

class Switch extends Component {
  render() {
    return (
      <ReactSwitch {...this.props} />
    )
  }
}

export default Switch
