<template>
    <div class="order_details">
        <div class="order_img pr_pl15">
            <div>
                <img :src="coverImg" alt="">
            </div>
            <div class="order_text">
                <span class="text_ellipsis">{{trainingCampList.courseName}}</span>
                <span style="height: 27px;">
                    <em style="font-weight: 600;">¥</em>
                    <em style="color:#101D37;font-weight: 600;font-size: 17px;">{{trainingCampList.price}}</em>
                    <em style="color:#9399A5">{{trainingCampList.unit}}</em>
                </span>
                <span>
                    <img style="width: 12px;height: 12px;" src="../../assets/images/10.png" alt="">
                    <span>{{coachList.userName}}</span>
                </span>
            </div>
        </div>
        <div class="order_cell">
            <van-cell-group>
                <van-cell>
                    <div class="flex_between">
                        <span>开始时间</span>
                        <span>{{trainingCampList.classDay}}</span>
                    </div>
                </van-cell>
                <van-cell>
                    <div style="display:flex;justify-content: space-between;">
                        <p>上课时间</p>
                        <p style="display: flex;flex-direction: column;">
                            <span v-for="item in goodCourse" :key="item.item">{{item}}</span>
                        </p>
                    </div>
                </van-cell>
                <van-cell>
                    <div class="flex_between">
                        <span>地点</span>
                        <span>{{trainingCampList.clubName}}</span>
                    </div>
                </van-cell>
                <div class="grapLine"></div>
                <van-cell @click="popup" is-link>
                    <div class="flex_between">
                        <span>选择优惠券</span>
                        <span v-if="couponListLength && couponCount!=0">{{couponName}}</span>
                        <span v-else>{{couponCount}}张可用优惠券</span>
                        <!-- <span>{{couponCount}}张可用优惠券</span> -->
                    </div>
                </van-cell>
                <van-cell >
                    <div class="flex_between">
                        <span>商品价格</span>
                        <span style="color: #1DCE74;">¥ {{trainingCampList.price}}</span>
                    </div>
                </van-cell>
                <van-cell>
                    <div class="flex_between">
                        <span>优惠券</span>
                        <span style="color: #1DCE74;">-¥ {{afterCoupon}}</span>
                    </div>
                </van-cell>
                <div class="grapLine"></div>
                <van-cell>
                    <span>购前须知</span>
                    <p style="display:flex;justify-content: space-between;">
                        <router-link v-if="trainingCampList.courseType == 0" to="/trainingCampAgreement" style="color:#3A5891">同意《健康传奇训练营服务协议》</router-link>
                        <router-link v-if="trainingCampList.courseType == 4" to="/leagueClassAgreement" style="color:#3A5891">同意《健康传奇团课服务协议》</router-link>
                        <van-checkbox v-model="checked">
                            <img
                                style="width:22px;"
                                slot="icon"
                                slot-scope="props"
                                :src="props.checked ? icon.active : icon.normal"
                            >
                        </van-checkbox>
                    </p>
                </van-cell>
            </van-cell-group>
            <div style="height:100px;"></div>
            <van-popup v-model="show" position="bottom" :overlay="true">
                <div style="background:rgba(242,242,242,1);">
                    <div class="popupTitel">
                        <span>选择优惠券</span>
                        <van-icon @click="show=false" id="close" name="cross" />
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
                                    <p>{{item.effectiveTime}} ~ {{item.expireTime}}</p>
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
          <!-- 预约 -->
        <div class="appointment pr_pl15">
            <div class="appointment_icon"> 
                <span>共计：¥{{total}}</span>
            </div>
            <van-button class="appointment_btn"  @click="trainingMayment()" type="primary">去支付</van-button>
        </div>
    </div>
</template>
<script>
import { Cell, CellGroup,Checkbox,Button,Toast,Popup,Radio,Icon,Dialog} from 'vant';
import { GetTrainingCamp,AddOrder,GetCouponRecordList} from '@/request/api-liu'
import { constants } from 'crypto';
export default {
       data(){
        return{
            couponListLength:true,
            couponName:'',
            checked: false,
            courseId:'',
            coverImg:'',
            checked1:false,
            checked2:false,
            afterCoupon:0,
            show:false,
            total:'',
            goodCourse:[],
            couponCount:'',
            couponList:[
                {
                    activeAble:0,
                    checkStatus:false,
                    couponName:"代金券",
                    couponType:0,
                    discountType:0,
                    discountValue:"0.0005",
                    effectiveTime:"2019-05-17",
                    expireTime:"2019-06-16",
                    remark:"仅限训练营使用",
                    thresholdType:0,
                    thresholdValue:"0.01",
                    uid:"1129297205593272322",
                    userId:"1129297203911352322",
                }, 
                {
                    activeAble:0,
                    checkStatus:false,
                    couponName:"代金券",
                    couponType:0,
                    discountType:0,
                    discountValue:"0.0007",
                    effectiveTime:"2019-05-17",
                    expireTime:"2019-06-16",
                    remark:"仅限训练营使用",
                    thresholdType:0,
                    thresholdValue:"0.01",
                    uid:"1129297205593272321",
                    userId:"1129297203911352321",
                },
                {
                    activeAble:0,
                    checkStatus:false,
                    couponName:"代金券",
                    couponType:0,
                    discountType:0,
                    discountValue:"0.0007",
                    effectiveTime:"2019-05-17",
                    expireTime:"2019-06-16",
                    remark:"仅限训练营使用",
                    thresholdType:0,
                    thresholdValue:"0.01",
                    uid:"1129297205593233",
                    userId:"1129297203911352327",
                },
                 {
                    activeAble:0,
                    checkStatus:false,
                    couponName:"代金券",
                    couponType:0,
                    discountType:0,
                    discountValue:"0.0007",
                    effectiveTime:"2019-05-17",
                    expireTime:"2019-06-16",
                    remark:"仅限训练营使用",
                    thresholdType:0,
                    thresholdValue:"0.01",
                    uid:"1129297205593233",
                    userId:"1129297203911352327",
                },
            ],
            icon: {
            normal:require("../../assets/images/勾 2@2x.png"),
            active: require('../../assets/images/勾 2@2x(1).png'),
            },
            couponIcon:{
                normal:require("../../assets/images/勾 2@2x(2).png"),
                active: require('../../assets/images/勾 2@2x(3).png'),
            },
            trainingCampList:{},
            coachList:{},
            immageDto:[],
            obj:{},
            userId:'',

        }
    },
     components:{
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Button.name]:Button,
        [Checkbox.name]:Checkbox,
        [Toast.name]:Toast,
        [Popup.name]:Popup,
        [Radio.name]:Radio,
        [Icon.name]:Icon,
        [Dialog.name]:Dialog
    },
    created(){
        this.courseId = this.$route.query.courseId
        this.userId = this.$route.query.userId
        this.init()
    },
    methods:{
        //确认订单
        init(){
             GetTrainingCamp({
              trainingCampBusinessId:this.courseId
            }).then(res=>{
                this.trainingCampList = res.data.obj
                this.coachList = res.data.obj.coach
                this.immageDto = res.data.obj.immageDto
                this.goodCourse = res.data.obj.classStartTime.split("/ ")
                this.total = this.trainingCampList.price
                this.coverImg = this.immageDto.coverUrl.url
                // this.goodCourse = res.data.obj.coach.goodCourse.split("、")
                // this.onlyPeopele = (res.data.obj.startClassNum - res.data.obj.peopleNum)
                // this.swiperImgs = this.immageDto.spreadUrl
                this.GetCouponList()
            })
          
        },
        GetCouponList(){
            GetCouponRecordList({
                userId: this.$route.query.userId,
                type:this.trainingCampList.courseType,
                goodsNum:this.trainingCampList.classHour,
                amount:this.trainingCampList.price,
            }).then(res=>{
                console.log(res,'res')
                this.couponCount = res.data.obj.count
                if(res.data.obj.list.length>0){
                    res.data.obj.list[0].checkStatus = true
                    this.couponList = res.data.obj.list
                    this.choosePopup()
                }
                // this.couponCount = 2
                // this.couponCount[0].checkStatus = true
                console.log(res)
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
        checked1111(){
           
        },
        popup(){
            if(this.couponCount != 0){
                this.show = true
            }
        },
        choosePopup(){
            this.show = false
            var choosePopup = this.couponList.find((item)=>{
                if(item.checkStatus == true){
                    return item
                }
            })
            console.log('----->',choosePopup)
            if(choosePopup){
                this.couponListLength = true;
                this.couponName = choosePopup.couponName
                this.couponId = choosePopup.uid
                if(choosePopup.couponType == 1){
                    this.afterCoupon = this.trainingCampList.price
                    this.total = 0
                }else if(choosePopup.couponType == 0){
                    this.afterCoupon = choosePopup.discountValue
                    if(this.afterCoupon < 0){
                        this.afterCoupon = this.trainingCampList.price
                    }
                    this.total = (this.trainingCampList.price - this.afterCoupon).toFixed(2)
                }
            }else{
                this.afterCoupon = 0
                this.total = this.trainingCampList.price
                this.couponId = ''
                this.couponListLength = false;
            }
        },
         trainingMayment(){
            if(!this.checked){
                if(this.trainingCampList.courseType == 4){
                    Toast('请勾选健康传奇团课服务协议');
                }else{
                     Toast('请勾选健康传奇训练营服务协议');
                }
                return
            }
            debugger
            const params = 
                {   
                    amount: 1,
                    couponId:this.couponId,
                    productId: this.trainingCampList.trainingCampBusinessId,
                    productType: this.trainingCampList.courseType,
                    userId: this.$route.query.userId
                }
            AddOrder(params).then(res=>{
                
                console.log(res)
                this.obj = res.data.obj
                this.obj.type = 'pay'
                if(this.total == 0){
                    Dialog.confirm({
                        title: '下单成功',
                        cancelButtonText:'首页',
                        confirmButtonText:'订单中心',
                        }).then(() => {
                        // on confirm
                            if(this.isAndroid){
                                window.andriod.postMessage(JSON.stringify({
                                    type:'orderCenter'
                                }))
                            }else if (this.isiOS){
                                window.webkit.messageHandlers.orderCenter.postMessage({
                                    type:'orderCenter'
                                })
                            }
                        }).catch(() => {
                        // on cancel
                            if(this.isAndroid){
                                window.andriod.postMessage(JSON.stringify({
                                    type:'Home'
                                }))
                            }else if (this.isiOS){
                                window.webkit.messageHandlers.Home.postMessage({
                                    type:'Home'
                                })
                            }
                    });
                }else{
                    if(this.isAndroid){
                        window.andriod.postMessage(JSON.stringify(this.obj))
                    }else if (this.isiOS){
                        window.webkit.messageHandlers.Training_payment.postMessage(this.obj)
                    }
                }
            })
         
            // this.$router.back(-1)
        },
    },
}
</script>
<style lang="less" scoped>
    .order_details{
        background: #fff;
        #close{
            .van-icon {
                font-size: 32px;
                margin: 20px 0 10px;
                color: #323233;
            }
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
        .grapLine{
            height: 10px;
            background: rgba(242,242,242,1);
            width: 100%;
        }
        .flex_between{
            display: flex;
            justify-content: space-between;
        }
        .popupTitel{
            width:100%;
            height:50px;
            background:rgba(255,255,255,1);
            display:flex;
            align-items: center;
            justify-content: space-between;
            .van-icon{
                font-size: 25px;
                margin-right: 15px;
            }
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
        }
        .order_text{
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            // justify-content: space-between;
            // p{
            //     margin-top: 10px;
            // }
            span:first-child{
                    font-size: 20px;
                    color:#101D37;
                    font-weight: 600;
                    width:200px;
                    display: inline-block;
                    margin-bottom: 30px;
             }
            //  span:last-child{
            //         font-size:12px;
            //         font-weight:400;
            //         color:rgba(147,153,165,1);
            //         line-height:17px;
            //  }
        }
        .appointment{
            display: flex;
            justify-content: space-around;
            padding: 15px;
            position: fixed;
            bottom: 0px;
            left:0px;
            background: #fff;
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
                width:173px;
                height:45px;
                background:rgba(29,206,116,1);
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
