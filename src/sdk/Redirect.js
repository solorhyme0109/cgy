import React, { Component } from 'react'
import { Redirect as ReactRedirect } from 'react-router-dom'

class Redirect extends Component {
  render() {
    return (
      <ReactRedirect {...this.props} />
    )
  }
}

export default Redirect
