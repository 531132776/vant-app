<template>
  <div class="echarts_info">
    <div>
      <van-tabs v-model="active" swipeable :swipe-threshold="4">
        <van-tab v-for="(index,i) in 5" :title="'选项 ' + index" :key="i">
            <div slot="title" class="slot_content pt15">
              <span class="slot_span_img">
                <img src="../../assets/images/2.jpg" alt="">
              </span>
              <span>跑步机{{index}}</span>
              <span>14:00-14:20</span>
            </div>
            <div class="tab_content mt20">
              <div v-if="i==0">
                <div class="Treadmill pr_pl15">
                  <span class="text_title">2019-04-29 15:00~16:00</span>
                  <div class="pt10 heart_rate">
                    <ul>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长copy.png" alt>
                          </dt>
                          <dt><em>35</em>分钟</dt>
                          <dt>总时间</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/发电量.png" alt>
                          </dt>
                          <dt><em>200</em>千焦</dt>
                          <dt>发电量</dt>
                        </dl>
                      </li>
                      <li>
                        <dl class="Heart_rate_animation">
                          <dt>
                            <img src="../../assets/images/分组6@2x1.png" alt>
                          </dt>
                          <dt>85次/分钟</dt>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/Shape@2x.png" alt>
                          </dt>
                          <dt><em>244</em>大卡</dt>
                          <dt>卡路里</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/分组6@2x.png" alt>
                          </dt>
                          <dt><em>50</em>公里</dt>
                          <dt>距离</dt>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 饼图 -->
                <div class="pr_pl15 Pie_chart mt15">
                  <canvas id="mountNode"></canvas>
                </div>
                <!-- 柱状图 -->
                <div class="Histogram_info pr_pl15">
                  <div class="text-title p15">心率等级分布/分钟</div>
                  <div class="Histogram">
                      <canvas id="Histogram"></canvas>
                  </div>
                </div>
              </div>
              <div v-if="i==1">
                  <div class="p15 Treadmill Butterfly_machine">
                      <div class="text_title">
                          2019-04-29 15:00~16:00
                      </div>
                      <div class="pt10 heart_rate">
                      <ul>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长copy.png" alt>
                          </dt>
                          <dt><em>35</em>分钟</dt>
                          <dt>总时间</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长copy@2x.png" alt>
                          </dt>
                          <dt><em>8.0</em>公里/每小时</dt>
                          <dt>平均速度</dt>
                        </dl>
                      </li>
                      <li>
                        <dl class="Heart_rate_animation">
                          <dt>
                            <img src="../../assets/images/分组6@2x1.png" alt>
                          </dt>
                          <dt>85次/分钟</dt>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/Shape@2x.png" alt>
                          </dt>
                          <dt><em>244</em>大卡</dt>
                          <dt>卡路里</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/分组6@2x.png" alt>
                          </dt>
                          <dt><em>50</em>公里</dt>
                          <dt>距离</dt>
                        </dl>
                      </li>
                    </ul>
                    </div>
                      <table border="1" cellpadding=“10” cellspacing="0">
                          <div>
                              发生的
                          </div>
                      <tbody> 
                          <tr>
                              <td>广泛的</td>
                              <td>广泛的</td>
                          </tr>
                          <tr>
                              <td>广泛的</td>
                              <td>广泛的</td>
                          </tr>
                          <tr>
                              <td>广泛的</td>
                              <td>广泛的</td>
                          </tr>
                      </tbody>
                      </table>
                  </div>
              </div>
              <div v-if="i==2">
                  <div class="p15 Treadmill Butterfly_machine">
                      <div class="text_title">
                          2019-04-29 15:00~16:00
                      </div>
                      <div class="pt10 heart_rate">
                      <ul>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长copy.png" alt>
                          </dt>
                          <dt><em>35</em>分钟</dt>
                          <dt>总时间</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/重量@2x_1.png" alt>
                          </dt>
                          <dt><em>50</em>公斤</dt>
                          <dt>总重量</dt>
                        </dl>
                      </li>
                      <li>
                        <dl class="Heart_rate_animation">
                          <dt>
                            <img src="../../assets/images/分组_6@2x.png" alt>
                          </dt>
                          <dt>25次/分钟</dt>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/Shape@2x.png" alt>
                          </dt>
                          <dt><em>744</em>大卡</dt>
                          <dt>卡路里</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长_copy@2x.png" alt>
                          </dt>
                          <dt><em>30</em>次</dt>
                          <dt>总次数</dt>
                        </dl>
                      </li>
                    </ul>
                    </div>
                      <table border="1" cellpadding=“10” cellspacing="0">
                          <div>
                              发生的
                          </div>
                          <tr>
                              <td>重量</td>
                              <td>次数</td>
                          </tr>
                          <tr>
                              <td>20kg</td>
                              <td>10次</td>
                          </tr>
                          <tr>
                              <td>30kg</td>
                              <td>10次</td>
                          </tr>
                      <!-- </tbody> -->
                      </table>
                  </div>
              </div>
              <div v-if="i==3">
                  <div class="p15 Treadmill Butterfly_machine">
                      <div class="text_title">
                          2019-04-29 15:00~16:00
                      </div>
                      <div class="pt10 heart_rate">
                      <ul>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/9.png" alt>
                          </dt>
                          <dt><em>15</em>分钟</dt>
                          <dt>总时间</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/10.png" alt>
                          </dt>
                          <dt><em>700</em>千焦</dt>
                          <dt>方式</dt>
                        </dl>
                      </li>
                      <li>
                        <dl class="Heart_rate_animation">
                          <dt>
                            <img src="../../assets/images/5.jpg" alt>
                          </dt>
                          <dt>85次/分钟</dt>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/脂肪@2x.png" alt>
                          </dt>
                          <dt><em>644</em>大卡</dt>
                          <dt>卡路里</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/12.png" alt>
                          </dt>
                          <dt><em>150</em>公里</dt>
                          <dt>距离</dt>
                        </dl>
                      </li>
                    </ul>
                    </div>
                      <table border="1" cellpadding=“10” cellspacing="0">
                          <div>
                              过大
                          </div>
                          <tr>
                              <td>重量</td>
                              <td>次数</td>
                          </tr>
                          <tr>
                              <td>60kg</td>
                              <td>10次</td>
                          </tr>
                          <tr>
                              <td>30kg</td>
                              <td>10次</td>
                          </tr>
                      <!-- </tbody> -->
                      </table>
                  </div>
                  
              </div>
              <div v-if="i==4">
                  <div class="p15 Treadmill Butterfly_machine">
                      <div class="text_title">
                          2019-04-29 15:00~16:00
                      </div>
                      <div class="pt10 heart_rate">
                      <ul>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/9.png" alt>
                          </dt>
                          <dt><em>15</em>分钟</dt>
                          <dt>总时间</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/10.png" alt>
                          </dt>
                          <dt><em>500</em>千焦</dt>
                          <dt>发电量</dt>
                        </dl>
                      </li>
                      <li>
                        <dl class="Heart_rate_animation">
                          <dt>
                            <img src="../../assets/images/5.jpg" alt>
                          </dt>
                          <dt>15次/分钟</dt>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/脂肪@2x.png" alt>
                          </dt>
                          <dt><em>44</em>大卡</dt>
                          <dt>卡路里</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/12.png" alt>
                          </dt>
                          <dt><em>50</em>公里</dt>
                          <dt>距离</dt>
                        </dl>
                      </li>
                    </ul>
                    </div>
                      <table border="1" cellpadding=“10” cellspacing="0">
                          <div>
                              发生的
                          </div>
                          <tr>
                              <td>重量</td>
                              <td>次数</td>
                          </tr>
                          <tr>
                              <td>20kg</td>
                              <td>10次</td>
                          </tr>
                          <tr>
                              <td>30kg</td>
                              <td>10次</td>
                          </tr>
                      <!-- </tbody> -->
                      </table>
                  </div>
                  
              </div>
            </div>
          <!-- <div v-if="i==5">哑铃</div> -->
          <!-- <div v-if="i==6">尼玛</div> -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs } from "vant";
import F2 from "@antv/f2";
export default {
  data() {
    return {
      active: "0",
      data: [
        {
          name: "极限",
          percent: 10,
          a: "1"
        },
        {
          name: "无氧运动",
          percent: 2.17,
          a: "1"
        },
        {
          name: "有氧运动",
          percent: 14.24,
          a: "1"
        },
        {
          name: "燃脂运动",
          percent: 14.24,
          a: "1"
        },
        {
          name: "热身",
          percent: 14.24, 
          a: "1"
        }
      ],
      data2: [
        {
          name: "London",
          value: "10",
          price: 18.9124234
        },
        {
          name: "London",
          value: "20",
          price: 28.842342
        },
        {
          name: "London",
          value: "30",
          price: 39.32341
        },
        {
          name: "London",
          value: "40",
          price: 81.43124
        },
        {
          name: "London",
          value: "50",
          price: 47.12344
        },
        {
          name: "London",
          value: "60 min",
          price: 20.312314
        },
        
        {
          name: "Berlin",
          value: "10",
          price: 52.631242
        },
        {
          name: "Berlin",
          value: "20",
          price: 35.53421
        },
        {
          name: "Berlin",
          value: "30",
          price: 37.431234
        },
        {
          name: "Berlin",
          value: "40",
          price: 42.434213
        },
        {
          name: "Berlin",
          value: "50",
          price: 35.53123
        },
        {
          name: "Berlin",
          value: "60 min",
          price: 37.4
        },
        {
          name: "Ber",
          value: "10",
          price: 29.7423
        },
        {
          name: "Ber",
          value: "20",
          price: 22.63123
        },
        {
          name: "Ber",
          value: "30",
          price: 35.55435
        },
        {
          name: "Ber",
          value: "40",
          price: 17.43123
        },
        {
          name: "Ber",
          value: "50",
          price: 22.45435
        },
        {
          name: "Ber",
          value: "60 min",
          price: 30.53124
        },
        {
          name: "boy",
          value: "10",
          price: 29.74324
        },
        {
          name: "boy",
          value: "20",
          price: 22.63123
        },
        {
          name: "boy",
          value: "30",
          price: 35.53123
        },
        {
          name: "boy",
          value: "40",
          price: 17.43432
        },
        {
          name: "boy",
          value: "50",
          price: 22.43123
        },
        {
          name: "boy",
          value: "60 min",
          price: 20.5
        },
        {
          name: "pic",
          value: "10",
          price: 19.7312
        },
        {
          name: "pic",
          value: "20",
          price: 62.63123
        },
        {
          name: "pic",
          value: "30",
          price: 55.54123
        },
        {
          name: "pic",
          value: "40",
          price: 87.4312
        },
        {
          name: "pic",
          value: "50",
          year: '2050',
          price: 52.442342
        },
        {
          name: "pic",
          value: "60 min",
          price: 30.5543
        },
      ]
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  mounted() {
    this.$nextTick(function() {
      // var bar_dv = this.$refs.aa;
      // console.log(bar_dv)
      this.initPiechart();
      this.initHistogram();
    });
  },
  created() {},
  methods: {
    initPiechart() {
      var map = {};
      this.data.map(function(obj) {
        map[obj.name] = obj.percent + "分钟";
      });

      var chart = new F2.Chart({
        id: "mountNode",
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
          '<div class="text_name">88</div>' +
          '<div class="text_price">运动点数?</div>' +
          "</div>"
      });
      chart.render();
      
    },
    initHistogram() {
      var chart = new F2.Chart({
        id: "Histogram",
        width: 320,
        height: 250,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(this.data2, {
        percent: {
          min: 0,
          formatter: function formatter(val) {
            console.log('val值',val)
            return (val * 100).toFixed(0) + '%';
          }
        }
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          console.log(obj)
          var legend = chart.get("legendController").legends.top[0];
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
        onHide: function onHide() {
          var legend = chart.get("legendController").legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });

      chart
        .interval()
        .position("value*price")
        .color("name")
        .adjust({
          type: "dodge",
          marginRatio: 0.5,
          stack:'stack' // 设置分组间柱子的间距
        });
      chart.render();
    }
  }
};
</script>
<style lang="less" src="./echartsInfo.less"></style>
