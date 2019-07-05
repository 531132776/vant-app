<template>
<!-- <div> -->
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <div class="order_details">
        <div class="order_img pr_pl15">
            <div class="vip_top">
                <div class="p15">
                    <div class="header_info pb15">
                        <ul @click="toDetail()">
                            <li class="vipMesg">
                                <!-- <span>VIP会员</span> -->
                                <img style="width: 100px;height: 100px;margin: 0;" :src="detail.thumbnailUrl!== (null && undefined) ? detail.thumbnailUrl : '../../assets/images/缩略图.png'" alt="">
                            </li>
                            <li>
                                <dt>{{detail.goodsName}}</dt>
                                <dt>
                                    <em class="num">￥</em>
                                    <span class="num">{{detail.groupMemberPrice}}</span>
                                    <span>/{{detail.numPerUnit}}天</span>
                                </dt>
                                <dt>
                                    <span>¥{{detail.goodsPrice}}/{{detail.numPerUnit}}天</span>
                                </dt>
                            </li>
                            <li style="">
                                <div v-if="detail.status == 0">
                                    <img src="../../assets/images/拼团中@2x.png" alt="">
                                </div>
                                <div v-if="detail.status == 1">
                                    <img src="../../assets/images/拼团中@2x.png" alt="">
                                </div>
                                <div v-if="detail.status == 2">
                                    <img src="../../assets/images/拼团中@2x(2).png" alt="">
                                </div>
                                <div v-if="detail.status == 3">
                                    <img src="../../assets/images/拼团中@2x(1).png" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="order_cell pr_pl15">
            <div v-if="countdown" class="group">{{countText}}</div>
            <div class="count_down" v-if="!countdown">
                <span>剩余 </span>
                <!-- <span class="number">{{day}}</span>
                <span> : </span> -->
                <span class="number">{{hour}}</span>
                <span> : </span>
                <span class="number">{{min}}</span>
                <span> : </span>
                <span class="number">{{second}}</span>
                <span> 结束</span>
            </div>
            <div class="count_text" v-if="!countdown">
                <span>还差{{people}}人成团</span>
            </div>
            <!-- <div class="avatar">
                <div style="position: relative;">
                    <img src="../../assets/images/还差1@2x.png" alt="">
                    <span class="captain">团长</span>
                </div>
                <div>
                    <img src="../../assets/images/还差1@2x.png" alt="">
                </div>
                <div>
                    <img src="../../assets/images/还差1@2x.png" alt="">
                </div>
            </div> -->
             <!-- 门店私教 -->
            <div class="Private_education_stores ">
                <div class="scroll_overflow">
                    <div class="coverDiv"></div>
                    <div class="swiper_list" :class="detail.memberSizePerGroup < 5 ?'aaa':'bbb'">
                    <!-- <div class="swiper-container"> -->
                        <!-- <div class="swiper-wrapper"> -->
                            <div v-for="(item,i) in coachList" :key="i">
                                <div  class="swiper-slide" >
                                    <div class="swiper_list_dt">
                                    <ul>
                                        <li :class="i == 0? 'relative':'bbb'">
                                            <img :src="item" alt="">
                                            <span v-if="i == 0" class="captain">团长</span>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                
                            </div>
                        <!-- </div> -->
                    <!-- </div> -->
                </div>
            </div>
        </div>
            <div class="appointment">
                <div class="appointment_btn" v-if="share != 1">
                    <div v-if="from == 0">
                        <div v-if="detail.status == 1">
                             <div v-if="detail.hasJoin == 0">
                                <div v-if="detail.canBuy != 1">此商品您已达到拼团上限</div>
                                <div @click="appointment()" v-if="detail.canBuy == 1">立即参团</div>
                            </div>
                            <div v-if="detail.hasJoin != 0">
                                <div @click="inviteToGroup()">邀请好友参团</div>
                            </div>
                        </div>
                        <div v-if="detail.status == 2" @click="toList()">查看更多拼团商品</div>
                        <div v-if="detail.status == 3" @click="toList()">查看更多拼团商品</div>
                    </div>
                    <div v-if="from == 1">
                        <div v-if="detail.status == 1">
                            <div v-if="detail.hasJoin == 0">
                                <div v-if="detail.canBuy != 1">此商品您已达到拼团上限</div>
                                <div @click="appointment()" v-if="detail.canBuy == 1">立即参团</div>
                            </div>
                            <div v-if="detail.hasJoin != 0">
                                <div @click="inviteToGroup()">邀请好友参团</div>
                            </div>
                        </div>
                        <div v-if="detail.status == 2" @click="toList()">查看更多拼团商品</div>
                        <div v-if="detail.status == 3" @click="toList()">查看更多拼团商品</div>
                    </div>
                    
                </div>
                <div class="appointment_btn" v-if="share == 1">
                    <div @click="appointment()" v-if="detail.status == 1">立即参团</div>
                    <div @click="toDownApp()" v-if="detail.status == 2">前往健康传奇APP查看更多拼团商品</div>
                    <div @click="toDownApp()" v-if="detail.status == 3">前往健康传奇APP查看更多拼团商品</div>
                </div>
                <div @click="toRule">拼团规则</div>
            </div>
        </div>
        <div>
            <van-popup v-model="show" overlay-class="popup">
                <div class="popup">
                    <div class="title">复制专享码，参加APP专享团</div>
                    <div style="display:flex;margin-top:10px;">
                        <span class="num1">
                            <img src="../../assets/images/11@2x.png" alt="">
                        </span>
                        <span>点击下面"复制"按钮,复制口令</span>
                    </div>
                    <div style="display:flex;justify-content: center;margin-top:10px;">
                        <input type="text" v-model="sysAppIds" class="input">
                        <span class="copy"
                            v-clipboard:copy="sysAppIds"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                        >复制</span>
                    </div>
                     <div style="display:flex;margin-top:10px;">
                        <span class="num2">
                            <img src="../../assets/images/22@2x.png" alt="">
                        </span>
                        <span>复制成功后，请前往最新健康传奇APP</span>
                    </div>
                    <div style="display:flex;justify-content: center;margin-top:10px;">
                        <div class="btn" @click="toDownApp">马上去健康传奇APP参团</div>
                    </div>
                </div>
            </van-popup>
        </div>
         <!-- 预约 -->
    </div>
    <!-- </van-pull-refresh> -->
<!-- </div> -->
</template>
<script>
import Swiper from 'swiper';
import { Tab, Tabs,Radio,Cell,SwipeItem,Popup,CellGroup,PullRefresh,Dialog,Button,Toast } from 'vant';
import { IsVIP,GroupShopDetail,HaveHeadAuth,PostTokenId} from '@/request/api-liu'
import { appendFile } from 'fs';
export default {
       data(){
        return{
            yearShow:true,
            monthShow:false,
            sysAppIds:'sss',
            countdown:false,
            isLoading: false,
            countText:'',
            yearObj:[],
            show: false,
            coachList:[],
            monthObj:{},
            uid:'',
            day:'',
            hour:'',
            min:'',
            people:null,
            detail:'',
            second:'',
            endDate2: '',
            userId:'',
            from:'',
            timeStr:'',
            share:null,
            vipList:[],
        }
    },
    created(){
        this.userId = this.$route.query.userId
        this.share = this.$route.query.share
        this.from = this.$route.query.from
        this.init()
    },
    methods:{
         onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.init();
            }, 500);
        },
        toList(){
            this.$router.push({
                    path:'/groupList/showShareBtn',
            })
        },
        toDetail(){
            if(this.share){
                this.$router.push({
                    path:'/yearDetail/showShareBtn?groupId='+this.detail.groupId+'&userId='+this.userId+'&share=1',
                }  )
            }else{
                this.$router.push({
                    path:'/yearDetail/showShareBtn?groupId='+this.detail.groupId+'&userId='+this.userId,
                })
            }
            
        },
        countTime() {
                var that = this;
                var date = new Date();
                var now = date.getTime();
                var endDate = new Date(that.endDate2);//设置截止时间
                var end = endDate.getTime();
                var leftTime = end - now; //时间差                              
                var d, h, m, s, ms;
                if (leftTime >= 0) {
                    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                    m = Math.floor(leftTime / 1000 / 60 % 60);
                    s = Math.floor(leftTime / 1000 % 60);
                    ms = Math.floor(leftTime % 10);
                    // ms = ms
                    s = s < 10 ? "0" + s : s
                    m = m < 10 ? "0" + m : m
                    h = h < 10 ? "0" + h : h
                    that.day = ms
                    that.hour = h
                    that.min = m
                    that.second = s
                    //递归每秒调用countTime方法，显示动态时间效果
                    setTimeout(this.countTime, 10);
                } else {
                    console.log('已截止')
                    that.countText = '拼团时间已到'
                    that.countdown = true
                    GroupShopDetail(this.$route.query.activityId,this.$route.query.userId).then(res=>{
                        this.detail = res.data.obj
                    })
                
                }
            },
        init(){
            GroupShopDetail(this.$route.query.activityId,this.$route.query.userId).then(res=>{
                this.detail = res.data.obj
                this.coachList = res.data.obj.memberShipHeadShotUrlList
                this.people = res.data.obj.memberSizePerGroup - res.data.obj.currentSize
                this.endDate2 = res.data.obj.expireTime.replace(/-/g,'/')
                var that = this;
                that.countTime()
                for(var i= 0;i<this.people;i++){
                   this.coachList.push('https://isportcloud.oss-cn-shenzhen.aliyuncs.com/manager/还差1@2x.png')
                }
                if(this.people == 0){
                    this.countdown = true
                    this.countText = '名额已满'
                }
            })

        },
        inviteToGroup(){
             if(this.isAndroid){
                window.andriod.postMessage(JSON.stringify({
                    type:'shareGroupBuy'
                }))
            }else if(this.isiOS){
                window.webkit.messageHandlers.takeFace.postMessage({
                    type:'shareGroupBuy'
                })
            }
        },
        onCopy(e){
            Toast({
                message: '复制成功',
                duration: 3000,
            });
        },
        onError(e){
            Toast({
                message: '复制失败',
                duration: 3000,
            });
        },
        toDownApp(){
            if(this.isAndroid){
                window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.jkcq.gym.phone'  
            }else if(this.isiOS){
                window.location.href = 'https://itunes.apple.com/us/app/id1298370833?ls=1&mt=8'
            }
        },
        toRule(){
            this.$router.push({
                path:'../groupRule',
            })
        },
        appointment(){
            if(this.share){
                this.show = true
                PostTokenId({id:this.$route.query.activityId}).then(res=>{
                        this.sysAppIds = res.data.obj
                    }   
                )
            }else{
                this.$router.push({
                    path:'/purchaseGroupVip?groupId='+this.detail.groupId+'&userId='+this.userId+'&activityId='+this.detail.activityId,
                })
            }
            //  HaveHeadAuth(this.userId).then(res=>{
            //     if(res.data.obj){
            //          this.$router.push({
            //             path:'/purchaseVip?uid='+this.uid+'&userId='+this.userId,
            //         })
            //     }else{
            //         Dialog.confirm({
            //         title: '您还未进行人脸认证',
            //        // message: '您将预约FHIT-中强度有氧搏击 操LOP团课 上课时间： 03.02 / 周一 / 19:30～20:30',
            //         confirmButtonText:'去认证',
            //         cancelButtonText:'继续开通'
            //         }).then(() => {
            //         // on confirm
            //             if(this.isAndroid){
            //                 window.andriod.postMessage(JSON.stringify({
            //                     type:'takeFace'
            //                 }))
            //             }else if(this.isiOS){
            //                 window.webkit.messageHandlers.takeFace.postMessage({
            //                     type:'takeFace'
            //                 })
            //             }

            //         }).catch(() => {
            //         // on cancel
            //             this.$router.push({
            //                 path:'/purchaseVip?uid='+this.uid+'&userId='+this.userId,
            //             })
            //     });
            //     }
            // })
           
        },
        toggleYear(){
            this.yearShow = true
            this.monthShow = false
            this.uid = this.yearObj[0].uid
        },
        toggleMonth(){
            this.monthShow = true
            this.yearShow = false
            this.uid = this.monthObj[0].uid
        }
    },
     components:{
        [Tab.name]:Tab,
        [Tabs.name]:Tabs,
        [Radio.name]:Radio,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Dialog.name]:Dialog,
        [Button.name]:Button,
        [Popup .name]:Popup,
        [Swiper.name]:Swiper,
        [Toast.name]:Toast,
        [PullRefresh.name]:PullRefresh

    }
}
</script>
<style lang="less" scoped>
    .van-pull-refresh{
        overflow: initial;
    }
    .order_details
    {
        background: #fff;
        height: 100%;
        .vip_top{
            width:355px;
            height:137px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 18px 0px rgba(220,170,143,0.4);
            border-radius:2px;
            .header_info {
                position: relative;
                .vipMesg{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 17px;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: rgba(125,86,30,1);
                    line-height: 24px;
                }
                ul {
                    display: flex;
                    justify-content: flex-start;
                    flex-flow: row nowrap;
                    li:nth-child(1) {
                        margin-right: 10px;
                        
                        // background: linear-gradient(315deg,rgba(222,183,128,1) 0%,rgba(246,226,185,1) 100%);
                        border-radius: 6px;
                        img {
                            display: block;
                            width: 100px;
                            height: 100px;
                            border-radius: 8px;
                        }
                    }
                    li:nth-child(2) {
                        display: flex;
                        // justify-content: space-between;
                        align-content: flex-start;
                        flex-flow: column nowrap;
                        dt:nth-child(1){
                            font-size: 17px;
                            font-weight: 600;
                        }
                        dt:nth-child(2) {
                            margin-top: 15px;
                            font-size:11px;
                            font-family:PingFangSC-Semibold;
                            color:rgba(125,86,30,1);
                            .num{
                                font-weight: 600;
                                font-size: 15px;
                            }
                        }
                        dt:nth-child(3){
                            height:16px;
                            font-size:11px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(178,182,188,1);
                            line-height:16px;
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }
        .Private_education_stores {
            /* width: 100%; */
            /* position: relative; */
            .scroll_overflow {
                overflow: hidden;
                width: 100%;
                position: relative;
                .coverDiv{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    height: 15px;
                    background-color: #fff;
                    z-index: 111;
                }
                .swiper_list::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                }
                .aaa{
                        justify-content: center;
                    }
                .swiper_list {
                    padding: 20px 0;
                    /* width: 100%; */
                    overflow-y: scroll;
                    -webkit-overflow-scrolling: touch;
                    display: flex;
                    flex-flow: row nowrap;
                    
                    
                    .swiper-slide {
                        width: 50px;
                        margin-right: 10px;
                        border-radius: 5px;
                        .relative {
                            position: relative;
                        }
                        .captain{
                            width:38px;
                            height:13px;
                            background:rgba(223,185,130,1);
                            border-radius:7px;
                            font-size:9px;
                            color:rgba(255,255,255,1);
                            display: inline-block;
                            position: absolute;
                            top: 45px;
                            left: 5%;
                        }
                        .waman {
                            background-color: rgb(242, 192, 87);
                        }
                        .swiper_list_dt {
                            border-radius: 5px;
                            ul {
                                display: flex;
                                flex-flow: column nowrap;
                                justify-content: center;
                                align-content: center;
                                padding: 10px 0;
                                border-radius: 5px;
                                color: #fff;
                                text-align: center;
                                li:nth-child(1) {
                                    border: 2px solid #fff;
                                    height: 62px;
                                    margin: 0 auto;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    overflow: hidden;
                                    background: #fff;
                                    img {
                                        // width: 100%;
                                        width: 42px;
                                        height: 42px;
                                        border-radius: 100%;
                                        // max-width: 100%;
                                        display: block;
                                        // max-height: 100%;
                                        // border-radius: 100%;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .van-popup{
            border-radius: 8px;
        }
        .popup{
            width:240px;
            height:203px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            padding:20px 10px;
            font-size:15px;
            .title{
                height:21px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(16,29,55,1);
                line-height:21px;
                text-align: center;
            }
            .num1{
                // background: url('../../assets/images/11@2x.png');
                img{
                    margin-top: 4px;
                    margin-right: 4px;
                    width:16px;
                    height: 16px;
                }
               
            }
            .num2{
                // background: url('../../assets/images/22@2x.png')
                img{
                    margin-top: 4px;
                    margin-right: 4px;
                    width:16px;
                    height: 16px;
                }
                
            }
            .input{
                width:166px;
                height:40px;
                background:rgba(242,242,242,1);
                border-radius:2px 0px 0px 2px;
                list-style: none;
                border: none;
                text-indent: 24px;
            }
            .copy{
                width:50px;
                height:40px;
                background:rgba(247,124,68,1);
                border-radius:0px 2px 2px 0px;
                display: inline-block;
                line-height: 40px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                text-align: center;
                color:rgba(255,255,255,1);
            }
            .btn{
                width:230px;
                height:34px;
                background:linear-gradient(90deg,rgba(252,186,102,1) 0%,rgba(247,124,68,1) 100%);
                border-radius:23px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height: 34px;
                text-align: center;
            }
        }
        .details_msg{
            display: flex;
            justify-content: space-between;
            margin: 20px 0px;
            div:first-child{
                display: flex;
                flex-direction: column;
                span:nth-child(1){
                    font-size:20px;
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    color:rgba(16,29,55,1);
                    line-height:28px;
                }
                span:nth-child(2){
                    width:106px;
                    height:17px;
                    font-size:12px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(147,153,165,1);
                    line-height:17px;
                    margin:5px 0px;
                }
                span:nth-child(3){
                    width:57px;
                    height:20px;
                    background:rgba(249,240,220,1);
                    border-radius:12px;
                    text-align: center;
                    line-height: 20px;
                    color:#C58831;
                }
            }
            div:last-child{
                display: flex;
                flex-direction: column;
                text-align: right;
                span:first-child{
                    em{
                        width:9px;
                        height:21px;
                        font-size:15px;
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(125,86,30,1);
                        line-height:21px;
                    }
                    span{
                        width:52px;
                        height:36px;
                        font-size:30px;
                        font-family:BebasNeue;
                        color:rgba(125,86,30,1);
                        line-height:36px;
                        letter-spacing:1px;
                    }
                    .day{
                        width:44px;
                        height:17px;
                        font-size:12px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(125,86,30,1);
                        line-height:17px;
                    }
                }
                span:last-child{
                    height:16px;
                    font-size:11px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(178,182,188,1);
                    line-height:26px;
                }
            }
        }
        .tip{
            text-align: center;
            padding:20px;
            font-weight:400;
            color:rgba(16,29,55,1);
            line-height:21px;
            font-size: 15px;
        }
        .order_img{
            display: flex;
            padding-top: 15px;
            img{
                width:80px;
                margin-left: 20px;
                margin-top: 10px;
            }
        }
        .order_cell{
            text-align: center;
            margin-top: 30px;
            .group{
                height:30px;
                font-size:22px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(16,29,55,1);
                line-height:30px;
            }
            .avatar{
                display: flex;
                justify-content: center;
                .captain{
                    width:38px;
                    height:13px;
                    background:rgba(223,185,130,1);
                    border-radius:7px;
                    font-size:9px;
                    color:rgba(255,255,255,1);
                    display: inline-block;
                    position: absolute;
                    top: 35px;
                    left: 0px;
                }
                img{
                    width:44px;
                    margin-right: 16px;
                }
            }
            .count_text{
                margin: 10px 0px 20px 0px;
                height:30px;
                font-size:22px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(16,29,55,1);
                line-height:30px;
            }
            .count_down{
                margin-top: 60px;
                height:21px;
                font-size:15px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(16,29,55,1);
                line-height:21px;
                .number{
                    color:#fff;
                    width:16px;
                    height:16px;
                    padding: 1px;
                    background:rgba(16,29,55,1);
                    border-radius:2px;
                    display: inline-block;
                    font-weight:400;
                    font-size: 11px;
                    color:rgba(255,255,255,1);
                    line-height:16px;
                }
            }
            .appointment{
                margin-top: 80px;
                .appointment_btn{
                    width:345px;
                    height:45px;
                    background:linear-gradient(90deg,rgba(252,186,102,1) 0%,rgba(247,124,68,1) 100%);
                    border-radius:23px;
                    font-size:17px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:45px;
                    .grapColor{
                        background: rgba(178,182,188,1);
                        border-radius: 23px;
                    }
                }
                div:nth-child(2){
                    height:18px;
                    font-size:13px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(147,153,165,1);
                    line-height:18px;
                    margin:10px 0px;
                }
            }
        }
    }
</style>
