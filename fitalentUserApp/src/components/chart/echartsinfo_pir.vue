<template>
    <!-- <div class="pr_pl15 Pie_chart mt15"> -->
                  <canvas id="mountNodeList"></canvas>
                <!-- </div> -->
</template>
<script>
import F2 from '@antv/f2'
export default {
    data(){
        return {
            data: [
        {
          name: "极限",
          percent: '',
          a: "1"
        },
        {
          name: "无氧运动",
          percent: '',
          a: "1"
        },
        {
          name: "有氧运动",
          percent: '',
          a: "1"
        },
        {
          name: "燃脂运动",
          percent: '',
          a: "1"
        },
        {
          name: "热身",
          percent: '', 
          a: "1"
        }
      ],
        }
    },
    mounted(){
        this.$nextTick(function() {
            this.initPiechart();
        })
    },
    methods:{
        initPiechart() {
    //   var motionPoint = new Number(this.motionDataObj.motionPoint ? this.motionDataObj.motionPoint : '')
      var map = {};
      this.data.map(function(obj) {
        map[obj.name] = obj.percent + "分钟";
      });

      const chart = new F2.Chart({
        id: "mountNodeList",
        width: 320,
        height: 250,
        pixelRatio: window.devicePixelRatio,
        padding: [20, "auto"]
      });
      chart.source(this.data, {
        percent: {
          formatter: function formatter(val) {
            return val + "分钟";
          },
          
        }
      });
      chart.tooltip(false);
      chart.legend({
        position: "right",
        itemFormatter: function itemFormatter(val) {
          return val + "    " + map[val];
        }
      });
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85
      });
      chart.axis(false);
      chart
        .interval()
        .position("a*percent")
        .color("name", ["#F85842", "#FFCB14", "#14D36B","#9399A5","#3FA6F2"])
        .adjust("stack");

      chart.guide().html({
        position: ["50%", "45%"],
        html:
          '<div style="width: 250px;height: 40px;text-align: center;">' +
          '<div class="text_name">'+88+'</div>' +
          '<div class="text_price">运动点数?</div>' +
          "</div>"
      });
      chart.render();
      
    },
    }
}
</script>
