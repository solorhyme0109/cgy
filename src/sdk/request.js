export default {
  post: (api, payload) => new Promise((res) => res({
    res: {
      api, payload
    }
  }))
}