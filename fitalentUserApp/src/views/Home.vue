<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="Histogram">
                    <!-- <span>4354</span> -->
                      <canvas id="histogramList"></canvas>
                      <!-- <echartsInfobar></echartsInfobar> -->
                  </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import F2 from "@antv/f2";
import { constants } from 'crypto';
export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data(){
    return {
      data2:[
              {
          year: 1,
          sales: 38,
          color:'0'
        }, {
          year:2,
          sales: 52,
          color:'1'
        }, {
          year: 3,
          sales: 61,
          color:'2'
        }, {
          year: 4,
          sales: 145,
          color:'3',
        }, {
          year: 5,
          sales: 18,
          color:'4',
        }, {
          year: 6,
          sales: 38,
          color:'0'
        }, {
          year: 7,
          sales: 8,
           color:'1'
        }, {
          year: 8,
          sales: 38,
          color:'2'
        },
        {
          year: 9,
          sales: 38
        }, {
          year: 10,
          sales: 52
        }, {
          year: 11,
          sales: 61
        }, {
          year: 12,
          sales: 145
        }, {
          year: 13,
          sales: 48
        }, {
          year: 14,
          sales: 38
        }, {
          year: 15,
          sales: 38
        }, {
          year: 16,
          sales: 38
        },
        {
          year: 17,
          sales: 38
        }, {
          year: 18,
          sales: 52
        }, {
          year: 19,
          sales: 61
        }, {
          year: 20,
          sales: 145
        }, {
          year: 21,
          sales: 18
        }, {
          year: 22,
          sales: 38
        }, {
          year: 23,
          sales: 8
        },
        {
          year: 24,
          sales: 52
        }, {
          year: 25,
          sales: 61
        }, {
          year: 26,
          sales: 145
        }, {
          year: 27,
          sales: 18
        }, {
          year: 28,
          sales: 38
        }, {
          year: 29,
          sales: 8
        },
        {
          year: 30,
          sales: 8
        },
        {
          year: 31,
          sales: 8
        },
        
      ],
      heartRate:[],
      newDate:[15,47,7,54,43,32,89,90,98.67,76,84,55,32,69]
    }
  },
  mounted(){
    this.intipriec();
  },
  methods:{
    intipriec(){
     var item = this.newDate.map((v,i) => {
       console.log('股份',v,i)
       
          if(v>0 && v<=59){
            // alert(1)
              this.heartRate.push({
                color:'4',
                year: i+1,
                sales: v
              })
          }
          else if(v>59 && v<=69){
            // alert(1)
              this.heartRate.push({
                color:'1',
                year: i+1,
                sales: v
              })
          }
          else if(v>69 && v<=79){
            
              this.heartRate.push({
                color:'2',
                year: i+1,
                sales: v
              })
          }
          else if(v>79 && v<=89){
            // alert(1)
              this.heartRate.push({
                color:'3',
                year: i+1,
                sales: v
              })
          }
          else if(v>=90){
              this.heartRate.push({
                color:'0',
                year: i+1,
                sales: v
              })
          }
          console.log(this.heartRate)
     })
      var num = 4;
      if(this.heartRate.length<=3){
        num = 2
        console.log(num)
      }
      // else if(this.heartRate.length>=30 && this.heartRate.length<=40){
      //   num = 4
      // }else if(this.heartRate.length>=40 && this.heartRate.length<=50){
      //   num = 6
      // }
      // else if(this.heartRate.length<=60){
      //   num = 7
      // }else if(this.heartRate.length>60){
      //   num = 5
      // }
          var chart = new F2.Chart({
        id: 'histogramList',
        pixelRatio: window.devicePixelRatio
      });
      chart.legend(false);
      chart.source(this.heartRate, {
        year: {
          tickCount: num,
          // min:0,
          formatter: function formatter(val,i) {
            console.log('year',val,i)
            return val.toFixed(0)+'min'
          }
        },
        sales:{
          // tickCount: 4,
          // min:0,
          // max:100,
          formatter: function formatter(val) {
            console.log(val)
            return (val * 1).toFixed(0)+'%';
           
          }
        }
      });
      
      chart.interval().position('year*sales').color('color',["#9399A5", "#3FA6F2", "#F85842","#FFCB14", "#14D36B" ]);
      chart.render();
      
      },
  }
}
</script>
<style lang="less">
.canvasWarp{
  overflow: hidden;margin-left: -15px;
}
* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-overflow-scrolling: touch;
  -webkit-overflow-scrolling: none;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-family: "Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif;
}
body {
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
  overflow: hidden;
}
img {
  vertical-align: middle;
  border-style: none;
}
.tip {
  font-size: 12px;
  color: #808080;
  text-align: center;
}
.header {
  padding: 4.26666667vw;
  font-size: 4.26666667vw;
  line-height: 6vw;
}
.icon {
  display: inline-block;
  width: 4.26666667vw;
  height: 4.26666667vw;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/oLOjjJWHatTpgfygoLbE.png);
  background-size: cover;
  vertical-align: -1px;
  margin-right: 6.66666667vw;
  position: relative;
}
.icon:after {
  content: '';
  position: absolute;
  top: 1px;
  right: -12px;
  width: 1px;
  height: 4.26666667vw;
  background-color: #979797;
}
.chart-wrapper {
  background-color: #fff;
}
canvas {
  display: block;
  width: 100vw;
  height: 69.33333333vw;
}
@media all and (orientation: landscape) {
  canvas {
    display: block;
    width: 100vw;
    height: 48.12593703vw;
  }
  .header {
    padding: 2.3988006vw;
    font-size: 2.3988006vw;
    line-height: 3.37331334vw;
  }
  .icon {
    display: inline-block;
    width: 2.3988006vw;
    height: 2.3988006vw;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/oLOjjJWHatTpgfygoLbE.png);
    background-size: cover;
    vertical-align: -1px;
    margin-right: 3.74812594vw;
    position: relative;
  }
  .icon:after {
    content: '';
    position: absolute;
    top: 1px;
    right: -12px;
    width: 1px;
    height: 2.3988006vw;
    background-color: #979797;
  }

}
</style>

