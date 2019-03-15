import { CallWithIllegalParamsError, TypeError } from 'src/sdk/errors'

const CHANNAL_SIZE_LIMIT = 50

class Channel {
  topicHanlders = {}
  constructor(channelName, bus, subject) {
    this.name = channelName
    this.bus = bus
    this.subject = subject
  }
  on(topic, handler) {
    if (!topic || !handler) {
      throw new CallWithIllegalParamsError('Both "topic" and "handler" are required when call on ')
    }
    if (typeof topic !== 'string' || typeof handler !== 'function') {
      throw new TypeError('"topic" should be a "string" and "handler" should be a function ')
    }
    if (!this.topicHanlders[topic]) {
      this.topicHanlders[topic] = []
    }
    this.topicHanlders[topic].push(handler)
    return () => this.off(topic, handler)
  }
  off(topic, handler) {
    if (typeof topic !== 'string') {
      throw new TypeError('"topic" should be a "string"')
    }
    if (this.topicHanlders[topic]) {
      this.topicHanlders[topic] = this.topicHanlders[topic].filter(h => h !== handler)
    }
  }
  emit(topic, payload) {
    if (typeof topic !== 'string') {
      throw new TypeError('"topic" should be a "string"')
    }
    this.bus.dispatchTopic(this.name, topic, payload)
  }
  emitAsync(topic, payload) {
    if (typeof topic !== 'string') {
      throw new TypeError('"topic" should be a "string"')
    }
    this.bus.enqueue(this.name, topic, payload)
  }
  pull(topic, handler) {
    if (typeof topic !== 'string' || typeof handler !== 'function') {
      throw new TypeError('"topic" should be a "string" and "handler" should be a function ')
    }
    const payload = this.bus.dequeue(this.name, topic)
    if (payload !== void 0) {
      handler(payload)
    }
  }
  close() {
    this.bus.close(this.name, this.subject)
  }
}

class Bus {
  channels = {
    /* [channelName]: Map<subject, Channel> */
  }

  messageQueue = {
    /* [channelName]: { [topic]: Array<Payload> } */
  }

  getChanels = () => this.channels

  connect(channelName, subject) {
    if (!channelName || !subject) {
      throw new CallWithIllegalParamsError('Both "channelName" and "subject" are required when call connect ')
    }

    if (!this.channels[channelName]) {
      this.channels[channelName] = new Map()
    }
    const channels = this.channels[channelName]
    if (!channels.get(subject)) {
      channels.set(subject, new Channel(channelName, this, subject))
    }
    if (channels.size > CHANNAL_SIZE_LIMIT) {
      console.error(`Too many connections on "${channelName}". You may encounter memeory leak risk.Remmenber close channel if it wouldn't be used.`)
    }
    return channels.get(subject)
  }

  dispatchTopic(channelName, topic, payload) {
    const channels = this.channels[channelName]
    if (channels) {
      channels.forEach((channel, subject) => {
        if (channel.topicHanlders[topic]) {
          channel.topicHanlders[topic].forEach(handler => handler(payload))
        }
      })
    }
  }

  enqueue(channelName, topic, payload) {
    if (!this.messageQueue[channelName]) {
      this.messageQueue[channelName] = {}
    }
    const seletedChannel = this.messageQueue[channelName]
    if (!seletedChannel[topic]) {
      seletedChannel[topic] = []
    }
    seletedChannel[topic].unshift(payload)
  }

  dequeue(channelName, topic) {
    if (this.messageQueue[channelName] && this.messageQueue[channelName][topic]) {
      return this.messageQueue[channelName][topic].pop()
    }
  }

  close(channelName, subject) {
    const channels = this.channels[channelName]
    if (channels) {
      channels.delete(subject)
    }
  }
}

class BusPlugin {
  apply(app) {
    app.bus = new Bus()
  }
}

export default BusPlugin
