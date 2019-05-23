<template>
  <!-- <div> -->
  <!-- {{num}} -->
  <canvas></canvas>
  <!-- </div> -->
</template>

<script>
import F2 from "@antv/f2";
export default {
  name: "HelloWorld",
  props: ["source","numO","numT","numH","numF"],
  data (){
    return {
      source:this.$props.source
    }
  },
  updated() {
    // console.log("create-------->>>>>", this.$props.source);
  },
  mounted() {
    // debugger
    console.log("create-------->>>>>", this.$props.source);
    console.log(this.$el);
    this.$nextTick(() =>{

    
    var data = [
      {
        name: "极限",
        percent: this.$props.source,
        a: "1"
      },
      {
        name: "无氧运动",
        percent: this.$props.numO,
        a: "1"
      },
      {
        name: "有氧运动",
        percent: this.$props.numT,
        a: "1"
      },
      {
        name: "燃脂运动",
        percent: this.$props.numH,
        a: "1"
      },
      {
        name: "热身",
        percent: this.$props.numF,
        a: "1"
      }
    ];
    var map = {};
    data.map(function(obj) {
      map[obj.name] = obj.percent + "%";
    });
    var chart = new F2.Chart({
      el: this.$el,
      pixelRatio: window.devicePixelRatio,
      padding: [20, "auto"]
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val + "%";
        }
      }
    });
    chart.tooltip(false);
    chart.legend({
      position: "right",
      itemFormatter: function itemFormatter(val) {
        return val + " " + map[val];
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
      .color("name", ["#FE5D4D", "#3BA4FF", "#737DDE"])
      .adjust("stack");
    chart.guide().html({
      position: ["50%", "45%"],
      html:
        '<div style="width: 250px;height: 40px;text-align: center;">' +
        this.$props.source +
        '<div style="font-size: 16px">运动点数?</div>' +
        "</div>"
    });
    chart.render();
    })
  },
  watch: {
    source(newValue, oldValue) {
　　　　console.log(newValue,'fuck')
　　}
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>