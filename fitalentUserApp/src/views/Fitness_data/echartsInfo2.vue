<template>
    <div class="echarts_info">
        <div class="tab_content mt20">
            <!-- 健康传奇设备 -->
            <!-- <div v-if="item.type==0 || item.type==1"> -->
              <div class="Treadmill pr_pl15">
                <span class="text_title">{{startTime}}-{{endTime.substring(0,5)}}</span>
                <div class="header_tit">
                  跑步机
                </div>
                <div class="pt10 heart_rate">
                  <ul>
                    <li>
                      <dl>
                        <dt>
                          <!-- <img src="../../assets/images/时长copy.png" alt> -->
                        </dt>
                        <dt>
                          <em>{{headCreateTime(motionDataObj.totalExerciseTime)}}</em>
                        </dt>
                        <dt>总时间</dt>
                      </dl>
                      <dl>
                        <dt>
                          <!-- <img src="../../assets/images/发电量.png" alt> -->
                        </dt>
                        <dt>
                          <em>{{KeepDecima1(motionDataObj.powerGeneration/1000)}}</em> 千焦
                        </dt>
                        <dt>发电量</dt>
                      </dl>
                    </li>
                    <!-- <li>
                      <dl class="Heart_rate_animation" v-if="motionDataObj.meanHeartRateStrength>=0 && motionDataObj.meanHeartRateStrength <= 49">
                        <dt>
                          <img src="../../assets/images/0_49.png" alt>
                        </dt>
                        <dt v-if="motionDataObj.avgHartRate == 0">--次/分钟</dt>
                        <dt v-else>{{motionDataObj.avgHartRate}}次/分钟</dt>
                      </dl>
                      <dl class="Heart_rate_animation" v-if="motionDataObj.meanHeartRateStrength>=50 && motionDataObj.meanHeartRateStrength <= 59">
                        <dt>
                          <img src="../../assets/images/分组_6@2x.png" alt>
                        </dt>
                        <dt >{{motionDataObj.avgHartRate}}次/分钟</dt>
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
                    </!--> 
                    <li>
                      <dl>
                        <dt>
                          <!-- <img src="../../assets/images/Shape@2x.png" alt> -->
                        </dt>
                        <dt>
                          <em>{{KeepDecima1(motionDataObj.consume/1000)}}</em> 千卡
                        </dt>
                        <dt>卡路里</dt>
                      </dl>
                      <dl>
                        <dt>
                          <!-- <img src="../../assets/images/分组6@2x.png" alt> -->
                        </dt>
                        <dt>
                          <em>{{fomatFloat(distance/1000)}}</em> 公里
                        </dt>
                        <dt>距离</dt>
                      </dl>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 饼图 -->
              <div class=" Pie_chart mt15" v-show="backgroundImg">
                  <canvas id="mountNodeList" width="100%" heihgt="226px"></canvas>
              </div>
              <div class="pt_pb20 Pie_chart mt15" v-show="!backgroundImg">
                  <img src="../../assets/images/pri.png" style="max-width: 100%" alt="">
              </div>
              <!-- 柱状图 -->
              <div class="Histogram_info pr_pl15" v-show="backgroundImg">
                <div class="text-title p15">心率等级分布/分钟</div>
                <div class="Histogram">
                  <div id="histogramList" class="histogramList" ></div>
                </div>
              </div>
              <div class="pt_pb15 Pie_chart mt15" v-show="!backgroundImg">
                  <img src="../../assets/images/zhuimg.png" style="max-width: 100%" alt="">
              </div>
            </div>
        <!-- </div> -->
    </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld'
import { Tab, Tabs, version,Dialog } from "vant";
import { siveDataDetails, typeDetails } from "@/request/api";
import houseAimg3 from "../../../public/aggregate.json";
// import F2 from "@antv/f2";
import F2 from "@antv/f2/lib/index-all"
import { constants } from 'crypto';
// import echarts from 'echarts'
let echarts = require('echarts/lib/echarts')
//根据需要引入相应图的组件
require('echarts/lib/chart/bar')//柱状图
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
        },
        {
          name: "休闲",
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
      backgroundImg:false,
      data2: [5, 20, 36, 10,56,95,64,54,26,48,78,74,
      33,76,15,20, 36, 10,56,95,64,54,26,48,89,79,85,
      80,69,62,41,22,45,20, 36, 10,],
      lists:[]
    }
    },
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        HelloWorld,
        [Dialog.name]: Dialog
    },
    mounted(){
        // let type = this.$route.query.type;
        // let id = this.$route.query.id;
        // this.initTypeDetail(type,id)
        let type = 0;
        let id = '"1144127331124314114"'
        this.initTypeDetail(type,id)
    },
    methods:{
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
    initTypeDetail(type, id,index) {
      console.log(type,'======>>>')
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
             
              // debugger
              this.initPiechart(this.heartRate,index);
             
              this.intipriec(this.heartRate,index);
              // this.intipriec(this.data2,index);
               console.log(this.heartRate,'....>>>>')
               this.heartRate.map((v,i) =>{
                 
                 console.log(this.heartRate[i])
                 if(this.heartRate[i] == 0){
                   this.backgroundImg = false;
                  //  alert(1)
                 }else{
                  //  alert(2)
                   this.backgroundImg = true;
                 }
               })
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
                console.log(sum,'数组和')
                //返回数组的和与长度求平均值
                this.avgspeed = (this.powerMotionData.distance/1000)/(this.powerMotionData.motionTime/3600);
                // this.avgspeed = sum/len
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
      var res6 = [];
      var res = [];
      var res1 = [];
      var res2 = [];
      var res3 = [];
      var res4 = [];
      
      data.map(function(obj) {
        // console.log(obj,'dfsdfsd')
        // map[obj.name] = _this.headCreateTime(obj.percent*60);
        // console.log(obj)
        if(obj>=0 && obj<=49){
             res6.push({obj});
          return res.length
          // console.log(obj.length,'====')
        }
        else if(obj>49 && obj<=59){
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
        {
          percent:res6.length,
          a:'1',
          name: "休闲"
        }
        ];
      res5.map(function(obj) {
        map[obj.name] = _this.headCreateTime(obj.percent*60);
      })
      var chart = new F2.Chart({
        id:'mountNodeList'+index,
        // width: 375,
        height: 226,
        pixelRatio: window.devicePixelRatio,
        padding: [20, "auto"]
      });
      chart.clear();
      chart.source(res5, {
        percent: {
          formatter: function formatter(val) {
            // alert(2)
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
        },
        marker: {
          symbol: 'circle', // marker 的形状（圆形）
          radius: 5, // 半径大小
        },
        wordSpace:16,//marker 的形状与文本间距
        offsetX:16,//饼图与文本间距
        offsetY:10,//饼图与文本间距
        nameStyle: {
          // textAlign: 'center', // 文本对齐方向，可取值为： start middle end
          fill: '#9399A5', // 文本的颜色
          fontSize: '14', // 文本大小
          // fontWeight: 'bold', // 文本粗细
          // textBaseline: 'bottom', // 文本基准线，可取 top middle bottom，默认为middle
          // width: 20, // 设置文本的宽度
          height: 21, // 设置文本的高度
        }
      });
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.75,
        radius: 0.9,
      });
      chart.axis(false);
      chart.tooltip(false);
      chart
        .interval()
        .position("a*percent")
        .color("name", ["#F85842", "#FFCB14", "#14D36B", "#3FA6F2", "#9399A5","#BDC1C7"]
        )
        .adjust("stack")
        .size(13)
      chart.interaction('pan');
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
      });
      
      chart.render();
    },
    fGetChartFontSize(){
        const dpr = window.devicePixelRatio;
        let fontSize = '';
        const heartRate = this.heartRate;
        if(heartRate.length > 0 && heartRate.length<=10){
          // alert(1)
            fontSize = 15;
        }
        else if(heartRate.length > 10 && heartRate.length<=50){
          // alert(0)
            fontSize = 9;
        }
        else if(heartRate.length > 50 && heartRate.length<=100){
          // alert(2)
            fontSize = 5;
        } 
        else{
            fontSize = 3
        }
        return fontSize;
    },
    intipriec(data2,index){
      const barWidth = this.fGetChartFontSize();
      let lists = []
     data2.map((v,i) =>{
       lists.push(i+1)
     })
     // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('histogramList'+index))
      // 绘制图表
      myChart.setOption({
        // title: { text: '心率等级分布/分钟' },
        // tooltip: {},
        grid:{
            top:20,
            left:50,// 调整这个属性
            right:10,
            bottom:30,
        },
        xAxis: {
          data: lists,
          axisLabel:{
            formatter: '{value} min',
            textStyle:{
              color: '#515A6B'
            }
          },
          axisTick:{       //y轴刻度线
            show:false
          },
          lineStyle:{
            width:0
          },
          axisLine:{
            lineStyle: {
                    color: "#dedede",
                    // width: 0,
                    type: "solid"
                }
          }
        },
        yAxis: {
          
          axisLine:{
            show:false,
          },
          
          type:'value',
          axisLabel:{
            formatter: '{value} %',
            textStyle:{
            // fontSize:size //此处设置提示文字大小
            color: '#515A6B',
            },
          },
          
          axisTick:{       //y轴刻度线
            show:false
          },
          splitLine:{
              show:true,
              lineStyle:{
                  type:'dashed',
                  color:'#E7E8EB'
              }
          }
          // data:[0,60,70,80,90,100,120]
        },
        series: [{
          // name: '销量',
          type: 'bar',
          data: data2,
          barWidth:barWidth,
          barMinHeight:0,
          barMaxHeight:100,
          itemStyle:{
            normal:{
              color:function(v){
                // console.log(v)

                if(v.value>0 && v.value<=49){
                  return '#BDC1C7'
                }
                else if(v.value>49 && v.value<=59){
                  return '#9399A5'
                }
                else if(v.value>59 && v.value<=69){
                  return '#3FA6F2'
                }
                else if(v.value>69 && v.value<=79){
                  return '#14D36B'
                }
                else if(v.value>79 && v.value<=89){
                  return '#FFCB14'
                }
                else if(v.value>=90){
                  return '#F85842'
                }
              }
            }
          }
        }],
        dataZoom: [
            {
                type: 'slider',
                show: false,
                start: 34,
                end: 100,
                handleSize: 8
            },
            {
                type: 'inside',
                start: 34,
                end: 100
            },
           
        ],
      });
      
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
}
</script>
