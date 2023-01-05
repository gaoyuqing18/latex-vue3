<template>
  <div class="showlate-box">
    <div class="copy-btn">
      <div class="model-info">{{ title }}</div>
      <a-button @click="toCopy"><copy-outlined/>复制</a-button>
    </div>
    <div class="showlate-info">{{ data }}</div>
    <vue-latex :expression="data" />
  </div>
  
</template>
<script setup>
import { message } from 'ant-design-vue'
import useClipboard from 'vue-clipboard3'
import { CopyOutlined } from '@ant-design/icons-vue'
import {VueLatex} from 'vatex'
const props = defineProps({
  data: String,
  title: String
})
const { toClipboard } = useClipboard()
const toCopy = async () => {
  try {
    await toClipboard(props.data)
    message.success('复制成功')
  } catch (e) {
    console.error(e)
  }
}
</script>
<style lang="scss">
.showlate-box {
  min-width: 300px;
  max-width: 88%;
  margin: 40px auto;
  .showlate-info {
    color: raba(0,0,0,0.8);
    background-color: #fff;
    margin: 12px 0 30px 0;
    font-size: 16px !important;
    height: 50px;
    line-height: 50px;
    width: 100%;
    overflow: auto;
  }
  .copy-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .ant-btn {
    background-color: #469456 !important;
    color: #fff !important;
  }
  .model-info {
    margin-right: 8px;
    font-weight: 500;
  }
}
.katex {
  color: rgba(0,0,0,.8);
  font-size: 30px;
}
@media (max-width: 600px) {
  .katex {
    color: rgba(0,0,0,.8);
    font-size: 10px;
  }
}
</style>