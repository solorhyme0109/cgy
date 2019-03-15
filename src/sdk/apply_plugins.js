import warn from './warn'

export default (() => {
  const pluginsCache = {}
  return function applyPlugins(app, pluginDict) {
    Object.keys(pluginDict).forEach((pluginName) => {
      if (pluginsCache[pluginName]) {
        warn(`"${pluginName}" can't apply twice`)
        return
      }
      new pluginDict[pluginName]().apply(app)
      pluginsCache[pluginName] = true
    })
  }
})()
