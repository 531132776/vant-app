<template>
    <div>
        <div>
            <tab v-if="type != 1">
                <tab-item selected @on-item-click="onItemClick">{{$t('share.track')}}</tab-item>
                <tab-item @on-item-click="onItemClick">{{$t('share.datas')}}</tab-item>
                <tab-item @on-item-click="onItemClick">{{$t('share.chart')}}</tab-item>
            </tab>
             <tab v-if="type == 1">
                <tab-item selected @on-item-click="onItemClickData">{{$t('share.datas')}}</tab-item>
                <tab-item @on-item-click="onItemClickData">{{$t('share.chart')}}</tab-item>
            </tab>
            <div v-if="showFlag  === 0">
               <maps v-if="showFlag == 0"></maps>
              <div>
              <div class="outdoorsData" style="background-color: #fff;">
                <div class="outdoorsDataIocn">
                  <div>
                    <img src="../assets/images/路径@2x.png" alt="">
                  </div>
                  <div class="text">
                        <p class="huwai" v-if="dataList.type == 0">{{$t('share.data.outdoors')}}</p>
                        <p class="huwai" v-if="dataList.type == 1">{{$t('share.data.inner')}}</p>
                        <p class="huwai" v-if="dataList.type == 2">{{$t('share.data.cycling')}}</p>
                        <p class="huwai" v-if="dataList.type == 3">{{$t('share.data.walk')}}</p>
                        <p>{{timeStr}}</p>
                  </div>
                </div>
                <div>
                  <span class="revenue">{{dataList.distance}}</span>
                  <span>{{$t('share.data.kilometre')}}</span>
                </div>
              </div>
              <div class="speekImg" style="background-color: #fff;">
                  <div class="spenekTop">
                    <span>{{$t('share.speek.slowly')}}</span>
                    <span class="speekLine"></span>
                    <span>{{$t('share.speek.faster')}}</span>
                  </div>
                  <div class="speekTime">
                    <span>{{dataList.minPace}}</span>
                    <span>{{dataList.maxPace}}</span>
                  </div>
                </div>
              </div>
              <div class="dataIcon" style="background-color: #fff;">
                <p class="dataItem"> 
                  <img src="../assets/images/时间@2x1.png" alt="">
                  <span>{{dataList.timeLong | formatSeconds}}</span>
                </p>
                <p class="dataItem">
                  <img src="../assets/images/图表配速@2x.png" alt="">
                  <span>{{dataList.avgPace}}</span>
                </p>
                <p class="dataItem">
                  <img src="../assets/images/卡路里 copy@2x.png" alt="">
                  <span>{{dataList.calories}}</span>
                </p>
              </div>
            </div>
            <div v-if="showFlag === 1" style="background-color: #fff;">
                <div class="data">
                    <div>
                        <p>
                            <span class="revenue">{{dataList.distance}}</span>
                            <span>{{$t('share.data.kilometre')}}</span>
                        </p>
                        <p v-if="dataList.type == 0">{{$t('share.data.outdoors')}}</p>
                        <p v-if="dataList.type == 1">{{$t('share.data.inner')}}</p>
                        <p v-if="dataList.type == 2">{{$t('share.data.cycling')}}</p>
                        <p v-if="dataList.type == 3">{{$t('share.data.walk')}}</p>
                        <p>{{timeStr}}</p>
                    </div>
                </div>
                <div class="detailWarp">
                   <div class="dataDetailfirst">
                        <div class="dataIocn">
                          <img src="../assets/images/时间@2x.png" alt="">
                          <span>{{$t('share.item.allTime')}}</span>
                      </div>
                      <div>
                      <span style="color:#101D37;font-size:24px;">{{dataList.timeLong | formatSeconds}}</span>
                      </div>
                  </div>
                  <div class="dataDetail">
                        <div class="dataIocn">
                          <img src="../assets/images/椭圆形@2x.png" alt="">
                          <span>{{$t('share.item.allocation')}}</span>
                      </div>
                      <div>
                        <span style="color:#101D37;font-size:24px;">{{dataList.avgPace}}</span>
                      </div>
                  </div>
                  <div class="dataDetail">
                        <div class="dataIocn">
                          <img src="../assets/images/sd@2x.png" alt="">
                          <span>{{$t('share.item.speek')}}(km/h)</span>
                      </div>
                      <div>
                      <span style="color:#101D37;font-size:24px;">{{dataList.avgSpeed}}</span>
                      </div>
                  </div>
                  <div class="dataDetail">
                        <div class="dataIocn">
                          <img src="../assets/images/xh@2x.png" alt="">
                          <span>{{$t('share.item.consume')}}</span>
                      </div>
                      <div>
                        <span style="color:#101D37;font-size:24px;">{{dataList.calories}}</span>
                      </div>
                  </div>
                  <div class="dataDetail">
                      <div class="dataIocn">
                          <img src="../assets/images/椭圆形@2x(1).png" alt="">
                          <span>{{$t('share.item.step')}}</span>
                      </div>
                      <div>
                      <span style="color:#101D37;font-size:24px;">{{dataList.step}}</span>
                      </div>
                  </div>
                  <div class="dataDetail">
                        <div class="dataIocn">
                          <img src="../assets/images/心率@2x.png" alt="">
                          <span>{{$t('share.item.heat')}}</span>
                      </div>
                      <div>
                      <span>
                          <span>{{$t('share.speek.height')}}</span>
                          <span style="color:#101D37;font-size:24px;">{{dataList.maxHeartRate}}</span>
                      </span>
                      <span style="margin-left:8px;">
                          <span>{{$t('share.speek.low')}}</span>
                          <span style="color:#101D37;font-size:24px;">{{dataList.minHeartRate}}</span>
                      </span>
                      </div>
                  </div>
                </div>
            </div>
            <chart v-if="showFlag ===  2"></chart>
        </div>
    </div>
</template>
<script>
import F2 from '@antv/f2'
import { Tab,TabItem } from 'vux'
import chart from 'common/chart'
import maps from 'common/map'
import axios from 'axios'
import { stringify } from 'querystring';
export default {
  components: {
    Tab,
    TabItem,
    chart,
    maps,
  },
  data () {
    return {
      timeStr:null,
      dataList:{
        timeLong:0
      },
     pageNum:1,
      pageSize:10,
      type:null,
      showFlag:null,
      noDate:false,
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
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
  mounted(){
    var iphoneSportId = this.$route.query.iphoneSportId
    var userId = this.$route.query.uid
    var type = this.$route.query.type
    this.type = type
    if(Number(this.$route.query.type) ==1){
       this.showFlag = 1
    }else if(Number(this.$route.query.type) == 0 || Number(this.$route.query.type)>1){
        this.showFlag = 0
    }
    this.getData(iphoneSportId)
  },
  created(){
    
  },
  methods:{
    onItemClick (index) {
      var falg = 1+index
        this.showFlag = index
    },
     onItemClickData (index) {
      var falg = 1+index
        this.showFlag = falg
    },
    getData(iphoneSportId){  
          axios({
          url:'/isport/concumer-wristband/wristband/iphoneSport/selectByPrimaryKey?iphoneSportId='+iphoneSportId,
          method: 'post',
          }).then(res=>{
          this.dataList = res.data.obj
          var time = res.data.obj.endTimestamp
          var d = new Date(time);
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
  }
}
</script>

<style lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.data{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #101D37;
  padding: 40px 0px;
   font-size:15px;
   p{
       line-height: 1.2
   }
  .revenue{
    color:rgba(29,206,116,1);
    font-size:72px;
  }
}
.detailWarp{
  border-top:1px solid #E7E8EB;
  border-bottom:1px solid #E7E8EB;
}
.dataDetail{
  display: flex;
  position: relative;
  justify-content: space-between;
  color:#9399A5;
  padding: 20px;
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
.dataDetail:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 2px solid #E7E8EB;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
}
.dataDetailfirst{
    display: flex;
    position: relative;
    justify-content: space-between;
    color:#9399A5;
    padding: 20px;
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
.chart-wrapper{
   
  }
.heart{
  margin-top: 20px;
}
</style>