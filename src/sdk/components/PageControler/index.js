import React, { Component } from 'react'
import Route from 'src/sdk/Route'
import Switch from 'src/sdk/Switch'

class PageControler extends Component {
  render() {
    const { pages, notFound } = this.props
    return (
      <Switch>
        {
          pages.map((page) =>
            <Route exact key={page.path} path={page.path} component={page.component}/>
          )
        }
        <Route path={'/'} component={notFound.component} />
      </Switch>
    )
  }
}

export default PageControler
