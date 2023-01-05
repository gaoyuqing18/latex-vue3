<template>

  <a-modal
          title="图像剪裁"
          :visible="visible"
          :mask-closable="false"
          :confirm-loading="confirmLoading"
          :width="700"
          :footer="null"
          @cancel="cancelHandel">
          <a-row>
              <a-col :xs="24" :md="24" :style="{ height: '350px' }">
                  <vueCropper
                      ref="cropperRef"
                      :img="options.img"
                      :info="true"
                      :infoTrue="options.infoTrue"
                      :auto-crop="options.autoCrop"
                      :fixed-box="options.fixedBox"
                      :fixedNumber="options.fixedNumber"
                      :fixed="options.fixed"
                      :centerBox="options.centerBox"
                      @realTime="realTime"
                  >
                  </vueCropper>
              </a-col>
          </a-row>
          <a-space :size="10" class="opt-btn">
            <a-button @click="refreshCrop">复位</a-button>
            <a-button @click="rotateCrop">旋转</a-button>
            <a-button @click="finish('blob')">保存</a-button>
          </a-space>
  </a-modal>

  
</template>
<script>
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import VueCropper from "vue-cropper/src/vue-cropper.vue"
// interface Options{
//     img:string | ArrayBuffer | null // 裁剪图片的地址
//     info: true, // 裁剪框的大小信息
//     outputSize:number, // 裁剪生成图片的质量 [1至0.1]
//     outputType: 'jpeg', // 裁剪生成图片的格式
//     canScale: boolean, // 图片是否允许滚轮缩放
//     autoCrop: boolean, // 是否默认生成截图框
//     autoCropWidth:number // 默认生成截图框宽度
//     autoCropHeight:number // 默认生成截图框高度
//     fixedBox:boolean // 固定截图框大小 不允许改变
//     fixed: boolean, // 是否开启截图框宽高固定比例
//     fixedNumber: Array<number>, // 截图框的宽高比例  需要配合centerBox一起使用才能生效
//     full: boolean, // 是否输出原图比例的截图
//     canMoveBox: boolean, // 截图框能否拖动
//     original: boolean, // 上传图片按照原始比例渲染
//     centerBox: boolean, // 截图框是否被限制在图片里面
//     infoTrue: boolean // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
// }
export default defineComponent({
    components:{
        VueCropper
    },
    props:{
            imgPath:{
                type:String,
                default:""
            },
            visible: {
              type: Boolean,
              default: false
            }
          },
    setup(props,{expose,emit}) {
        const {imgPath, visible } = toRefs(props)
        const options = reactive({
              img: '',  // 需要剪裁的图片
              autoCrop: true, // 是否默认生成截图框
              autoCropWidth: 150, // 默认生成截图框的宽度
              autoCropHeight: 150, // 默认生成截图框的长度
              fixedBox: false, // 是否固定截图框的大小 不允许改变
              info: true, // 裁剪框的大小信息
              outputSize: 0.5, // 裁剪生成图片的质量 [1至0.1]
              outputType: 'jpeg', // 裁剪生成图片的格式
              canScale: false, // 图片是否允许滚轮缩放
              fixed: false, // 是否开启截图框宽高固定比例
              fixedNumber: [5, 4], // 截图框的宽高比例 需要配合centerBox一起使用才能生效
              full: false, // 是否输出原图比例的截图
              canMoveBox: true, // 截图框能否拖动
              original: false, // 上传图片按照原始比例渲染
              centerBox: true, // 截图框是否被限制在图片里面
              infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          })
          const previews = ref({})
          const confirmLoading = ref(false)
          const cropperRef = ref(null)
          if(imgPath.value){
            options.img = imgPath.value
          }
          watch(imgPath,()=>{
            if(imgPath.value){
                options.img = imgPath.value
            }
          })
          const close= () => {
            emit('update:visible', false)
          }
          const cancelHandel = () => {
              close()
          }
            // const beforeUpload = (file) => {
            //     const reader = new FileReader()
            //     // 转化为base64
            //     reader.readAsDataURL(file)
            //     reader.onload = () => {
            //         // 获取到需要剪裁的图片 展示到剪裁框中
            //         options.img = reader.result
            //     }
            //     return false
            // }
            const refreshCrop = () => {
              cropperRef.value.refresh()
            }
            const rotateCrop = () => {
              cropperRef.value.rotateRight()
            }
            // 上传图片（点击保存按钮）
            const finish = (type) => {
               cropperRef.value.getCropData((data) => {
                    // data为base64图片，供接口使用
                    emit('update:visible', false)
                    emit('saveResult', data)
                })
            }
            // 裁剪之后的数据
           const  realTime = (data) => {
                 previews.value = data
            }    
        return {
            confirmLoading,options,previews,cropperRef,
            finish,visible,
            cancelHandel,realTime,refreshCrop,rotateCrop
        }
        
    },
})
</script>