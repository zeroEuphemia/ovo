import { createApp } from 'vue'
import { basicSetup } from 'codemirror'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from "ant-design-vue"
import 'ant-design-vue/dist/reset.css'
import VueCodemirror from 'vue-codemirror'

createApp(App).use(store).use(router).use(Antd).use(VueCodemirror, {
    // optional default global options
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: 'Code goes here...',
    extensions: [basicSetup]
    // ...
}).mount('#app')
