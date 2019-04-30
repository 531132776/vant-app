<template>
  <div>
    <div class="page-content">
      <div class="base">
        <div class="baseRep">
          <div class="height">
            <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../assets/images/体重@2x.png" alt="">
              <span>身高</span>
            </p>
            <p style="line-height: 2;">
              <span>{{obj.height}}CM</span>
            </p>
          </div>
          <div class="weight">
            <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../assets/images/重量 copy@2x.png" alt="">
              <span>体重</span>
            </p>
            <p style="line-height: 2;">
              <span>{{obj.weight}}KG</span>
            </p>
          </div>
          <div class="BMI">
             <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../assets/images/B@2x.png" alt="">
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
              <img style="width:18px;margin-right:5px;" src="../assets/images/血压 copy@2x.png" alt="">
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
              <img style="width:18px;margin-right:5px;" src="../assets/images/重量 copy@2x.png" alt="">
              <span>心率</span>
            </p>
            <p style="line-height: 2;">
              <span>{{obj.heartRate}}BPM</span>
            </p>
          </div>
          <div class="oxygen">
             <p style="display:flex;align-items: center;">
              <img style="width:18px;margin-right:5px;" src="../assets/images/血氧-01 copy@2x.png" alt="">
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
        <div>
          <img src="../assets/images/分组 5 copy 3@2x.png" alt="">
        </div>
      </div>
      <div class="chart" style="">
        <canvas id="mountNode"></canvas>
        <div class="healtyConent">
            <div class="comentText">
              <span>健康得分:</span>
              <span style="font-size:20px">90</span>
              <span>分</span>
            </div>
            <div>
              <span>(满分100分)</span>
            </div>
            <div>
              <p class="text">
                经过我们测量后，您的健康评估有90分，您的身体指数良好，请继续保持哦！
              </p>
            </div>
          </div>
      </div>
      <div class="suggest">
        <div style="display:flex">
          <div class="imgWrap">
            <p class="img">
               <img src="../assets/images/隐形性肥胖@2x.png" alt="">
            </p>
            <p>
              <span class="muscle">肌肉</span>
              <span class="fat">脂肪</span>
            </p>
          </div>
          <div>
            <h1>隐形性肥胖</h1>
            <p  class="suggestContent">您的体型为隐形肥胖，体脂已经超标，良好的力量运动习惯能提升肌肉能力，提高新陈代谢，减少脂肪堆积，使身材更加有型。动起来吧，你将收获更好的自己！</p>
          </div>
        </div>
      </div>
      <div class="ingredient">
        <h1>人体成分分析</h1>
        <div class="ingredientTitle">
          <div class="cell1">
            <span>脂肪量</span>
            <span style="flex:1;background-color: rgba(240,240,240,1);border-right: 2px solid rgba(240,240,240,1);">{{obj.fat}}kg</span>
            <span>体重</span>
          </div>
           <div class="cell1">
            <span>骨盐量</span>
            <span style="flex:2;background-color: rgba(240,240,240,1);border-right: 2px solid rgba(240,240,240,1);">{{obj.bmc}}kg</span>
            <span>去脂体重</span>
            <span style="flex:1;background-color: rgba(240,240,240,1);"></span>
          </div>
           <div class="cell1">
            <span>蛋白质</span>
            <span style="background-color: rgba(240,240,240,1);border-right: 2px solid rgba(240,240,240,1);">{{obj.protein}}kg</span>
            <span>肌肉量</span>
            <span style="flex:1;background-color: rgba(240,240,240,1);"></span>
            <span style="background-color: rgba(240,240,240,1);">{{obj.weight}}kg</span>
          </div>
           <div class="cell1">
            <span>骨骼肌重</span>
            <span>总水分</span>
            <span style="background-color: rgba(240,240,240,1);border-right: 2px solid rgba(240,240,240,1);"></span>
            <span style="background-color: rgba(240,240,240,1);">40.6kg</span>
            <span style="flex:1;background-color: rgba(240,240,240,1);"></span>
          </div>
          <div class="cell1">
            <span>40.6kg</span>
            <span>40.6kg</span>
            <span style="background-color: rgba(240,240,240,1);border-right: 2px solid rgba(240,240,240,1);">40.6kg</span>
            <span style="background-color: rgba(240,240,240,1);"></span>
            <span style="flex:1;background-color: rgba(240,240,240,1);"></span>
          </div>
        </div>
      </div>
      <div class="obesity">
        <h1>肥胖分析</h1>
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <div class="top">
            <img style="width:20px" src="../assets/images/脂肪@2x(1).png" alt="">
            <span>身体质量指数</span>
          </div>
          <div>
            <div>{{obj.bmi}}kg</div>
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
            <img style="width:20px" src="../assets/images/脂肪@2x.png" alt="">
            <span>体脂百分比</span>
          </div>
          <div>
            <div>10.6%</div>
            <div style="display:flex;margin-bottom:10px;">
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
            <img style="width:20px" src="../assets/images/重量@2x.png" alt="">
            <span>体重</span>
          </div>
          <div>
            <div>10.6kg</div>
            <div style="display:flex;margin-bottom:12px;">
              <span class="blue"></span>
              <span class="green"></span>
              <span class="red"></span>
            </div>
          </div>
          <div class="standard">标准</div>
        </div>
         <div style="display:flex;justify-content: space-between;align-items: center;margin-top:20px;">
          <div class="top1">
            <img style="width:20px" src="../assets/images/体脂率@2x.png" alt="">
            <span>体脂肪</span>
          </div>
          <div>
            <div>10.6%</div>
            <div style="display:flex;margin-bottom:10px;">
              <span class="blue"></span>
              <span class="green"></span>
              <span class="red"></span>
            </div>
          </div>
          <div class="standard">标准</div>
        </div>
         <div style="display:flex;justify-content: space-between;align-items: center;margin-top:20px;">
          <div class="top1">
            <img style="width:20px" src="../assets/images/骨头@2x.png" alt="">
            <span>骨骼肌</span>
          </div>
          <div>
            <div>10.6%</div>
            <div style="display:flex;margin-bottom:10px;">
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
            <div style="flex:2">肌肉量</div>
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
import commonHeader from 'common/common-header'
import F2 from '@antv/f2'
import axios from 'axios'
export default {
  data() {
    return {
      reachDay:'',
      deviceId:'',
      stepTarget:'',
      obj:{},
      dialogConment:'',
      BMI:'',
      sectionList:[{type: "躯干", muscle: "1.0", fatRate: "0.5"}, {type: "左手", muscle: "3", fatRate: "2"}],
      extend2:'',
      showFalg:'',
      bmiAdvise:'',
      sleepAdvise:'',
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
    }
  },
  components: {
    commonHeader
  },
  computed: {
    
    newdata: function() {
      // return this.data + 1
    }
  },
  mounted(){
    this.getDate()
    // this.getInstrument()
  },
  methods: {
    getDate(){
      axios({
        method: 'get',
        url: '/physical/allTest/1099869799627882498',
      }).then(res=>{
        this.obj = res.data.obj
        this.sectionList = res.data.obj.segmentVos
        //质量指数的计算
        const bmi = res.data.obj.bmi
        const bilv = (bmi/31.5)*44*3
        const bmiDot = document.querySelectorAll('.bmiDot')
        bmiDot[0].setAttribute('style','left:'+bilv+'px;')
        //体质百分之的计算

        this.data = [
          {
          x: '1',
          y: res.data.obj.healthScore
          }
        ]
        this.getInstrument()
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
    showPlugin () {
      console.log(this)
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
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
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
  .ECG{
    padding: 15px;
    text-align: left;
    .title{
      color:rgba(16,29,55,1);
      line-height:24px;
      font-size: 17px;
      font-weight:600;
      line-height: 2;
    }
    img{
      .w(343)
    }
  }
  .suggest{
    margin:40px auto 0px auto;
    padding:20px 15px;
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
        background-image: url(../assets/images/椭圆形@2x.png);
        background-repeat: no-repeat;
        background-position: left center;
        display: inline-block;
        text-indent: 10px;
      }
      .fat{
        background-image: url(../assets/images/椭圆形copy@2x.png);
         background-repeat: no-repeat;
        background-position: left center;
        display: inline-block;
        text-indent: 10px;
      }
    }
  }
  
  .healtyConent{
    padding:0 15px;
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
      .w(111);
      .h(77);
      background:linear-gradient(90deg,rgba(27,129,244,1) 0%,rgba(84,188,240,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .weight{
      .w(111);
      .h(77);
      background:linear-gradient(90deg,rgba(0,177,103,1) 0%,rgba(135,237,77,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .BMI{
      .w(111);
      .h(77);
      background:linear-gradient(90deg,rgba(229,147,0,1) 0%,rgba(242,196,23,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .blood{
       .w(111);
      .h(77);
      background:linear-gradient(90deg,rgba(100,48,192,1) 0%,rgba(132,85,234,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .heart{
      .w(111);
      .h(77);
      background:linear-gradient(90deg,rgba(229,58,82,1) 0%,rgba(243,85,107,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    .oxygen{
      .w(111);
      .h(77);
      background:linear-gradient(90deg,rgba(175,216,68,1) 0%,rgba(237,245,54,1) 100%);
      border-radius:1px;
      padding: 12px;
      text-align: left;
    }
    }
    }
    .ingredient{
      padding: 30px 15px;
      h1{
        height:24px;
        font-size:17px;
        font-weight:600;
        color:rgba(16,29,55,1);
        line-height:24px;
        text-align: left;
        margin:15px 0px;
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
            padding: 12px;
            border-top:1px rgba(232,232,232,1) solid;
          }
        .first{
          
        }
      }
      }
     
    }
    .obesity{
      .top{
          display: flex;
          align-items: center;
          .w(110);
      }
      .top1{
          display: flex;
          align-items: center;
          .w(80);
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
      .blue{
        .w(44);
        display: inline-block;
        height:6px;
        background:rgba(56,169,254,1);
        border-radius:8px 0px 0px 8px;
      }
      .green{
        .w(44);
        display: inline-block;
        height:6px;
        background:rgba(29,206,116,1);
      }
      .red{
        .w(44);
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
      padding:30px 15px;
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
        height: 24px;
        font-size: 17px;
        font-weight: 600;
        color: #101d37;
        line-height: 24px;
        text-align: left;
        margin: 15px 0px;
      }
    }
    }
  </style>

