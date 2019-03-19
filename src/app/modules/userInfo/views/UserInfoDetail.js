import React, { Component } from 'react'
import request from 'src/sdk/request'
import api from 'src/common/api'

class UserInfoView extends Component {

  state = {}

  update = (modelKey, model) => {
    this.setState({
      username: model.userInfo.username,
      userId: model.userInfo.userId
    })
  }

  componentDidMount() {
    this.globalStore = window.getApp().store.connect('global', this)
    this.anotherStore = window.getApp().store.connect('another', this)

    this.globalStore.pull((model) => {
      const {userInfo} = model
      this.setState({
        username: userInfo.username,
        userId: userInfo.userId
      })
    })
  }

  getUserInfo = () => {
    request.post(api.getUserInfo, { id: this.props.match.params.id }).then((data) => {
      this.globalStore.update({
        userInfo: {
          username: '李四',
          userId: data.res.payload.id
        }
      })
    })
  }

  componentWillUnmount() {
    this.globalStore.disconnect()
    this.anotherStore.disconnect()
  }

  render() {
    const { username, userId } = this.state
    return (
      <div>
        {username}
        {userId}
        <button onClick={this.getUserInfo}>获取</button>
      </div>
    )
  }
}

export default UserInfoView
