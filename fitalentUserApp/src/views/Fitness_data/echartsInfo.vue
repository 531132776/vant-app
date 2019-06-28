<template>
  <div class="echarts_info">
    <div>
      <van-tabs v-model="active" :swipe-threshold="2" v-if="aggregate.length>0" @change="onTabClick">
        <van-tab v-for="(item,i) in aggregate" :title="'选项 ' + item.type + item.id" :key="i">
          <div slot="title" class="slot_content pt15" >
            <span class="slot_span_img">
              <img :src="active1==i?item.img:item.src" alt>
            </span>
            <span>{{item.name}}</span>
            <span>{{item.time}}</span>
          </div>
          <div class="tab_content mt20">
            <div v-if="item.type==0 || item.type==1">
              <div class="Treadmill pr_pl15">
                <span class="text_title">{{startTime}}-{{endTime.substring(0,5)}}</span>
                <div class="pt10 heart_rate">
                  <ul>
                    <li>
                      <dl>
                        <dt>
                          <img src="../../assets/images/时长copy.png" alt>
                        </dt>
                        <dt>
                          <em>{{headCreateTime(motionDataObj.totalExerciseTime)}}</em>
                        </dt>
                        <dt>总时间</dt>
                      </dl>
                      <dl>
                        <dt>
                          <img src="../../assets/images/发电量.png" alt>
                        </dt>
                        <dt>
                          <em>{{KeepDecima1(motionDataObj.powerGeneration/1000)}}</em>千焦
                        </dt>
                        <dt>发电量</dt>
                      </dl>
                    </li>
                    <li>
                      <!-- <dl class="Heart_rate_animation">
                        <dt>
                          <img src="../../assets/images/分组6@2x1.png" alt>
                        </dt>
                        <dt>{{motionDataObj.meanHeartRateStrength}}次/分钟</dt>
                      </dl> -->
                      <dl class="Heart_rate_animation" v-if="motionDataObj.meanHeartRateStrength<=59 || motionDataObj.meanHeartRateStrength == 0">
                        <dt>
                          <img src="../../assets/images/分组_6@2x.png" alt>
                        </dt>
                        <dt v-if="motionDataObj.avgHartRate == 0">--次/分钟</dt>
                        <dt v-else>{{motionDataObj.avgHartRate}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="motionDataObj.meanHeartRateStrength>=60 && motionDataObj.meanHeartRateStrength<=69">
                        <dt>
                          <img src="../../assets/images/分组 6@2x_1.png" alt>
                        </dt>
                        <dt >{{motionDataObj.avgHartRate}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="motionDataObj.meanHeartRateStrength>=70 && motionDataObj.meanHeartRateStrength<=79">
                        <dt>
                          <img src="../../assets/images/分组_6@2x_3.png" alt>
                        </dt>
                        <dt >{{motionDataObj.avgHartRate}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="motionDataObj.meanHeartRateStrength>=80 && motionDataObj.meanHeartRateStrength<=89">
                        <dt>
                          <img src="../../assets/images/分组6@2x1.png" alt>
                        </dt>
                        <dt >{{motionDataObj.avgHartRate}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="motionDataObj.meanHeartRateStrength>=90">
                        <dt>
                          <img src="../../assets/images/分组 6@2x_2.png" alt>
                        </dt>
                        <dt >{{motionDataObj.avgHartRate}}次/分钟</dt>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt>
                          <img src="../../assets/images/Shape@2x.png" alt>
                        </dt>
                        <dt>
                          <em>{{KeepDecima1(motionDataObj.consume/1000)}}</em>千卡
                        </dt>
                        <dt>卡路里</dt>
                      </dl>
                      <dl>
                        <dt>
                          <img src="../../assets/images/分组6@2x.png" alt>
                        </dt>
                        <dt>
                          <em>{{fomatFloat(distance/1000)}}</em>公里
                        </dt>
                        <dt>距离</dt>
                      </dl>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 饼图 -->
              <div class="pr_pl15 Pie_chart mt15">
                  <canvas :id="'mountNodeList'+i" width="100%" heihgt:="260px"></canvas>
                  <!-- <div id="echartspie" style="width: 375px; height: 260px;"></div>  -->
                  <!-- <HelloWorld :source="maximalExercise" :numO="anaerobicExercise" :numT="aerobicExercise" :numH="fatMovement" :numF="warmUp"/> -->
              </div>
              <!-- 柱状图 -->
              <div class="Histogram_info pr_pl15">
                <div class="text-title p15">心率等级分布/分钟</div>
                <div class="Histogram">
                  <canvas :id="'histogramList'+i" width="100%" heihgt:="260px"></canvas>
                </div>
              </div>
            </div>
            <div v-if="item.type==2">
              <div class="p15 Treadmill Butterfly_machine">
                <div class="text_title">
                  <!-- 2019-04-29 15:00~16:00 -->
                  {{startTime}}-{{stopTime.substring(0,5)}}
                </div>
                <div class="pt10 heart_rate">
                  <ul>
                    <li>
                      <dl>
                        <dt>
                          <img src="../../assets/images/时长copy.png" alt>
                        </dt>
                        <dt>
                          <em>{{headCreateTime(powerMotionData.motionTime)}}</em>
                        </dt>
                        <dt>总时间</dt>
                      </dl>
                      <dl>
                        <dt>
                          <img src="../../assets/images/时长copy@2x.png" alt>
                        </dt>
                        <dt>
                          <em>{{avgspeed}}</em>公里/小时
                        </dt>
                        <dt>平均速度</dt>
                      </dl>
                    </li>
                    <li>
                      <!-- <dl class="Heart_rate_animation" v-if="powerMotionData.heart>0">
                        <dt>
                          <img src="../../assets/images/分组6@2x1.png" alt>
                        </dt>
                        <dt>{{powerMotionData.heart}}次/分钟</dt>
                      </dl> -->
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate<=59 || powerMotionData.avgHartRate == 0">
                        <dt>
                          <img src="../../assets/images/分组_6@2x.png" alt>
                        </dt>
                        <!-- <dt style="color:#9399A5">{{powerMotionData.heart}}次/分钟</dt> -->
                        <dt  v-if="powerMotionData.heart == 0">--次/分钟</dt>
                        <dt  v-else>{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate>=60 && powerMotionData.avgHartRate<=69">
                        <dt>
                          <img src="../../assets/images/分组 6@2x_1.png" alt>
                        </dt>
                        <dt >{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate>=70 && powerMotionData.avgHartRate<=79">
                        <dt>
                          <img src="../../assets/images/分组_6@2x_3.png" alt>
                        </dt>
                        <dt >{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate>=80 && powerMotionData.avgHartRate<=89">
                        <dt>
                          <img src="../../assets/images/分组6@2x1.png" alt>
                        </dt>
                        <dt >{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate>=90">
                        <dt>
                          <img src="../../assets/images/分组 6@2x_2.png" alt>
                        </dt>
                        <dt >{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt>
                          <img src="../../assets/images/Shape@2x.png" alt>
                        </dt>
                        <dt>
                          <em>{{KeepDecima1(powerMotionData.calorie/1000)}}</em>千卡
                        </dt>
                        <dt>卡路里</dt>
                      </dl>
                      <dl>
                        <dt>
                          <img src="../../assets/images/分组6@2x.png" alt>
                        </dt>
                        <dt>
                          <em>{{fomatFloat(powerMotionData.distance/1000)}}</em>公里
                        </dt>
                        <dt>距离</dt>
                      </dl>
                    </li>
                  </ul>
                </div>
                <table border="1" cellpadding="“10”" cellspacing="0">
                  <div>数据详情</div>
                  <tbody>
                    <tr>
                      <td>速度</td>
                      <td>时间</td>
                    </tr>
                    <tr
                      v-for="(item,i) in powerMotionData.dataDetails !=null ? powerMotionData.dataDetails : []"
                      :key="i"
                    >
                      <td>{{item.speed}}公里/小时</td>
                      <td>{{headCreateTime(item.time)}}</td>
                    </tr>
                   
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="item.type==3">
              <div class="p15 Treadmill Butterfly_machine">
                <div class="text_title">{{startTime}}-{{stopTime.substring(0,5)}}</div>
                <div class="pt10 heart_rate">
                  <ul>
                    <li>
                      <dl>
                        <dt>
                          <img src="../../assets/images/时长copy.png" alt>
                        </dt>
                        <dt>
                          <em>{{headCreateTime(powerMotionData.motionTime)}}</em>
                        </dt>
                        <dt>总时间</dt>
                      </dl>
                      <dl>
                        <dt>
                          <img src="../../assets/images/重量@2x_1.png" alt>
                        </dt>
                        <dt>
                          <em>{{powerMotionData.weight}}</em>公斤
                        </dt>
                        <dt>总重量</dt>
                      </dl>
                    </li>
                    <li>
                      
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate<=59 || powerMotionData.avgHartRate == 0">
                        <dt>
                          <img src="../../assets/images/分组_6@2x.png" alt>
                        </dt>
                        <!-- <dt style="color:#9399A5">{{powerMotionData.heart}}次/分钟</dt> -->
                        <dt  v-if="powerMotionData.heart == 0">--次/分钟</dt>
                        <dt  v-else>{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate>=60 && powerMotionData.avgHartRate<=69">
                        <dt>
                          <img src="../../assets/images/分组 6@2x_1.png" alt>
                        </dt>
                        <dt >{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate>=70 && powerMotionData.avgHartRate<=79">
                        <dt>
                          <img src="../../assets/images/分组_6@2x_3.png" alt>
                        </dt>
                        <dt >{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate>=80 && powerMotionData.avgHartRate<=89">
                        <dt>
                          <img src="../../assets/images/分组6@2x1.png" alt>
                        </dt>
                        <dt >{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="powerMotionData.avgHartRate>=90">
                        <dt>
                          <img src="../../assets/images/分组 6@2x_2.png" alt>
                        </dt>
                        <dt >{{powerMotionData.heart}}次/分钟</dt>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt>
                          <img src="../../assets/images/Shape@2x.png" alt>
                        </dt>
                        <dt>
                          <em>{{KeepDecima1((powerMotionData.calorie/1000))}}</em>千卡
                        </dt>
                        <dt>卡路里</dt>
                      </dl>
                      <dl>
                        <dt>
                          <img src="../../assets/images/时长_copy@2x.png" alt>
                        </dt>
                        <dt>
                          <em>{{powerMotionData.motionTimes}}</em>次
                        </dt>
                        <dt>总次数</dt>
                      </dl>
                    </li>
                  </ul>
                </div>
                <table border="1" cellpadding="“10”" cellspacing="0">
                  <div>数据详情</div>
                  <tr>
                    <td>重量</td>
                    <td>次数</td>
                  </tr>
                  <tr
                    v-for="(item,i) in powerMotionData.dataDetails!=null?powerMotionData.dataDetails:[]"
                    :key="i"
                  >
                    <td>{{item.heavy}}公斤</td>
                    <td>{{item.times}}次</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld'
import { Tab, Tabs, version,Dialog } from "vant";
import { siveDataDetails, typeDetails } from "@/request/api";
import houseAimg3 from "../../../public/aggregate.json";
import F2 from "@antv/f2";
// import echarts from 'echarts'
// import echartsInfoPir from '../../components/chart/echartsinfo_pir'
// import echartsInfobar from '../../components/chart/echartsinfo_bar'
export default {
  data() {
    return {
      avgspeed:'',
      active: "0",
      active1: "0",
      data: [
        {
          name: "极限",
          percent: "",
          a: "1"
        },
        {
          name: "无氧运动",
          percent: "",
          a: "1"
        },
        {
          name: "有氧运动",
          percent: "",
          a: "1"
        },
        {
          name: "燃脂运动",
          percent: "",
          a: "1"
        },
        {
          name: "热身",
          percent: "",
          a: "1"
        }
      ],
      
      userId: this.$route.query.userId,
      subscribeDate: this.$route.query.subscribeDate,
      tabLists: [],
      aggregate: houseAimg3.images,
      powerMotionData: {},
      motionDataObj: {},
      startTime: "",
      stopTime: "",
      endTime: "",
      distance: "",
      heartRate: [],
      heartArr: [],
      myChart:'',
      maximalExercise:'',
      anaerobicExercise:'',
      aerobicExercise:'',
      fatMovement:'',
      warmUp:'',
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    HelloWorld,
    [Dialog.name]: Dialog
    // echartsInfoPir,
    // echartsInfobar
  },
  mounted() {
    this.init();
    
  },
  updated() {},
  created() {
    
  },
  methods: {
     fomatFloat(x) {
      // if(isNaN(num)){
      //   return null;
      // }
      // point=Math.pow(10,point+1);
      // num=num*point;
      // if(num===+num){
      //   return parseInt((num+5)/10)/point*10;
      // }else{
      //   return +num;
      // }
      var f = parseFloat(x); 
   if (isNaN(f)) { 
    return false; 
   } 
   var f = Math.round(x*100)/100; 
   var s = f.toString(); 
   var rs = s.indexOf('.'); 
   if (rs < 0) { 
    rs = s.length; 
    s += '.'; 
   } 
   while (s.length <= rs + 2) { 
    s += '0'; 
   } 
   return s; 
    },
    KeepDecima1(x){
      // var result = parseFloat(num);
      // if (isNaN(result)) {
      // return false;
      // }
      // result = Math.round(num * 10) / 10;
      // return result;
      var f = parseFloat(x); 
   if (isNaN(f)) { 
    return false; 
   } 
   var f = Math.round(x*10)/10; 
   var s = f.toString(); 
   var rs = s.indexOf('.'); 
   if (rs < 0) { 
    rs = s.length; 
    s += '.'; 
   } 
   while (s.length <= rs + 1) { 
    s += '0'; 
   } 
   return s; 
    },
    onTabClick(index, title) {
      this.active1 = index;
      let findVal = this.aggregate.find((item,i)=> {return i==index});
      console.log(findVal,'当前值')
      this.initTypeDetail(findVal.type, findVal.id,index);
    },
   async init() {
      const userId = this.userId;
      // const subscribeDate = this.getNowFormatDate();
      const subscribeDate = this.subscribeDate;
      console.log(subscribeDate);
      let respon = await siveDataDetails(userId, subscribeDate);
        // .then(res => {
          console.log("初始化数据", respon);
          if (respon.data.code == 2000) {
            this.tabLists = respon.data.obj || [];
            console.log(this.tabLists,'====>>>>')
            const aggregate = this.aggregate;
            console.log('josn',aggregate)
            const arr = [];
            if (this.tabLists.length > 0) {
              // for (var n in this.tabLists) {
                // console.log(n,'====>')
                // if(this.tabLists[n].name !==null){
                
                // if (this.tabLists[n].name == aggregate[n].name) {
                //   arr.push({
                //     src: aggregate[n].src,
                //     img: aggregate[n].img,
                //     name: aggregate[n].name,
                //     time: this.tabLists[n].time,
                //     type: this.tabLists[n].type,
                //     id: this.tabLists[n].id
                //   });
                // } else {
                //   for (var j in aggregate) {
                //     if (aggregate[j].name == this.tabLists[n].name) {
                //       arr.push({
                //         src: aggregate[j].src,
                //         img: aggregate[j].img,
                //         name: aggregate[j].name,
                //         time: this.tabLists[n].time,
                //         type: this.tabLists[n].type,
                //         id: this.tabLists[n].id
                //       });
                //     }
                //   }
                // }
                // }
              // }
              this.tabLists.map((v,i) => {
                aggregate.map((val,j) => {
                  if(v.name == val.name){
                    arr.push({
                          src: aggregate[j].src,
                          img: aggregate[j].img,
                          name: aggregate[j].name,
                          time: this.tabLists[i].time,
                          type: this.tabLists[i].type,
                          id: this.tabLists[i].id
                        });
                  }
                })
                
              })
              this.$set(this, "aggregate", [...arr]);
            }
            else {
              this.$set(this, "aggregate", []);
            }

            console.log("对比2", this.aggregate);
            this.initTypeDetail(this.aggregate[0].type, this.aggregate[0].id, 0);
          }
        // })
        // .catch(err => {
        //   console.log("请求错误！", err);
        // });
    },

    initTypeDetail(type, id,index) {
      console.log(index,'======>>>')
      let params = {
        type: type,
        // userId: "1128609374529040385",
        userId: this.userId,
        motionId: id
      };
      // let _this = this;
      typeDetails(params)
        .then(res => {
          console.log("心率数据", res);
          if (res.data.code == 2000) {
            
            if (type == 0 || type == 1) {
              // this.motionDataObj = res.data.obj.motionData || {};
            this.$set(this,'motionDataObj',res.data.obj.motionData || {});
              // _this.heartRate = res.data.obj.motionData.heartRate || [];
              this.$set(this,'heartRate',res.data.obj.motionData.heartRate || [])
              // debugger
              
              this.distance = this.motionDataObj.distance;
              this.endTime = this.motionDataObj.endTime.split(" ")[1];
              this.startTime = this.motionDataObj.startTime.substr(0, 16);
              this.$set(
                this.data[0],
                "percent",
                this.motionDataObj.maximalExercise
              );
              this.$set(
                this.data[1],
                "percent",
                this.motionDataObj.anaerobicExercise
              );
              this.$set(
                this.data[2],
                "percent",
                this.motionDataObj.aerobicExercise
              );
              this.$set(
                this.data[3],
                "percent",
                this.motionDataObj.fatMovement
              );
              this.$set(this.data[4], "percent", this.motionDataObj.warmUp);
             
              console.log('图饼数据',this.data)
              // debugger
              this.initPiechart(this.heartRate,index);
              this.intipriec(this.heartRate,index);
              // this.initHistogram()
            } else if (type == 2 || type == 3) {
              this.powerMotionData = res.data.obj.powerMotionData || {};
              this.stopTime = this.powerMotionData.stopTime.split(" ")[1];
              this.startTime = this.powerMotionData.startTime.substr(0, 16);
              // this.avgspeed = this.powerMotionData.dataDetails
                //将array的长度赋给len
                var len = this.powerMotionData.dataDetails.length;
                var sum = 0;
                //利用for循环遍历数组的内容，利用sum累加求和
                for(var i = 0; i < len ; i++){
                    sum += parseFloat(this.powerMotionData.dataDetails[i].speed);
                }
        //        返回数组的和与长度求平均值
                this.avgspeed = sum/len;
            console.log(this.avgspeed,'平均值')
            }
          }
        })
        .catch(err => {
          console.log("请求错误！", err);
        });
    },
         initPiechart(data,index) {
           var _this = this;
      var motionPoint = new Number(
        this.motionDataObj.motionPoint ? this.motionDataObj.motionPoint : ""
      );
      var map = {};
      var res = [];
      var res1 = [];
      var res2 = [];
      var res3 = [];
      var res4 = [];
      
      data.map(function(obj) {
        // console.log(obj,'dfsdfsd')
        // map[obj.name] = _this.headCreateTime(obj.percent*60);
        // console.log(obj)
        if(obj>0 && obj<=59){
             res.push({obj});
          return res.length
          // console.log(obj.length,'====')
        }else if(obj>59 && obj<=69){
            res1.push({obj});
            return res1.length
          //  console.log(res.length)
        }else if(obj>69 && obj<=79){
           res2.push({obj});
           return res2.length
          //  console.log(obj,'====')
        }else if(obj>79 && obj<=89){
           res3.push({obj});
           return res3.length
          //  console.log(obj,'====')
        }else if(obj>=90){
           res4.push({obj});
           return res4.length
          //  console.log(obj,'====')
        }
      });
      // console.log(res,res1,res2,res3,res4,'?????')
      var res5 = [
        {
          percent:res4.length,
          a:'1',
          name: "极限"
        },
        {
          percent:res3.length,
          a:'1',
          name: "无氧运动"
        },
        {
          percent:res2.length,
          a:'1',
          name: "有氧运动"
        },
        {
          percent:res1.length,
          a:'1',
          name: "燃脂运动"
        },
        {
          percent:res.length,
          a:'1',
          name: "热身"
        },
        // {
        //   percent:res0.length,
        //   a:'1',
        //   name: "休闲"
        // }
        ];
      res5.map(function(obj) {
        map[obj.name] = _this.headCreateTime(obj.percent*60);
      })
      var chart = new F2.Chart({
        id:'mountNodeList'+index,
        pixelRatio: window.devicePixelRatio,
        padding: [20, "auto"]
      });
      chart.clear();
      chart.source(res5, {
        percent: {
          formatter: function formatter(val) {
            alert(2)
            console.log(val,'饼图')
            return val + "分钟";
          }
        }
      });
      chart.legend({
        position: "right",
        triggerOn: 'click',
        clickable: false,
        itemFormatter: function itemFormatter(val) {
          // console.log(val,'lllll')
          return val + '    ' + map[val];
        }
      });
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85
      });
      chart.axis(false);
      chart.tooltip(false);
      chart
        .interval()
        .position("a*percent")
        .color("name", ["#F85842", "#FFCB14", "#14D36B", "#3FA6F2", "#9399A5"]
        )
        .adjust("stack")

      chart.guide().html({
        position: ["50%", "45%"],
        html:
          '<div style="width: 250px;height: 40px;text-align: center;" id="aaa">' +
          '<div class="text_name">' +
          motionPoint +
          "</div>" +
          '<div class="text_price" >运动点数</div>' +
          "</div>"
      });
      this.$nextTick(() =>{
        let aa = document.querySelector('#aaa');
        console.log(aa)
        aa.onclick=function(){
          Dialog.alert({
            title: '运动点数',
            message: '汇总本次运动心率的运动成绩运动点数参考MyZone的算法'
          }).then(() => {
            // on close
          });

        }
      })
      chart.render();
    },
    
    intipriec(heartRate,index){
      // var heartRate = [
      //   31,52,36,60,88,55,99,33,22,11,22,44,73,66
      // ]
     var item = heartRate.map((v,i) => {
       
          if(v>=0 && v<=59){
            // alert(1)
            return {
                color:'4',
                year: i+1,
                sales: v
              }
          }
          else if(v>59 && v<=69){
            return {
                color:'3',
                year: i+1,
                sales: v
              }
          }
          else if(v>69 && v<=79){
            return {
                color:'2',
                year: i+1,
                sales: v
              }
          }
          else if(v>79 && v<=89){
            return {
                color:'1',
                year: i+1,
                sales: v
              }
          }
          else if(v>=90){
            return {
                color:'0',
                year: i+1,
                sales: v
              }
          }
     })
      var num = 4;
      if(item.length<=3){
        num = 2
        // console.log(num)
      }
      var chart = new F2.Chart({
        id: 'histogramList'+index,
        pixelRatio: window.devicePixelRatio
      });
      chart.clear();
      chart.legend(false);
      chart.tooltip(false);
      chart.axis('sales',{
        labelOffset: 20
      })
      chart.source(item, {
        year: {
          tickCount: num,
          formatter: function formatter(val,i) {
            // console.log('year',val,i)
            return val.toFixed(0)+'min'
          }
        },
        sales:{
          // tickCount: 4,
          // min:0,
          // max:100,
          formatter: function formatter(val) {
            // console.log(val)
            return (val * 1).toFixed(0)+'%';
           
          }
        }
      });
      
      chart.interval().position('year*sales').color('color',value =>{
        if(value == 4){
          return "#9399A5"
        }else if(value == 3){
          return "#3FA6F2"
        }else if(value == 2){
          return "#14D36B"
        }else if(value == 1){
          return "#FFCB14"
        }else if(value == 0){
          return "#F85842"
        }
      }).size('year',value => {
        if(value>=0 && value < 10 ){
          return 20
        }else if(value>=0 && value < 1000){
          return 5
        }
        
      })
      chart.render();
      },
   
    //时间戳转换日期

    getNowFormatDate() {
      //获取当前时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var currentdate =
        date.getFullYear() + seperator1 + month + seperator1 + strDate;
      // + " "  + date.getHours()  + seperator2  + date.getMinutes()
      // + seperator2 + date.getSeconds();
      return currentdate;
    },
    //时间戳转换日期格式
     
        headCreateTime(time){
            var hh;
            var mm;
            var ss;
           //传入的时间为空或小于0
            if(time==null||time<0){
                return;
            }
            //得到小时
            hh=time/3600|0;
            time=parseInt(time)-hh*3600;
            if(parseInt(hh)<10){
                  hh="0"+hh;
            }
            //得到分
            mm=time/60|0;
            //得到秒
            ss=parseInt(time)-mm*60;
            if(parseInt(mm)<10){
                 mm="0"+mm;    
            }
            if(ss<10){
                ss="0"+ss;      
            }
            return hh+":"+mm+":"+ss;
        }
    
  }
};
</script>
<style lang="less" src="./echartsInfo.less"></style>
