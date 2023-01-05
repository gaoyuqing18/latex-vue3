import { createApp } from 'vue'
import './style.scss'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import { Button, Upload, Modal, Row, Col, Space, Input, Spin } from 'ant-design-vue'
createApp(App).use(Button).use(Upload).use(Modal).use(Row).use(Col).use(Space).use(Input).use(Spin).mount('#app')
