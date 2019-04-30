<template>
    <div class="privatemonthly">
        <div class="privatemonthly_content">
            <!-- 轮播 -->
            <div class="p15">
                <van-swipe :autoplay="3000" indicator-color="white" class="header_swiper ">
                    <van-swipe-item v-for="(item,index) in swiperImgs" :key="index">
                        <img :src="item" alt="" @click="swiperImgClick()">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 包月私教 -->
            <div class="curriculum_content pr_pl15">
                <div class="curriculum_info pb20">
                    <ul>
                        <li>
                            <dt>{{educationsectorDetails.courseName}}</dt>
                            <dt class="text_gray">累计参课{{educationsectorDetails.privateMonthCourseNum}}人</dt>
                        </li>
                        <li>
                            <em>¥</em>
                            <em>{{educationsectorDetails.price}}</em>
                            <em class="text_gray">{{educationsectorDetails.unit}}</em>
                        </li>
                    </ul>
                    <!-- <span class="before"></span> -->
                </div>
            </div>
            <!--  -->
            <div class="Image_text">
                <dt>
                    <img :src="privatemonthlyIcon" alt="">
                </dt>
            </div>
        </div>
        <!-- 联系客服+购买课程 -->
            <div class="Immediate_purchase">
                <div class="purchase_info">
                    <ul>
                        <li @click="tell">
                            <dt>
                                <img :src="phomeIcon" alt="">
                            </dt>
                            <dt>联系客服</dt>
                        </li>
                        <li>
                            <span @click="orderDetails">包月 ¥{{educationsectorDetails.price}}{{educationsectorDetails.unit}}</span>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
</template>
<script>
import { Button,Popup,Swipe, SwipeItem, Tab, Tabs,ImagePreview } from 'vant';
import {privateMonthCourse} from '@/request/api'
export default {
    data(){
        return{
            phomeIcon:require("../../assets/images/13.png"),
            privatemonthlyIcon:require("../../assets/images/u1465.png"),
            swiperImgs:[
                // 'https://img.leoao.com/o_1bpj1t27i1mls139mgvv9251lkprf.png?imageslim',
                // 'https://img.leoao.com/o_1bpj1t8q11jjb11mbn8bi3psb5rp.png?imageslim&imageView2/1/w/750/h/400',
                // 'https://img.leoao.com/o_1bpj1t8q1sr0kdi8mbajj63cro.png?imageslim',
                // 'https://img.leoao.com/o_1bpj1t8q125719b6grq10fgjdjrq.png?imageslim&imageView2/1/w/750/h/400',
               
            ],
            tell2:'18926484971',
            educationsectorObj:{},
            educationsectorDetails:{},//详情OBJ
            immageDto:{
                courseExplainUrl:[],
                coverUrl:{},
                reduceUrl:{},
                spreadUrl:[]
            },
            userId:this.$route.query.userId
        }
    },
    components:{
        [Button.name]:Button,
        [Popup.name]:Popup,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Tab.name]:Tab,
        [Tabs.name]:Tabs,
        [Tabs.ImagePreview]:ImagePreview,
    },
    mounted(){
        window.scrollTo(0,0)
        this.educationsectorObj = this.$route.query;
        console.log(this.educationsectorObj);
        this.getMonthCourseClass();
    },
    methods:{
        //获取包月私教详情
        getMonthCourseClass(){
            let params = {
                privateMonthCourseId:this.educationsectorObj.educationsectorId,
                courseType:this.educationsectorObj.courseType
            }
            privateMonthCourse(params).then(res=>{
                console.log('包月私教详情',res)
                if(res.data.code == 2000){
                    this.educationsectorDetails = res.data.obj;
                    this.immageDto = res.data.obj.immageDto;
                    
                    this.immageDto.courseExplainUrl.map(v=>{
                        return this.swiperImgs.push(v.url)
                    });
                    this.immageDto.spreadUrl.map(v=>{
                        return this.swiperImgs.push(v.url)
                    })
                    this.swiperImgs.push(this.immageDto.coverUrl.url)
                    this.swiperImgs.push(this.immageDto.reduceUrl.url)
                    // console.log(this.swiperImgs)
                }
                
            }).catch(err =>{
                console.log(err)
            })
        },
        //图片预览
        swiperImgClick(){
            ImagePreview(this.swiperImgs)
        },
        //拨号
        tell(){
            window.location.href='tel://'+this.tell2
        },
        //订单详情
        orderDetails(){
            this.$router.push({
                path:'/purchaseOrderDetails',
                query:{
                    status: this.$route.query.status,
                    obj:this.educationsectorDetails,
                    privateThree:this.$route.query,
                    userId:this.userId
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .privatemonthly_content{
        padding-bottom: 70px;
        .header_swiper{
            height: 160px;
            border-radius: 8px;
            img{
                display: block;
                width: 100%;
                // height: 160px;
                // border-radius: 8px;
            }
        }
        .curriculum_info{
            position: relative;
            ul{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: flex-start;
                li:nth-child(1){
                    dt:nth-child(1){
                        font-size: 20px;
                        font-weight: 600;
                        padding-bottom: 4px;
                    }
                    dt:nth-child(2){
                        font-size: 12px;
                        font-weight: 400;
                    }
                }
                li:nth-child(2){
                    em{
                        font-style: normal;
                    }
                    em:nth-child(1){
                        font-size: 15px;
                        font-weight: 600
                    }
                    em:nth-child(2){
                        font-size: 30px;
                        font-family:BebasNeue;
                        font-weight: 400;
                        padding: 0 5px 0 3px;
                    }
                    em:nth-child(3){
                        font-size:12px;
                        font-weight: 400;
                    }
                }
            }
        }
        .Image_text{
            dt{
                width: 100%;
                height: auto;
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
    }
    .Immediate_purchase{
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 333;
            padding: 10px 15px;
            background-color: #fff;
            border-top: 0.5px solid rgba(0, 0, 0, .12);
            .purchase_info{
                ul{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-flow: row nowrap;
                    li:nth-child(1){
                        padding-left: 10px;
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: space-between;
                        align-items: center;
                        dt:nth-child(1){
                            padding-bottom: 8px;
                            width:26px;
                            height: 26px;
                            img{
                                display: block;
                                width: 100%
                            }
                        }
                        dt:nth-child(2){
                            font-size: 12px;
                            font-weight: 400;
                            color: #9399A5
                        }
                    }
                    li:nth-child(2){
                        width: 60%;
                        flex:0 1 70%;
                        padding: 10px 0;
                        font-size: 17px;
                        color: #fff;
                        font-weight: 400;
                        border-radius: 23px;
                        background:rgba(29,206,116,1);
                        text-align: center;
                    }
                }
            }
        }
    
</style>
