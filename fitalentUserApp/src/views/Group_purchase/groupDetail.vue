<template>
    <div class="order_details">
        <div class="order_img pr_pl15">
            <div class="vip_top">
                <div class="p15">
                    <div class="header_info pb15">
                        <ul>
                            <li class="vipMesg">

                                <span>VIP会员</span>
                                <!-- <img :src="immageDto.coverUrl!== (null && undefined) ? immageDto.coverUrl.url : ''" alt=""> -->
                            </li>
                            <li>
                                <dt>年会员</dt>
                                <dt>
                                    <em class="num">￥</em>
                                    <span class="num">1000</span>
                                    <span>/365天</span>
                                </dt>
                                <dt>
                                    <span>¥1280/365天</span>
                                </dt>
                            </li>
                            <li style="">
                                <img src="../../assets/images/拼团中@2x.png" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="order_cell pr_pl15">
            <div class="count_down">
                <span>剩余 </span>
                <span class="number">{{day}}</span>
                <span> : </span>
                <span class="number">{{hour}}</span>
                <span> : </span>
                <span class="number">{{min}}</span>
                <span> : </span>
                <span class="number">{{second}}</span>
                <span> 结束</span>
            </div>
            <div class="count_text">
                <span>还差几人成团</span>
            </div>
            <div class="avatar">
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
            </div>
            <div class="appointment">
                <div class="appointment_btn">
                    <div @click="appointment()">立即参团</div>
                </div>
                <div>拼团规则</div>
            </div>
        </div>
        <div>
            <van-popup v-model="show" overlay-class="popup">
                <div class="popup">
                    <div class="title">复制专享码，参加APP专享团</div>
                    <div>
                        <span>1</span>
                        <span>点击下面‘复制’按钮，复制口令</span>
                    </div>
                    <div style="display:flex;justify-content: center;">
                        <input type="text" class="input">
                        <span class="copy">复制</span>
                    </div>
                     <div>
                        <span>2</span>
                        <span>复制成功后，请前往最新健康传奇APP</span>
                    </div>
                    <div style="display:flex;justify-content: center;">
                        <div class="btn">马上去健康传奇APP参团</div>
                    </div>
                </div>
            </van-popup>
        </div>
         <!-- 预约 -->
    </div>
</template>
<script>
import { Tab, Tabs,Radio,Cell,Popup,CellGroup,Dialog,Button } from 'vant';
import { IsVIP,GetVipList,HaveHeadAuth} from '@/request/api-liu'
import { appendFile } from 'fs';
export default {
       data(){
        return{
            yearShow:true,
            monthShow:false,
            yearObj:[],
            show: false,
            monthObj:{},
            uid:'',
            day:'',
            hour:'',
            min:'',
            second:'',
            endDate2: '2019-06-13 11:41:00',
            userId:'',
            timeStr:'',
            vipList:[],
        }
    },
    created(){
        this.userId = this.$route.query.userId
        this.init()
         var that = this;
        that.countTime()
    },
    methods:{
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
                ms = Math.floor(leftTime % 1000);
                ms = ms < 100 ? "0" + ms : ms
                s = s < 10 ? "0" + s : s
                m = m < 10 ? "0" + m : m
                h = h < 10 ? "0" + h : h
                that.day = d
                that.hour = h
                that.min = m
                that.second = s
                //递归每秒调用countTime方法，显示动态时间效果
                setTimeout(this.countTime, 100);
                } else {
                console.log('已截止')
                that.countdown = '拼团时间已到'
                }
            
            },
        init(){
            IsVIP(this.userId).then(res=>{
                if(res.data.obj){
                    this.timeStr = res.data.obj
                }
                
            })
            GetVipList().then(res=>{
                this.yearObj = res.data.obj.filter((item=>{
                    if(item.type == 1000){
                        return item.uid
                    }
                }))
                this.monthObj = res.data.obj.filter((item=>{
                    if(item.type == 1001){
                        return item.uid
                    }
                }))
                this.uid = this.yearObj[0].uid
            })

        },
        appointment(){
            this.show = true
            return
             HaveHeadAuth(this.userId).then(res=>{
                if(res.data.obj){
                     this.$router.push({
                        path:'/purchaseVip?uid='+this.uid+'&userId='+this.userId,
                    })
                }else{
                    Dialog.confirm({
                    title: '您还未进行人脸认证',
                   // message: '您将预约FHIT-中强度有氧搏击 操LOP团课 上课时间： 03.02 / 周一 / 19:30～20:30',
                    confirmButtonText:'去认证',
                    cancelButtonText:'继续开通'
                    }).then(() => {
                    // on confirm
                        if(this.isAndroid){
                            window.andriod.postMessage(JSON.stringify({
                                type:'takeFace'
                            }))
                        }else if(this.isiOS){
                            window.webkit.messageHandlers.takeFace.postMessage({
                                type:'takeFace'
                            })
                        }

                    }).catch(() => {
                    // on cancel
                        this.$router.push({
                            path:'/purchaseVip?uid='+this.uid+'&userId='+this.userId,
                        })
                });
                }
            })
           
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
        [Popup .name]:Popup 

    }
}
</script>
<style lang="less" scoped>
    .order_details{
        background: #fff;
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
                        margin-right: 15px;
                        width: 100px;
                        height: 100px;
                        background: linear-gradient(315deg,rgba(222,183,128,1) 0%,rgba(246,226,185,1) 100%);
                        border-radius: 6px;
                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
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
            .input{
                width:166px;
                height:40px;
                background:rgba(242,242,242,1);
                border-radius:2px 0px 0px 2px;
                list-style: none;
                border: none;
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
                margin-left: 35px;
                margin-top: 10px;
            }
        }
        .order_cell{
            text-align: center;
            margin-top: 30px;
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
                margin-top: 200px;
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
