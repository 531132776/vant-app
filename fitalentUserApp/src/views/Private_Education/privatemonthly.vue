<template>
    <div class="privatemonthly">
        <div class="privatemonthly_content">
            <!-- 轮播 -->
            <div class="p15">
                <van-swipe :autoplay="3000" indicator-color="white" class="header_swiper ">
                    <van-swipe-item v-for="(item,index) in swiperImgs" :key="index">
                        <img :src="item.url" alt="" @click="swiperImgClick()">
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
                    <!-- <img :src="privatemonthlyIcon" alt=""> -->
                    <img v-for="item in immageDto.courseExplainUrl" :key="item.id" :src="item.url" alt="">
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
                        <li v-if="share != 1">
                            <span @click="orderDetails">包月 ¥{{educationsectorDetails.price}}{{educationsectorDetails.unit}}</span>
                        </li>
                        <li v-if="share == 1">
                            <span @click="toApp()">立即下载APP</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 上传头像弹窗 -->
            <van-popup v-model="show">
                <div>
                    <div class="popText"><img src="../../assets/images/text.png" alt=""></div>
                    <div class="popContent">
                        <div><img src="../../assets/images/人拿手机@2x.png" alt=""></div>
                        <div>
                            <img @click="toFace" src="../../assets/images/上传头像2@2x.png" alt="">
                            <img @click="toGo" style="margin-top:10px;" src="../../assets/images/上传头像2@2x (1).png" alt="">
                        </div>
                    </div>
                </div>
            </van-popup>
    </div>
</template>
<script>
import { Button,Popup,Swipe, SwipeItem, Tab, Tabs,ImagePreview,Dialog } from 'vant';
import {privateMonthCourse} from '@/request/api'
import {HaveHeadAuth} from '@/request/api-liu'
export default {
    data(){
        return{
            phomeIcon:require("../../assets/images/电话 2@2x.png"),
            privatemonthlyIcon:require("../../assets/images/u1465.png"),
            swiperImgs:[
                // 'https://img.leoao.com/o_1bpj1t27i1mls139mgvv9251lkprf.png?imageslim',
                // 'https://img.leoao.com/o_1bpj1t8q11jjb11mbn8bi3psb5rp.png?imageslim&imageView2/1/w/750/h/400',
                // 'https://img.leoao.com/o_1bpj1t8q1sr0kdi8mbajj63cro.png?imageslim',
                // 'https://img.leoao.com/o_1bpj1t8q125719b6grq10fgjdjrq.png?imageslim&imageView2/1/w/750/h/400',
               
            ],
            show:false,
            tell2:'400 075 5088',
            educationsectorObj:{},
            educationsectorDetails:{},//详情OBJ
            immageDto:{
                courseExplainUrl:[],
                coverUrl:{},
                reduceUrl:{},
                spreadUrl:[]
            },
            userId:this.$route.query.userId,
            share:'',
        }
    },
    components:{
        [Button.name]:Button,
        [Popup.name]:Popup,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Tab.name]:Tab,
        [Tabs.name]:Tabs,
        [ImagePreview.name]:ImagePreview,
        [Dialog.name]:Dialog,
    },
    mounted(){
        window.scrollTo(0,0)
        this.educationsectorObj = this.$route.query;
        console.log(this.educationsectorObj);
        this.getMonthCourseClass();
        this.share = this.$route.query.share
    },
    methods:{
        toApp(){
            if(this.isAndroid){
                window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.jkcq.gym.phone'
            }else if (this.isiOS){
                window.location.href = 'https://itunes.apple.com/us/app/id1298370833?ls=1&mt=8'
            }
        },
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
                    this.swiperImgs = this.immageDto.spreadUrl;
                    // this.immageDto.courseExplainUrl.map(v=>{
                    //     return this.swiperImgs.push(v.url)
                    // });
                    // this.immageDto.spreadUrl.map(v=>{
                    //     return this.swiperImgs.push(v.url)
                    // })
                    // this.swiperImgs.push(this.immageDto.coverUrl.url)
                    // this.swiperImgs.push(this.immageDto.reduceUrl.url)
                    // console.log(this.swiperImgs)
                }
                
            }).catch(err =>{
                console.log(err)
            })
        },
        //图片预览
        swiperImgClick(){
            const imgList = []
            for(var i=0;i<this.immageDto.spreadUrl.length;i++){
                imgList.push(this.immageDto.spreadUrl[i].url)
            }
            ImagePreview(imgList)
        },
        //拨号
        tell(){
            window.location.href='tel://'+this.tell2
        },
         //人脸验证
        toFace(){
            // alert('人脸验证')
            if(this.isAndroid){
                window.andriod.postMessage(JSON.stringify({
                    type:'takeFace'
                }))
            }else if(this.isiOS){
                window.webkit.messageHandlers.takeFace.postMessage({
                    type:'takeFace'
                })
            }
        },
        toGo(){
            this.$router.push({
                path:'/purchaseOrderDetails',
                query:{
                    status: this.$route.query.status,
                    // obj:this.educationsectorDetails,
                    courseType:this.$route.query.courseType,
                    privateMonthCourseId:this.$route.query.educationsectorId,
                    userId:this.userId
                }
            })
        },
        //订单详情
        orderDetails(){
            HaveHeadAuth(this.userId).then(res=>{
                if(res.data.obj){
                    this.$router.push({
                        path:'/purchaseOrderDetails',
                        query:{
                            status: this.$route.query.status,
                            // obj:this.educationsectorDetails,
                            courseType:this.$route.query.courseType,
                            privateMonthCourseId:this.$route.query.educationsectorId,
                            userId:this.userId
                        }
                    })
                }else{
                    this.show = true
                    // Dialog.confirm({
                    //     title: '您还未进行人脸认证',
                    //     confirmButtonText:'去认证',
                    //     cancelButtonText:'继续购买'
                    //     }).then(() => {
                    //     // on confirm
                    //         if(this.isAndroid){
                    //             window.andriod.postMessage(JSON.stringify({
                    //                 type:'takeFace'
                    //             }))
                    //         }else if(this.isiOS){
                    //             window.webkit.messageHandlers.takeFace.postMessage({
                    //                 type:'takeFace'
                    //             })
                    //         }

                    //     }).catch(() => {
                    //     // on cancel
                    //     this.$router.push({
                    //         path:'/purchaseOrderDetails',
                    //         query:{
                    //             status: this.$route.query.status,
                    //             // obj:this.educationsectorDetails,
                    //             courseType:this.$route.query.courseType,
                    //             privateMonthCourseId:this.$route.query.educationsectorId,
                    //             userId:this.userId
                    //         }
                    //     })
                    // });
                }
            
            })
        }
    }
}
</script>
<style lang="less" scoped>
.van-popup{
            background-color:rgba(0,0,0,0);
            width:300px;
            margin:0 auto;
            .popText{
                img{
                  width: 292px;  
                }
            }
            .popContent{
                margin-top:20px;
                display: flex;
                
                div:nth-child(1){
                    img{
                        width:166px;
                    }
                }
                div:nth-child(2){
                    margin-top: 20px;
                    text-align: center;
                    img{
                        width:100px;
                    }
                }
            }
    }
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
