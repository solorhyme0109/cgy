export default function appEnhancer(App, enhancers) {
  return enhancers.reduce((_App, enhancer) => enhancer(_App), App)
}
