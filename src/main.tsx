import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerMicroApps, start } from 'qiankun'
import App from './App'
import './index.less'
import { BrowserRouter } from 'react-router-dom'




registerMicroApps([
  {
    name: 'vue-micro',
    entry: 'http://127.0.0.1:3002',
    container: '#vue-micro',
    activeRule: '/vueMicro',
  },
  {
    name: 'react-micro',
    entry: 'http://127.0.0.1:3003',
    container: '#react-micro',
    activeRule: '/reactMicro',
  },
])

start()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
