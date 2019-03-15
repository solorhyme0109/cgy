import { TypeError, NotExistError } from 'src/sdk/errors'
import warn from 'src/sdk/warn'

class Phase {

  constructor(name) {
    this.name = name
    this.hooks = []
  }

  addHook(hook) {
    if (typeof hook !== 'function') {
      throw new TypeError(`hook must be a function!`)
    }
    this.hooks.push(hook)
    return () => this.removeHook(hook)
  }
  
  removeHook(hook) {
    this.hooks = this.hooks.filter(h => h !== hook)
  }

  runHooks(...args) {
    this.hooks.forEach(h => h(...args))
  }
}

export class Lifecycle {

  phases = {
    'mounted': new Phase('mounted'),
    'log-in': new Phase('log-in'),
    'log-out': new Phase('log-out'),
    'route-enter': new Phase('route-enter'),
    'route-leave': new Phase('route-leave'),
    'app-update': new Phase('app-update')
  }

  getPhase = (phaseName) => this.phases[phaseName]

  run(phaseName, ...args) {
    const phase = this.getPhase(phaseName)
    if (!phase) {
      warn(`\`${phaseName}\` doesn't exist.`)
    } else {
      phase.runHooks(...args)
    }
  }

  register(phaseName, hook) {
    const phase = this.getPhase(phaseName)
    if (!phase) {
      throw new NotExistError(`Make sure that \`${phaseName}\` exist before calling register`)
    } else {
      return phase.addHook(hook)
    }
  }
}

class LifecyclePulgin {
  apply(app) {
    app.lifecycle = new Lifecycle()
  }
}

export default LifecyclePulgin
