<template>
  <div class="canvasWarp">
   <canvas id="mountNode"></canvas>
  </div>
</template>
<script>
// import { VChart } from 'vux'
import F2 from '@antv/f2'
export default {
  data () {
      return {
        name: ''
      }
  },
   props: {
      data: Array,
    },
  components: {
    // VChart
  },
  mounted(){
    console.log(this.data,'ss')
    this.renderChart1(this.data)
  },
  methods: {
    renderChart(){
        //   this.data = [
        //   {
        //   x: '1',
        //   y: 25
        //   }
        // ]
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
          lineCap: 'round',
          startAngle: Math.PI / 2,
          endAngle: 2.5*Math.PI
        });
        chart.guide().arc({
          start: [0, 0],
          end: [1, 99.98],
          top: false,
          style: {
            lineWidth: 10,
            stroke: '#D1D2D7',
            lineCap: 'round',
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
    renderChart1(params){
         var _F = F2,
          Shape = _F.Shape,
          G = _F.G,
          Util = _F.Util,
          Global = _F.Global;
        var Vector2 = G.Vector2;
          // 极坐标下带圆角的柱子，只对极坐标生效
          Shape.registerShape('interval', 'polar-tick', {
            draw: function draw(cfg, container) {
              var points = this.parsePoints(cfg.points);
              var style = Util.mix({
                stroke: cfg.color
              }, Global.shape.interval, cfg.style);
              var newPoints = points.slice(0);
              if (this._coord.transposed) {
                newPoints = [points[0], points[3], points[2], points[1]];
              }
              var center = cfg.center;
              var x = center.x,
                y = center.y;
              var v = [1, 0];
              var v0 = [newPoints[0].x - x, newPoints[0].y - y];
              var v1 = [newPoints[1].x - x, newPoints[1].y - y];
              var v2 = [newPoints[2].x - x, newPoints[2].y - y];
              var startAngle = Vector2.angleTo(v, v1);
              var endAngle = Vector2.angleTo(v, v2);
              var r0 = Vector2.length(v0);
              var r = Vector2.length(v1);
              // if (startAngle >= 1.5 * Math.PI) {
              //   startAngle = startAngle - 2 * Math.PI;
              // }

              // if (endAngle >= 1.5 * Math.PI) {
              //   endAngle = endAngle - 2 * Math.PI;
              // }

              var lineWidth = r - r0;
              var newRadius = r - lineWidth / 2;

              return container.addShape('Arc', {
                className: 'interval',
                attrs: Util.mix({
                  x: x,
                  y: y,
                  startAngle: startAngle,
                  endAngle: endAngle,
                  r: newRadius,
                  lineWidth: lineWidth,
                  lineCap: 'round'
                }, style)
              });
            }
          });
          var data = [{
            const: 'a',
            actual: params[0].y,
            expect: 100
          }];
          var chart = new F2.Chart({
            id: 'mountNode',
            padding: [0, 30, 60],
            pixelRatio: window.devicePixelRatio
          });
          chart.source(data, {
            actual: {
              max: 100,
              min: 0,
              nice: false
            }
          });
          chart.coord('polar', {
            transposed: true,
            innerRadius: 0.6,
            startAngle: Math.PI/2,
            endAngle: 2.5*Math.PI,
          });
          chart.axis(false);
          chart.interval().position('const*expect').shape('polar-tick').size(8).color('rgba(209, 210, 215, 1)').animate(false); // 背景条
          chart.interval().position('const*actual').shape('polar-tick').size(16).color('l(360) 0:#00B167 1:#87ED4D').animate(false); // 实际进度
          chart.render();
    },
  }
}
</script>
<style lang="less" scoped>
::-webkit-scrollbar {
    display: none;
  }
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
  /*# sourceMappingURL=f2-naked-demo.css.map*/
</style>
