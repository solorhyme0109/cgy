import React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

export default (App) => (props) => <LocaleProvider locale={zhCN}><App {...props} /></LocaleProvider>
