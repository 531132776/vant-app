<template>
    <div class="privatemonthlyOrder">
        <div class="privatemonthlyOrder_content">
            <!-- 头部信息 -->
            <div class="p15">
                <div class="header_info pb15">
                    <ul>
                        <li>
                            <!-- <img :src="immageDto.coverUrl!== (null && undefined) ? immageDto.coverUrl.url : ''" alt=""> -->
                        </li>
                        <li>
                            <dt v-if="status==1">年会员</dt>
                            <dt v-if="status==2">{{privateCourse.courseName}}</dt>
                            <dt v-if="status==0">{{educationexperie.courseName}}</dt>
                            <dt>
                                ￥1280/365天
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
                        <li v-if="status==2">
                            课时数（<em>{{privateCourse.lowestSection}}</em>节起售）
                        </li>
                        <!-- 2是私教课 -->
                        <li v-if="status==2">
                            <van-button type="default" @click="reduce">-</van-button>
                            <span class="coures_nmb">{{nmb}}</span>
                            <van-button type="default" @click="increase">+</van-button>
                        </li>
                        <li v-if="status==0">
                            课时数
                        </li>
                        <li v-if="status==1">
                            数量
                        </li>
                        <!-- 0是私教体验课 -->
                        <li v-if="status==0">
                            <span>1节</span>
                        </li>
                        <!-- 1是包月 -->
                        <li v-if="status==1">
                            <van-button type="default" @click="monthlyReduce">-</van-button>
                            <span class="coures_nmb">{{monthlyNmb}}</span>
                            <van-button type="default" @click="monthlyIncrease">+</van-button>
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
                        <span>张可用优惠券</span>
                    </div>
                </van-cell>
                <van-cell >
                    <div class="flex_between">
                        <span>商品价格</span>
                        <span style="color: #1DCE74;">¥</span>
                    </div>
                </van-cell>
                <van-cell>
                    <div class="flex_between">
                        <span>优惠券</span>
                        <span style="color: #1DCE74;">-¥</span>
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
                                    <router-link to="/privateEducationAgreement" style="color:#3A5891">同意《健康传奇开通会员协议》</router-link>
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
                        <van-icon id="close" name="cross" />
                    </div>
                    <div class="popupwarp">
                        <div v-for="item in couponList" :key="item.uid" class="popupItem" style="display:flex">
                            <div class="popupItemOne">
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
                    <li v-if="status==0">
                        <dt>
                            共计: ¥
                        </dt>
                        <dt>{{experiencePrice}}</dt>
                    </li>
                    <li v-if="status==2">
                        <dt>
                            共计: ¥
                        </dt>
                        <dt>{{Number(totalPrice).toFixed(2)}}</dt>
                    </li>
                    <li v-if="status==1">
                        <dt>
                            共计: ¥
                        </dt>
                        <dt>{{Number(monthlyTotalPrice).toFixed(2)}}</dt>
                    </li>
                    <!-- 私教课支付 -->
                    <li v-if="status==2" @click="DesignatedcoursesPayment()">
                        <span>去支付</span>
                    </li>
                    <!-- 包月支付 -->
                    <li v-if="status==1" @click="monthlyNmbcoursesPayment()">
                        <span>去支付</span>
                    </li>
                    <!-- 私教体验课支付 -->
                    <li v-if="status==0" @click="PrivateeducationPayment()">
                        <span>去支付</span>
                    </li>
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
    export default {
        data() {
            return {
                checked: false,
                show:false,
                couponList:[
                    {
                        "uid": "1127782648666824706",
                        "userId": "1127782637304496129",
                        "couponName": "广东分公司",
                        "couponType": 0,
                        "effectiveTime": "2019-05-12",
                        "expireTime": "2019-05-19",
                        "discountValue": "0.10",
                        "remark": "仅限训练营使用",
                        "discountType": 0,
                        "thresholdType": 0,
                        "thresholdValue": "0.00",
                        "checkStatus": true,
                        "activeAble": 0
                    },
                    {
                        "uid": "1127782648666824701",
                        "userId": "1127782637304496129",
                        "couponName": "广东分公司",
                        "couponType": 0,
                        "effectiveTime": "2019-05-12",
                        "expireTime": "2019-05-19",
                        "discountValue": "0.10",
                        "remark": "仅限训练营使用",
                        "discountType": 0,
                        "thresholdType": 0,
                        "thresholdValue": "0.00",
                        "checkStatus": false,
                        "activeAble": 0
                    },
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
                priceItem: [{
                    explain: '一对一'
                }, {
                    explain: '二对二'
                }, ],
                active: 0,
                privateCourse: {}, //私教课obj
                educationexperie: {}, //私教体验课obj
                immageDto: {
                    courseExplainUrl: null,
                    coverUrl: {},
                    reduceUrl: null,
                    spreadUrl: null
                },
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
            this.status = 1
            console.log(this.status);
            if (this.status == 2) {
                //私教课详情
                this.privateCourse = this.$route.query.obj;
                this.nmb = this.privateCourse.lowestSection;
                this.privateOne = this.$route.query.privateOne;
                this.immageDto = this.privateCourse.immageDto;
                console.log('私教课', this.privateOne);
            } else if (this.status == 0) {
                //私教体验课详情
                this.educationexperie = this.$route.query.obj;
                this.privateTwo = this.$route.query.privateTwo;
                this.immageDto = this.educationexperie.immageDto;
                this.experiencePrice = this.educationexperie.price;
                console.log('私教体验课', this.privateTwo);
            } else if (this.status == 1) {
                //包月课详情
                // this.educationsectorDetails = this.$route.query.obj;
                // this.privateThree = this.$route.query.privateThree;
                // this.immageDto = this.educationsectorDetails.immageDto;
                // this.monthlyTotalPrice = this.educationsectorDetails.price;
                console.log('包月课详情', this.educationsectorDetails)
            }

            this.totalPrice = this.privateCourse.onePrice * this.privateCourse.lowestSection;


            this.$store.commit('getUserId', this.privateOne.privateCourseId)
        },
        methods: {
            popup(){
                this.show = true
            },
            //选中一对一，二对二
            activeItem(v, index) {
                console.log(v, index)
                this.active = index;
                if (index == 0) {
                    this.$set(this, 'contrastStatus', 0);
                    this.totalPrice = this.privateCourse.onePrice * this.privateCourse.lowestSection;
                    this.nmb = this.privateCourse.lowestSection;
                    this.courseItem = 1;
                } else if (index == 1) {
                    this.$set(this, 'contrastStatus', 1)
                    this.totalPrice = this.privateCourse.twoPrice * this.privateCourse.lowestSection;
                    this.nmb = this.privateCourse.lowestSection;
                    this.courseItem = 2;
                }
            },
            //课程计算减
            reduce() {
                this.nmb -= 1;
                if (this.contrastStatus == 0) {
                    this.totalPrice -= this.privateCourse.onePrice
                } else if (this.contrastStatus == 1) {
                    this.totalPrice -= this.privateCourse.twoPrice;
                }

                if (this.nmb <= this.privateCourse.lowestSection) {
                    this.nmb = this.privateCourse.lowestSection;
                    if (this.contrastStatus == 0) {
                        this.totalPrice = this.privateCourse.onePrice * this.privateCourse.lowestSection;
                        // return this.totalPrice = 0
                    } else if (this.contrastStatus == 1) {
                        this.totalPrice = this.privateCourse.twoPrice * this.privateCourse.lowestSection;
                    }
                    Dialog.alert({
                        message: '最低'+this.nmb+'节起售'
                    }).then(() => {
                        // on close
                        // alert(1)
                    });
                }

                //去指定课程(比如：塑形杠铃雕塑)去支付
                // this.DesignatedcoursesPayment(this.totalPrice)
            },
            //课程计算加
            increase() {
                this.nmb += 1;
                if (this.contrastStatus == 0) {
                    this.totalPrice += this.privateCourse.onePrice;
                } else if (this.contrastStatus == 1) {
                    this.totalPrice += this.privateCourse.twoPrice;;
                }

                //去指定课程(比如：塑形杠铃雕塑)去支付
                // this.DesignatedcoursesPayment(this.totalPrice)
            },
            //包月计算减
            monthlyReduce() {
                this.monthlyNmb -= 1;
                this.monthlyTotalPrice -= this.educationsectorDetails.price;
                if (this.monthlyNmb <= 1) {
                    this.monthlyNmb = 1;
                    this.monthlyTotalPrice = this.educationsectorDetails.price;
                    Dialog.alert({
                        message: '不能再减了'
                    }).then(() => {
                        // on close
                        // alert(1)
                    });
                }
                // this.monthlyNmbcoursesPayment(this.monthlyTotalPrice)
            },
            //包月计算加
            monthlyIncrease() {
                this.monthlyNmb += 1;
                this.monthlyTotalPrice += this.educationsectorDetails.price
            },
            //去指定课程(比如：塑形杠铃雕塑)去支付
            DesignatedcoursesPayment() {
                console.log(this.checked)
                if (!this.checked) {
                    Toast('请勾选健康传奇私教服务协议');
                    return
                }
                let params = {
                    courseId: this.privateOne.privateCourseId,
                    userId: this.userId,
                    amount: this.nmb,
                    item: this.courseItem, //类型1对一 1对2
                    courseType: this.privateOne.courseType,
                }
                generateOrder(params).then(res => {
                    console.log('私教课课程总价:' + this.totalPrice);
                    console.log('私教课订单：', res);
                    if (res.data.code == 2000) {
                        this.privateOrderObj = res.data.obj;
                        this.privateOrderObj.type = 'pay';
                        if (this.isAndroid) {
                            window.andriod.postMessage(JSON.stringify(this.privateOrderObj))
                        } else if (this.isiOS) {
                            window.webkit.messageHandlers.Course_payment.postMessage(this.privateOrderObj)
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })

            },
            //包月支付
            monthlyNmbcoursesPayment() {
                if (!this.checked) {
                    Toast('请勾选健康传奇私教服务协议');
                    return
                }
                // console.log('包月支付:'+this.monthlyTotalPrice)
                let params = {
                    courseId: this.privateThree.educationsectorId,
                    userId: this.userId,
                    // userId:10000,
                    amount: this.monthlyNmb,
                    courseType: this.privateThree.courseType,
                }
                generateOrder(params).then(res => {
                    console.log('包月私教课订单：', res);
                    if (res.data.code == 2000) {
                        this.monthOrderObj3 = res.data.obj;
                        this.monthOrderObj3.type = 'pay';

                        console.log(this.monthOrderObj3)
                        if (this.isAndroid) {
                            window.andriod.postMessage(JSON.stringify(this.monthOrderObj3))
                        } else if (this.isiOS) {
                            window.webkit.messageHandlers.Monthly_payment.postMessage(this.monthOrderObj3)
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //私教体验课支付
            PrivateeducationPayment() {
                if (!this.checked) {
                    Toast('请勾选健康传奇私教服务协议');
                    return
                }
                console.log('私教体验课支付:' + this.educationexperie)
                let params = {
                    courseId: this.privateTwo.educationexperienceId,
                    userId: this.userId,
                    // userId:10000,
                    amount: 1,
                    courseType: this.privateTwo.courseType,
                }
                generateOrder(params).then(res => {
                    console.log('私教体验课程总价:' + this.experiencePrice);
                    console.log('私教体验课订单：', res);
                    if (res.data.code == 2000) {
                        this.privateOrderObj2 = res.data.obj;
                        this.privateOrderObj2.type = 'pay'
                        console.log('参数', this.privateOrderObj2)
                        if (this.isAndroid) {
                            window.andriod.postMessage(JSON.stringify(this.privateOrderObj2))
                        } else if (this.isiOS) {
                            window.webkit.messageHandlers.Experiential_Course_payment.postMessage(this.privateOrderObj2)
                        }
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
                        text-align: center;
                        font-size: 13px;
                        background-color: #ECEDF0;
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
            justify-content: space-between;
            // padding-left:15px;
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
             margin-top:10px; 
        }
        .popupItem{
            display: flex;
            padding: 10px 20px;
            .popupItemOne{
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
                li:nth-child(2) {
                    width: 60%;
                    flex: 0 1 50%;
                    padding: 10px 0;
                    font-size: 17px;
                    color: #fff;
                    font-weight: 400;
                    border-radius: 23px;
                    height: 28px;
                    background: rgba(29, 206, 116, 1);
                    text-align: center;
                }
            }
        }
    }
</style>