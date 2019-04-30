<template>
  <div>
    <header>
      <div class="header">
        <div class="header-left">
          <div>    
            <img style="border-radius: 50%;width: 1.33333333333rem;" :src="avatar" alt="">
          </div>
          <div class="text">
            <p>{{nickName}}</p>
            <p>ID：732643</p>
          </div>
        </div>
        <div class="header-right">
          <img src="../assets/images/分组 6@2x.png" alt="">
        </div>
      </div>
    </header>
    <div class="mian">
       <div id="container" style="height:300px;"></div>
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
            <span>{{$t('share.speek.slowly')}}</span>
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
              <span>{{$t('share.speek.height')}} 165</span>
              <span style="margin-left:10px">{{$t('share.speek.low')}} 105</span>
            </div>
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
          </div>
          <div>
            <span class="openBtn">{{$t('share.open')}}</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import F2 from '@antv/f2'
import axios from 'axios'
import { stringify } from 'querystring';
export default {
  data() {
    return {
       zoom: 12,
          center: [121.5273285, 31.25515044],
          listdata:[],
          polyline: {
            path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
            events: {
              click(e) {
                alert('click polyline');
              },
              end: (e) => {
                let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
                console.log(newPath);
              }
            },
            editable: false
          },
      timeStr:'',
      reachDay:'',
      deviceId:'',
      dataaaa:[
        {
          time: '00:14:23',
          tem: 6
        }, 
        {
          time: '00:15:23',
          tem: 20
        }, 
        {
          time: '00:16:23',
          tem: 12
        },
        {
          time: '00:17:23',
          tem: 2
        },
         {
          time: '00:18:23',
          tem: 12
        },
         {
          time: '00:19:23',
          tem: 22
        },
        {
          time: '00:20:23',
          tem: 10
        },
        {
          time: '00:21:23',
          tem: 4
        },
         {
          time: '00:22:23',
          tem: 18
        },
          {
          time: '00:23:23',
          tem: 22
        },
         {
          time:'00:24:23',
          tem: 12
        },
        {
          time:'00:25:23',
          tem: 22
        },
         {
          time:'00:26:23',
          tem: 20
        },
         {
          time:'00:27:23',
          tem: 18
        },
        {
          time:'00:28:23',
          tem: 16
        },
         {
          time:'00:29:23',
          tem: 14
        },
         {
          time:'00:30:23',
          tem: 15
        },
          {
          time:'00:31:23',
          tem: 12
        },
        {
          time:'00:32:23',
          tem: 10
        },
        {
          time:'00:33:23',
          tem: 30
        },
        {
          time:'00:34:23',
          tem: 26
        }, 
        {
          time:'00:35:23',
          tem: 22
        }, 
         {
          time:'00:36:23',
          tem: 21
        }, 
         {
          time:'00:37:23',
          tem: 18
        }, 
         {
          time:'00:38:23',
          tem: 12
        }, 
         {
          time:'00:39:23',
          tem: 18
        }, 
         {
          time:'00:40:23',
          tem: 10
        }, 
         {
          time:'00:41:23',
          tem: 29
        }, 
         {
          time:'00:42:23',
          tem: 4
        }, 
       ],
      stepTarget:'',
      paceList:[
        {
          pace: 10,
          time: 28
        },
        {
          pace: 82,
          time: 70,
        }
      ],
      dialogConment:'',
      BMI:'',
      extend2:'',
      showFalg:'',
      bmiAdvise:'',
      sleepAdvise:'',
      dataList:[],
      userBody:'',
      avatar:'',
      nickName:"",
      reachDayContrast:'',
      distance:'',
      distanceContrast:'',
      avgStep:'',
      avgStepContrast:'',
      extend1:"",
      tittle: '详情',
      date:'',
      max:"",
      show:false,
      data:[],
      ingredientData: [],
      sleepDate:[],
    }
  },
  computed: {
    newdata: function() {
      // return this.data + 1
    }
  },
  mounted(){
      this.getData(257)
      this.getHeart();
      this.getDetailDate(257)
      this.getUserInfo()
  },
  filters:{
    formatSeconds(value){
      var secondTime = parseInt(value);// 秒
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
    }
  },
  methods: {
    getTrackball(lineArr){
          var px0 = lineArr[0][0]
          var px1 = lineArr[0][1]
          var pxLengthx = lineArr[lineArr.length-1][0]
          var pxLengthy = lineArr[lineArr.length-1][1]
          console.log(px0,'px')
          console.log(px1,'px')
          var map = new AMap.Map("container", {
              resizeEnable: true,
              dragEnable:true,
              zoomEnable:true,
              // center: [116.4,39.92],
              zoom: 14
          });
            // 创建一个 Icon
          var startIcon = new AMap.Icon({
              // 图标尺寸
              size: new AMap.Size(40, 40),
              // 图标的取图地址
              image: 'https://manager.fitalent.com.cn/static/2019/1/16/16-39-33-3239016.png',
              // 图标所用图片大小
              imageSize: new AMap.Size(40, 40),
              // 图标取图偏移量
              // imageOffset: new AMap.Pixel(-9, -3)
          });
          // 将 icon 传入 marker
          var marker = new AMap.Marker({
              map: map,
              position:new AMap.LngLat(px0, px1),
              icon: startIcon,
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
          });
           // 创建一个 icon
          var endIcon = new AMap.Icon({
              size: new AMap.Size(40, 40),
              image: 'https://manager.fitalent.com.cn/static/2019/1/16/16-40-12-7321993.png',
              imageSize: new AMap.Size(40, 40),
              // imageOffset: new AMap.Pixel(-95, -3)
          });

          // 将 icon 传入 marker
          var endMarker = new AMap.Marker({
              position: new AMap.LngLat(pxLengthx, pxLengthy),
              icon: endIcon,
              offset: new AMap.Pixel(-13, -30)
          });

          //绘制轨迹
          for(var i = 0;i<lineArr.length-1;i++){
             var polyline = new AMap.Polyline({
              map: map,
              path: [lineArr[i],lineArr[i+1]],
              strokeColor: this.color(i),  //线颜色
              strokeOpacity: 1,     //线透明度
              strokeWeight: 6,      //线宽
              strokeStyle: "solid",  //线样式
              offset: new AMap.Pixel(-13, -30),
              lineJoin: 'round',
            });
            map.add(polyline)
          }
         
          // map.add(polyline)
          //  var polyline = new AMap.Polyline({
          //     map: map,
          //     path: [[113.86802050832755,22.558789810180141],[113.86798822792147,22.55882447652375]],
          //     strokeColor: 'red',  //线颜色
          //     strokeOpacity: 1,     //线透明度
          //     strokeWeight: 4,      //线宽
          //     strokeStyle: "solid",  //线样式
          //     lineJoin: 'round'
          // });
          // map.add(polyline)
          // var polyline = new AMap.Polyline({
          //     map: map,
          //     path: [[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]],
          //     strokeColor: "red",  //线颜色
          //     strokeOpacity: 1,     //线透明度
          //     strokeWeight: 4,      //线宽
          //     strokeStyle: "solid",  //线样式
          //     lineJoin: 'round'
          // });
          // map.add(polyline)
          //  var polyline = new BMap.Polyline([new BMap.Point(PX[i - 1], PY[i - 1]), new BMap.Point(PX[i], PY[i])],
          //         { strokeColor: "rgba(1,1,1,0.4)", strokeWeight: 2, strokeOpacity: 1, strokeStyle: "dashed" });
          //     map.addOverlay(polyline);

          // var passedPolyline = new AMap.Polyline({
          //     map: map,
          //     path: lineArr,
          //     strokeColor: "#74E672",  //线颜色
          //     strokeOpacity: 1,     //线透明度
          //     strokeWeight: 6,      //线宽
          //     strokeStyle: "solid", //线样式
          //     lineJoin: 'round'
          // });
          //  passedPolyline.setPath(polyline);
          // marker.on('moving', function (e) {
             
          // });
          map.add([marker,endMarker]);
          map.setFitView();
          // marker.moveAlong(lineArr, 2000);
    },
    getUserInfo(){
       axios({
          url:'http://192.168.10.203:8100/isport/concumer_basic/basic/customer/getBasicInfo',
          method: 'post',
          data:{
            "interfaceId": 0,
            "mobile": "string",
            "userId": 1
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
          var list = JSON.parse(res.data.obj.coorArr)
          if(list.length>1){
            for(var i=0;i<list.length-1;i++){
              var c = list[i].concat(list[i+1])
            }
          }else{
            var c = list[0]
          }
          this.paceList = JSON.parse(res.data.obj.paceArr)
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
          this.dealPace(this.max)
          this.getTrackball(c)
        })
    },
    dealPace(max){
      for(var i= 0;i<this.paceList.length;i++){
            var newstr=JSON.stringify(this.paceList[i].pace)
            var aaa = newstr.substring(1, newstr.length-3)
            var ss = aaa.split("'")
            var bb = ss.map(Number)
            this.paceList[i].pace = max - (bb[0]*60+bb[1])
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
        if((100 - this.paceList[index].pace/7) < 0){
          return '#fa5a5a'  
        }
        return this.getColorByBaiFenBi(100 - this.paceList[index].pace/7)
    },
    getDetailDate(iphoneSportId){
        axios({
          url:'/isport/concumer-wristband/wristband/iphoneSport/selectByPrimaryKey?iphoneSportId='+iphoneSportId,
          method: 'post',
          }).then(res=>{
          this.dataList = res.data.obj
          var time = res.data.obj.createTime
          var d = new Date(time);
          this.timeStr=(d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
        })
    },
    getMinkm(){
      var that = this
      var chart = new F2.Chart({
        id: 'minkm',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(this.paceList, {
        time: {
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
        pace: {
          tickCount:5,
          formatter: function formatter(val,text) {
              var secondTime = parseInt(that.max - val);// 秒
              if(secondTime<0){
                return result = 0
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
            min:0,
            sortable: false
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
         chart.axis('pace', {
           grid: (text, index, total) => {
              return {
                stroke: '#101D37',
                lineWidth: 1,
              }
            },
        });
        chart.tooltip({
          showCrosshairs: false
        });
        chart.area().position('time*pace').color('l(90) 0:#FF9900 1:#FF9900').shape('smooth');
        chart.line().position('time*pace').color('l(90) 0:#FF9900 1:#FF9900').shape('smooth');
        chart.render();
    },
    getHeart(){
      var chart = new F2.Chart({
        id: 'heart',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(this.dataaaa, {
        time: {
          ticks: ['00:14:23', '00:21:23', '00:28:23','00:35:23','00:42:23'],
          tickCount: 5,
        },
        tem: {
          // ticks: ['2', '5', '10','15','20','25','30'],
          tickCount: 5,
          min:5
        }
      });
      chart.legend('name', {
          position: 'right'
      });
      chart.guide().line({
          top: false,
          start: ['min', 15],
          end: ['max', 15],
          style: {
            stroke: '#101D37',
            lineDash: [0],
            lineWidth: 2,
            lineCap: 'round'
          }
        });
         chart.guide().line({
          top: false,
          start: ['min', 7.5],
          end: ['max', 7.5],
          style: {
            stroke: '#101D37',
            lineDash: [0],
            lineWidth: 2,
            lineCap: 'round'
          }
        });
         chart.guide().line({
          top: false,
          start: ['min', 22.5],
          end: ['max', 22.5],
          style: {
            stroke: '#101D37',
            lineDash: [0],
            lineWidth: 2,
            lineCap: 'round'
          }
        });
        chart.guide().line({
          top: false,
          start: ['min', 30],
          end: ['max', 30],
          style: {
            stroke: '#101D37',
            lineDash: [0],
            lineWidth: 2,
            lineCap: 'round'
          }
        });
        chart.guide().line({
          top: false,
          start: ['min', 0],
          end: ['max', 0],
          style: {
            stroke: '#232D42',
            lineDash: [0],
            lineWidth: 2,
            lineCap: 'round'
          }
        });
      chart.axis('time', {
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
      chart.tooltip({
        showCrosshairs: false
      });
      chart.area().position('time*tem').color('l(90) 0:#FF9900 1:#FF9900').shape('smooth');
      chart.line().position('time*tem').color('l(90) 0:#FF9900 1:#FF9900').shape('smooth');
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
  .mb(100);
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
  background-color: #050D1C;
  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#ffffff;
    font-size: 15px;
    padding:0 15px;
   .iocn{
     display: flex;
    align-items: center;
    font-size: 20px;
    .lh(100);
     img{
       .h(50);
       margin-right: 10px;
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

