import './initialize'
import app from './app'
import * as plugins from 'src/sdk/plugins'

app.applyPlugins(plugins)
app.mount(document.getElementById('root'))
