<script setup>
  import { ref } from "vue"
  import axios from 'axios'
  import { UploadOutlined } from '@ant-design/icons-vue'
  import cropper from './ImgCropper.vue'
  import showLatex from './ShowLatex.vue'
  const image_url = ref('') 
  const latex_word = ref('')
  const cropperVisible = ref(false)
  const spinning = ref(false)
  const fileData = ref()
  const latex_info = ref([])
  const model_map = ['resnet18', 'resnet50', 'transformer']
  const beforeUpload = file => {
    fileData.value = file
    image_url.value = URL.createObjectURL(file)
    return false
  }
  const { VITE_BASE_API } = import.meta.env
  const getLatex = () => {
    // const formData = new FormData()
    // formData.append('file', fileData.value)
    // formData.append('opt', '1,2')
    // spinning.value = true
    // axios.post(`${VITE_BASE_API}/predict/`, formData)
    // .then((res) => {
    //   spinning.value = false
    //   latex_info.value = res.data.data.pred
    // })
    // .catch((err) => {
    //   spinning.value = false
    // })
    latex_info.value = ["\\in { \\bf H } \\underline { { \\bf p } } \\left \\{ \\begin { a r r a y } { c } { \\displaystyle { \\bf ~ } \\oint _ { \\bf x = 1 } ~ } \\ \\ { \\bf f } \\ \\ \\end { a r r a y } \\right ] \\ { \\mathrm { \\boldmath ~ H ~ } } ^ { \\dag } { \\mathrm { \\boldmath ~ \\Biggl . ~ } \\right ] } \\ \\ \\end { a r r a y } \\int { } ^ { \\bf ~ q } \\ \\ \\end { a r r a y } \\hspace { . 1 i n } \\left \\{ \\begin { a r r a y } { l } { { \\bf H } ^ { \\bf k } ~ } \\ \\ { \\hline"]
  }
  const fileList = ref([])
  const base64ToFile = (dataurl) => { 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'latex_word.jpeg', { type: mime })
	}
  const saveResult = (data) => {
    const file = base64ToFile(data)
    fileData.value = file
    image_url.value = URL.createObjectURL(file)
  }
  document.addEventListener('paste', function (event) {
    var items = event.clipboardData && event.clipboardData.items;
    if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                fileData.value = items[i].getAsFile()
                spinning.value = false
                image_url.value = URL.createObjectURL(fileData.value)
                break;
           }
        }
    }
    // 此时file就是剪切板中的图片文件
  })
</script>

<template>
  <header>
    <div class="header-left">
      <img src="https://xlimage.uzero.cn/shinescan/res/shinescanicon.png" class="logo" />
      <span class="site-name">北航Latex公式识别</span>
    </div>
  </header>
  <div class="container">
    <div>
      <a-upload
        v-model:file-list="fileList"
        name="file"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :custom-request="() => {}"
        accept=".png,.jpeg,.jpg"
      >
        <a-button class="primary-btn">
          <upload-outlined></upload-outlined>
          Click to Upload
        </a-button>
      </a-upload>
    </div>
    <a-spin :spinning="spinning" tip="识别中">
      <div class="content-images-ul" v-if="image_url">
        <img :src="image_url" />
        <div class="image-ops">
          <a-button type="link" @click="cropperVisible = true">编辑 </a-button>
          <span>|</span>
          <a-button type="link" @click="getLatex"> 识别</a-button>
        </div>
        </div>
    </a-spin>
    <div v-for="(item, index) in latex_info" :key="index">
      <show-latex :title="model_map[index]" :data="item"></show-latex>
    </div>
    <div v-if="!image_url" class="content-default">
      <p>
        点击上方按钮选择图片
      </p>
      <p>
        / 将图片拖入此虚线框 / 从剪切板粘贴截图
      </p>
      <span>最多可选择1张，支持 JPG/PNG/BMP/GIF/SVG 格式</span><a href="/supportedformula.html" target="_blank"
        class="primary-color">点此了解目前支持的公式</a>
    </div>
  </div>
  <footer>
    <a href="https://www.buaa.edu.cn/" target="_blank">北航官网</a>｜
    <a href="https://www.wjx.cn/vm/hg47bGd.aspx" target="_blank">意见反馈</a>
  </footer>
  <cropper
    v-model:visible="cropperVisible"
    :img-path="image_url"
    @save-result="saveResult"
  >
  </cropper>
</template>

<style scoped lang="scss">
@import '../assets/variable.scss';
  header {
    width: 100%;
    color: #7d7d7d;
    background: #f5f5f5;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      display: flex;
      align-items: center;
      .logo {
        width: set(50px);
        max-width: 60px;
        margin-right: 10px;
      }
      .site-name {
        font-size: 16px;
        font-weight: 400;
        text-align: center;
      }
    }
  }
  .container {
    height: 82vh;
    overflow-x: hidden;
    overflow-y: auto;
    .content-default {
      margin-top: 30vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .content-images-ul {
      width: set(320px);
      max-width: 400px;
      height: set(100px);
      min-height: 100px;
      margin: 32px auto;
      margin-bottom: 52px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .image-ops {
        width: 100%;
        height: set(20px);
        min-height: 20px;
        position: relative;
        bottom: 0;
        color: #ededed;
        background-color: rgba(0,0,0,0.5);
        font-size: 10px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .ant-btn-link {
          color: #ededed;
        }
      }
    }
  }
  footer {
    font-size: 14px;
    a {
      color: #7d7d7d;
    }
    a:hover {
      color: #469456;
    }
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
