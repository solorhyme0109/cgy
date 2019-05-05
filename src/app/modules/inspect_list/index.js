import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class InspectList extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        考察列表。。。。。。。
      </div>
    )
  }
}

export default ({namespace, mountNode, basePath}) => ReactDOM.render(<InspectList namespace={namespace} path={basePath}/>, mountNode)
