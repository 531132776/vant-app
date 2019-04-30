<template>
  <div>
    <common-header :tittle="tittle" :showmore="true"></common-header>
    <div class="page-content">
      <h1>已打败全网{{extend1}}%的用户</h1>
      <div class="chart">
        <canvas id="mountNode"></canvas>
      </div>
      <div class="date">{{date}}</div>
      <div class="data">
        <div class="dataContent ">
          <div class="dataContentLeft">
            <div>
              <p>
                <span class="number">{{reachDay}}</span>
                <span>天</span>
              </p>
              <p class="text">达标天数</p>
            </div>
            <div style="margin-top:15px;">
              <p>
                <span>
                    <img v-if="reachDayContrast>=0" src="../assets/images/Path 3@2x.png" alt="">
                    <img v-if="reachDayContrast<0" src="../assets/images/Path 3@2x(1).png" alt="">
                </span>
                <span class="number">{{Math.abs(reachDayContrast)}}</span>
                <span>天</span>
              </p>
              <p class="text">比上一周期</p>
            </div>
          </div>
          <div class="dataContentLeft">
            <div>
              <p>
                <span class="number">{{distance}}</span>
                <span>公里</span>
              </p>
              <p class="text">运动距离</p>
            </div>
            <div style="margin-top:15px;">
              <p>
                <span>
                     <img v-if="reachDayContrast>=0" src="../assets/images/Path 3@2x.png" alt="">
                    <img v-if="reachDayContrast<0" src="../assets/images/Path 3@2x(1).png" alt="">
                </span>
                <span class="number">{{Math.abs(reachDayContrast)}}</span>
                <span>公里</span>
              </p>
              <p class="text">比上一周期</p>
            </div>
          </div>
          <div class="dataContentLeft">
            <div>
              <p>
                <span class="number">{{avgStep}}</span>
                <span>步</span>
              </p>
              <p class="text">平均步数</p>
            </div>
            <div style="margin-top:15px;">
              <p>
                <span>
                      <img v-if="avgStepContrast>=0" src="../assets/images/Path 3@2x.png" alt="">
                    <img v-if="avgStepContrast<0" src="../assets/images/Path 3@2x(1).png" alt="">
                </span>
                <span class="number">{{Math.abs(avgStepContrast)}}</span>
                <span>步</span>
              </p>
              <p class="text">比上一周期</p>
            </div>
          </div>
        </div>
      </div>
      <div class="management">
        <div class="managementTitle">
          <img style="height:20px;" src="../assets/images/体重@2x.png" alt="">
          <span>体型管理</span>
        </div>
        <div class="managementConent">
          <div  class="mangerConentTop">
            <div>
              <img class="mangerImg" v-if="extend2 == 'Male'" src="../assets/images/路径 4@2x(1).png" alt="">
              <img class="mangerImg" v-if="extend2 != 'Male'" src="../assets/images/路径 4@2x.png" alt="">
            </div>
            <div class="mangerText">
              <p class="BMI">BMI:{{BMI}}</p>
              <p class="contentText">{{userBody}}</p>
            </div>
            <div></div>
          </div>
          <div class="mangerConentTable">
            <!-- <div class="tableTitle">
              <p>当前值</p>
              <p>标准值</p>
              <p>需增减</p>
            </div> -->
             <div class="tableConentTitle">
              <p class="wight">
              </p>
              <p class="current">
                当前值
              </p>
              <p class="standard">
               标准值
              </p>
              <p class="upDown">
                需增减
              </p>
            </div>
            <div v-for="(item,index) in dataList" :key="item.id">
               <div class="tableConent">
                  <p class="wight">
                    <img v-if="index === 0"  class="iconImg" src="../assets/images/设备icon-体脂秤@2x.png" alt="">
                    <img v-if="index === 1" class="iconImg" src="../assets/images/肌肉@2x.png" alt="">
                    <img v-if="index === 2" class="iconImg" src="../assets/images/肌肉@2x.png" alt="">
                    <span style="text-align: center;">{{item.name}}</span>
                  </p>
                  <p class="current">
                    {{item.bodyWeight}}{{'kg'}}
                  </p>
                  <p class="standard">
                    {{item.standardBodyWeight}}{{'kg'}}
                  </p>
                  <p class="upDown">
                    <img v-if="item.addOrDown>=0" class="upImg" src="../assets/images/Path 3@2x.png" alt="">
                    <img v-if="item.addOrDown<0" class="upImg" src="../assets/images/Path 3@2x(1).png" alt="">
                    <span>{{Math.abs(item.addOrDown)}}{{'kg'}}</span>
                  </p>
                </div>
            </div>
          </div>
        </div>
        <div class="mangerBootom" v-if="showFalg == '1'">
          <div class="planButtom" @click="showPlugin()">
            <span>更改计划</span>
          </div>
          <p>经过测算建议您更改运动计划</p>
        </div>
      </div>
      <div class="ingredient">
        <div class="ingredientTitle">
          <img style="height:20px;" src="../assets/images/Page 1@2x.png" alt="">
          <span>人体成分</span>
        </div>
        <div style="margin-left:-15px">
          <canvas id="ingredientMap"></canvas>
        </div>
      </div>
      <div class="sleep">
        <div class="sleepTitle">
          <img style="height:20px;" src="../assets/images/合并形状@2x(1).png" alt="">
          <span>睡眠分析</span>
        </div>
        <div style="margin-left:-15px;margin-top: -40px;">
          <canvas style="padding:10px;" id="sleepMap"></canvas>
        </div>
      </div>
      <div class="suggest">
        <div class="suggestTitle">
          <img style="height:20px;" src="../assets/images/建议@2x.png" alt="">
          <span>风险及建议</span>
        </div>
        <div class="suggestContent">
          <p>
            {{bmiAdvise}}
          </p>
          <p>
            {{sleepAdvise}}
          </p>
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
      dialogConment:'',
      BMI:'',
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
    localStorage.setItem("uid",this.$route.query.uid)
    this.getDate(this.$route.query.uid)
    this.getSleepMap()
  },
  methods: {
    getDate(userId){
      if(!userId){
        var userId = this.$route.query.userId
      }
      axios({
        method: 'post',
        url: '/isport/concumer_basic/basic/healthWeekly/selectByUserId?userId='+userId,
      }).then(res=>{
        this.extend1 = res.data.obj.extend1
        this.data = [
          {
            pointer: '健康指数',
            value: res.data.obj.userScore,
            length: 2,
            y: 1.05
          }
        ]
        this.date = res.data.obj.timeSection
        this.reachDay = res.data.obj.reachDay
        this.reachDayContrast = res.data.obj.reachDay
        this.distance = res.data.obj.distance
        this.distanceContrast = res.data.obj.distanceContrast
        this.avgStep = res.data.obj.avgStep
        this.userBody = res.data.obj.userBody
        this.avgStepContrast = res.data.obj.avgStepContrast
        this.BMI = res.data.obj.bodyComposition[0].value
        this.dataList = res.data.obj.bodyReport
        this.dialogConment = res.data.obj.extend3
        this.showFalg = res.data.obj.advise
        this.bmiAdvise = res.data.obj.bmiAdvise
        this.sleepAdvise =  res.data.obj.sleepAdvise
        this.extend2 = res.data.obj.extend2
        this.stepTarget = res.data.obj.changePlan
        this.deviceId = res.data.obj.extend4
        const bodyComposition = res.data.obj.bodyComposition.map(function (item) {
          return {
           'name':item.value+'\n'+item.name,
           'value':item.num
          }
        });
        this.ingredientData = bodyComposition
        const sleepAnalysis = res.data.obj.sleepAnalysis.map(function (item) {
          return {
           'name':'总时长',
           'date':item.week,
           'time':item.sleepDuration
          }
        });
        const sleepDeepAnalysis = res.data.obj.sleepAnalysis.map(function (item) {
          return {
           'name':'深睡时长',
           'date':item.week,
           'time':item.deepSleepDuration
          }
        });
        this.sleepDate =  sleepAnalysis.concat(sleepDeepAnalysis)
          this.getInstrument()
          this.getRadar()
          this.getSleepMap()
      })
    },
    changPlan(){
      this.show = true
    },
    getInstrument(){
      var Shape = F2.Shape;
      Shape.registerShape('point', 'dashBoard', {
      getPoints: function getPoints(cfg) {
        var x = cfg.x;
        var y = cfg.y;
        return [{
          x: x,
          y: y
        }, {
          x: x,
          y: 0.4
        }];
      },
      draw: function draw(cfg, container) {
        var point1 = cfg.points[0];
        var point2 = cfg.points[1];
        point1 = this.parsePoint(point1);
        point2 = this.parsePoint(point2);

        var line = container.addShape('Polyline', {
          attrs: {
            points: [point1, point2],
            stroke: '#1890FF',
            lineWidth: 0
          }
        });

        var text = cfg.origin._origin.value.toString();
        var text1 = container.addShape('Text', {
          attrs: {
            text: text,
            x: cfg.center.x,
            y: cfg.center.y,
            fill: '#fff',
            fontSize: 46,
            textAlign: 'center',
            textBaseline: 'bottom'
          }
        });
        var text2 = container.addShape('Text', {
          attrs: {
            text: cfg.origin._origin.pointer,
            x: cfg.center.x,
            y: cfg.center.y,
            fill: '#fff',
            fontSize: 14,
            fontWeight:400,
            textAlign: 'center',
            textBaseline: 'top'
          }
        });
      return [line, text1, text2];
        },
      });
        var chart = new F2.Chart({
          id: 'mountNode',
          animate: false,
          pixelRatio: window.devicePixelRatio
        });
        chart.source(this.data, {
          value: {
            type: 'linear',
            min: 0,
            max: 100,
            ticks: [0, 2.5,5, 7.5, 10, 12.5,15,17.5,20,22.5,25,27.5,30,32.5,35,37.5,40,42.5,45,47.5,50,52.5,55,57.5,60,62.5,65,67.5,70,72.5,75,77.5,80,82.5,85,87.5,90,92.5,95,97.5,100],
            nice: false
          },
          length: {
            type: 'linear',
            min: 0,
            max: 100
          },
          y: {
            type: 'linear',
            min: 0,
            max: 1
          }
        });

        chart.coord('polar', {
          inner: 0,
          startAngle: -1.25 * Math.PI,
          endAngle: 0.25 * Math.PI
        });

        //配置value轴刻度线
        chart.axis('value', {
          tickLine: {
            strokeStyle: '#fff',
            lineWidth: 2,
            length: -10
          },
          label: null,
          grid: null,
          line: null
        });

        chart.axis('y', false);

        //绘制仪表盘辅助元素

        chart.guide().arc({
          start: [0, 1.05],
          end: [100, 1.05],
          style: {
            strokeStyle: '#00B167',
            lineWidth: 12,
            lineCap: 'round'
          }
        });
        chart.guide().arc({
          start: [0, 1.05],
          end: [this.data[0].value, 1.05],
          style: {
            strokeStyle: '#fff',
            lineWidth: 12,
            lineCap: 'round'
          }
        });
        // chart.guide().arc({
        //   start: [10.2, 1.05],
        //   end: [15, 1.05],
        //   style: {
        //     strokeStyle: '#ccc',
        //     lineWidth: 15,
        //     lineCap: 'round'
        //   }
        // });

        chart.guide().text({
          position: [-0.5, 1.3],
          style: {
            fillStyle: '#ccc',
            font: '18px Arial',
            textAlign: 'center'
          }
        });
        chart.point().position('value*y').size('length').color('#1890FF').shape('dashBoard');
        chart.render();
    },
    getRadar(){
      var chart = new F2.Chart({
        id: 'ingredientMap',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(this.ingredientData, {
        value: 
          {
          min: 0,
          max: 5
          }
      });
      chart.coord('polar');
      chart.tooltip(false);// 关闭 tooltip
          chart.axis('value', {
            grid: {
              lineDash: null,
              type: 'arc' // 弧线网格
            },
            label: null,
            line: null
          });
          chart.axis('name', {
            grid: {
              lineDash: null
            },
            label: function label(text,index,total) {
                const cfg = {
          textAlign: 'center'
        };
        if (index === 0) {
          cfg.textAlign = 'center';
        }
        if (index === 1) {
          cfg.textAlign = 'left';
        }
        return cfg;
        }
      });
      chart.area().position('name*value').color('#FFCE01').style({
        fillOpacity: 0.2
      }).animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
      chart.line().position('name*value').color('#FFCE01').size(1).animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
      chart.point().position('name*value').color('#FFCE01').animate({
        appear: {
          delay: 300
        }
      });
      chart.render();
    },
    getSleepMap(){
      var chart = new F2.Chart({
          id: 'sleepMap',
          pixelRatio: window.devicePixelRatio
        });
        chart.source(this.sleepDate, {
          time: {
            tickInterval: 3,
            ticks: [3 ,6, 9],
            formatter: function formatter(val) {
              return val + '小时';
            },
          },
        });
        chart.legend({
            align: 'right',
            itemWidth: null // 图例项按照实际宽度渲染
        });
        chart.axis('time',{
          label: function label(text) {
               const cfg = {
                fill: '#101D37'
              };
              return cfg;
            }
        })
         chart.axis('date',{
          label: function label(text) {
              const cfg = {
                fill: '#9399A5'
              };
              return cfg;
            }
        })
        chart.interval().position('date*time').color('name',[ '#8051E5', '#B898FD' ]).style('time', {
          radius: function radius(val) {
              return [5, 5, 0, 0];
            }
          }).adjust({
              type: 'dodge',
              marginRatio: 0.2 // 设置分组间柱子的间距
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
  background-color: #1DCE74;
  padding-bottom: 20px;
  h1{
    font-size:17px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:24px;
  }
  .date{
    height:24px;
    font-size:17px;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:24px;
    margin-top:-24px
  }
  .data{
    .w(345);
    background:rgba(255,255,255,1);
    border-radius:8px;
    margin:20px auto;
    padding:20px;
    .dataContent{
      display: flex;
      justify-content: space-around;
    }
    .number{
      height:36px;
      font-size:30px;
      font-family:BebasNeue;
      color:rgba(16,29,55,1);
      line-height:36px;
    }
    img{
      height: 15px;
    }
    .text{
      height:18px;
      font-size:13px;
      font-weight:400;
      color:rgba(147,153,165,1);
      line-height:18px;
      margin-top:5px;
    }
  }
  .management{
     .w(345);
     min-height: 500px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    margin:20px auto;
    padding:20px 0px;
    .managementTitle{
      .w(120);
      .h(26);
      display: flex;
      align-items: center;
      background:linear-gradient(90deg,rgba(27,129,244,1) 0%,rgba(84,188,240,1) 100%);
      border-radius:0px 97px 97px 0px;
      img{
        .h(20);
        margin:0 8px;
      }
      span{
        height:24px;
        font-size:17px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:24px;
      }
      .mangerImg{
        .w(175)
      }
    }
    .managementConent{
      .mangerConentTop{
        display: flex;
        align-items: center;
        padding:20px;
        .mangerText{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .BMI{
            color:rgba(59,162,242,1);
            font-size:30px;
            height:36px;
            line-height:36px;
          }
      .contentText{
            font-weight:600;
            color:rgba(16,29,55,1);
            line-height:24px;
            font-size:17px;
            height:24px;
          }
          }
          .mangerImg{
            .w(175)
          }
      }
      .mangerConentTable{
          border-top:1px solid #E7E8EB;
          border-bottom:1px solid #E7E8EB;
          .w(325);
          min-height: 100px;
          margin:12px;
          padding:10px 0px;
          .tableConentTitle{
            display: flex;
            font-weight:400;
            line-height:27px;
            height: 27px;
            font-size: 15px;
            color:rgba(147,153,165,1);
            justify-content: space-between;
             .wight{
              .w(90);
              text-align: left;
            }
            .current{
              // .ml(30)
            }
            .standard{
              // .ml(34)
            }
            .upDown{
              // .ml(24)
            }
           
          }
          .tableConent{
            font-weight:400;
            color:rgba(16,29,55,1);
            line-height:27px;
            height: 27px;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            .wight{
              .w(90);
              text-align: left;
            }
            .current{
              // .ml(30)
            }
            .standard{
              // .ml(34)
            }
            .upDown{
              // .ml(24)
            }
            p{
              // margin:0 20px;
            }
            .iconImg{
              width: 14px;
            }
            .upImg{
              height: 15px;
            }
          }

      }
    }
    .mangerBootom{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
        .planButtom{
          .w(101);
          .h(40);
          color: #fff;
          font-size:17px;
          font-weight:400;
          line-height:24px;
          text-align: center;
          background:linear-gradient(90deg,rgba(27,129,244,1) 0%,rgba(84,188,240,1) 100%);
          border-radius:20px;
          margin:10px 0px;
          span{
            display: inline-block;
            height: 40px;
            line-height: 40px;
          }
        }
        p{
          height:18px;
          font-size:13px;
          font-weight:400;
          color:rgba(16,29,55,1);
          line-height:18px;
        }
      }
    }
  }
  .ingredient{
    .w(345);
    background:rgba(255,255,255,1);
    border-radius:8px;
    margin:20px auto;
    padding:20px 0px;
    .ingredientTitle{
      .w(120);
      .h(26);
      display: flex;
      align-items: center;
      background:linear-gradient(90deg,rgba(229,147,0,1) 0%,rgba(242,196,23,1) 100%);
      border-radius:0px 97px 97px 0px;
      img{
        .h(20);
        margin:0 8px;
      }
      span{
        height:24px;
        font-size:17px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:24px;
      }
    }
  }
  .sleep{
    .w(345);
    background:rgba(255,255,255,1);
    border-radius:8px;
    margin:20px auto;
    padding:20px 0px;
     .sleepTitle{
      .w(120);
      .h(26);
      display: flex;
      align-items: center;
      background:linear-gradient(90deg,rgba(100,48,192,1) 0%,rgba(132,85,234,1) 100%);
      border-radius:0px 97px 97px 0px;
      img{
        .h(20);
        margin:0 8px;
      }
      span{
        height:24px;
        font-size:17px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:24px;
      }
    }
  }
  .suggest{
     .w(345);
    background:rgba(255,255,255,1);
    border-radius:8px;
    margin:20px auto 0px auto;
    padding:20px 0px;
    .suggestTitle{
      .w(136);
      .h(26);
      display: flex;
      align-items: center;
      background:linear-gradient(90deg,rgba(0,177,103,1) 0%,rgba(135,237,77,1) 100%);
      border-radius:0px 97px 97px 0px;
      img{
        .h(20);
        margin:0 8px;
      }
      span{
        height:24px;
        font-size:17px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:24px;
      }
    }
    .suggestContent{
      margin:12px;
      text-align: left;
      font-size:15px;
      font-weight:400;
      color:rgba(16,29,55,1);
      line-height:21px;
    }
  }
</style>

