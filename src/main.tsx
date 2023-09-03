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
    activeRule: '/vue-micro/*',
  },
  {
    name: 'vue-micro-textCompare',
    entry: 'http://127.0.0.1:3002',
    container: '#vue-micro',
    activeRule: '/textCompare',
  },
  {
    name: 'vue-micro-otherVueApp',
    entry: 'http://127.0.0.1:3002',
    container: '#vue-micro',
    activeRule: '/otherVueApp',
  },
])

start()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
