import React from 'react'
import Link from 'src/sdk/Link'
import Route from 'src/sdk/Route'
import InspectList from 'src/app/routes/InspectList'

class BaseLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      navs: [
        {path: `${props.path}/inspect_list`, text: '考察列表'}
      ]
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    const { navs } = this.state
    const {modules, path} = this.props
    return (
      <div>
        baseLayout
        {
          navs.map((link) => <Link key={link.path} to={link.path}>{link.text}</Link>)
        }
        {
          <Route path={`${path}/inspect_list`} render={(props) => <InspectList module={modules['inspect_list']} path={`${path}/inspect_list`}/>} />
        }
       
      </div>
    )
  }
}

export default BaseLayout
