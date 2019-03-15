import React from 'react'
import { BrowserRouter } from 'react-router-dom'
export { withRouter } from 'react-router-dom'

export default (App) => (props) =>  <BrowserRouter>
                                      <App {...props} />
                                    </BrowserRouter>