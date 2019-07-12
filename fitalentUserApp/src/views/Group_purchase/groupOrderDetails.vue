<template>
    <div class="privatemonthlyOrder">
        <div class="privatemonthlyOrder_content">
            <!-- 头部信息 -->
            <div class="p15">
                <div class="header_info pb15">
                    <ul>
                        <li class="vipMesg">

                            <!-- <span>VIP会员</span> -->
                            <img :src="vipDetail.thumbnailUrl!== (null && undefined) ? vipDetail.thumbnailUrl : ''" alt="">
                        </li>
                        <li>
                            <dt>{{vipDetail.goodsName}}</dt>
                            <dt v-if="!activityId">
                                ¥{{vipDetail.groupOwnerPrice}}/{{vipDetail.numPerUnit}}天
                            </dt>
                             <dt v-if="activityId">
                                ¥{{vipDetail.groupMemberPrice}}/{{vipDetail.numPerUnit}}天
                            </dt>
                        </li>
                    </ul>
                    <span class="before"></span>
                </div>
            </div>
            <!-- 购买项目 -->
            <div class="address_info pr_pl15" v-if="status==2">
                <div class="content_text itemPrice pt_pb15">
                    <ul>
                        <li>
                            购买项目
                        </li>
                        <li>
                            <span v-for="(v,index) in priceItem" :key="index" @click="activeItem(v,index)" :class="[active==index ? 'class-a' : 'class-b']">{{v.explain}}</span>
                        </li>
                    </ul>
                    <span class="before"></span>
                </div>
            </div>
            <!-- 课时数 -->
            <div class="address_info pr_pl15">
                <div class="content_text pt_pb15">
                    <ul>
                        <li>
                            数量
                        </li>
                        <li>
                            <!-- <van-button type="default" @click="monthlyReduce">-</van-button> -->
                            <span class="coures_nmb">{{vipDetail.goodsNum}}</span>
                            <!-- <van-button type="default" @click="monthlyIncrease">+</van-button> -->
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 价格 -->
            <div class="address_info">
                <van-cell-group>
                <div class="grapLine"></div>
                <van-cell @click="popup" is-link>
                    <div class="flex_between">
                        <span>选择优惠券</span>
                        <span style="font-size:15px;color:rgba(147,153,165,1);" v-if="couponListLength && this.couponList.length>0">{{couponName}}</span>
                        <span style="font-size:15px;color:rgba(147,153,165,1);" v-else>{{couponCount}}张可用优惠券</span>
                    </div>
                </van-cell>
                <van-cell >
                    <div class="flex_between">
                        <span>商品价格</span>
                        <span style="color: #1DCE74;" v-if="!activityId">¥{{vipDetail.groupOwnerPrice}}</span>
                        <span style="color: #1DCE74;" v-if="activityId">¥{{vipDetail.groupMemberPrice}}</span>
                    </div>
                </van-cell>
                <van-cell>
                    <div class="flex_between">
                        <span>优惠券</span>
                        <span style="color: #1DCE74;">-¥{{couponValue}}</span>
                    </div>
                </van-cell>
            </van-cell-group>
            </div>
            <div class="grapLine"></div>
            <!-- 协议 -->
            <div class="address_info pr_pl15">
                <div class="content_text pt_pb15">
                    <ul>
                            <li style="width:100%">
                                <dd>购前需知</dd>
                                <dd style="display:flex;justify-content: space-between;" class="Agreement">
                                    <router-link to="/vipAgreement" style="color:#3A5891">同意《健康传奇开通会员协议》</router-link>
                                    <van-checkbox v-model="checked">
                                            <img
                                                style="width:22px;"
                                                slot="icon"
                                                slot-scope="props"
                                                :src="props.checked ? icon.active : icon.normal"
                                            >
                                        </van-checkbox>
                                </dd>
                            </li>
                    </ul>
                </div>
            </div>
             <van-popup v-model="show" position="bottom" :overlay="true">
                <div style="height:480px;background:rgba(242,242,242,1);">
                    <div class="popupTitel">
                        <span>选择优惠券</span>
                        <van-icon @click="show = false" id="close" name="cross" />
                    </div>
                    <div class="popupwarp">
                        <div v-for="item in couponList" :key="item.uid" class="popupItem" style="display:flex">
                            <div class="popupItemOneBlue" v-if="item.couponType == 1">
                                <span style="font-size:17px">{{item.discountValue}}</span>
                                <span v-if="item.couponType == 0">代金券</span>
                                <span v-if="item.couponType == 1">免费券</span>
                            </div>
                            <div class="popupItemOneYellow" v-if="item.couponType == 0">
                                <span style="font-size:17px">{{item.discountValue}}</span>
                                <span v-if="item.couponType == 0">代金券</span>
                                <span v-if="item.couponType == 1">免费券</span>
                            </div>
                            <div class="popupItemTwo">
                                <div class="popupText">
                                    <p>{{item.remark}}</p>
                                    <p>{{item.effectiveTime}}-{{item.expireTime}}</p>
                                </div>
                                <div class="popupIcon">
                                    <van-checkbox v-model="item.checkStatus" >
                                        <img
                                            @click="aaa(item)"
                                            style="width:18px;"
                                            slot="icon"
                                            :src="item.checkStatus ? couponIcon.normal : couponIcon.active"
                                        >
                                    </van-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="popupBottom" @click="choosePopup()">确定</div>
                </div>
            </van-popup>
        </div>
        <!-- 联系客服+购买课程 -->
        <div class="Immediate_purchase">
            <div class="purchase_info">
                <ul>
                    <li>
                        <dt>
                            共计: ¥
                        </dt>
                        <dt>{{Number(totalPrice).toFixed(2)}}</dt>
                    </li>
                    <button class="appointment_btn" @click.stop="vipPayment()" type="primary">
                      去支付
                    </button>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        Button,
        Dialog,
        Checkbox,
        Toast,
        CheckboxGroup,
        Cell, 
        CellGroup,
        Popup,
        Radio,
        Icon
    } from 'vant';
    import {
        generateOrder
    } from '@/request/api'
    import {
        GroupOrderDetail,
        GetCouponRecordList,
        GroupOrder
    } from '@/request/api-liu'
    export default {
        data() {
            return {
                couponListLength:true,
                couponName:'',
                checked: false,
                show:false,
                couponId:null,
                vipDetail:'',
                OrderMen:{},
                showBtn:true,
                afterCoupon:'',
                couponCount:'',
                couponValue:0,
                couponList:[
                ],
                couponIcon:{
                    normal:require("../../assets/images/勾 2@2x(2).png"),
                    active: require('../../assets/images/勾 2@2x(3).png'),
                },
                icon: {
                    normal: require("../../assets/images/勾 2@2x.png"),
                    active: require('../../assets/images/勾 2@2x(1).png'),
                }, 
                phomeIcon: require("../../assets/images/13.png"),
                peopleHead: require('../../assets/images/10.png'),
                oneImg: require('../../assets/images/4.jpg'),
                monthlyNmb: 1, //包月私教
                monthlyTotalPrice: '', //包月私教总价
                nmb: '', //塑行杠铃雕塑
                totalPrice: '', //塑行杠铃雕塑总价
                experiencePrice: '', //体验课价格
                status: this.$route.query.status, //用状态区别进入包月私教页面或体验课页面及页面内容
                active: 0,
                contrastStatus: '',
                educationsectorDetails: {}, //包月课购买
                privateOne: {}, //私教课类型和id
                privateTwo: {}, //私教体验课类型和id
                privateThree: {}, //包月私教课类型和id
                courseItem: 1,
                privateOrderObj: {}, //私教课订单
                privateOrderObj2: {}, //私教体验课订单
                monthOrderObj3: {}, //包月私教订单
                type: 'pay',
                activityId:null,
                userId: this.$route.query.userId
            }
        },
        components: {
            [Button.name]: Button,
            [Dialog.name]: Dialog,
            [Checkbox.name]: Checkbox,
            [Toast.name]: Toast,
            [CheckboxGroup.name]: CheckboxGroup,
            [Cell.name]:Cell, 
            [CellGroup.name]:CellGroup,
            [Popup.name]:Popup,
            [Radio.name]:Radio,
            [Icon.name]:Icon
        },
        mounted() {
        },
        created(){
            this.init()
            this.activityId = this.$route.query.activityId
        },
        methods: {
            init(){
                if(this.$route.query.activityId){
                    var params = {
                       "groupId":this.$route.query.groupId,
                       "activityId":this.$route.query.activityId
                    }
                }else{
                    var params = {
                       "groupId":this.$route.query.groupId,
                    }
                }
                GroupOrderDetail(params).then(res=>{
                    this.vipDetail = res.data.obj
                    this.GetCouponList()
                })
            },
            GetCouponList(){
                GetCouponRecordList({
                    userId: this.$route.query.userId,
                    type:this.vipDetail.goodsType,
                    goodsNum:this.vipDetail.goodsNum,
                    amount:this.activityId ? this.vipDetail.groupMemberPrice:this.vipDetail.groupOwnerPrice,
                }).then(res=>{
                    this.couponCount = res.data.obj.count
                    if(this.activityId){
                        this.totalPrice = this.vipDetail.groupMemberPrice
                    }else{
                        this.totalPrice = this.vipDetail.groupOwnerPrice
                    }
                    if(res.data.obj.list.length > 0){
                        res.data.obj.list[0].checkStatus = true
                        this.couponList = res.data.obj.list
                        this.choosePopup()
                    }
                })
            },
            aaa(item){
                if(!item.checkStatus){
                    this.couponList.map(function(res){
                        if(res.uid != item.uid){
                            res.checkStatus = false
                            return res
                        }
                    
                    })
                }
            },
            popup(){
                if(this.couponCount != 0){
                    this.show = true
                }
            },
            choosePopup(){
                console.log(11)
                this.show = false
                var choosePopup = this.couponList.find((item)=>{
                    if(item.checkStatus == true){
                        return item
                    }
                })
                if(choosePopup){
                    this.couponListLength = true;
                    this.couponName = choosePopup.couponName
                    this.couponId = choosePopup.uid
                    if(choosePopup.couponType == 1){
                        this.couponValue = this.vipDetail.price
                        this.afterCoupon = this.vipDetail.price
                    }else if(choosePopup.couponType == 0){
                        this.couponValue = choosePopup.discountValue
                        this.afterCoupon = this.vipDetail.price - choosePopup.discountValue
                        if(this.afterCoupon < 0){
                            this.afterCoupon = this.vipDetail.price
                        }
                        if(this.activityId){
                            this.totalPrice = (this.vipDetail.groupMemberPrice - choosePopup.discountValue).toFixed(2)
                        }else{
                            this.totalPrice = (this.vipDetail.groupOwnerPrice - choosePopup.discountValue).toFixed(2)
                        }
                        //this.total = this.afterCoupon
                    }
                }else{
                    console.log(111)
                    this.couponValue = 0
                    if(this.activityId){
                        this.totalPrice = this.vipDetail.groupMemberPrice
                    }else{
                        this.totalPrice = this.vipDetail.groupOwnerPrice
                    }
                    this.couponId = ''
                    this.couponListLength = false;
                }
                console.log(choosePopup,'uid')
            },
            //生成订单
            vipPayment(){
                if(!this.checked){
                    Toast('请勾选健康传奇开通会员协议');
                    return
                }
                const appointmentBtn = document.querySelectorAll('.appointment_btn')[0]
                appointmentBtn.setAttribute('disabled','disabled')
                setTimeout (function(){
                    appointmentBtn.removeAttribute('disabled')
                },2000)
                let params =  {   
                    amount: this.vipDetail.goodsNum,
                    couponId:this.couponId?this.couponId:null,
                    productId: this.vipDetail.goodsId,
                    productType: this.vipDetail.type,
                    userId: this.$route.query.userId,
                    groupRuleId: this.$route.query.groupId,
                    groupBuyId: this.$route.query.activityId,
                    orderType: 1,
                    groupRoleType:this.activityId?1:0
                }
                GroupOrder(params).then(res => {
                    this.showBtn = false
                    this.OrderMen = res.data.obj;
                    this.OrderMen.type = 'pay';
                    if(this.isAndroid){
                        window.andriod.postMessage(JSON.stringify(this.OrderMen))
                    } else if (this.isiOS) {
                        console.log(this.OrderMen)
                        console.log(11)
                        window.webkit.messageHandlers.Training_payment.postMessage(this.OrderMen)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .Agreement {
        color: #3A5891 !important;
        font-size: 13px;
    }
    .grapLine{
        height: 10px;
        background: rgba(242,242,242,1);
        width: 100%;
    }
    .van-cell{
        font-size: 17px;
    }
    .van-cell:not(:last-child)::after {
            content: ' ';
            position: absolute;
            pointer-events: none;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            left: 0.4rem;
            right: 0.4rem;
            bottom: 0;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
            border-bottom: 0.02667rem solid #ebedf0;
        }
    .class-a {
        background-color: #1DCE74 !important;
        color: #fff;
    }
    
    .class-b {
        background-color: #ECEDF0;
    }

    .flex_between{
        display: flex;
        justify-content: space-between;
    }
    
    .privatemonthlyOrder_content {
        padding-bottom: 70px;
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
                    justify-content: space-between;
                    align-content: flex-start;
                    flex-flow: column nowrap;
                    dt{
                        font-size: 17px;
                        font-weight: 600;
                    }
                    dt:nth-child(2) {
                        margin-bottom: 15px;
                    }
                }
            }
        }
        .content_text {
            position: relative;
            ul {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-flow: row nowrap;
                li {
                    font-size: 17px;
                    font-weight: 400;
                }
                .price_font {
                    color: #1DCE74;
                    font-weight: 500;
                    em:nth-child(1) {
                        font-size: 12px;
                        font-style: normal;
                    }
                    em:nth-child(2) {
                        font-size: 17px;
                        font-style: normal;
                    }
                    em:nth-child(3) {
                        font-size: 17px;
                        color: #1DCE74;
                    }
                }
                li:nth-child(2) {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    .coures_nmb {
                        width: 44px;
                        height: 26px;
                        display: inline-block;
                        line-height: 26px;
                        text-align: right;
                        font-size: 13px;
                        margin: 0 2px;
                        font-weight: 600;
                    }
                    .van-button {
                        width: 28px;
                        height: 26px;
                        line-height: 20px;
                        text-align: center;
                        padding: 0;
                        font-weight: 600;
                        font-size: 20px;
                        color: #969696;
                    }
                    .van-button:nth-child(1) {
                        background-color: #F6F6F6;
                    }
                    .van-button:nth-child(2) {
                        background-color: #ECEDF0;
                    }
                }
            }
        }
        .itemPrice {
            li {
                span {
                    display: inline-block;
                    background-color: #ECEDF0;
                    font-size: 15px;
                    font-weight: 400;
                    padding: 5px 15px;
                }
                span:nth-child(1) {
                    margin-right: 10px;
                }
            }
        }
    }
    .popupTitel{
            width:100%;
            height:50px;
            background:rgba(255,255,255,1);
            display:flex;
            align-items: center;
            justify-content: space-between;
            // padding-left:15px;
            .van-icon{
                font-size: 25px;
                margin-right: 15px;
            }
            span{
                display: inline-block;
                line-height: 50px;
                font-size:17px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                margin-left: 15px;
                color:rgba(16,29,55,1);
            }
        }
        .popupBottom{
            width: 375px;
            height: 50px;
            background: rgba(29,206,116,1);
            position: fixed;
            bottom: 0;
            font-size:17px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:24px;
            text-align: center;
            line-height: 50px;
        }
        .popupwarp{
            padding-top:10px;
            height: 400px;
            overflow-y: scroll;
            padding-bottom: 60px; 
        }
        .popupItem{
            display: flex;
            padding: 10px 20px;
            .popupItemOneBlue{
                background-image: url(../../assets/images/blue.png);
                background-repeat: no-repeat;
                background-size: contain;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                color: rgba(255,255,255,1);
                width:114px;
                height:104px;
            }
            .popupItemOneYellow{
                background-image: url(../../assets/images/yellow.png);
                background-repeat: no-repeat;
                background-size: contain;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                color: rgba(255,255,255,1);
                width:114px;
                height:104px;
            }
            .popupItemTwo{
                background-image: url(../../assets/images/矩形copy2@2x1.png);
                background-repeat: no-repeat;
                background-size: contain;
                width: 230px;
                height: 104px;
                display: flex;
                justify-content: space-between;
                .popupText{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 15px 10px;
                    // font-size:15px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(16,29,55,1);
                }
                .popupIcon{
                    display: flex;
                    align-self: center;
                    padding-right:10px;
                }
            }   
        }
    .Immediate_purchase {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 333;
        padding: 10px 15px;
        background-color: #fff;
        box-shadow:0px 1px 10px 0px rgba(78,144,158,0.12);
        border-top: 0.5px solid rgba(0, 0, 0, .12);
        .purchase_info {
            ul {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-flow: row nowrap;
                li:nth-child(1) {
                    padding-left: 10px;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    // dt:nth-child(1){
                    //     padding-bottom: 8px;
                    //     width:26px;
                    //     height: 26px;
                    //     img{
                    //         display: block;
                    //         width: 100%
                    //     }
                    // }
                    dt {
                        font-size: 17px;
                        font-weight: 400;
                    }
                }
                button{
                    width: 60%;
                    flex: 0 1 50%;
                    padding: 10px 0;
                    font-size: 17px;
                    color: #fff;
                    font-weight: 400;
                    border-radius: 23px;
                    background: rgba(29, 206, 116, 1);
                    text-align: center;
                    line-height: 1.7;
                    border: none;
                }
            }
        }
    }
</style>