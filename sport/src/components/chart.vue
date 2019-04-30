<template>
  <div>
      <div class="minkm">
                    <div class="chart-wrapper">
                    <div class="minkmTitel">
                        <div class="minKmIocn">
                        <img src="../assets/images/图表配速@2x.png" alt="">
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
                <div class="heart" style="margin-bottom:20px">
                    <div class="chart-wrapper">
                    <div class="minkmTitel">
                        <div class="minKmIocn">
                        <img src="../assets/images/图表心率@2x.png" alt="">
                        <span>{{$t('share.item.heat')}}</span>
                        </div>
                        <div>
                        <span>{{$t('share.speek.height')}} {{dataList.maxHeartRate}}</span>
                        <span style="margin-left:10px">{{$t('share.speek.average')}} {{dataList.avgHeartRate}}</span>
                        </div>
                    </div>
                    <div v-if="heartList == ''">
                      <span style="color:#000">{{$t('share.notLink')}}</span>
                    </div>
                    <canvas id="heart"></canvas>
                    </div>
                </div>
  </div>
</template>
<script>
import F2 from '@antv/f2'
import axios from 'axios'
export default {
  data () {
    return {
      dataList:{},
      paceList:[],
      dataaaa:[],
      heartList:[],
      pageNum:1,
      pageSize:10,
      showFlag:2,
      noDate:false,
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
  },
  mounted(){
    // this.getData(118)
    var iphoneSportId = this.$route.query.iphoneSportId
    this.getData(iphoneSportId)
    this.getDetailDate(iphoneSportId)
   
  },
  created(){
    // this.getHeart()
  },
  methods:{
    getMinkm(){
      var that = this
      var chart = new F2.Chart({
        id: 'minkm',
        pixelRatio: window.devicePixelRatio
      });
      chart.tooltip(false);
      chart.source(this.paceList, {
        time: {
          tickCount: 5,
          min:0,
          formatter: function formatter(s) {
             var t;
              var s = parseInt(s)
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
          });
        chart.axis('time', {
          tickLine: {
            lineWidth: 1,
            stroke: 'rgba(231, 232, 235, 1)',
            length: -5,
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
             if(index === 0){
                return {
                lineWidth: 1,
              }
             }else{
                 return {
                stroke: '#fff',
                lineWidth: 1,
              }
             }
            },
        });
        chart.area().position('time*pace').color('l(90) 0:#FF9900 1:#FF9900').shape('smooth');
        chart.line().position('time*pace').color('l(90) 0:#FF9900 1:#FF9900').shape('smooth');
        chart.render();
    },
    getHeart(arr){
      var chart = new F2.Chart({
        id: 'heart',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(arr, {
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
        heartRate: {
          tickCount: 5,
          min:30,
        }
      });
      chart.axis('time', {
          tickLine: {
            lineWidth: 1,
            stroke: 'rgba(231, 232, 235, 1)',
            length: -5,
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
        chart.axis('heartRate', {
           grid: (text, index, total) => {
             if(index == 0){
               return {
                lineWidth: 1,
              }
             }else{
                 return {
                stroke: '#fff', 
                lineWidth: 1,
              }
             }
            
            },
        });
      chart.tooltip(false);
      chart.area().position('time*heartRate').color('l(90) 0:#F3546A 1:#F3546A').shape('smooth');
      chart.line().position('time*heartRate').color('l(90) 0:#F3546A 1:#F3546A').shape('smooth');
      chart.render();
    },
    getDetailDate(iphoneSportId){
        axios({
          url:'/isport/concumer-wristband/wristband/iphoneSport/selectByPrimaryKey?iphoneSportId='+iphoneSportId,
          method: 'post',
          }).then(res=>{
          this.dataList = res.data.obj
          var time = res.data.obj.createTime
          var d = new Date(time);
          this.timeStr=(d.getMonth() + 1) + '月' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
        })
    },
    getData(iphoneSportId){  
        axios({
          url:'/isport/concumer-wristband/wristband/iphoneSportDetail/selectByIphoneSportId?iphoneSportId='+iphoneSportId,
          method: 'post',
          }).then(res=>{
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
          this.max = Math.max.apply(null,arr);
          this.min = Math.min.apply(null,arr);
          this.dealPace(this.max)
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
  }
}
</script>
<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.minkmTitel{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:rgba(16,29,55,1);
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
</style>
