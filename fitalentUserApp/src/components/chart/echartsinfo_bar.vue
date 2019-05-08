<template>
    <div>
        <canvas id="histogramList"></canvas>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.initHistogram();
    },
    methods:{
        initHistogram() {
     var chartData = this.heartRate.map((v,index) =>{
        if(v>0 && v <= 60){
          return {
            name:"热身",
            value:index,
            price:v
          }
        }
        if(v>60 && v <= 70){
          return {
            name:"燃脂运动",
            value:v,
            price:index
          }
        }
        if(v>70 && v <= 80){
          return {
            name:"有氧运动",
            value:v,
            price:index
          }
        }
        if(v>80 && v <= 90){
          return {
            name:"无氧运动",
            value:v,
            price:index
          }
        }
        if(v>90){
          return {
            name:"极限运动",
            value:v,
            price:index
          }
        }
      })
     
      console.log(this.data2)
      let chart = new F2.Chart({
        id: "histogramList",
        width: 320,
        height: 250,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(chartData, {
        price: {
          min: 0,
          formatter(val) {
            console.log('val值',val)
            return (val * 1).toFixed(0) + '%';
          }
        }
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          console.log(obj)
          var legend = chart.get("legendController").legends.top[0] ? chart.get("legendController").legends.top[0] : '';
          var tooltipItems = obj.items;
          var legendItems = legend.items;
          var map = {};
          legendItems.map(function(item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.map(function(item) {
            var name = item.name;
            var value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(_.values(map));
        },
        // onHide: function onHide() {
        //   var legend = chart.get("legendController").legends.top[0] ? chart.get("legendController").legends.top[0] : '';
        //   legend.setItems(chart.getLegendItems().country);
        // },
  
      });
      chart.axis('value',{
        label: (text, index, total) => {
          const cfg = {
            textAlign: 'center',
            fontSize:17
          };
          // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
          if (index === 0) {
            cfg.textAlign = 'start';
          }
          if (index > 0 && index === total - 1) {
            cfg.textAlign = 'end';
          }
          cfg.text = text ;  // cfg.text 支持文本格式化处理
          return cfg;
        }
      });
      chart.axis('price',{
        label: (text, index, total) => {
          const cfg = {
            textAlign: 'end',
            fontSize:17
          };
          cfg.text = text ;  // cfg.text 支持文本格式化处理
          return cfg;
        }
      });
      chart
        .interval()
        .position("value*price")
        .color("name", ["#3FA6F2","#9399A5","#14D36B","#FFCB14","#F85842",])
        .adjust({
          type: "dodge",
          marginRatio: 0.5,
          stack:'stack' // 设置分组间柱子的间距
        });
      chart.render();
    },
    }
}
</script>

