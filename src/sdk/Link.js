import React, { Component } from 'react'
import { Link as ReactLink } from 'react-router-dom'

class Link extends Component {
  render() {
    return (
      <ReactLink {...this.props} />
    )
  }
}

export default Link
