<template>
  <div>
    <div class="page-content">
      <div class="base">
        <div class="baseRep">
          <div class="height">
            <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../../assets/images/体重@2x.png" alt="">
              <span>身高</span>
            </p>
            <p style="line-height: 2;">
              <span>{{obj.height}}CM</span>
            </p>
          </div>
          <div class="weight">
            <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../../assets/images/重量 copy@2x.png" alt="">
              <span>体重</span>
            </p>
            <p style="line-height: 2;">
              <span>{{obj.weight}}KG</span>
            </p>
          </div>
          <div class="BMI">
             <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../../assets/images/B@2x.png" alt="">
              <span>BMI</span>
            </p>
            <p style="line-height: 2;">
              <span>{{obj.bmi}}</span>
            </p>
          </div>
        </div>
         <div class="baseRep">
          <div class="blood">
            <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../../assets/images/血压 copy@2x.png" alt="">
              <span>血压</span>
            </p>
            <p>
              <span>{{obj.lowPressure}}</span>
              <span>{{obj.highPressure}}</span>
            </p>
            <p>MMHG</p>
          </div>
          <div class="heart">
            <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../../assets/images/重量 copy@2x.png" alt="">
              <span>心率</span>
            </p>
            <p style="line-height: 2;">
              <span>{{obj.heartRate}}BPM</span>
            </p>
          </div>
          <div class="oxygen">
             <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../../assets/images/血氧-01 copy@2x.png" alt="">
              <span>血氧</span>
            </p>
            <p style="line-height: 2;">
              <span>{{obj.bloodOxygenDegree}}%</span>
            </p>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div class="ECG">
        <div class="title">心电图</div>
        <div id="container">
             <!-- <img style="width:44px" src="../../assets/images/播放@2x.png" alt=""> -->
          <div id="pictures">
              
              <ul id="ul1">
                  <li><img :src="cardiogramId" alt=""></li>
                  <!-- <li><img src="../../assets/images/分组 5 copy 3@2x.png" alt=""></li>
                  <li><img src="../../assets/images/分组 5 copy 3@2x.png" alt=""></li>
                  <li><img src="../../assets/images/分组 5 copy 3@2x.png" alt=""></li> -->
              </ul>
              <div id="play" @click="aaa()">
                 <img v-if="playStatus == 1" style="width:44px" src="../../assets/images/暂停@2x.png" alt="">
                 <img v-if="playStatus == 0" style="width:44px" src="../../assets/images/播放@2x.png" alt="">
              </div>
          </div>
        </div>
        <!-- <div>
          <img src="../../assets/images/分组 5 copy 3@2x.png" alt="">
        </div> -->
      </div>
      <div class="chart" style="">
        <healthyIndex v-if="showChart" :data="data"/>
        <div class="healtyConent">
            <div class="comentText">
              <span>健康得分:</span>
              <span style="font-size:20px">{{obj.healthScore}}</span>
              <span>分</span>
            </div>
            <div>
              <span>(满分100分)</span>
            </div>
            <div>
              <p class="text">
                {{obj.healthComment}}
              </p>
            </div>
          </div>
      </div>
      <div class="suggest">
        <div style="display:flex">
          <div class="imgWrap">
            <p class="img">
               <img v-if="obj.shapeImage == '1'" src="../../assets/images/type1.png" alt="">
               <img v-if="obj.shapeImage == '2'" src="../../assets/images/type2.png" alt="">
               <img v-if="obj.shapeImage == '3'" src="../../assets/images/type3.png" alt="">
               <img v-if="obj.shapeImage == '4'" src="../../assets/images/type4.png" alt="">
               <img v-if="obj.shapeImage == '5'" src="../../assets/images/type5.png" alt="">
               <img v-if="obj.shapeImage == '6'" src="../../assets/images/type6.png" alt="">
               <img v-if="obj.shapeImage == '7'" src="../../assets/images/type7.png" alt="">
               <img v-if="obj.shapeImage == '8'" src="../../assets/images/type8.png" alt="">
               <img v-if="obj.shapeImage == '9'" src="../../assets/images/type9.png" alt="">
            </p>
            <p>
              <span class="muscle">肌肉</span>
              <span class="fat" style="margin-left:5px;">脂肪</span>
            </p>
          </div>
          <div>
            <h1>{{obj.shape}}</h1>
            <p  class="suggestContent">{{obj.shapeComment}}</p>
          </div>
        </div>
      </div>
      <div class="ingredient">
        <h1>人体成分分析</h1>
        <div class="ingredientTitle">
          <div class="cell1">
            <span class="wd_70 border_right">脂肪量</span>
            <span style="flex:1;" class="wd_70 background_color border_right">{{obj.fat}}kg</span>
            <span style="width:70px;">体重</span>
          </div>
           <div class="cell1">
            <span class="wd_70 border_right">骨盐量</span>
            <span style="flex:1;" class="wd_70 background_color border_right">{{obj.bmc}}kg</span>
            <span class="wd_70 border_right">去脂体重</span>
            <span class="wd_70 background_color" ></span>
          </div>
           <div class="cell1">
            <span class="wd_70 border_right">蛋白质</span>
            <span class="wd_70 background_color border_right">{{obj.protein}}kg</span>
            <span class="wd_70 border_right" style="flex:1;">肌肉量</span>
            <span class="wd_70 background_color border_right" ></span>
            <span style="border-top:none" class="background_color wd_70">{{obj.weight}}kg</span>
          </div>
           <div class="cell1">
            <span class="wd_70 border_right">骨骼肌重</span>
            <span class="wd_70 border_right">总水分</span>
            <span class="wd_70 background_color border_right" style="flex:1"></span>
            <span class="background_color wd_70 border_right" style="border-top:none;">{{obj.lbw}}kg</span>
            <span style="border-top:none;" class="wd_70 background_color"></span>
          </div>
          <div class="cell1">
            <span class="wd_70 background_color border_right">{{obj.skeletalMuscleRate}}kg</span>
            <span class="wd_70 background_color border_right">{{obj.moisture}}kg</span>
            <span class="wd_70 background_color border_right" style="margin-top: -20px;border-top: none;flex:1">{{obj.muscle}}kg</span>
            <span class="wd_70 background_color border_right" style="border-top:none"></span>
            <span class="wd_70 background_color" style="border-top:none"></span>
          </div>
        </div>
      </div>
      <div class="obesity">
        <h1>肥胖分析</h1>
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <div class="top">
            <img style="width:20px" src="../../assets/images/脂肪@2x(1).png" alt="">
            <span> 身体质量指数</span>
          </div>
          <div>
            <div>{{obj.bmi}}%</div>
            <div class="color" style="display:flex;margin-bottom:12px;">
              <span class="bmiDot"></span>
              <span class="blue"></span>
              <span class="green"></span>
              <span class="red"></span>
            </div>
          </div>
          <div class="standard">标准</div>
        </div>
         <div style="display:flex;justify-content: space-between;align-items: center;margin-top:20px;">
          <div  class="top">
            <img style="width:20px" src="../../assets/images/脂肪@2x.png" alt="">
            <span> 体脂百分比</span>
          </div>
          <div>
            <div>{{obj.fatRate}}%</div>
            <div class="fatRateColor" style="display:flex;margin-bottom:10px;">
              <span class="fatRate"></span>
              <span class="blue"></span>
              <span class="green"></span>
              <span class="red"></span>
            </div>
          </div>
          <div class="standard">标准</div>
        </div>
      </div>
      <div class="obesity">
        <h1>肌肉脂肪分析</h1>
        <div style="display:flex;justify-content: space-between;align-items: center;margin-top:20px;">
          <div class="top1">
            <img style="width:20px" src="../../assets/images/重量@2x.png" alt="">
            <span> 体重</span>
          </div>
          <div>
            <div>{{obj.weight}}kg</div>
            <div class="wightColor" style="display:flex;margin-bottom:12px;">
              <span class="wightDot"></span>
              <span class="blue"></span>
              <span class="green"></span>
              <span class="red"></span>
            </div>
          </div>
          <div class="standard">标准</div>
        </div>
         <div style="display:flex;justify-content: space-between;align-items: center;margin-top:20px;">
          <div class="top1">
            <img style="width:20px" src="../../assets/images/体脂率@2x.png" alt="">
            <span> 体脂肪</span>
          </div>
          <div>
            <div>{{obj.bodyFat}}kg</div>
            <div class="bodyFatColor" style="display:flex;margin-bottom:10px;">
              <span class="bodyFatDot"></span>
              <span class="blue"></span>
              <span class="green"></span>
              <span class="red"></span>
            </div>
          </div>
          <div class="standard">标准</div>
        </div>
         <div style="display:flex;justify-content: space-between;align-items: center;margin-top:20px;">
          <div class="top1">
            <img style="width:20px" src="../../assets/images/骨头@2x.png" alt="">
            <span> 骨骼肌</span>
          </div>
          <div>
            <div>{{obj.skeletalMuscleRate}}kg</div>
            <div class="skeletalMuscleColor" style="display:flex;margin-bottom:10px;">
              <span class="skeletalMuscleDot"></span>
              <span class="blue"></span>
              <span class="green"></span>
              <span class="red"></span>
            </div>
          </div>
          <div class="standard">标准</div>
        </div>
      </div>
      <div class="section">
        <h1>节段分析</h1>
        <div>
          <div class="sectionTitle">
            <div style="flex:1"></div>
            <div style="flex:2">肌肉量(kg)</div>
            <div style="flex:2">脂肪量(%)</div>
          </div>
        </div>
        <div v-for="item in sectionList" :key="item.type">
           <div class="sectionTitle">
              <div style="flex:1">{{item.type}}</div>
              <div style="flex:2;background-color: rgba(240,240,240,1);">{{item.muscle}}KG</div>
              <div style="flex:2;background-color: rgba(240,240,240,1);">{{item.fatRate}}%</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import commonHeader from 'common/common-header'
// import F2 from '@antv/f2'
import healthyIndex from '../../components/chart/healthy_index'
import axios from 'axios'
import { GetReportList } from '@/request/api-liu'
export default {
  data() {
    return {
      reachDay:'',
      deviceId:'',
      stepTarget:'',
      cardiogramId:'',
      obj:{},
      dialogConment:'',
      BMI:'',
      sectionList:[{type: "躯干", muscle: "1.0", fatRate: "0.5"}, {type: "左手", muscle: "3", fatRate: "2"}],
      extend2:'',
      showFalg:'',
      bmiAdvise:'',
      sleepAdvise:'',
      showChart:false,
      dataList:[],
      userBody:'',
      reachDayContrast:'',
      distance:'',
      distanceContrast:'',
      avgStep:'',
      avgStepContrast:'',
      extend1:"",
      tittle: '详情',
      date:'',
      show:false,
      data:[],
      ingredientData: [],
      sleepDate:[],
      playStatus:1,//播放
      timer:null,
      reportId:null,
    }
  },
  components:{
       healthyIndex
  },
  computed: {
    
    newdata: function() {
      // return this.data + 1
    }
  },
  mounted(){
    this.reportId = this.$route.query.reportId
    this.onLoad(this.reportId)
    console.log(this.reportId)
    
    // this.getInstrument()
  },
  methods: {
    aaa(){
      if(this.playStatus == 0){
            this.playStatus = 1
            clearInterval(this.timer);
          }else{
            this.playStatus = 0
            this.move()
        }
    },
    move(){
            var oDiv = document.getElementById("play");
             var oUl = document.getElementById("ul1");
            //  var oUl = document.querySelectorAll('.ul1')
             var speed = -2.5;
             var oLi = document.getElementsByTagName("li");
             oUl.innerHTML += oUl.innerHTML;//先把图片增加一组
             oUl.style.width = oLi.length * oLi[0].offsetWidth + "px";
             function move() {
                 if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
                     oUl.style.left = "0";
                 }
                 oUl.style.left = oUl.offsetLeft + speed + "px";
             }
             if(this.playStatus == 0){
                this.timer = setInterval(move, 15);
             }
    },
    onLoad(reportId) {
            // 调用api接口，并且提供了两个参数        
            // const pararm = '1115160196671365121'   
            // const pararm = String(this.reportId)
            // console.log(pararm,'ss')
            GetReportList(reportId).then(res => {
                // 获取数据成功后的其他操作
                console.log(res.data.obj)
                this.obj = res.data.obj
                this.cardiogramId = res.data.obj.cardiogramId
                if(this.cardiogramId){
                  console.log(this.cardiogramId)
                  // this.move()
                }
                this.sectionList = res.data.obj.segmentVos
                //质量指数的计算
                const bmi = res.data.obj.bmi
                const bilv = (bmi/31.5)*44*3
                const bmiDot = document.querySelectorAll('.bmiDot')
                bmiDot[0].setAttribute('style','left:'+bilv+'px;')
                //体质百分之的计算
                const fatRate = res.data.obj.fatRate
                const fatbilv = (fatRate/42)*44*3
                const fatRateDom = document.querySelectorAll('.fatRate')
                fatRateDom[0].setAttribute('style','left:'+fatbilv+'px;')
                //体重百分之计算
                const weight = res.data.obj.weight
                const wightbilv = (weight/180)*44*3
              
                const wightDom = document.querySelectorAll('.wightDot')
                wightDom[0].setAttribute('style','left:'+wightbilv+'px;')
                //体脂肪的计算
                const bodyFat = res.data.obj.bodyFat
                const bodyFatbilv = (bodyFat/180)*44*3
                  console.log(bodyFatbilv)
                const bodyFatDom = document.querySelectorAll('.bodyFatDot')
                bodyFatDom[0].setAttribute('style','left:'+bodyFatbilv+'px;')
                //骨骼肌的计算
                const skeletalMuscle = res.data.obj.skeletalMuscleRate
                const skeletalMuscleBilv = (skeletalMuscle/95)*44*3
                const skeletalMuscleDom = document.querySelectorAll('.skeletalMuscleDot')
                skeletalMuscleDom[0].setAttribute('style','left:'+skeletalMuscleBilv+'px;')
                this.data = [
                  {
                  x: '1',
                  y: res.data.obj.healthScore
                  }
                ]
                this.showChart = true
        // this.getInstrument()
            })            
    },
    changPlan(){
      this.show = true
    },
    getInstrument(){
        var chart = new F2.Chart({
          id: 'mountNode',
          pixelRatio: window.devicePixelRatio
        });
        chart.source(this.data, {
          y: {
            max: 100,
            min: 0
          }
        });
        chart.axis(false);
        chart.tooltip(false);
        chart.coord('polar', {
          transposed: true,
          innerRadius: 0.8,
          radius: 0.85,
          startAngle: 5 * Math.PI / 2,
          endAngle: 13 * Math.PI / 2
        });
        chart.guide().arc({
          start: [0, 0],
          end: [1, 99.98],
          top: false,
          style: {
            lineWidth: 10,
            stroke: '#D1D2D7'
          }
        });
        chart.guide().text({
          position: ['50%', '50%'],
          style: {
            fontSize: '15px',
            fill: '#1890FF'
          }
        });
        chart.interval().position('x*y').size(15).color('l(360) 0:#00B167 1:#87ED4D').animate({
          appear: {
            duration: 1200,
            easing: 'cubicIn'
          }
        });
        chart.render();
    },
    tohome() {
      this.$router.goBack()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mint-msgbox-content{
    font-size:15px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(16,29,55,1);
    line-height:21px;
    padding:20px;
}
.page-content{
  padding-bottom: 20px;
  text-align: center;
  .ECG{
    padding: 15px;
    text-align: left;
     #container {
             width: 100%;
            //  border: 1px solid #aaa;
            //  margin: 100px 0px;
         }
         #pictures {
             width: 100%;
             height: 200px;
             overflow: hidden;
             position: relative;
         }
         #ul1 {
             position: absolute;
             left: 0;
             top: 0;
             overflow: hidden;
             display: flex;
             z-index: 1;
         }
         #play{
             position: absolute;
            left: 145px;
            top: 80px;
             z-index: 22
         }
         #ul1 li {
             width: 29160px;
             height: 200px;
            //  
         }
        #ul1 li img {
             width: 29160px;
             height: 200px;
             z-index: 1;
         }
    .title{
      color:rgba(16,29,55,1);
      line-height:24px;
      font-size: 17px;
      font-weight:600;
      line-height: 2;
    }
    img{
      width:343px;
    }
  }
  .suggest{
    background: #F8F8F8;
    margin: 30px 15px;
    border-radius: 8px;
    // margin:40px auto 0px auto;
    padding:20px 0px;
    .suggestContent{
      height:122px;
      font-size:13px;
      font-weight:400;
      color:rgba(81,90,107,1);
      line-height:18px;
      text-align: left;
    }
    h1{
      height:28px;
      font-size:17px;
      font-weight:600;
      color:rgba(16,29,55,1);
      line-height:24px;
      text-align: left;
    }
    .imgWrap{
      width:520px;
      .img{
        // display: inline-block;
        // .w(130px);
        img{
          width:34px;
        }
      }
      .muscle{
        background-image: url(../../assets/images/椭圆形@2x.png);
        background-repeat: no-repeat;
        background-position: left center;
        display: inline-block;
        text-indent: 10px;
      }
      .fat{
        background-image: url(../../assets/images/椭圆形copy@2x.png);
         background-repeat: no-repeat;
        background-position: left center;
        display: inline-block;
        text-indent: 10px;
      }
    }
  }
  .chart{
    background: #F8F8F8;
    margin:30px 15px;
    border-radius: 8px;
  }
  .healtyConent{
    margin-top: -40px;
    .comentText{
      span{
         height:31px;
        font-size:17px;
        font-weight:600;
        color:rgba(16,29,55,1);
        line-height:24px;
      }
     
    }
    .text{
      height:42px;
      font-size:14px;
      font-weight:400;
      color:rgba(81,90,107,1);
      line-height:20px;
    }
  }
  .base{
     padding: 15px;
    .baseRep{
    display: flex;
    justify-content: space-between;
    color:rgba(255,255,255,1);
    line-height:20px;
    font-size: 14px;
    margin-top: 8px;
    .height{
      width:111px;
      height:77px;
      background:linear-gradient(90deg,rgba(27,129,244,1) 0%,rgba(84,188,240,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .weight{
      width:111px;
      height:77px;
      background:linear-gradient(90deg,rgba(0,177,103,1) 0%,rgba(135,237,77,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .BMI{
      width:111px;
      height:77px;
      background:linear-gradient(90deg,rgba(229,147,0,1) 0%,rgba(242,196,23,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .blood{
       width:111px;
      height:77px;
      background:linear-gradient(90deg,rgba(100,48,192,1) 0%,rgba(132,85,234,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .heart{
     width:111px;
      height:77px;
      background:linear-gradient(90deg,rgba(229,58,82,1) 0%,rgba(243,85,107,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .oxygen{
     width:111px;
      height:77px;
      background:linear-gradient(90deg,rgba(175,216,68,1) 0%,rgba(237,245,54,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    }
    }
    .ingredient{
      background: #F8F8F8;
      margin: 30px 15px;
      border-radius: 8px;
      // padding: 30px 15px;
      h1{
        height:44px;
        font-size:17px;
        font-weight:600;
        color:rgba(16,29,55,1);
        line-height:2.5;
        text-align: left;
        text-indent: 14px;
      }
      .ingredientTitle{
        font-size:14px;
        font-weight:400;
        color:rgba(81,90,107,1);
        line-height:20px;
         .cell1{
          display: flex;
          justify-content: space-between;
          text-align: center;

          span{
            display: inline;
            padding: 12px 0px;
            border-top:1px rgba(232,232,232,1) solid;
          }
        .wd_70{
            width:70px;
        }
        .background_color{
          background-color: rgba(240,240,240,1);
        }
        .border_right{
          border-right: 1px rgba(232,232,232,1) solid;
        }
      }
      .cell1:fist-child{
      
      }
      }
     
    }
    .obesity{
      background: #F8F8F8;
      margin: 20px 15px;
      border-radius: 8px;
      .top{
          display: flex;
          align-items: center;
          width:110px;
      }
      .top1{
          display: flex;
          align-items: center;
          width:80px;
      }

      padding:10px 15px;
      h1{
          height: 24px;
          font-size: 17px;
          font-weight: 600;
          color: #101d37;
          line-height: 24px;
          text-align: left;
          margin: 15px 0px;
      }
      .color{
        display:flex;
        margin-bottom:12px;
        position: relative;
        .bmiDot{
          height: 6px;
          width: 3px;
          background: #fff;
          position:absolute;
          top:0;
          left:0px;
        }
      }
      .fatRateColor{
         display:flex;
        margin-bottom:12px;
        position: relative;
        .fatRate{
          height: 6px;
          width: 3px;
          background: #fff;
          position:absolute;
          top:0;
          left:0px;
        }
      }
      .wightColor{
        display:flex;
        margin-bottom:12px;
        position: relative;
        .wightDot{
          height: 6px;
          width: 3px;
          background: #fff;
          position:absolute;
          top:0;
          left:0px;
        }
      }
       .bodyFatColor{
        display:flex;
        margin-bottom:12px;
        position: relative;
        .bodyFatDot{
          height: 6px;
          width: 3px;
          background: #fff;
          position:absolute;
          top:0;
          left:0px;
        }
      }
      .skeletalMuscleColor{
        display:flex;
        margin-bottom:12px;
        position: relative;
        .skeletalMuscleDot{
          height: 6px;
          width: 3px;
          background: #fff;
          position:absolute;
          top:0;
          left:0px;
        }
      }
      .blue{
        width:44Px;
        display: inline-block;
        height:6px;
        background:rgba(56,169,254,1);
        border-radius:8px 0px 0px 8px;
      }
      .green{
        width:44Px;
        display: inline-block;
        height:6px;
        background:rgba(29,206,116,1);
      }
      .red{
       width:44Px;
        display: inline-block;
        height:6px;
        background:rgba(252,84,75,1);
        border-radius:0px 8px 8px 0px;
      }
      .standard{
        width:60px;
        height:30px;
        background:rgba(29,206,116,1);
        border-radius:30px;
        text-align: center;
        line-height: 30px;
        color:rgba(255,255,255,1);
      }
    }
    .section{
      background: #F8F8F8;
      margin: 30px 15px;
      border-radius: 8px;
      // padding:30px 15px;
      font-size:14px;
      font-weight:400;
      color:rgba(81,90,107,1);
      line-height:20px;
      .sectionTitle{
        display: flex;
        justify-content: space-between;
        border-top:1px solid rgba(232,232,232,1);
        div{
          padding: 12px;
        }
      }
      h1{
        height: 44px;
        font-size: 17px;
        font-weight: 600;
        color: #101d37;
        line-height: 3;
        text-align: left;
        margin: 15px 0px;
        text-indent: 24px;
      }
    }
    }
  </style>

