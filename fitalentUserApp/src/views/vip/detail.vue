<template>
    <div class="order_details">
        <div class="order_img pr_pl15">
            <div class="vip_top">
                <div>VIP会员</div>
                 <div v-if="timeStr" style="font-size:13px;font-family:PingFangSC-Regular;font-weight:400;">{{timeStr}}</div>
                <div v-else style="font-size:13px;font-family:PingFangSC-Regular;font-weight:400;">开通即享受会员特权</div>
            </div>
        </div>
        <div class="order_cell">
            <div class="tabs">
                <div class="tab_year" @click="toggleYear()"  :class="{'active':yearShow===true}">
                    <p class="title">年会员</p>
                    <p class="day">365天</p>
                    <p class="money">￥1280</p>
                </div>
                <div class="tab_month" @click="toggleMonth()" :class="{'active':monthShow===true}">
                    <p class="title">月会员</p>
                    <p class="day">30天</p>
                    <p class="money">￥200</p>
                </div>
            </div>
            <div class="year_content pr_pl15" v-if="yearShow">
                <div>
                    <div class="triangle">
                        <img src="../../assets/images/triangle.png" alt="">
                    </div>
                    <div class="line"></div> 
                    <van-cell is-link :border='false'>
                        <div class="privilegeText">
                            <span style="font-size:17px;">会员尊享特权</span>
                            <span>特权说明</span>
                        </div>
                    </van-cell>
                    <div class="privilege">
                        <img src="../../assets/images/分组 4@2x.png" alt="">
                        <img src="../../assets/images/分组 4@2x.png" alt="">
                        <img src="../../assets/images/分组 4@2x.png" alt="">
                        <img src="../../assets/images/分组 4@2x.png" alt="">
                    </div>
                </div>
            </div>
            <div class="month_content pr_pl15" v-if="monthShow">
                <div>
                    <div class="triangle">
                        <img src="../../assets/images/triangle.png" alt="">
                    </div>
                    <div class="line"></div>
                    <van-cell is-link :border='false'>
                        <div class="privilegeText">
                            <span style="font-size:17px;">会员尊享特权</span>
                            <span>特权说明</span>
                        </div>
                    </van-cell>
                    <div class="privilege">
                        <img src="../../assets/images/分组 4@2x.png" alt="">
                        <img src="../../assets/images/分组 4@2x.png" alt="">
                        <img src="../../assets/images/分组 4@2x.png" alt="">
                    </div>
                </div>
            </div>
            
        </div>
         <!-- 预约 -->
       <div class="appointment pr_pl15">
            <van-button class="appointment_btn"  @click="appointment()" type="primary" v-if="timeStr">立即续费</van-button>
            <van-button class="appointment_btn"  @click="appointment()" type="primary" v-else>立即开通</van-button>
        </div>
    </div>
</template>
<script>
import { Tab, Tabs,Radio,Cell, CellGroup } from 'vant';
import { IsVIP,GetVipList } from '@/request/api-liu'
import { appendFile } from 'fs';
export default {
       data(){
        return{
            yearShow:true,
            monthShow:false,
            timeStr:'',
            vipList:[],
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            IsVIP('111').then(res=>{
                if(res.obj){
                    this.timeStr = res.obj
                }
                
            })
            GetVipList().then(res=>{
                this.vipList = res.obj
            })

        },
        
        toggleYear(){
            this.yearShow = true
            this.monthShow = false
        },
        toggleMonth(){
            this.monthShow = true
            this.yearShow = false
        }
    },
     components:{
        [Tab.name]:Tab,
        [Tabs.name]:Tabs,
        [Radio.name]:Radio,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,

    }
}
</script>
<style lang="less" scoped>
    .order_details{
        background: #fff;
        .vip_top{
            width:345px;
            height:80px;
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
            justify-content: flex-start;
            padding-top: 15px;
            img{
                width:100px;
                height: 100px;
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
                background:rgba(223,184,130,1);
            }
            .privilege{
                display: flex;
                // justify-content: space-between;
                margin-top: 20px;
                img{
                    width:60px;
                    margin-right: 35px;
                    height: 60px;
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
                    margin-left: 245px;
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
                img{
                    margin-right: 35px;
                    width:60px;
                    height: 60px;
                }
            } 
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
            .appointment_icon{
                display: flex;
                align-items: center;
                font-weight:400;
                color:rgba(16,29,55,1);
                line-height:24px;
                font-size: 17px;
            }
            .appointment_btn{
                width:273px;
                height:45px;
                background:linear-gradient(270deg,rgba(222,183,128,1) 0%,rgba(246,226,185,1) 100%);
                border-radius:23px;
                font-size: 17px;
                margin-right: 15px;
                text-align: center;
                line-height: 45px;
                color:#fff
            }
        }
    }
</style>
