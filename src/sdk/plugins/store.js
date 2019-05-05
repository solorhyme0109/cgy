import { TypeError } from 'src/sdk/errors'
import warn from 'src/sdk/warn'

class Store {
  models = new Map() // <modelKey, model>
  connections = new Map() // <modelKey<string>, listeners<Set<listener>>>>

  connect(modelKey, listener) {
    if (!modelKey || typeof modelKey !== 'string') {
      throw new TypeError('When call "connect(modelKey, listener)", "modelKey" must be string')
    }
    if (!listener || typeof listener.update !== 'function') {
      throw new TypeError('When call "connect(modelKey, listener)", "listener" should have update() as callback to recieve model.')
    }
    if (!this.models.get(modelKey)) {
      this.models.set(modelKey, {})
      warn(`The store model "${modelKey}" should exist before connecting it. Otherwise it will be created.`)
    }
    if (!this.connections.get(modelKey)) {
      this.connections.set(modelKey, new Set())
    }
    const targetListeners = this.connections.get(modelKey)
    targetListeners.add(listener)
    
    return {
      update: (payload) => this.update(modelKey, payload),
      pull: (cb) => cb(this.models.get(modelKey)),
      disconnect: () => targetListeners.remove(listener)
    }
  }

  update(modelKey, payload) {
    // TODO: isPlainObject
    if (typeof payload !== 'object') {
      throw new TypeError(`when call "update(modelKey, payload)", the "payload" should be a palin object, but recieve "${payload}"`)
    }
    const targetModel = this.models.get(modelKey)
    this.models.set(modelKey, { ...targetModel, ...payload })
    const targetListeners = this.connections.get(modelKey)

    // call the callbacks
    targetListeners.forEach((listener) => listener.update(this.models.get(modelKey), modelKey))
  }

  init(models) {
    // TODO: isPlainObject
    if (typeof models !== 'object') {
      throw new TypeError(`when call "init(models)", the "models" should be a palin object, but recieve "${models}"`)
    }
    Object.keys(models).forEach((modelKey) => {
      this.models.set(modelKey, models[modelKey])
    })
  }

  inject(modelKey, model) {
    // TODO: isPlainObject
    if (typeof modelKey !== 'string' || typeof model !== 'object') {
      throw new TypeError(`when call "inject(modelKey, model)", the "modelKey" should be string and "model" should be a plain object.`)
    }
    if (!this.models.get(modelKey)) {
      this.models.set(modelKey, model)
    } else {
      warn(`"${modelKey}" has existed, you can't inject it twice.`)
    }
  }

}

class storePlugin {
  apply(app) {
    app.store = new Store()
  }
}

export default storePlugin
