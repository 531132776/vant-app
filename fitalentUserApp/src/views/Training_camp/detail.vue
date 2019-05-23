<template>
    <div class="storeDetails pt15">
        <!-- 轮播 -->
        <div class="pr_pl15">
            <van-swipe :autoplay="3000" indicator-color="white" class="header_swiper ">
                <van-swipe-item v-for="(item,index) in swiperImgs" :key="index">
                    <img :src="item.url" alt="" @click="swiperImgClick(item)">
                </van-swipe-item>
            </van-swipe>
        </div>
        
        <!-- 地址 -->
        <div class="addres pr_pl15">
            <ul>
                <li>
                    <span>{{trainingCampList.courseName}}</span>
                    <span class="addres_text" id="span_buttom">
                        <span>已报名{{trainingCampList.peopleNum}}人</span>
                        <span>仅剩{{trainingCampList.startClassNum}}人开班</span>
                        <span v-if="trainingCampList.courseStatus == 0">待排课</span>
                        <span v-if="trainingCampList.courseStatus == 1">报名中</span>
                        <span v-if="trainingCampList.courseStatus == 2">报名已满</span>
                        <span v-if="trainingCampList.courseStatus == 3">上课中</span>
                        <span v-if="trainingCampList.courseStatus == 4">已完成</span>
                        <span v-if="trainingCampList.courseStatus == 5">已取消</span>
                    </span>
                </li>
            </ul>
        </div>
        <!-- 详细地址 -->
        <div class="details_addres pr_pl15">
            <ul>
                <li>
                    <span>¥</span>
                    <span style="font-size:30px">{{trainingCampList.price}}</span>
                </li>
                 <span style="color:rgba(147,153,165,1);font-size: 13px;">/ {{trainingCampList.classHour}}课时</span>
               <li>
                   
               </li>
            </ul>
            <ul>
                <li>开始时间</li>
                <li>
                    <span>{{trainingCampList.classDay}}</span>
                </li>
            </ul>
            <ul>
                <li>上课时间</li>
                <li style="width:70%">
                    <span>{{trainingCampList.classStartTime}}</span>
                </li>
            </ul>
            <ul>
                <li>上课门店</li>
                <li>
                    <span>{{trainingCampList.clubName}}</span>
                </li>   
            </ul>
        </div>
        <!-- 场馆简历 -->
        <div class="resume pr_pl15">
            <div style="position: relative;margin-top:15px;">
                <span class="before"></span>
            </div>
        </div>
        <!-- 私教 -->
         <div class="Private_education_stores pr_pl15" @click="toPrivate()">
            <div class="title_text">
                <div class="" >
                    <p>{{coachList.userName}}</p>
                    <p class="text_tag">
                        <span v-for="item in goodCourse" :key="item.id">{{item}}</span>
                    </p>
                </div>
                <div class="Private_avator">
                    <img :src="coachList.headUrl" alt="">
                </div>
                <span class="before"></span>
            </div>
            
        </div>
        <!-- 课程介绍 -->
        <div class="class_introduce pr_pl15">
            <div class="title_text">课程介绍</div>
            <!-- <p class="text_content">你会通过拳击、踢腿动作进行锻炼，此项课程受拳击、散打 和武术的动作启发而来，是完全非接触性、简单易学的大量 运动动量训练课程。</p> -->
        </div>
        <!-- 课约规则 -->
        <!-- <div class="class_rule pr_pl15">
            <div class="title_text">约课规则</div>
            <p class="text_content">你会通过拳击、踢腿动作进行锻炼，此项课程受拳击、散打 和武术的动作启发而来，是完全非接触性、简单易学的大量 运动动量训练课程。</p>
        </div> -->
         <div class="img_view pr_pl15" style="margin-top:20px">
            <img v-for="item in immageDto.courseExplainUrl" :key="item.id" :src="item.url" alt="">
        </div>
        <!-- 预约 -->
        <div class="appointment pr_pl15">
            <div class="appointment_icon" @click="tell()"> 
                <img src="../../assets/images/电话 2@2x.png" alt="">
                <span>联系客服</span>
            </div>
            <van-button class="appointment_btn" v-if="status == 7"  @click="toPay()" type="primary">立即购买</van-button>
            <van-button class="gray" v-if="status == 6" type="primary">已满员</van-button>
            <van-button class="gray" v-if="status == 8" type="primary">已购买</van-button>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import { Button,Popup,Swipe, SwipeItem, Tab, Tabs,Dialog,ImagePreview } from 'vant';
import { GetTrainingCamp,GetTrainingCampStatus } from '@/request/api-liu'
export default {
    data(){
        return{
            swiper:4,
            active:0,
            status:'',
            trainingCampList:{},
            coachList:{},
            userId:'',
            PrivateEducation:{
                url:"http://192.168.10.15/fitalentUserApp/#/Privatedetails",
            },
            Topay:{
                url:"http://192.168.10.15/fitalentUserApp/#/orderDetails",
            },
            immageDto:[],
            tellNumber:'0755-26400830',
            oneImg:require("../../assets/images/1.jpg"),
            twoImg:require('../../assets/images/2.jpg'),
            swiperImgs:[
                'https://img.leoao.com/o_1bpj1t27i1mls139mgvv9251lkprf.png?imageslim',
                'https://img.leoao.com/o_1bpj1t8q11jjb11mbn8bi3psb5rp.png?imageslim&imageView2/1/w/750/h/400',
                'https://img.leoao.com/o_1bpj1t8q1sr0kdi8mbajj63cro.png?imageslim',
                'https://img.leoao.com/o_1bpj1t8q125719b6grq10fgjdjrq.png?imageslim&imageView2/1/w/750/h/400',
                // {
                //     oneImg:require('../../assets/images/2.jpg'),
                // },
                // {
                //     oneImg:require('../../assets/images/3.jpg'),
                // },
                // {
                //     oneImg:require('../../assets/images/4.jpg'),
                // },
                // {
                //     oneImg:require('../../assets/images/5.jpg'),
                // }
               
            ],
            goodCourse:[]
        }
        
    },
    components:{
        [Button.name]:Button,
        [Popup.name]:Popup,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Tab.name]:Tab,
        [Tabs.name]:Tabs,
        [Tabs.Dialog]:Dialog
    },
    mounted(){
        window.scrollTo(0,0)
        this._initSwiper();
    },
    created(){
        this.userId = this.$route.query.userId;
        this.courseId = this.$route.query.courseId;
        this.init()
    },
    methods:{
        init(){
            GetTrainingCamp({
              trainingCampBusinessId:this.courseId
            }).then(res=>{
                this.trainingCampList = res.data.obj
                this.coachList = res.data.obj.coach
                this.immageDto = res.data.obj.immageDto
                this.goodCourse = res.data.obj.coach.goodCourse.split(",")
                this.swiperImgs = this.immageDto.spreadUrl
            })
            GetTrainingCampStatus({
                courseId:this.courseId,
                userId:this.userId,
            }).then(res=>{
                this.status = res.data.obj.status
            })
        },
        tell(){
            window.location.href='tel://'+this.tellNumber
        },
        swiperImgClick(){
            const imgList = []
            for(var i=0;i<this.immageDto.spreadUrl.length;i++){
                imgList.push(this.immageDto.spreadUrl[i].url)
            }
            ImagePreview(imgList)
        },
        toPay(){
            this.$router.push({
                path:'/orderDetails?courseId='+this.courseId+'&userId='+this.userId,
            })
        },
        appointment(){
           Dialog.confirm({
                title: '确认预约',
                message: '您将预约FHIT-中强度有氧搏击 操LOP团课 上课时间： 03.02 / 周一 / 19:30～20:30',
                className:'dialog'
                }).then(() => {
                // on confirm
                      Dialog.confirm({
                        message: '预约成功',
                        confirmButtonText:'查看课程',
                        cancelButtonText:'返回'
                        }).then(() => {
                        // on confirm
                        }).catch(() => {
                        // on cancel
                    });
                }).catch(() => {
                // on cancel
            });
        },
        toPrivate(item){
            // let url  = {
            //     url: this.PrivateEducation.url + "?coachId=" + this.coachList.coachId + "&userId=" + this.userId
            // }
            // console.log("TrainingCamp jump url:" + url.url)
            // if(this.isAndroid){
            //     window.andriod.postMessage(JSON.stringify(url))
            // }else if (this.isiOS){
            //     window.webkit.messageHandlers.toTrainingCamp.postMessage(this.TrainingCamp)
            // }
             this.$router.push({
                  path:'/Privatedetails?coachId='+this.coachList.coachId+'&userId='+this.userId,
            })
        },
        // swiper
        _initSwiper(){
            var mySwiper2 = new Swiper('.swiper-container',{
                slidesPerView : 'auto',
                 paginationClickable: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                })
        }
    }
}
</script>
<style scoped lang=less>
    .storeDetails{
        font-size: 18px;
        background: #fff;
        padding-bottom: 80px;
        /* padding: 15px; */
        overflow: hidden;
        .header_swiper{
            border-radius: 4px;
            height: 160px;
            .van-swipe-item:nth-child(odd){
                background-color: #fff
            }
            .van-swipe-item:nth-child(even){
               background-color: #fff
            }
            img{
                display: block;
                width: 100%;
            }
        }
        #span_buttom{
            span{
                background: rgba(242,242,242,1);
                border-radius: 11px;
                padding: 3px 10px; 
                margin-right: 10px;
            }
        }
        .addres{
            .addres_text{
                span{
                    font-size: 12px;
                    color:rgba(147,153,165,1);
                    padding:12px;
                    margin:10px 0px;
                }
            }
            ul{
                position: relative;
                padding: 20px 0px;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                li:first-child{
                    display: flex;
                    justify-content:flex-start;
                    flex-flow: column wrap;
                    align-items: flex-start;
                    letter-spacing: 1px;
                     font-size: 20px;
                    color:#101D37;
                    font-weight: 600;
                }
                li:nth-child(2){
                    padding:8px;
                    position: relative;
                    .Dividing_line{
                        position: absolute;
                        height: 100%;
                        width:1px;
                        background-color: #ccc;
                        top:0;
                        bottom:0;
                    }
                }
            }
        }
        .details_addres{
            position: relative;
            ul{
                padding: 10px 0;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                li:nth-child(1){
                    align-self: flex-start;
                    margin-right: 7px;
                }
                li:nth-child(2){
                    display: flex;
                    flex-flow: column wrap;
                    justify-content: flex-start;
                    align-content: space-between;
                    font-size: 13px;
                    span:nth-child(2){
                        font-size: 10px;
                        text-align: left
                    }
                }
                li:nth-child(3){
                    align-self: flex-start
                }
            }
        }
        .resume{
            position: relative;
            line-height: 20px;
            .title_text{
                font-size: 15px;
                color: #101D37;
                font-weight: bold;
                text-align: left;
                padding-bottom: 8px;
            }
            dt{
                font-size: 13px;
                color: #515A6B
            }
            
        }
        .Private_education_stores{
                /* width: 100%; */
                
           .title_text{
               position: relative;
               display: flex;
               justify-content: space-between;
               align-items: center;
               padding:15px 0px;
                .text_tag{
                  /* margin: 15px 0px; */
                span{
                    padding:5px 10px;
                    font-size:12px;
                    font-weight:400;
                    color:rgba(178,182,188,1);
                    height: 20px;
                    border-radius: 14px;
                    border: 1px solid rgba(237,237,240,1);
                    margin-top:10px;
                    display: inline-block;
                    margin-right:10px;
                }
            }
           }
           .Private_avator{
               img{
                width: 54px;
                height:54px;
                border-radius: 50%;
               }
           }
        }
        .appointment{
            display: flex;
            justify-content: space-around;
            padding: 15px;
            position: fixed;
            bottom: 0;
            left: 0;
            background: #fff;
            width: 100%;
            .appointment_icon{
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size:12px;
                font-weight:400;
                color:rgba(147,153,165,1);
                line-height:17px;
                img{
                    width:25px;
                }
            }
            .appointment_btn{
                width:273px;
                height:45px;
                background:rgba(29,206,116,1);
                border-radius:23px;
                font-size: 17px;
                margin-right: 15px;
            }
            .gray {
                width: 273px;
                height: 45px;
                background: rgb(172, 175, 174);
                border-radius: 23px;
                font-size: 17px;
                margin-right: 15px;
                border: 0.02667rem solid #acafae;
            }
        }
        .img_view{
            img{
                width: 100%;
            }
        }
        .dialog{
             .van-dialog__message{
                padding:0 20px;
            }
        }
        .class_introduce, .class_rule{
            margin-top: 30px;
            .text_content{
                font-size:13px;
                font-weight:400;
                color:rgba(81,90,107,1);
                line-height:18px;
            }
        }
        .Course_list{
            
            ul{
                padding: 15px 0;
                display: flex;
                justify-content: flex-start;
                flex-flow: row wrap;
                position: relative;
                li:nth-child(1){
                    width: 100px;
                    height: 80px;
                    padding-right: 15px;
                    border-radius: 5px;
                    img{
                        display: block;
                        max-width: 100%;
                        height: 100%;
                        border-radius: 5px;
                    }
                }
                li:nth-child(2){
                    display:flex;
                    flex-flow: column wrap;
                    justify-content: space-around;
                    align-content: space-between;
                    font-size: 12px;
                    color: #515A6B;
                    span:nth-child(1){
                        font-size: 15px;
                        color: #101D37;
                        font-weight: bold;
                    }
                }
                
                    .van-button{
                        height: 22px;
                        width: 60px;
                        border-radius: 30px;
                        position:absolute;
                        bottom: 15px;
                        right: 10px;
                        line-height: 0;
                        font-size: 10px;
                        color:#fff;
                    }
                
            }
            ul:last-child{
                .before{
                    height: 0;
                }
            }
        }
        .Training_camp{
            padding-top:25px;
            .title_text{
                font-size:17px;
                color: #101D37;
                font-weight: bold;
            }
        
            .Training_camp_list{
            
            padding-top:20px;
            ul{
                display:flex;
                flex-flow: column wrap;
                justify-content: flex-start;
                margin-bottom: 15px;
                border-radius: 5px;
                box-shadow: 0 3px 5px #ccc;
                padding-bottom: 5px;
                li:nth-child(1){
                    height: 130px;
                    position:relative;
                    img{
                        width:100%;
                        border-radius: 5px 5px 0 0;
                        display: block;
                        height: 100%;
                    }
                    span{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        background-color: rgba(0,0,0,.5);
                        font-size:10px;
                        color: #fff;
                        padding: 3px;
                        z-index: 22;
                        padding-left:10px;
                    }
                }
                li:nth-child(2){
                    display: flex;
                    flex-flow: column wrap;
                    justify-content: flex-start;
                    padding: 8px 10px 8px;
                    span:nth-child(1){
                        font-size: 15px;
                        color: #101D37;
                        font-weight: 600;
                        padding-bottom: 5px;
                    }
                    span:nth-child(2){
                        font-size: 12px;
                        color:#1DCE74
                    }
                }
                li:nth-child(3){
                    padding: 8px 10px 10px;
                    font-size: 12px;
                    color: #515A6B;
                    display:flex;
                    flex-flow: column wrap;
                    justify-content: flex-start;
                    align-items: flex-start;
                    position: relative;
                    span:nth-child(1){
                        padding-bottom: 5px;
                    }
                    span:nth-child(2){
                        position: absolute;
                        right: 0;
                        top: 4px;
                        font-size: 10px;
                        z-index: 22;
                        height: 25px;
                        width: 65px;
                        background-color: #1DCE74;
                        color: #fff;
                        text-align: center;
                        line-height: 25px;
                        letter-spacing: 1px;
                    }
                }
            }
        }
        }
    }
</style>