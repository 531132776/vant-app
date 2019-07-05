<template>
    <div class="order_details">
        <div class="order_img pr_pl15">
            <van-swipe :autoplay="3000" indicator-color="white" class="header_swiper ">
                <van-swipe-item v-for="(item,index) in swiperImgs" :key="index">
                    <img :src="item" alt="" @click="swiperImgClick">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="details_msg pr_pl15">
            <div>
                <span>{{obj.goodsName}}</span>
                <span>已有{{obj.successNum}}人拼团成功</span>
                <span>{{obj.memberSizePerGroup}}人团</span>
            </div>
            <div>
                <span>
                    <em style="">￥</em>
                    <span>{{obj.groupMemberPrice}}</span>
                    <span class="day">/{{obj.numPerUnit}}天</span>
                </span>
                <span>¥{{normalPrice}}/{{obj.numPerUnit}}天</span>
            </div>
        </div>
        <div class="order_cell">
            <div class="year_content pr_pl15" v-if="yearShow">
                <div>
                    <div class="line"></div> 
                    <van-cell is-link to="../groupRule" :border='false'>
                        <div class="privilegeText">
                            <span style="font-size:17px;">拼团玩法</span>
                            <span>拼团规则</span>
                        </div>
                    </van-cell>
                    <div class="privilege">
                        <div class="privilegeItem">
                            <img src="../../assets/images/开团@2x.png" alt="">
                            <span>开团/参团 </span>
                        </div>
                        <div class="privilegeItem">
                            <img src="../../assets/images/邀请好友参团@2x.png" alt="">
                            <span>邀请好友参团</span>
                            <span class="liter_text">享受低价</span>
                        </div>
                        <div class="privilegeItem">
                            <img src="../../assets/images/满额成团@2x.png" alt="">
                            <span>满额成团</span>
                            <span class="liter_text">不满额自动退款</span>
                        </div>
                    </div>
                </div>
                 <div style="padding-bottom:100px;">
                    <div class="line"></div> 
                    <van-cell is-link to="/privilegeDetails" :border='false'>
                        <div class="privilegeText">
                            <span style="font-size:17px;">会员尊享特权</span>
                            <span>特权说明</span>
                        </div>
                    </van-cell>
                    <div class="privilege" >
                        <div class="privilegeItem">
                            <img src="../../assets/images/分组 4@2x.png" alt="">
                            <span>团课随心约 </span>
                        </div>
                        <div class="privilegeItem">
                            <img src="../../assets/images/分组 3@2x.png" alt="">
                            <span>全国门店通用</span>
                        </div>
                        <div class="privilegeItem">
                            <img src="../../assets/images/分组 7@2x.png" alt="">
                            <span>器械不限用</span>
                        </div>
                        <div class="privilegeItem">
                            <img src="../../assets/images/分组 8@2x.png" alt="">
                            <span>专属智能</span>
                            <span>心率宝</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <!-- 预约 -->
       <div class="appointment pr_pl15" v-if="!share">
           <div class="appointment_icon" @click="tell()"> 
                <img src="../../assets/images/电话 2@2x.png" alt="">
                <span>联系客服</span>
            </div>
            <van-button class="appointment_btn only"  @click="appointment()" type="primary">
                <span>
                    <em>¥</em>
                    <span style="font-size: 17px;">{{normalPrice}}</span>
                </span>
                <span>单独购买</span>
            </van-button>
            <!-- <van-button class="appointment_btn group"  @click="appointment()" type="primary" v-if="timeStr">立即续费</van-button> -->
            <van-button v-if="obj.canBuy == 1" class="appointment_btn group"  @click="appointmentGroup()" type="primary">
                <span>
                    <span>团长价 </span>
                    <em> ¥</em>
                    <span style="font-size: 17px;">{{obj.groupOwnerPrice}}</span>
                </span>
                <span>去开团</span>
            </van-button>
            <van-button v-if="obj.canBuy == 0" class="appointment_btn group" style="background:rgba(178,182,188,1);" type="primary">
                <span>
                    <span>团长价 </span>
                    <em> ¥</em>
                    <span style="font-size: 17px;">{{obj.groupOwnerPrice}}</span>
                </span>
                <span>此商品您已到达拼团上限</span>
            </van-button>
        </div>
        <div v-if="share" class="appBtn" @click="toApp">
            前往健康传奇APP拼团
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import { Tab, Tabs,Radio,Cell, CellGroup,Dialog,Swipe,
        SwipeItem,ImagePreview } from 'vant';
import { IsVIP,GroupDetail,HaveHeadAuth} from '@/request/api-liu'
import { appendFile } from 'fs';
export default {
       data(){
        return{
            yearShow:true,
            monthShow:false,
            yearObj:[],
            id:'',
            obj:'',
            normalPrice:'',
            share:null,
            monthObj:{},
            swiperImgs: [
                // 'https://img.leoao.com/o_1bpj1t27i1mls139mgvv9251lkprf.png?imageslim',
                // 'https://img.leoao.com/o_1bpj1t8q11jjb11mbn8bi3psb5rp.png?imageslim&imageView2/1/w/750/h/400',
                // 'https://img.leoao.com/o_1bpj1t8q1sr0kdi8mbajj63cro.png?imageslim',
                // 'https://img.leoao.com/o_1bpj1t8q125719b6grq10fgjdjrq.png?imageslim&imageView2/1/w/750/h/400',

            ],
            uid:'',
            userId:'',
            timeStr:'',
            tellNumber:'400 075 5088',
            vipList:[],
        }
    },
    created(){
        this.userId = this.$route.query.userId
        this.groupId = this.$route.query.groupId
        this.share = this.$route.query.share
        this.init()
    },
    methods:{
        init(){
            GroupDetail({
             groupId:this.groupId,
             userId:this.userId
            }).then(res=>{
                this.swiperImgs = res.data.obj.imageList
                this.obj = res.data.obj
                this.normalPrice = this.obj.goodsNum*this.obj.goodsPrice
            })

        },
        //图片预览
        swiperImgClick() {
            ImagePreview(this.swiperImgs)
        },
        tell(){
            window.location.href='tel://'+this.tellNumber
        },
        toApp(){
            if(this.isAndroid){
                    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.jkcq.gym.phone' 
                }else if(this.isiOS){
                    window.location.href = "https://itunes.apple.com/us/app/id1298370833?ls=1&mt=8"
            }
        },
        appointment(){
            this.$router.push({
                path:'/vip?uid='+this.id+'&userId='+this.userId,
            })
        },
        appointmentGroup(){
            this.$router.push({
                path:'/purchaseGroupVip?groupId='+this.groupId+'&userId='+this.userId,
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
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [ImagePreview.name]: ImagePreview,
    }
}
</script>
<style lang="less" scoped>
    .order_details{
        background: #fff;
        .vip_top{
            width:345px;
            height:180px;
            background:linear-gradient(270deg,rgba(222,183,128,1) 0%,rgba(246,226,185,1) 100%);
            border-radius:10px;
            color:rgba(125,86,30,1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 10px;
            font-size:17px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
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
                        text-decoration: none;
                    }
                }
                span:last-child{
                    height:16px;
                    font-size:11px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(178,182,188,1);
                    line-height:26px;
                    text-decoration: line-through;
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
            // display: flex;
            // justify-content: flex-start;
            padding-top: 15px;
            img{
                width:100%;
                height:160px;
                border-radius:8px;
            }
        }
        .order_cell{
            margin-top: 30px;
            
            .tabs{
                padding:0px 15px;
                display: flex;
                justify-content: space-between;
                .tab_year{
                    width:166px;
                    height:120px;
                    background:rgba(255,255,255,0.1);
                    border-radius:8px;
                    border:1px solid rgba(231,232,235,1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .title{
                        font-size:20px;
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(16,29,55,1);
                        line-height:28px;
                    }
                    .day{
                        font-size:15px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(147,153,165,1);
                        line-height:21px;
                    }
                    .money{
                        font-size:17px;
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(125,86,30,1);
                        line-height:24px;
                        margin-top: 10px;
                    }
                }
                .tab_month{
                    width:166px;
                    height:120px;
                    background:rgba(255,255,255,0.1);
                    border-radius:8px;
                    border:1px solid rgba(231,232,235,1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .title{
                        font-size:20px;
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(16,29,55,1);
                        line-height:28px;
                    }
                    .day{
                        font-size:15px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(147,153,165,1);
                        line-height:21px;
                    }
                    .money{
                        font-size:17px;
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(125,86,30,1);
                        line-height:24px;
                        margin-top: 10px;
                    }
                }
                .active{
                        background:rgba(222,183,128,0.1);
                        border-radius:8px;
                        border:1px solid rgba(223,184,130,1);
                }
            }
        }
        .order_text{
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            span:first-child{
                    font-size: 20px;
                    color:#101D37;
                    font-weight: 600;
                    display: inline-block;
                    margin-bottom: 20px;
             }
             span:last-child{
                    font-size:12px;
                    font-weight:400;
                    color:rgba(147,153,165,1);
                    line-height:17px;
             }
        }
        .year_content{
            margin-top: 10px;
            .triangle{
                font-size: 0;
                img{
                    margin-left: 70px;
                    width:18px;
                    height:12px;
                }
            }
            .line{
                width:345px;
                height:1px;
                background:#E7E8EB;
            }
            .privilege{
                display: flex;
                justify-content: space-between;
                margin: 20px 0px;
                .privilegeItem{
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    align-items: center;
                    img{
                        width:60px;
                        height: 60px;
                    }
                    .liter_text{
                        height:16px;
                        font-size:11px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(197,136,49,1);
                        line-height:16px;
                    }
                    span{
                        height:18px;
                        font-size:13px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(125,86,30,1);
                        margin-top: 5px;
                    }
                }
              
            }
        }
        .privilegeText{
            display: flex;
            justify-content: space-between;
            span{
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(16,29,55,1);
                line-height:21px;
            } 
        }
        .month_content{
            margin-top: 10px;
            .triangle{
                font-size: 0;
                img{
                    margin-left: 252px;
                    width:18px;
                    height:12px;
                }
            }
            .line{
                width:345px;
                height:1px;
                background:rgba(223,184,130,1);
            }
            .privilege{
                display: flex;
                // justify-content: space-between;
                margin-top: 20px;
                .privilegeItem{
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    margin-right:35px;
                    align-items: center;
                    img{
                        width:60px;
                        height: 60px;
                    }
                    span{
                        height:18px;
                        font-size:13px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(125,86,30,1);
                        margin-top: 5px;
                    }
                }
            } 
        }
        .van-cell{
            padding: 10px 0px;
        }
        .appBtn{
            width:375px;
            height:50px;
            background:linear-gradient(90deg,rgba(252,186,102,1) 0%,rgba(247,124,68,1) 100%);
            box-shadow:0px 1px 10px 0px rgba(78,144,158,0.12);
            display: flex;
            justify-content: center;
            position: fixed;
            bottom: 0px;
            left:0px;
            width: 100%;
            font-size:17px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height: 50px;
        }
        .appointment
        {
            display: flex;
            justify-content: space-around;
            padding: 15px;
            box-shadow:0px 1px 10px 0px rgba(78,144,158,0.12);
            position: fixed;
            bottom: 0px;
            left:0px;
            width: 100%;
            background: #FFFFFF;
             .appointment_icon{
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size:12px;
                font-weight:400;
                color:#9399A5;
                line-height:17px;
                img{
                    width:25px;
                }
            }
            .appointment_btn{
                
               
                //background:linear-gradient(270deg,rgba(222,183,128,1) 0%,rgba(246,226,185,1) 100%);
                font-size: 11px;
                display: flex;
                flex-direction: column;
                margin-right: 15px;
                justify-content: center;
                text-align: center;

            }
            .only{
                width:105px;
                height:43px;
                border-radius:23px;
                border:1px solid;
                color:#DF7930;
                background: #fff;
            }
            .group{
                height:45px;
                width:158px;
                border-radius:23px;
                background:linear-gradient(90deg,rgba(252,186,102,1) 0%,rgba(247,124,68,1) 100%);
                color: #FFFFFF;
            }
        }
    }
</style>
