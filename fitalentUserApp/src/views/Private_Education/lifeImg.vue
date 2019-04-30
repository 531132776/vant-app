<template>
    <div class="swiperImg">
        <ul class="p15">
            <li v-for="(item,i) in sweiperImg" :key="i">
                <img :src="item.url" preview="1" alt="">
            </li>
        </ul>
        <div class="p15" v-if="sweiperImg.length==0" :style="{'text-align':'center'}">
            <span>
                该教练还没有上传生活照
            </span>
        </div>
    </div>
</template>
<script>
import { Swipe, SwipeItem,ImagePreview } from 'vant';
export default {
    data(){
        return{
            sweiperImg:this.$route.query.images,
        }
    },
    components:{
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [ImagePreview.name]:ImagePreview,
    },
    mounted(){  
        console.log('生活照',this.$route.query.images)
    },
    methods:{
        //图片预览
        // swiperImgClick(){
        //     ImagePreview(this.sweiperImg)
        // },
    }
}
</script>
<style scoped lang="less">
    .swiperImg{
        ul{
            display: flex;
            justify-content: space-between;
            flex-flow: row wrap;
            align-content: center;
            li{
                flex: 0 1 48%;
                // margin-right: 15px;
                margin-bottom: 15px;
                img{
                    display:block;
                    width: 100%;
                }
            }
        }
    }
</style>
