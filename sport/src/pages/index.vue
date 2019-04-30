<template>
  <div>
    <header>
      <div class="header">
        <div class="header-left">
          <div style="width: 1.33333333333rem;height:1.333333rem;">    
            <img style="width:100%;border-radius: 50%;" v-if="avatar" :src="avatar" alt="">
            <img style="width:100%;border-radius: 50%;" v-if="!avatar" src="../assets/images/椭圆 2@2x(1).png" alt="">
          </div>
          <div class="text">
            <p>{{nickName}}</p>
            <!-- <p style="background:rgba(16,29,55,1);">ID：{{userId}}</p> -->
          </div>
        </div>
        <div class="header-right">
          <img src="../assets/images/分组 6@2x.png" alt="">
        </div>
      </div>
    </header>
    <div class="mian">
       <div v-if="dataList.type != 1" style="height:350px;">
         <maps></maps>
       </div>
       <div v-if="dataList.type == 1" style="padding:20px 0px">
         <img style="height:200px" src="../assets/images/分组 7@2x.png" alt="">
       </div>
      <div class="speed">
        <div class="spenekTop">
            <span>{{$t('share.speek.slowly')}}</span>
            <span class="line"></span>
            <span>{{$t('share.speek.faster')}}</span>
          </div>
          <div class="speekTime">
            <span>{{dataList.minPace}}</span>
            <span>{{dataList.maxPace}}</span>
          </div>
      </div>
      <div class="shareData">
              <p>
                  <span class="revenue">{{dataList.distance}}</span>
                  <span>{{$t('share.data.kilometre')}}</span>
              </p>
              <p v-if="dataList.type == 0">{{$t('share.data.outdoors')}}</p>
              <p v-if="dataList.type == 1">{{$t('share.data.inner')}}</p>
              <p v-if="dataList.type == 2">{{$t('share.data.cycling')}}</p>
              <p v-if="dataList.type == 3">{{$t('share.data.walk')}}</p>
              <p style="line-height: 1.2">{{timeStr}}</p>
      </div>
      <div class="shareDataDetailfirst">
         <div class="dataIocn">
            <img src="../assets/images/时间1@2x.png" alt="">
            <span>{{$t('share.item.allTime')}}</span>
        </div>
        <div>
          <span style="color:rgba(255,255,255,1);;font-size:24px;">{{dataList.timeLong | formatSeconds}}</span>
        </div>
      </div>
      <div class="shareDataDetail">
          <div class="dataIocn">
            <img src="../assets/images/椭圆形@2x(2).png" alt="">
            <span>{{$t('share.item.allocation')}}</span>
        </div>
        <div>
           <span style="color:rgba(255,255,255,1);;font-size:24px;">{{dataList.avgPace}}</span>
        </div>
      </div>
      <div class="shareDataDetail">
          <div class="dataIocn">
            <img src="../assets/images/sd1@2x.png" alt="">
            <span>{{$t('share.item.speek')}}(km/h)</span>
        </div>
        <div>
           <span style="color:rgba(255,255,255,1);;font-size:24px;">{{dataList.avgSpeed}}</span>
        </div>
      </div>
      <div class="shareDataDetail">
         <div class="dataIocn">
            <img  src="../assets/images/xh1@2x.png" alt="">
            <span>{{$t('share.item.consume')}}</span>
        </div>
        <div>
           <span style="color:rgba(255,255,255,1);;font-size:24px;">{{dataList.calories}}</span>
        </div>
      </div>
      <div class="shareDataDetail">
        <div class="dataIocn">
            <img src="../assets/images/椭圆形1@2x(1).png" alt="">
            <span>{{$t('share.item.step')}}</span>
        </div>
        <div>
           <span style="color:rgba(255,255,255,1);;font-size:24px;">{{dataList.step}}</span>
        </div>
      </div>
      <div class="shareDataDetail">
         <div class="dataIocn">
            <img src="../assets/images/心率@2x(1).png" alt="">
            <span>{{$t('share.item.heat')}}</span>
        </div>
        <div>
          <span>
            <span>{{$t('share.speek.height')}}</span>
            <span style="color:rgba(255,255,255,1);;font-size:24px;">{{dataList.maxHeartRate}}</span>
          </span>
         <span style="margin-left:8px;">
            <span>{{$t('share.speek.low')}}</span>
            <span style="color:rgba(255,255,255,1);;font-size:24px;">{{dataList.minHeartRate}}</span>
         </span>
        </div>
      </div>
      <div class="shareMinkm">
        <div class="share-chart-wrapper">
          <div class="minkmTitel">
            <div class="minKmIocn">
              <img src="../assets/images/椭圆形@2x(2).png" alt="">
              <span>{{$t('share.item.allocation')}}</span>
            </div>
            <div>
              <span>{{$t('share.speek.faster')}} {{dataList.maxPace}}</span>
              <span style="margin-left:10px">{{$t('share.speek.slowly')}} {{dataList.minPace}}</span>
            </div>
          </div>
          <canvas id="minkm"></canvas>
        </div>
      </div>
      <div class="shareHeart">
        <div class="share-chart-wrapper">
          <div class="minkmTitel">
            <div class="minKmIocn">
              <img src="../assets/images/心率@2x(1).png" alt="">
              <span>{{$t('share.item.heat')}}</span>
            </div>
            <div>
              <span>{{$t('share.speek.height')}} {{dataList.maxHeartRate}}</span>
              <span style="margin-left:10px">{{$t('share.speek.average')}} {{dataList.avgHeartRate}}</span>
            </div>
          </div>
           <div v-if="heartArr == ''">
              <span style="color:#fff">{{$t('share.notLink')}}</span>
            </div>
          <canvas id="heart"></canvas>
        </div>
      </div>
    </div>
    <div class="bottom">
        <div class="footer">
          <div class="iocn">
            <img src="../assets/images/分组 6@2x.png" alt="">
            <span>{{$t('share.healthy')}}</span>
            <!-- <span>111</span> -->
          </div>
          <div>
            <span class="openBtn" @click="openLink()">{{$t('share.open')}}</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import F2 from '@antv/f2'
import axios from 'axios'
import maps from 'common/map'
import { stringify } from 'querystring';
export default {
   components: {
    maps,
  },
  data() {
    return {
      listdata:[],
      timeStr:'',
      heartArr:[],
      paceList:[],
      dataList:[],
      avatar:'',
      nickName:"",
      trackballList:[],
      userId:'',
      show:false,
    }
  },
  computed: {
    newdata: function() {
      // return this.data + 1
    }
  },
  mounted(){
      var iphoneSportId = this.$route.query.iphoneSportId
      var userId = this.$route.query.userId
      this.userId = userId
      var type = this.$route.query.type
      this.getData(iphoneSportId)
      this.getDetailDate(iphoneSportId)
      this.getUserInfo(userId)
  },
  filters:{
   formatSeconds(value){
        var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime >=60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        var result = parseInt(secondTime)>=10?parseInt(secondTime):'0'+parseInt(secondTime);
        if(hourTime > 0) {
          if(hourTime<10){
             result = "0" + parseInt(hourTime)+":"+(parseInt(minuteTime)>10?parseInt(minuteTime):'0'+parseInt(minuteTime))+":"+result;
          }else{
             result = "" + parseInt(hourTime)+":"+(parseInt(minuteTime)>10?parseInt(minuteTime):'0'+parseInt(minuteTime))+":"+result;
          }
        }else if(minuteTime > 0){
           if(minuteTime<10){
              result = "00:0" + parseInt(minuteTime)+":"+ result;
          }else{
              result = "00:" + parseInt(minuteTime)+":"+ result;
          }
        }else if(secondTime < 60){
          result = "00:00:"+result
        }
        return result;
    }
  },
  methods: {
    //跳转链接
    openLink(){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isiOS){
        window.location.href = 'https://itunes.apple.com/cn/app/id1438493880?l=en&mt=8'
      }else if(isAndroid){

      }
    },
    getUserInfo(userId){
       axios({
          url:'/isport/concumer-basic/basic/customer/getBasicInfo',
          method: 'post',
          data:{
            "interfaceId": 0,
            "mobile": "string",
            "userId": userId
          }
          }).then(res=>{
              this.nickName = res.data.obj.nickName,
              this.avatar = res.data.obj.headUrl
        })
    },
    getData(iphoneSportId){  
        axios({
          url:'/isport/concumer-wristband/wristband/iphoneSportDetail/selectByIphoneSportId?iphoneSportId='+iphoneSportId,
          method: 'post',
          }).then(res=>{
          this.paceList = JSON.parse(res.data.obj.paceArr)
          console.log(this.paceList,'paceList')
          let arr = []
          for(var i= 0;i<this.paceList.length;i++){
            var newstr=JSON.stringify(this.paceList[i].pace)
            var aaa = newstr.substring(1, newstr.length-3)
            var ss = aaa.split("'")
            var bb = ss.map(Number)
            var cc = bb[0]*60+bb[1]
            arr.push(cc)
          }
          this.max = Math.max.apply(null,arr);
          if(res.data.obj.heartRateArr != '' &&  res.data.obj.heartRateArr != null){
             this.heartList = JSON.parse(res.data.obj.heartRateArr)
               let arr112 = []
              let newArr = this.heartList.map((item,index) =>{
                var obj = {
                    'heartRate':Number(item.heartRate),
                    'time':Number(item.time),
                }
                arr112.push(obj)
              })
              this.heartArr = newArr
              this.getHeart(arr112)
          }
        
          this.dealPace(this.max)
         
        })
    },
    dealPace(max){
      for(var i= 0;i<this.paceList.length;i++){
            var newstr=JSON.stringify(this.paceList[i].pace)
            var aaa = newstr.substring(1, newstr.length-3)
            var ss = aaa.split("'")
            var bb = ss.map(Number)
            this.paceList[i].pace = max - bb[0]*60+bb[1]
        }
        this.getMinkm();
    },
    getColorByBaiFenBi(bili){
    //var 百分之一 = (单色值范围) / 50;  单颜色的变化范围只在50%之内
        var one = (255+255) / 100;  
        var r=0;
        var g=0;
        var b=0;
    
        if ( bili < 50 ) { 
            // 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
            r = one * bili;
            g=255;
        }
        if ( bili >= 50 ) {
            // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
            g =  255 - ( (bili - 50 ) * one) ;
            r = 255;
        }
        r = parseInt(r);// 取整
        g = parseInt(g);// 取整
        b = parseInt(b);// 取整
        return 'rgb('+r+','+g+','+b+','+1+')';
        
    },
    color(index){
        if(index>this.paceList.length-1){
          return 'rgba(116,230,113,1)'
        }
        if((100 - this.paceList[index].pace/15) < 0){
          return '#fa5a5a'  
        }
        return this.getColorByBaiFenBi(100 - this.paceList[index].pace/15)
    },
    getDetailDate(iphoneSportId){
        axios({
          url:'/isport/concumer-wristband/wristband/iphoneSport/selectByPrimaryKey?iphoneSportId='+iphoneSportId,
          method: 'post',
          }).then(res=>{
          this.dataList = res.data.obj
          var time = res.data.obj.endTimestamp
          var d = new Date(time);
          var monthArr = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec");
          var suffix = new Array("st","nd","rd","th");
          var month = monthArr[d.getMonth()]; //月
          var ddate = d.getDate(); //日
          if(ddate % 10 < 1 || ddate % 10 > 3) {
            ddate = ddate + suffix[3];
          }else if(ddate % 10 == 1) {
            ddate = ddate + suffix[0];
          } else if(ddate % 10 == 2) {
            ddate = ddate + suffix[1];
          }else {
            ddate = ddate + suffix[2];
          }
          if(localStorage.getItem("__locale__") == 'ch'){
             this.timeStr=(d.getMonth() + 1) + '月' + d.getDate() + ' ' + d.getHours() + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes());
          }else{
            this.timeStr = ddate + " "+ month +" "+ d.getHours() + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes());
          }

        })
    },
    getMinkm(){
      var that = this
      // var Util = F2.Util;
      // const Shape = F2.Shape;
      // Shape.registerShape('area', 'areaRed', {
      //   getPoints: function(cfg) {
      //     console.log(cfg,'cfg')
      //     const x = cfg.x;
      //     const y = cfg.y;
      //     const y0 = cfg.y0;
      //     const x0 = cfg.x0;
      //     const width = cfg.size;
      //     console.log(x,'x')
      //     console.log(y,'x')
      //     console.log(y0,'y0')
      //     console.log(x0,'x0')
      //     return [
      //       { x: 0.3, y: 0.34 },
      //       { x: 0.3, y: 0.34 },
      //         { x: 0.3, y: 0.34 },
      //       { x: 0.3, y: 0.34 }
      //     ]
      //   },
      //   draw: function(cfg, group) {
      //     console.log(cfg.points,'cfg.points')
      //     const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
      //     console.log(points,'points')
      //     const polygon = group.addShape('polygon', {
      //       attrs: {
      //         points: [
      //           { x:points[0].x, y:points[0].y },
      //           { x:points[1].x, y:points[1].y },
      //           { x:points[2].x, y:points[2].y },
      //           { x:points[3].x, y:points[3].y }
      //         ],
      //         fill: cfg.color
      //       }
      //     });
      //     return polygon; // 将自定义Shape返回
      //   }
      // });
      var chart = new F2.Chart({
        id: 'minkm',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(this.paceList, {
        time: {
          tickCount: 5,
          min:0,
          formatter: function formatter(s) {
            console.log(s)
            var s = parseInt(s)
             var t;
              if(s > -1){
                  var hour = Math.floor(s/3600);
                  var min = Math.floor(s/60) % 60;
                  var sec = s % 60;
                  if(hour < 10) {
                      t = '0'+ hour + ":";
                  } else {
                      t = hour + ":";
                  }
                  if(min < 10)
                  {
                    t += "0";
                  }
                  t += min + ":";
                  if(sec < 10)
                  {
                    t += "0";
                  }
                  t += sec;
              }
              console.log(t,'t')
              return t;
            }
        },
        pace: {
          min:0,
          tickCount:5,
          max:that.max,
          formatter: function formatter(val,text) {
              var secondTime = parseInt((that.max) - val);// 秒
              if(secondTime<0){
                return result = '0"'
              }
                var minuteTime = 0;// 分
                if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
                    //获取分钟，除以60取整数，得到整数分钟
                    minuteTime = parseInt(secondTime / 60);
                    //获取秒数，秒数取佘，得到整数秒数
                    secondTime = parseInt(secondTime % 60);
                    //如果分钟大于60，将分钟转换成小时
                  }
                  var result = "" + parseInt(secondTime) + "''";
                  if(minuteTime > 0) {
                      result = "" + parseInt(minuteTime) + "'" + result;
                  }
                  return result
            },
            // tickCount: 5,
            sortable: false,
     
            },
          //   pace: Util.mix({
          //       scale: function(value) {
          //         if (value === null || value === undefined) {
          //           return NaN;
          //         }
          //         var max = this.max;
          //         console.log(max,'max')
          //         var min = this.min;
          //         if (max === min) {
          //           return 0;
          //         }
          //         var percent = (value - min) / (max - min);
          //         var rangeMin = this.rangeMin();
          //         var rangeMax = this.rangeMax();
          //         return  1-(rangeMin + percent * (rangeMax - rangeMin));
          //       },
          //       formatter: function formatter(val,text) {
          //           var secondTime = parseInt(val);// 秒
          //           // if(secondTime<0){
          //           //   console.log(secondTime,val)
          //           //   return result = 0
          //           // }
          //             var minuteTime = 0;// 分
          //             if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
          //                 //获取分钟，除以60取整数，得到整数分钟
          //                 minuteTime = parseInt(secondTime / 60);
          //                 //获取秒数，秒数取佘，得到整数秒数
          //                 secondTime = parseInt(secondTime % 60);
          //                 //如果分钟大于60，将分钟转换成小时
          //               }
          //               var result = "" + parseInt(secondTime) + "''";
          //               if(minuteTime > 0) {
          //                   result = "" + parseInt(minuteTime) + "'" + result;
          //               }
          //               return result
          //         },
          //         tickCount: 4,
                  
              // })
          }
          );
        chart.axis('time', {
          tickLine: {
            lineWidth: 1,
            stroke: '#232D42',
            // stroke: 'red',
            length: -5,
          }, 
          line:{
            lineWidth: 1,
            stroke: '#232D42',
            // labelOffset: 20,
          }, 
          textAlign: 'center',
          textBaseline: 'middle',
          label: (text, index, total) => {
            const cfg = {
              textAlign: 'center'
            };
            if (index === 0) {
              cfg.textAlign = 'start';
            }
            if (index > 0 && index === total - 1) {
              cfg.textAlign = 'end';
            }
            cfg.text = text;  
            return cfg;
          }
        });
          chart.tooltip(false)
         chart.axis('pace', {
           grid: null
        });
        chart.line().position('time*pace').color('l(360) 0:#FF9900 1:#FF9900').shape('smooth');
        chart.area().position('time*pace').color('l(360) 0:#FF9900 1:#FF9900').shape('smooth');
        chart.render();
    },
    getHeart(heartData){
      var chart = new F2.Chart({
        id: 'heart',
        pixelRatio: window.devicePixelRatio
      });
      chart.tooltip(false)
      chart.source(heartData, {
        time: {
          // ticks: ['00:14:23', '00:21:23', '00:28:23','00:35:23','00:42:23'],
          tickCount: 5,
          formatter: function formatter(s) {
             var t;
              if(s > -1){
                  var hour = Math.floor(s/3600);
                  var min = Math.floor(s/60) % 60;
                  var sec = s % 60;
                  if(hour < 10) {
                      t = '0'+ hour + ":";
                  } else {
                      t = hour + ":";
                  }
                  if(min < 10)
                  {
                    t += "0";
                  }
                  t += min + ":";
                  if(sec < 10)
                  {
                    t += "0";
                  }
                  t += sec;
              }
              return t;
            }
        },
        heartRate: {
          // ticks: [50, 100, 150,200,250],
          tickCount: 5,
          min:30
        }
      });
      chart.axis('time', {
           tickLine: {
            lineWidth: 1,
            stroke: '#232D42',
            length: -5,
          }, 
          line:{
            lineWidth: 1,
            stroke: '#232D42',
            // labelOffset: 20,
          }, 
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.axis('heartRate', {
        grid: null
    });
      chart.area().position('time*heartRate').color('l(90) 0:#F3546A 1:#F3546A').shape('smooth');
      chart.line().position('time*heartRate').color('l(90) 0:#F3546A 1:#F3546A').shape('smooth');
      chart.render();
    },
    showPlugin () {
      const that = this
      that.$vux.confirm.show({
        content:this.dialogConment,
        cancelText: '算了',
        confirmText:'可以',
        onConfirm () {
          axios({
            url:'/isport/concumer-wristband/wristband/wristbandConfig/updateByPrimaryKeySelective',
            method:'post',
            data:{
              "userId": 1,
              "deviceId": that.deviceId,
              "stepTarget": that.stepTarget,
            }
          }).then(res =>{
              that.$vux.toast.text('更改成功')
          })
        }
      })
    },
    tohome() {
      this.$router.goBack()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
header{
  .h(90);
  background:rgba(16,29,55,1);
  top:0;
  left: 0;
}
#container {
    height: 100%;
    width: 100%;
    canvas {
      display: block;
      width: auto;
      height: auto;
    }
}
.custom-content-marker{
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: RGBA(29, 206, 116, 1);
  border: 2px solid #fff;
  color:#fff;
  line-height: 23px;
  text-align: center;
  font-size: 15px;
}
#map { width:100%; height:357px/*WPAH*/; margin:0px;}
#mapContainer { width:100%; height:357px/*WPAH*/; margin:0px;}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  .header-left, .header-right{
    display: flex;
    align-items: center;
    text-align: left;
    color:rgba(255,255,255,1);
    font-size: 17px;
    img{
      .h(50);
    }
    .text{
      margin-left: 15px;
    }
  }
}
.speed{
  padding:15px;
  color: #ffffff;
  background-color: #101D37;
  .h(60);
  .spenekTop{
    display: flex;
    justify-content: space-between;
    .line{
    margin-top: 5px;
    .w(255);
      height:6px;
      background:linear-gradient(270deg,rgba(250,90,90,1) 0%,rgba(255,208,60,1) 50%,rgba(116,230,113,1) 100%);
      border-radius:5px;
    }
  }
  .speekTime{
    margin-top: 5px;
     display: flex;
    justify-content: space-between;
  }
}
.shareData{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #101D37;
  color: #ffffff;
  border-top: #232D42 1px solid;
  border-bottom: #232D42 1px solid;
  padding: 40px 0px;
   font-size:15px;
  .revenue{
    color:rgba(29,206,116,1);
    font-size:72px;
  }
}
.shareDataDetail{
  position: relative;
  display: flex;
  background-color: #101D37;
  justify-content: space-between;
  color:rgba(231,232,235,1);
  padding: 12px;
  font-size:15px;
  .dataIocn{
    display: flex;
    align-items: center;
  }
  img{
    width:20px;
    height: 20px;
    margin-right: 5px;
  }
}
.shareDataDetailfirst{
   position: relative;
  display: flex;
  background-color: #101D37;
  justify-content: space-between;
  color:rgba(231,232,235,1);
  padding: 12px;
  font-size:15px;
   .dataIocn{
      display: flex;
      align-items: center;
    }
  img{
    width:20px;
    height: 20px;
    margin-right: 5px;
  }
}
.shareDataDetail:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 2px solid #232D42;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
}
.mian{
  background-color: #091428;
  position: relative;
  .pb(100);
}
.share-chart-wrapper{
    background-color: #101D37;
  }
.shareMinkm, .shareHeart{
  margin-top: 20px;
}
.minkmTitel{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  padding:12px;
  .minKmIocn{
    display: flex;
    align-items: center;
    font-size: 15px;
    img{
      width:20px;
      margin-left: 2px;
      margin-right:5px;
    }
  }
}
.bottom{
  position: fixed;
  left:0px;
  bottom:0px;
  .h(100);
  width: 100%;
  background-color: rgba(5,13,28,.7);
  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#ffffff;
    font-size: 15px;
    padding:0 15px;
    .lh(100);
   .iocn{
     display: flex;
    align-items: center;
    font-size: 20px;
    .lh(100);
     img{
       .h(50);
     }
     span{
       display: inline-block;
       .minw(120);
       margin-left:8px;
     }
   }
   .openBtn{
    .w(100);
    .h(34);
    background:rgba(29,206,116,1);
    border-radius:20px;
    display: inline-block;
    line-height: 34px;
   }
  }
}
</style>

