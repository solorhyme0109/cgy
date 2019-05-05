import React, { Component } from 'react'

class InspectList extends Component {
  render() {
    const {module, path} = this.props
    return (
      <div ref={(node) => {
        node && module && module.render({mountNode: node, basePath: path})
      }}/>
    )
  }
}

export default InspectList
