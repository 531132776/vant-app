<template>
    <div class="certificate">
        <div class="certificate_img p15">
            <ul>
            <li v-for="(item,i) in seniorityUrl" :key="i">
                <dt><img :src="item.url" alt="" @click="swiperImgClick"></dt>
                <span>{{item.name}}</span>
                
            </li>
            <!-- <li>
                <dt><img :src="certificateFrontUrl.url" alt=""></dt>
                <span>奇迹健身学院普拉提教练认证</span>
            </li> -->
        </ul>
        </div>
        
    </div>
</template>
<script>
import { Swipe, SwipeItem, ImagePreview } from 'vant';
export default {
    data(){
        return {
            oneImg:require("../../assets/images/1.jpg"),
            certificateBehindUrl:{},
            certificateFrontUrl:{},
            seniorityUrl:[]
        }
    },
    components:{
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [ImagePreview.name]:ImagePreview,
    },
    mounted(){
        console.log(this.$route.query.obj)
        this.certificateBehindUrl = this.$route.query.obj.certificateBehindUrl
        this.certificateFrontUrl = this.$route.query.obj.certificateFrontUrl;
        this.seniorityUrl = this.$route.query.obj;
        console.log(this.seniorityUrl)
    },
    methods:{
        //图片预览
        swiperImgClick(){
            const imgList = []
            for(var i=0;i<this.seniorityUrl.length;i++){
                imgList.push(this.seniorityUrl[i].url)
            }
            ImagePreview(imgList)
        },
    }
}
</script>
<style lang="less" scoped>
    .certificate_img{
        
        ul{
            padding-top: 10px;
            display: flex;
            justify-content: flex-start;
            flex-flow: column nowrap;
            align-content: center;
            text-align: center;
            li{
                padding-bottom: 34px;
                dt{
                    width: 237px;
                    // height: 177px;
                    margin: 0 auto;
                    padding-bottom: 13px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        // height: 100%;
                        display: block;
                    }
                    
                }
                span{
                        font-size: 17px;
                        font-weight: 600;
                    }
            }
        }
    }
</style>


