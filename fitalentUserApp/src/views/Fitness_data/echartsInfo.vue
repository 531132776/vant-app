<template>
  <div class="echarts_info">
    <div>
      <van-tabs v-model="active" :swipe-threshold="4" >
        <van-tab v-for="(item,i) in aggregate" :title="'选项 ' + item.type + item.id" :key="i" >
            <div slot="title" class="slot_content pt15" @click="onTabClick(item,i)">
              <span class="slot_span_img" >
                <img :src="active1==i?item.img:item.src" alt="">
              </span>
              <span>{{item.name}}</span>
              <span>{{item.time}}</span>
            </div>
            <div class="tab_content mt20">
              <div v-if="item.type==0 || item.type==1">
                <div class="Treadmill pr_pl15">
                  <span class="text_title">{{startTime}}-{{endTime.substring(0,5)}}</span>
                  <div class="pt10 heart_rate">
                    <ul>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长copy.png" alt>
                          </dt>
                          <dt><em>{{(motionDataObj.totalExerciseTime/60)}}</em>分钟</dt>
                          <dt>总时间</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/发电量.png" alt>
                          </dt>
                          <dt><em>{{motionDataObj.powerGeneration}}</em>千焦</dt>
                          <dt>发电量</dt>
                        </dl>
                      </li>
                      <li>
                        <dl class="Heart_rate_animation">
                          <dt>
                            <img src="../../assets/images/分组6@2x1.png" alt>
                          </dt>
                          <dt>{{motionDataObj.meanHeartRateStrength}}次/分钟</dt>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/Shape@2x.png" alt>
                          </dt>
                          <dt><em>{{motionDataObj.consume}}</em>大卡</dt>
                          <dt>卡路里</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/分组6@2x.png" alt>
                          </dt>
                          <dt><em>{{distance}}</em>公里</dt>
                          <dt>距离</dt>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 饼图 -->
                <div class="pr_pl15 Pie_chart mt15">
                  <div> 
                    <canvas id="mountNodeList"></canvas>
                  </div>
                  
                  <!-- <echartsInfoPir></echartsInfoPir> -->
                  <!-- <span>4324</span> -->
                </div>
                <!-- 柱状图 -->
                <div class="Histogram_info pr_pl15">
                  <div class="text-title p15">心率等级分布/分钟</div>
                  <div class="Histogram">
                    <!-- <span>4354</span> -->
                      <canvas id="histogramList"></canvas>
                      <!-- <echartsInfobar></echartsInfobar> -->
                  </div>
                </div>
              </div>
              <div v-if="item.type==2">
                  <div class="p15 Treadmill Butterfly_machine">
                      <div class="text_title">
                          <!-- 2019-04-29 15:00~16:00 -->
                          {{startTime}}-{{stopTime.substring(0,5)}}
                      </div>
                      <div class="pt10 heart_rate">
                      <ul>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长copy.png" alt>
                          </dt>
                          <dt><em>{{Math.floor(powerMotionData.motionTime/60)}}</em>分钟</dt>
                          <dt>总时间</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长copy@2x.png" alt>
                          </dt>
                          <dt><em>{{Math.floor((powerMotionData.distance/1000).toFixed(2)/(new Number(powerMotionData.motionTime/3600)).toFixed(2))}}</em>公里/每小时</dt>
                          <dt>平均速度</dt>
                        </dl>
                      </li>
                      <li>
                        <dl class="Heart_rate_animation" v-if="powerMotionData.heart>0">
                          <dt>
                            <img src="../../assets/images/分组6@2x1.png" alt>
                          </dt>
                          <dt>85次/分钟</dt>
                        </dl>
                        <dl class="Heart_rate_animation" v-if="powerMotionData.heart==0">
                          <dt>
                            <img src="../../assets/images/分组_6@2x.png" alt>
                          </dt>
                          <dt style="color:#9399A5">--次/分钟</dt>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/Shape@2x.png" alt>
                          </dt>
                          <dt><em>{{(powerMotionData.calorie/1000).toFixed(2)}}</em>大卡</dt>
                          <dt>卡路里</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/分组6@2x.png" alt>
                          </dt>
                          <dt><em>{{(powerMotionData.distance/1000).toFixed(2)}}</em>公里</dt>
                          <dt>距离</dt>
                        </dl>
                      </li>
                    </ul>
                    </div>
                      <table border="1" cellpadding=“10” cellspacing="0">
                          <div>
                              数据详情
                          </div>
                      <tbody> 
                        <tr>
                              <td>速度</td>
                              <td>时间</td>
                          </tr>
                          <tr v-for="(item,i) in powerMotionData.dataDetails !=null ? powerMotionData.dataDetails : []" :key="i">
                              <td>{{item.speed}}公里/小时</td>
                              <td>{{Math.floor(item.time/60)}}分钟</td>
                          </tr>
                          <!-- 
                          <tr>
                              <td>广泛的</td>
                              <td>广泛的</td>
                          </tr> -->
                      </tbody>
                      </table>
                  </div>
              </div>
              <div v-if="item.type==3">
                  <div class="p15 Treadmill Butterfly_machine">
                      <div class="text_title">
                          {{startTime}}-{{stopTime.substring(0,5)}}
                      </div>
                      <div class="pt10 heart_rate">
                      <ul>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长copy.png" alt>
                          </dt>
                          <dt><em>{{Math.floor(powerMotionData.motionTime/60)}}</em>分钟</dt>
                          <dt>总时间</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/重量@2x_1.png" alt>
                          </dt>
                          <dt><em>{{powerMotionData.weight}}</em>公斤</dt>
                          <dt>总重量</dt>
                        </dl>
                      </li>
                      <li>
                        <dl class="Heart_rate_animation" v-if="powerMotionData.heart>0">
                          <dt>
                            <img src="../../assets/images/分组6@2x1.png" alt>
                          </dt>
                          <dt>25次/分钟</dt>
                        </dl>
                        <dl class="Heart_rate_animation" v-if="powerMotionData.heart==0">
                          <dt>
                            <img src="../../assets/images/分组_6@2x.png" alt>
                          </dt>
                          <dt style="color:#9399A5">--次/分钟</dt>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>
                            <img src="../../assets/images/Shape@2x.png" alt>
                          </dt>
                          <dt><em>{{powerMotionData.calorie}}</em>大卡</dt>
                          <dt>卡路里</dt>
                        </dl>
                        <dl>
                          <dt>
                            <img src="../../assets/images/时长_copy@2x.png" alt>
                          </dt>
                          <dt><em>{{powerMotionData.motionTimes}}</em>次</dt>
                          <dt>总次数</dt>
                        </dl>
                      </li>
                    </ul>
                    </div>
                      <table border="1" cellpadding=“10” cellspacing="0">
                          <div>
                              数据详情
                          </div>
                          <tr>
                              <td>重量</td>
                              <td>次数</td>
                          </tr>
                          <tr v-for="(item,i) in powerMotionData.dataDetails!=null?powerMotionData.dataDetails:[]" :key="i">
                              <!-- <td>{{item}}</td> -->
                              <!-- <td>{{item}}</td> -->
                          </tr>
                      <!-- </tbody> -->
                      </table>
                  </div>
              </div>
              <!-- <div v-if="i==3">
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
                      </table>
                  </div>
                  
              </div> -->
              <!-- <div v-if="i==4">
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
                      </table>
                  </div>
                  
              </div> -->
            </div>
          <!-- <div v-if="i==5">哑铃</div> -->
          <!-- <div v-if="i==6">尼玛</div> -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, version } from "vant";
import {siveDataDetails,typeDetails} from '@/request/api'
import houseAimg3 from '../../../public/aggregate.json'
import F2 from "@antv/f2";
// import echartsInfoPir from '../../components/chart/echartsinfo_pir'
// import echartsInfobar from '../../components/chart/echartsinfo_bar'
export default {
  data() {
    return {
      active: "0",
      active1: "0",
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
      ],
      userId:this.$route.query.userId,
      tabLists:[],
      aggregate:houseAimg3.images,
      powerMotionData:{},
      motionDataObj:{},
      startTime:'',
      stopTime:'',
      endTime:'',
      distance:'',
      heartRate:[],
      heartArr:[]
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    // echartsInfoPir,
    // echartsInfobar
  },
  mounted() {
    this.init();
  },
   created() {
      // this.initHistogram()
  },
  methods: {
    onTabClick(item,title){
      this.active1 = title;
      console.log('当前item',item,title)
      var type = item.type
      var id = item.id
      console.log('type',type)
      console.log('id',id)
      this.initTypeDetail(type,id);
    },
    init(){
      // const userId = '1110074077168619521';
      const userId = '100';
      // const userId = this.userId;
      // const subscribeDate = this.getNowFormatDate();
      const subscribeDate = '2019-05-05';
      console.log(subscribeDate);
      siveDataDetails(userId,subscribeDate).then(res =>{
        console.log('初始化数据',res)
        if(res.data.code == 2000){
            this.tabLists = res.data.obj || [];
            var newList =  this.tabLists.map((value,index)=>{
              if(value.name.includes('跑步机')){
                // debugger
                value.name = "跑步机"
              }
              if(value.name.includes('动感单车')){
                // debugger
                value.name = "动感单车"
              }
              // if(value.name.includes('坐式胸肌推')){
              //   // alert(1)
              //   value.name = "坐式胸推"
              // }
              console.log("value:" + value.name)
              return value;

            })
            console.log('还是',newList);
            const aggregate = this.aggregate;
            const arr = []
            // if(this.tabLists !=null || this.tabLists != undefined){
                for(var n in newList){
                    if(newList[n].name == aggregate[n].name){
                        arr.push({"src":aggregate[n].src,"img":aggregate[n].img,"name":aggregate[n].name,"time":newList[n].time,"type":newList[n].type,"id":newList[n].id})
                    }else {
                        for(var j in aggregate){
                            if(aggregate[j].name == newList[n].name){
                                arr.push({"src":aggregate[j].src,"img":aggregate[j].img,"name":aggregate[j].name,"time":newList[n].time,"type":newList[n].type,"id":newList[n].id})
                            }
                        }
                    }
                }
            // }
            // console.log('对比',arr);
            this.$set(this,'aggregate',[...arr]);
            console.log('对比2',this.aggregate);
            this.initTypeDetail(this.aggregate[0].type,this.aggregate[0].id)
        }
      }).catch(err =>{
        console.log('请求错误！',err)
      })
    },
    initTypeDetail(type,id){
      let params = {
          type:type,
          // userId:'1110074077168619521',
          userId:'100',
          // userId: this.userId,
          motionId: id
      }
      typeDetails(params).then(res =>{
        console.log('心率数据',res);
        if(res.data.code == 2000){
          if(type==0 || type==1){
            this.heartRate = res.data.obj.motionData.heartRate || []
            this.motionDataObj = res.data.obj.motionData || {};
            this.distance = this.motionDataObj.distance.toFixed(2)
            this.endTime = this.motionDataObj.endTime.split(' ')[1];
            this.startTime = this.motionDataObj.startTime.substr(0,16)
            this.$set(this.data[0],'percent',this.motionDataObj.maximalExercise);
            this.$set(this.data[1],'percent',this.motionDataObj.anaerobicExercise);
            this.$set(this.data[2],'percent',this.motionDataObj.aerobicExercise);
            this.$set(this.data[3],'percent',this.motionDataObj.fatMovement);
            this.$set(this.data[4],'percent',this.motionDataObj.warmUp);
            // debugger
            this.initPiechart();
            this.initHistogram()
          }
          else if(type==2 || type==3){
            this.powerMotionData = res.data.obj.powerMotionData || {};
            this.stopTime = this.powerMotionData.stopTime.split(' ')[1];
            this.startTime = this.powerMotionData.startTime.substr(0,16)
          }
          
        }
      }).catch(err =>{
        console.log('请求错误！',err)
      })
    },
    initPiechart() {
      var motionPoint = new Number(this.motionDataObj.motionPoint ? this.motionDataObj.motionPoint : '')
      var map = {};
      this.data.map(function(obj) {
        map[obj.name] = obj.percent + "分钟";
      });

      const chart = new F2.Chart({
        id: "mountNodeList",
        // width: 320,
        // height: 250,
        pixelRatio: window.devicePixelRatio,
        padding: [20, "auto"],
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
        },
        
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
        .color("name", ["#F85842", "#FFCB14", "#14D36B","#3FA6F2","#9399A5"])
        .adjust("stack");

      chart.guide().html({
        position: ["50%", "45%"],
        html:
          '<div style="width: 250px;height: 40px;text-align: center;">' +
          '<div class="text_name">'+motionPoint+'</div>' +
          '<div class="text_price">运动点数?</div>' +
          "</div>"
      });
      chart.render();
      
    },
    initHistogram() {
     var chartData = this.heartRate.map((v,index) =>{
       console.log('哈哈',v,index)
        if(v>0 && v <= 60){
          
          this.heartArr.push({
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          );
          console.log('和噶干哈',this.heartArr)
          this.$set(this,'data2',this.heartArr)
        }
        if(v>60 && v <= 70){
          this.heartArr.push({
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          );
          this.$set(this,'data2',this.heartArr)
        }
        if(v>70 && v <= 80){
          this.heartArr.push({
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          );
          this.$set(this,'data2',this.heartArr)
        }
        if(v>80 && v <= 90){
          this.heartArr.push({
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          
          );
          this.$set(this,'data2',this.heartArr)
        }
        if(v>90){
          this.heartArr.push({
            name:"极限运动",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          {
            name:"极限运动",
            value:index,
            price:v
          },
          {
            name:"燃脂运动",
            value:index,
            price:v
          },
          {
            name:"热身",
            value:index,
            price:v
          },
          {
            name:"有氧运动",
            value:index,
            price:v
          },
          {
            name:"无氧运动",
            value:index,
            price:v
          },
          
          );
          this.$set(this,'data2',this.heartArr)
        }
      })
     
      console.log('返回',this.data2)
      let chart = new F2.Chart({
        id: "histogramList",
        // width: 320,
        // height: 250,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(this.data2, {
        price: {
          min: 2,
          max: 7,
          formatter(val) {
            console.log('val值',val)
            return (val * 20).toFixed(0) + '%';
          }
        }
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        // onChange: function onChange(obj) {
        //   console.log(obj)
        //   var legend = chart.get("legendController").legends.top[0] ? chart.get("legendController").legends.top[0] : '';
        //   var tooltipItems = obj.items;
        //   var legendItems = legend.items;
        //   var map = {};
        //   legendItems.map(function(item) {
        //     map[item.name] = _.clone(item);
        //   });
        //   tooltipItems.map(function(item) {
        //     var name = item.name;
        //     var value = item.value;
        //     if (map[name]) {
        //       map[name].value = value;
        //     }
        //   });
        //   legend.setItems(_.values(map));
        // },
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
        .color("name", ["#9399A5","#3FA6F2","#14D36B","#FFCB14","#F85842",])
        .adjust({
          type: "dodge",
          marginRatio: 0,// 设置分组间柱子的间距
          // stack:'stack' 
        });
      chart.render();
    },
    //时间戳转换日期
    
    getNowFormatDate() {//获取当前时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          // + " "  + date.getHours()  + seperator2  + date.getMinutes()
          // + seperator2 + date.getSeconds();
      return currentdate;
    }
  }
}
</script>
<style lang="less" src="./echartsInfo.less"></style>
