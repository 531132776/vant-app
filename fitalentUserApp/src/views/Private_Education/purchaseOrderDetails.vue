<template>
  <div class="privatemonthlyOrder">
    <div class="privatemonthlyOrder_content">
      <!-- 头部信息 -->
      <div class="p15">
        <div class="header_info pb15">
          <ul>
            <li>
              <img
                :src="immageDto.coverUrl!== (null && undefined) ? immageDto.coverUrl.url : ''"
                alt
              >
            </li>
            <li>
              <dt v-if="status==1">{{educationsectorDetails.courseName}}</dt>
              <dt v-if="status==2">{{privateCourse.courseName}}</dt>
              <dt v-if="status==0">{{educationexperie.courseName}}</dt>
              <dt>
                <span class="head_people">
                  <img :src="peopleHead" alt>
                </span>
                <span v-if="status==1">{{educationsectorDetails.coachName}}</span>
                <span v-if="status==2">{{privateCourse.coachName}}</span>
                <span v-if="status==0">{{educationexperie.coachName}}</span>
              </dt>
            </li>
          </ul>
          <span class="before"></span>
        </div>
      </div>
      <!-- 地点 -->
      <div class="address_info pr_pl15">
        <div class="content_text pb15">
          <ul>
            <li>地点</li>
            <li v-if="status==0">{{educationexperie.clubName}}</li>
            <li v-if="status==1">{{educationsectorDetails.clubName}}</li>
            <li v-if="status==2">{{privateCourse.clubName}}</li>
          </ul>
          <span class="before"></span>
        </div>
      </div>
      <!-- 购买项目 -->
      <div class="address_info pr_pl15" v-if="status==2">
        <div class="content_text itemPrice pt_pb15">
          <ul>
            <li>购买项目</li>
            <li>
              <span
                v-for="(v,index) in priceItem"
                :key="index"
                @click="activeItem(v,index)"
                :class="[active==index ? 'class-a' : 'class-b']"
              >{{v.explain}}</span>
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
              课时数（
              <em>{{privateCourse.lowestSection}}</em>节起售）
            </li>
            <!-- 2是私教课 -->
            <li v-if="status==2">
              <van-button type="default" @click="reduce">-</van-button>
              <span class="coures_nmb">{{nmb}}</span>
              <van-button type="default" @click="increase">+</van-button>
            </li>
            <li v-if="status==0">课时数</li>
            <li v-if="status==1">数量</li>
            <!-- 0是私教体验课 -->
            <li v-if="status==0">
              <span>{{classHour}}节</span>
            </li>
            <!-- 1是包月 -->
            <li v-if="status==1">
              <van-button type="default" @click="monthlyReduce">-</van-button>
              <span class="coures_nmb">{{monthlyNmb}}</span>
              <van-button type="default" @click="monthlyIncrease">+</van-button>
            </li>
          </ul>
          <!-- <span class="before"></span> -->
        </div>
      </div>
      <div class="couponInfo">
        <div class="address_info pr_pl15">
          <div class="content_text pt_pb15">
            <ul @click="popup">
              <li>选择优惠券</li>
              <li>
                <dt class="text_gray">
                  <span>{{couponCount}}张可用</span>
                  <span class="head_people">
                    <img :src="rightIcon" alt>
                  </span>
                </dt>
              </li>
            </ul>
            <span class="before"></span>
          </div>
        </div>
        <div class="address_info pr_pl15">
          <div class="content_text pt_pb15">
            <ul>
              <li>价格</li>
              <!-- 0是私教体验课 -->
              <li class="price_font" v-if="status==0">
                <em>¥</em>
                <em>{{educationexperie.price}}</em>
              </li>
              <!-- 2是私教课 -->
              <li class="price_font" v-if="status==2">
                <em>¥</em>
                <em v-if="contrastStatus==0">{{privateCourse.onePrice}}</em>
                <em v-if="contrastStatus==1">{{privateCourse.twoPrice}}</em>
                <em>/节</em>
              </li>
              <!-- 1是包月私教 -->
              <li class="price_font" v-if="status==1">
                <em>¥</em>
                <em>{{educationsectorDetails.price}}{{educationsectorDetails.unit}}</em>
              </li>
            </ul>
            <span class="before"></span>
          </div>
        </div>
        <div class="address_info pr_pl15">
          <div class="content_text pt_pb15">
            <ul>
              <li>优惠券</li>
              <li class="price_font">
                <em>-</em>
                <em>¥</em>
                <em>{{afterCoupon}}</em>
              </li>
            </ul>
            <!-- <span class="before"></span> -->
          </div>
        </div>
      </div>
      <!-- 价格 -->

      <!-- 协议 -->
      <div class="address_info pr_pl15">
        <div class="content_text pt_pb15">
          <ul>
            <li style="width:100%">
              <dd>购前需知</dd>
              <dd style="display:flex;justify-content: space-between;" class="Agreement">
                <router-link to="/privateEducationAgreement" style="color:#3A5891">同意《健康传奇私教协议》</router-link>
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
    </div>
    <!-- 联系客服+购买课程 -->
    <div class="Immediate_purchase">
      <div class="purchase_info">
        <ul>
          <li v-if="status==0">
            <dt>共计: ¥</dt>
            <dt>{{experiencePrice}}</dt>
          </li>
          <li v-if="status==2">
            <dt>共计: ¥</dt>
            <dt>{{Number(totalPrice).toFixed(2)}}</dt>
          </li>
          <li v-if="status==1">
            <dt>共计: ¥</dt>
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
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div style="background:rgba(242,242,242,1);">
        <div class="popupTitel">
          <span>选择优惠券</span>
          <van-icon id="close" name="cross" @click="show=false"/>
        </div>
        <div class="popupwarp">
          <div v-for="item in couponList" :key="item.uid" class="popupItem" style="display:flex">
            <div :class="[item.couponType == 0 ? popupItemThree : popupItemOne]">
              <span style="font-size:17px">¥{{item.discountValue}}</span>
              <span v-if="item.couponType == 0">代金券</span>
              <span v-if="item.couponType == 1">免费券</span>
            </div>
            <div class="popupItemTwo">
              <div class="popupText">
                <p>{{item.remark}}</p>
                <p>{{item.effectiveTime}}-{{item.expireTime}}</p>
              </div>
              <div class="popupIcon">
                <van-checkbox v-model="item.checkStatus">
                  <img
                    @click="aaa(item)"
                    style="width:18px;"
                    slot="icon"
                    :src="item.checkStatus ? couponIcon.active : couponIcon.normal"
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
</template>
<script>
import {
  Button,
  Dialog,
  Checkbox,
  Toast,
  CheckboxGroup,
  Popup,
  Radio,
  Icon
} from "vant";
import { generateOrder, getMonthCoachNumb } from "@/request/api";
import { GetCouponRecordList } from "@/request/api-liu";
import { constants } from "crypto";
export default {
  data() {
    return {
        popupItemOne:'popupItemOne',
        popupItemThree:'popupItemThree',
      afterCoupon: 0,
      show: false,
      checked1: "",
      couponIcon: {
        normal: require("../../assets/images/勾 2@2x(3).png"),
        active: require("../../assets/images/勾 2@2x(2).png")
      },
      couponList: [],
      checked: false,
      rightIcon: require("../../assets/images/14.png"),
      icon: {
        normal: require("../../assets/images/勾 2@2x.png"),
        active: require("../../assets/images/勾 2@2x(1).png")
      },
      phomeIcon: require("../../assets/images/13.png"),
      peopleHead: require("../../assets/images/10.png"),
      oneImg: require("../../assets/images/4.jpg"),
      monthlyNmb: 1, //包月私教
      monthlyTotalPrice: "", //包月私教总价
      nmb: "", //塑行杠铃雕塑
      totalPrice: "", //塑行杠铃雕塑总价
      experiencePrice: "", //体验课价格
      status: this.$route.query.status, //用状态区别进入包月私教页面或体验课页面及页面内容
      priceItem: [
        {
          explain: "一对一"
        },
        {
          explain: "一对二"
        }
      ],
      classHour: 1, //私教体验课课时
      active: 0,
      privateCourse: {}, //私教课obj
      educationexperie: {}, //私教体验课obj
      immageDto: {
        courseExplainUrl: null,
        coverUrl: {},
        reduceUrl: null,
        spreadUrl: null
      },
      contrastStatus: "",
      educationsectorDetails: {}, //包月课购买
      privateOne: {}, //私教课类型和id
      privateTwo: {}, //私教体验课类型和id
      privateThree: {}, //包月私教课类型和id
      courseItem: 1,
      privateOrderObj: {}, //私教课订单
      privateOrderObj2: {}, //私教体验课订单
      monthOrderObj3: {}, //包月私教订单
      type: "pay",
      userId: this.$route.query.userId,
      couponCount: "",
      total: "",
      couponId: ""
    };
  },
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup,
    [Radio.name]: Radio,
    [Icon.name]: Icon
  },
  mounted() {
    console.log(this.status);
    if (this.status == 2) {
      //私教课详情
      this.privateCourse = this.$route.query.obj;
      console.log("私教课", this.privateCourse);
      this.nmb = this.privateCourse.lowestSection;
      this.privateOne = this.$route.query.privateOne;
      this.immageDto = this.privateCourse.immageDto;
      console.log("私教课", this.privateOne);
      // if(){

      // }
      var total = this.nmb * this.privateCourse.onePrice;
      this.GetCouponList(
        this.privateOne.courseType,
        this.privateOne.userId,
        this.nmb,
        total
      );
    } else if (this.status == 0) {
      //私教体验课详情
      this.educationexperie = this.$route.query.obj;
      console.log("私教体验课", this.educationexperie);
      this.privateTwo = this.$route.query.privateTwo;
      this.immageDto = this.educationexperie.immageDto;
      this.experiencePrice = this.educationexperie.price;
      console.log("私教体验课", this.privateTwo);
      this.GetCouponList(
        this.privateTwo.courseType,
        this.privateTwo.userId,
        this.classHour,
        this.experiencePrice
      );
    } else if (this.status == 1) {
      //包月课详情
      this.educationsectorDetails = this.$route.query.obj;
      this.privateThree = this.$route.query.privateThree;
      this.immageDto = this.educationsectorDetails.immageDto;
      this.monthlyTotalPrice = this.educationsectorDetails.price;
      console.log("包月课详情", this.educationsectorDetails);
      // initgetMonthCoachNumb(){
      // let params = {
      //     privateMonthCourseId:this.educationsectorDetails.privateMonthCourseId,
      //     userId:this.privateThree.userId,
      //     clubId:this.educationsectorDetails.clubId
      // }
      // getMonthCoachNumb(params).then(res =>{
      //     console.log('查询包月私教的数量',res)
      // }).catch(err =>{
      //     console.log('请求错误！',err)
      // })
      // }

      var total = this.monthlyNmb * this.monthlyTotalPrice;
      this.GetCouponList(
        this.privateThree.courseType,
        this.privateThree.userId,
        this.monthlyNmb,
        total
      );
    }

    this.totalPrice =
      this.privateCourse.onePrice * this.privateCourse.lowestSection;

    this.$store.commit("getUserId", this.privateOne.privateCourseId);
  },
  methods: {
    GetCouponList(type, userId, goodsNum, amount) {
      GetCouponRecordList({
        userId: userId,
        type: type,
        goodsNum: goodsNum,
        amount: amount
      }).then(res => {
        console.log(res, "res");
        this.couponCount = res.data.obj.count;
        this.couponList = res.data.obj.list || [];
        res.data.obj.list.length > 0
          ? (res.data.obj.list[0].checkStatus = true)
          : "";
        // console.log(this.couponList[0].uid,'22')
        if(this.couponList.length>0){
        
            this.$set(this,'couponId',this.couponList[0].uid);
            console.log(this.couponId,'333')
            if(this.couponList[0].couponType == 0){
                alert('代金券')
                
                if(this.status == 2){
                    //私教课
                this.$set(this,'afterCoupon',this.couponList[0].discountValue);
                this.totalPrice = (this.privateCourse.onePrice * this.privateCourse.lowestSection)-this.afterCoupon;
                }
                if(this.status == 0){
                    //私教体验课
                    this.$set(this,'afterCoupon',this.couponList[0].discountValue);
                    this.experiencePrice = this.educationexperie.price - this.afterCoupon
                }
                if(this.status == 1){
                    //包月私教
                    this.$set(this,'afterCoupon',this.couponList[0].discountValue);
                    this.monthlyTotalPrice = this.educationsectorDetails.price - this.afterCoupon
                }
                
                

            }else if(this.couponList[0].couponType == 1){
                alert('免费券')
                console.log(this.couponId,'333')
                if(this.status == 2){
                    this.afterCoupon = this.privateCourse.onePrice * this.privateCourse.lowestSection;
                    this.totalPrice = (this.privateCourse.onePrice * this.privateCourse.lowestSection)-this.afterCoupon
                }
                if(this.status == 0){
                    alert('私教体验课');
                    this.afterCoupon = this.educationexperie.price;
                    this.experiencePrice = this.educationexperie.price - this.afterCoupon
                }
                if(this.status == 1){
                    alert('包月');
                    this.afterCoupon = this.educationsectorDetails.price;
                    this.monthlyTotalPrice = this.educationsectorDetails.price - this.afterCoupon
                }
                console.log(this.afterCoupon,'1')
            }
          }
      });
    },
    aaa(item) {
        let _this = this;
      if (!item.checkStatus) {
        this.couponList.map(function(res) {
          if (res.uid != item.uid) {
            res.checkStatus = false;
            return res;
          }
          console.log(res, "尼玛");
          _this.$set(_this,'couponId',res.uid)
          console.log(_this.couponId,'444')
          if(res.couponType == 0){
              
              if(_this.status == 2){
                  //私教课
                  alert('私教')
              _this.$set(_this,'afterCoupon',res.discountValue);
              _this.totalPrice = (_this.privateCourse.onePrice * _this.privateCourse.lowestSection)-_this.afterCoupon;
              }
              if(_this.status == 0){
              //私教体验课
              alert('私教体验课');
              _this.$set(_this,'afterCoupon',_this.couponList[0].discountValue);
              _this.experiencePrice = _this.educationexperie.price - _this.afterCoupon
              }
              if(_this.status == 1){
                  //包月私教
                  alert('包月')
                _this.$set(_this,'afterCoupon',_this.couponList[0].discountValue);
                _this.monthlyTotalPrice = _this.educationsectorDetails.price - _this.afterCoupon
              }
              

          }else if(res.couponType == 1){
              console.log(_this.couponId,'444')
              
              
              if(_this.status == 2){
                  //私教课
                  alert('私教')
                    _this.afterCoupon = _this.privateCourse.onePrice * _this.privateCourse.lowestSection;
                    _this.totalPrice = (_this.privateCourse.onePrice * _this.privateCourse.lowestSection)-this.afterCoupon
                }
                if(_this.status == 0){
                    //私教体验课
                    alert('私教体验课');
                    _this.afterCoupon = _this.educationexperie.price;
                    _this.experiencePrice = _this.educationexperie.price - _this.afterCoupon
                }
                if(_this.status == 1){
                    //包月私教
                    alert('包月')
                    _this.afterCoupon = _this.educationsectorDetails.price;
                    _this.monthlyTotalPrice = _this.educationsectorDetails.price - _this.afterCoupon
                }
          }
        });
      }
    },
    popup() {
      if (this.couponCount != 0) {
        this.show = true;
      }
    },
    choosePopup() {
      this.show = false;
    },
    //选中一对一，二对二
    activeItem(v, index) {
      console.log(v, index);
      this.active = index;
      if (index == 0) {
        this.$set(this, "contrastStatus", 0);
        this.totalPrice =
          this.privateCourse.onePrice * this.privateCourse.lowestSection;
        this.nmb = this.privateCourse.lowestSection;
        this.courseItem = 1;
        this.GetCouponList(
          this.privateOne.courseType,
          this.privateOne.userId,
          this.nmb,
          this.totalPrice
        );
      } else if (index == 1) {
        this.$set(this, "contrastStatus", 1);
        this.totalPrice =
          this.privateCourse.twoPrice * this.privateCourse.lowestSection;
        this.nmb = this.privateCourse.lowestSection;
        this.courseItem = 2;
        this.GetCouponList(
          this.privateOne.courseType,
          this.privateOne.userId,
          this.nmb,
          this.totalPrice
        );
      }
    },
    //课程计算减
    reduce() {
      this.nmb -= 1;
      if (this.contrastStatus == 0) {
        this.totalPrice -= this.privateCourse.onePrice;
      } else if (this.contrastStatus == 1) {
        this.totalPrice -= this.privateCourse.twoPrice;
      }

      if (this.nmb <= this.privateCourse.lowestSection) {
        // this.nmb = this.privateCourse.lowestSection;
        if (this.contrastStatus == 0) {
            this.$set(this,'totalPrice',(this.privateCourse.onePrice * this.privateCourse.lowestSection)-this.afterCoupon)
        //   this.totalPrice = (this.privateCourse.onePrice * this.privateCourse.lowestSection)-this.afterCoupon;
          // return this.totalPrice = 0
        } else if (this.contrastStatus == 1) {
          this.totalPrice =
            (this.privateCourse.twoPrice * this.privateCourse.lowestSection)-this.afterCoupon;
        }
        // Dialog.alert({
        //     message: '最低'+this.nmb+'节起售'
        // }).then(() => {
        //     // on close
        //     // alert(1)
        // });
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
        this.totalPrice += this.privateCourse.twoPrice;
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
        // Dialog.alert({
        //     message: '不能再减了'
        // }).then(() => {
        //     // alert(1)
        // });
      }
      // this.monthlyNmbcoursesPayment(this.monthlyTotalPrice)
    },
    //包月计算加
    monthlyIncrease() {
      this.monthlyNmb += 1;
      this.monthlyTotalPrice += this.educationsectorDetails.price;
    },
    //去指定课程(比如：塑形杠铃雕塑)去支付
    DesignatedcoursesPayment() {
      console.log(this.checked);
      if (!this.checked) {
        Toast("请勾选健康传奇私教服务协议");
        return;
      }
      let params = {
        productId: this.privateOne.privateCourseId,
        userId: this.userId,
        amount: this.nmb,
        item: this.courseItem, //类型1对一 1对2
        productType: this.privateOne.courseType,
        couponId: this.couponId
      };
      generateOrder(params)
        .then(res => {
          console.log("私教课课程总价:" + this.totalPrice);
          console.log("私教课订单：", res);
          if (res.data.code == 2000) {
            this.privateOrderObj = res.data.obj;
            this.privateOrderObj.type = "pay";
            if (this.totalPrice == 0) {
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
            } else {
              // alert(2)
              // if (this.isAndroid) {
              //     window.andriod.postMessage(JSON.stringify(this.privateOrderObj))
              // } else if (this.isiOS) {
              //     window.webkit.messageHandlers.Course_payment.postMessage(this.privateOrderObj)
              // }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //包月支付
    monthlyNmbcoursesPayment() {
      if (!this.checked) {
        Toast("请勾选健康传奇私教服务协议");
        return;
      }
      // console.log('包月支付:'+this.monthlyTotalPrice)
      let params = {
        productId: this.privateThree.educationsectorId,
        userId: this.userId,
        // userId:10000,
        amount: this.monthlyNmb,
        productType: this.privateThree.courseType,
        couponId: this.couponId
      };
      generateOrder(params)
        .then(res => {
          console.log("包月私教课订单：", res);
          if (res.data.code == 2000) {
            this.monthOrderObj3 = res.data.obj;
            this.monthOrderObj3.type = "pay";
            console.log(this.monthOrderObj3);
            if(this.monthlyTotalPrice == 0){
                alert(111)
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
                if (this.isAndroid) {
                    window.andriod.postMessage(JSON.stringify(this.monthOrderObj3));
                } else if (this.isiOS) {
                    window.webkit.messageHandlers.Monthly_payment.postMessage(
                    this.monthOrderObj3
                );
                }
            }
            
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //私教体验课支付
    PrivateeducationPayment() {
      if (!this.checked) {
        Toast("请勾选健康传奇私教服务协议");
        return;
      }
      console.log("私教体验课支付:" + this.educationexperie);
      let params = {
        productId: this.privateTwo.educationexperienceId,
        userId: this.userId,
        // userId:10000,
        amount: 1,
        productType: this.privateTwo.courseType,
        couponId: this.couponId
      };
      generateOrder(params)
        .then(res => {
          console.log("私教体验课程总价:" + this.experiencePrice);
          console.log("私教体验课订单：", res);
          if (res.data.code == 2000) {
            this.privateOrderObj2 = res.data.obj;
            this.privateOrderObj2.type = "pay";
            console.log("参数", this.privateOrderObj2);
            if(this.experiencePrice == 0){
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
            }else {
                if (this.isAndroid) {
                window.andriod.postMessage(JSON.stringify(this.privateOrderObj2));
                } else if (this.isiOS) {
                window.webkit.messageHandlers.Experiential_Course_payment.postMessage(
                    this.privateOrderObj2
                );
                }
            }
            
            
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.Agreement {
  color: #3a5891 !important;
  font-size: 13px;
}

.class-a {
  background-color: #1dce74 !important;
  color: #fff;
}

.class-b {
  background-color: #ecedf0;
}
.popupTitel {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-left:15px;
  span {
    display: inline-block;
    line-height: 50px;
    font-size: 17px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    margin-left: 15px;
    color: rgba(16, 29, 55, 1);
  }
  .van-icon {
    font-size: 25px;
    margin-right: 15px;
  }
}
.popupBottom {
  width: 375px;
  height: 50px;
  background: rgba(29, 206, 116, 1);
  position: fixed;
  bottom: 0;
  font-size: 17px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  line-height: 50px;
}
.popupwarp {
  margin-top: 10px;
  height: 360px;
  overflow-y: scroll;
  padding-bottom: 55px;
}

.popupItem {
  display: flex;
  padding: 10px 20px;
  .popupItemOne {
    background-image: url(../../assets/images/blue.png);
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    width: 114px;
    height: 104px;
  }
    .popupItemThree {
    background-image: url(../../assets/images/yellow.png);
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    width: 114px;
    height: 104px;
  }
  .popupItemTwo {
    background-image: url(../../assets/images/矩形copy2@2x1.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 230px;
    height: 104px;
    display: flex;
    justify-content: space-between;
    .popupText {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 15px 10px;
      // font-size:15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(16, 29, 55, 1);
    }
    .popupIcon {
      display: flex;
      align-self: center;
      padding-right: 10px;
    }
  }
}
.privatemonthlyOrder_content {
  padding-bottom: 70px;
  .couponInfo {
    background-color: #f2f2f2;
    padding: 10px 0;
    .address_info {
      background-color: #fff;
    }
  }

  .header_info {
    position: relative;
    ul {
      display: flex;
      justify-content: flex-start;
      flex-flow: row nowrap;
      li:nth-child(1) {
        padding-right: 15px;
        width: 100px;
        height: 100px;
        border-radius: 8px;
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
        dt:nth-child(1) {
          font-size: 17px;
          font-weight: 600;
        }
        dt:nth-child(2) {
          padding-top: 5px;
          font-size: 12px;
          color: #9399a5;
          .head_people {
            width: 12px;
            height: 12px;
            display: inline-block;
            padding-right: 5px;
            img {
              display: block;
              width: 100%;
            }
          }
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
        color: #1dce74;
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
          color: #1dce74;
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
          background-color: #ecedf0;
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
          background-color: #f6f6f6;
        }
        .van-button:nth-child(2) {
          background-color: #ecedf0;
        }
      }
    }
  }
  .itemPrice {
    li {
      span {
        display: inline-block;
        background-color: #ecedf0;
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

.Immediate_purchase {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 333;
  padding: 10px 15px;
  background-color: #fff;
  border-top: 0.5px solid rgba(0, 0, 0, 0.12);
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
        background: rgba(29, 206, 116, 1);
        text-align: center;
      }
    }
  }
}
</style>