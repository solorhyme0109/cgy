export default function warn (message) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message)
  }
}