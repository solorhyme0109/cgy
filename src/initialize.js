import moment from 'moment'
import 'moment/locale/zh-cn'

// 浏览器环境添加global全局对象
if (window && !window.global) {
  window.global = {}
}

moment.locale('zh-cn')
