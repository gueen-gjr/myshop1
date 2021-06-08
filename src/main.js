import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import createStore from './store'
import FastClick from 'fastclick'
import VuelazyLoad from 'vue-lazyload'

FastClick.attach(document.body)

createApp(App).use(createStore).use(router).mount('#app')
