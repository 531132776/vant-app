<template>
    <div class="Course_Details">
        <div class="Course_Details_content">
            <!-- 轮播 -->
            <div class="p15">
                <van-swipe :autoplay="3000" indicator-color="white" class="header_swiper ">
                    <van-swipe-item v-for="(item,index) in swiperImgs" :key="index">
                        <img :src="item.url" alt="" @click="swiperImgClick()">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 私教体验课 -->
            <div class="curriculum_content p15">
                <div class="curriculum_info pb20">
                    <ul>
                        <li>
                            <dt v-if="SportsContent==0">{{educationexperie.courseName}}</dt>
                            <dt v-if="SportsContent==2">{{privateCourse.courseName}}</dt>
                            <dt v-if="SportsContent==0" class="text_gray">累计参课{{educationexperie.privateTasteCourseNum}}人</dt>
                            <dt v-if="SportsContent==2" class="text_gray">累计参课{{privateCourse.privateCourseNum}}人</dt>
                        </li>
                        <li>
                            <em>¥</em>
                            <em v-if="SportsContent==0">{{educationexperie.price}}</em>
                            <em v-if="SportsContent==2">{{privateCourse.onePrice}}</em>
                            <em class="text_gray">/ 节</em>
                        </li>
                    </ul>
                    <span class="before"></span>
                </div>
            </div>
            <!-- 合适人群 -->
            <!-- <div class="Crowd p15" v-if='SportsContent==2'>
                <div class="Crowd_content pb20">
                    <dt>合适人群</dt>
                    <dt>白领/青年/需要改善体型的肥胖人群</dt>
                    <span class="before"></span>
                </div>
            </div> -->
            <!-- 课程时间 -->
            <div class="p15">
                <div class="curriculum_time pb20">
                    <ul>
                        <li>
                            <dt>课程时间</dt>
                            <dt v-if="SportsContent==0">{{educationexperie.roomAndTime}}</dt>
                            <dt v-if="SportsContent==2">{{privateCourse.roomAndTime}}</dt>
                        </li>
                        <li>
                            <span></span>
                        </li>
                        <li>
                            <dt>上课门店</dt>
                            <dt v-if="SportsContent==2">{{privateCourse.clubName}}</dt>
                            <dt v-if="SportsContent==0">{{educationexperie.clubName}}</dt>
                        </li>
                    </ul>
                    <span class="before"></span>
                </div>
            </div>
            <!-- 运动建议 -->
            <!-- <div class="Sports_suggestion p15" v-if="SportsContent==2">
                <div class="Sports_content pb20">
                    <span class="title_text">运动建议</span>
                    <ol>  
                        <li>1、坚持热身运动，不做出超出身体负荷的健身运动；</li>
                        <li>2、合理饮食，不暴饮暴食或过度节食；</li>
                        <li>3、根据教练的训练计划，坚持合理的运动频率。</li>
                    </ol>
                    <span class="before"></span>
                </div>
            </div> -->
            <!-- 约课流程 -->
            <!-- <div class="Appointment_process pr_pl15">
                <span class="title_text">约课流程</span>
                <div class="process_info_img pt_pb20">
                    <ul>
                        <li>
                            <dt>
                                <img :src="shoppingImg" alt="">
                            </dt>
                            <dt>购买</dt>
                        </li>
                        <li class="Dottedline"></li>
                        <li>
                            <dt>
                                <img :src="classImg" alt="">
                            </dt>
                            <dt>约课</dt>
                        </li>
                        <li class="Dottedline"></li>
                        <li>
                            <dt>
                                <img :src="signImg" alt="">
                            </dt>
                            <dt>签到</dt>
                        </li>
                    </ul>
                    <span class="before"></span>
                </div>
            </div> -->
            <!-- 规则说明 -->
            <!-- <div class="Professional_certificate pr_pl15">
                <div class="Professional_info pt_pb20">
                    <ul @click="RuleDescription">
                        <li>规则说明</li>
                        <li>
                            <dt>
                                <span class="head_people">
                                    <img :src="rightIcon" alt="">
                                </span>
                                
                            </dt>
                        </li>
                    </ul>
                    <span class="before"></span>
                </div>
            </div> -->
            <!-- 课程介绍 -->
            <div class="Course_Introduction p15">
                <div class="Introduction_info">
                    <!-- <span class="title_text">课程介绍</span>
                    <dt>
                        搏击可以提高肌肉爆发力量，每天坚持下可以可高心肺能力 搏击可以提高肌肉爆发力量每天坚持下可以可高心肺能力搏 击可以提高肌肉爆发力量，每天坚持下可以可高心肺能力。
                    </dt> -->
                    <!-- <span class="before"></span> -->
                    <!-- <img :src="CourseIntroduction" alt=""> -->
                    <img v-for="item in immageDto.courseExplainUrl" :key="item.id" :src="item.url" alt="">
                </div>
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
                            <!-- 私教课立即购买 -->
                            <li v-if="SportsContent==2 && share != 1" @click="shopping">
                                <span>立即购买</span>
                            </li>
                            <!--  -->
                            <li v-if="SportsContent==0 && share != 1" @click="shoppingTwo">
                                <span>立即购买</span>
                            </li>
                            <li v-if="share == 1"  @click="toApp()">
                                <span>立即下载APP</span>
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
import {detailSprivatLessons,privateTasteCourse} from '@/request/api'
import {HaveHeadAuth} from '@/request/api-liu'
export default {
    data(){
        return{
            rightIcon:require("../../assets/images/14.png"),
            phomeIcon:require("../../assets/images/电话 2@2x.png"),
            // shoppingImg:require("../../assets/images/shoping.png"),
            // signImg:require("../../assets/images/sign.png"),
            // classImg:require("../../assets/images/class.png"),
            CourseIntroduction:require("../../assets/images/位图 2@2x.png"),
            swiperImgs:[
                    // 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
                    // 'https://img.yzcdn.cn/2.jpg',
                    // 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
                    // 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
               
            ],
            show:false,
            tell2:'400 075 5088',
            SportsContent:this.$route.query.status,//塑形杠铃雕塑状态
            privateEducationId:this.$route.query.privateCourseId,//私教课Id
            privateCourse:{},//私教课obj
            educationexperienceId:this.$route.query.educationexperienceId,//私教体验课Id
            educationexperie:{},//私教体验课obj
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
        console.log(this.$route.query)
        console.log('私教参数',this.$route.query);
        if(this.$route.query.status == 0){
            //私教体验课详情
            this.getprivateTasteCourse();
            
        }else if(this.$route.query.status == 2){
            //私教课详情
            this.getprivateCourse();
            
        }
        this.share = this.$route.query.share;
    },
    methods:{
        toApp(){
            if(this.isAndroid){
                window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.jkcq.gym.phone'
            }else if (this.isiOS){
                window.location.href = 'https://itunes.apple.com/us/app/id1298370833?ls=1&mt=8'
            }
        },
        //获取私教体验课详情
        getprivateTasteCourse(){
            let params = {
                privateTasteCourseId:this.educationexperienceId,
                courseType:this.$route.query.courseType
            }
            privateTasteCourse(params).then(res =>{
                console.log('私教体验课详情',res)
                if(res.data.code == 2000){
                    this.educationexperie = res.data.obj;
                    this.immageDto = res.data.obj.immageDto;
                    this.swiperImgs = this.immageDto.spreadUrl
                    console.log(this.swiperImgs,'=======>')
                    // this.immageDto.courseExplainUrl.map(v=>{
                    //     return this.swiperImgs.push(v.url)
                    // });
                    // this.immageDto.spreadUrl.map(v=>{
                    //     return this.swiperImgs.push(v.url)
                    // })
                    // this.swiperImgs.push(this.immageDto.coverUrl.url)
                    // this.swiperImgs.push(this.immageDto.reduceUrl.url)
                }
                
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取私教课详情
        getprivateCourse(){
            let params = {
                privateCourseId:this.privateEducationId,
                courseType:this.$route.query.courseType
            }
            detailSprivatLessons(params).then(res =>{
                console.log('私教课详情',res)
                if(res.data.code == 2000){
                    this.privateCourse = res.data.obj;
                    this.immageDto = res.data.obj.immageDto;
                    this.swiperImgs = this.immageDto.spreadUrl
                    // this.immageDto.courseExplainUrl.map(v=>{
                    //     return this.swiperImgs.push(v.url)
                    // });
                    // this.immageDto.spreadUrl.map(v=>{
                    //     return this.swiperImgs.push(v.url)
                    // })
                    // this.swiperImgs.push(this.immageDto.coverUrl.url)
                    // this.swiperImgs.push(this.immageDto.reduceUrl.url)
                }
                
            }).catch(err=>{
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
        //规则说明
        RuleDescription(){
            // alert('规则说明')
        },
        //拨号
        tell(){
            window.location.href='tel://'+this.tell2
        },
        //私教课立即购买
        shopping(){
            HaveHeadAuth(this.userId).then(res=>{
                if(res.data.obj){
                    this.$router.push({
                        path:'/purchaseOrderDetails',
                        query:{
                            status: this.$route.query.status,
                            // obj:this.privateCourse,
                            // privateOne:this.$route.query,
                            userId:this.userId,
                            courseType:this.$route.query.courseType,
                            privateCourseId:this.$route.query.privateCourseId,
                        }
                    })
                }else{
                    this.show = true
                //     Dialog.confirm({
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
                //             // obj:this.privateCourse,
                //             // privateOne:this.$route.query,
                //             userId:this.userId,
                //             courseType:this.$route.query.courseType,
                //             privateCourseId:this.$route.query.privateCourseId,
                //         }
                //     })
                // });
                }
            
            })
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
        //go订单支付页面
        toGo(){
            //console.log('go订单支付页面')
            if(this.$route.query.courseType == 1){
                // alert('courseType==1')
                //私教课
                this.$router.push({
                    path:'/purchaseOrderDetails',
                    query:{
                        status: this.$route.query.status,
                        // obj:this.privateCourse,
                        // privateOne:this.$route.query,
                        userId:this.userId,
                        courseType:this.$route.query.courseType,
                        privateCourseId:this.$route.query.privateCourseId,
                    }
                })
            }else if(this.$route.query.courseType == 2){
                // alert('courseType==2')
                //私教体验课
                this.$router.push({
                    path:'/purchaseOrderDetails',
                    query:{
                        status: this.$route.query.status,
                        // obj:this.educationexperie,
                        // privateTwo:this.$route.query,
                        userId:this.userId,
                        courseType:this.$route.query.courseType,
                        privateTasteCourseId:this.$route.query.educationexperienceId
                    }
                })
            }
            
        },
        //私教体验课购买
        shoppingTwo(){
            HaveHeadAuth(this.userId).then(res=>{
                if(res.data.obj){
                    this.$router.push({
                        path:'/purchaseOrderDetails',
                        query:{
                            status: this.$route.query.status,
                            // obj:this.educationexperie,
                            // privateTwo:this.$route.query,
                            userId:this.userId,
                            courseType:this.$route.query.courseType,
                            privateTasteCourseId:this.$route.query.educationexperienceId
                        }
                    })
                }else{
                    this.show = true
                //     Dialog.confirm({
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
                //             // obj:this.educationexperie,
                //             // privateTwo:this.$route.query,
                //             userId:this.userId,
                //             courseType:this.$route.query.courseType,
                //             privateTasteCourseId:this.$route.query.educationexperienceId
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
    .Course_Details_content{
        // background: #fff;
        padding-bottom: 70px;
        height:100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
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
                        font-family:PingFangSC-Semibold;
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
                        // font-weight: 600;
                        letter-spacing:1px;
                        padding: 0 5px 0 3px;
                    }
                    em:nth-child(3){
                        font-size:12px;
                        font-weight: 400;
                    }
                }
            }
        }
        .curriculum_time{
            position: relative;
            ul{
                display: flex;
                justify-content: space-around;
                align-content: center;
                flex-flow: row nowrap;
                text-align: center;
                li:nth-child(1),li:nth-child(3){
                    dt:nth-child(1){
                        font-size: 17px;
                        font-weight: 500;
                        padding-bottom: 4px;
                        font-family:PingFangSC-Medium;
                    }
                    dt:nth-child(2){
                        font-size: 13px;
                        font-weight: 400;
                    }
                }
                li:nth-child(2){
                    width: 1px;
                    background:rgba(231,232,235,1);
                }
                
            }
        }
        .process_info_img{
            position: relative;
            padding-top: 15px;
            ul{
                display: flex;
                justify-content: space-around;
                align-items:center;
                flex-flow: row nowrap;
                padding:0 25px;
                li{
                    font-size: 13px;
                    font-weight: 400;
                    dt:nth-child(1){
                        width: 26px;
                        height: 26px;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                }
                .Dottedline{
                    flex: 0 1 15%;
                    border: 1px dashed rgba(231,232,235,1);
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                    // height: 1px;
                    // border-width: thin;
                    font-size: 0;
                    font-weight: 100;
                }
            }
        }
        .Professional_info{
            position: relative;
            ul{
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
                li:nth-child(1){
                    font-size: 20px;
                    font-weight: 600;
                }
                li:nth-child(2){
                    font-size: 13px;
                    font-weight: 400;
                    
                    dt{
                        /* padding-top:5px; */
                        display: flex;
                        flex-flow: row wrap;
                        justify-content: flex-start;
                        align-items: center;
                        .head_people{
                            width: 13px;
                            height: 13px;
                            display: inline-block;
                            img{
                                display: block;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
        .Introduction_info{
            // padding-top: 5px;
            position: relative;
            dt{
                font-size: 13px;
                font-weight: 400;
                line-height: 20px;
                padding-top: 10px;
            }
            img{
                width: 100%;
                display: block;
            }
        }
        
        .Crowd_content{
            position:relative;
            dt:nth-child(1){
                font-size:17px;
                font-family:PingFangSC-Medium;
                font-weight:600;
                color: #101D37;
                padding-bottom: 4px;
            }
            dt:nth-child(2){
                font-size:13px;
                font-weight:400;
            }
        }
        .Sports_content{
            position: relative;
            ol{
                padding-top: 7px;
                font-size:13px;
                font-weight:400;
                color:#101D37;
                li{
                    line-height:22px;
                }
            }
        }
    }
    .Course_Details_content::-webkit-scrollbar{
        width: 0;
        height: 0;
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