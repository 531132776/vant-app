<template>
    <div class="Fitness_data">
        <div class="Fitness_data_info" v-show="show4">
            <ul>
                <li>
                    <dt v-if="Fitnessdata.totalExerciseTime/60>10000">{{Math.round(Fitnessdata.totalExerciseTime/600000)}}<em >万</em></dt>
                   <dt v-if="Fitnessdata.totalExerciseTime/60<10000">{{Math.round(Fitnessdata.totalExerciseTime/60)}}</dt>
                    <dt>总运动时间/<em>分钟</em></dt>
                </li>
                
                <li>
                    <dt v-if="Fitnessdata.consume/1000<10000">{{(Fitnessdata.consume/1000).toFixed(1)}}</dt>
                    <dt v-if="Fitnessdata.consume/1000>10000">{{(Fitnessdata.consume/10000000).toFixed(1)}}<em>万</em></dt>
                    <dt>总消耗/<em>大卡</em></dt>
                </li>
                <li>
                    <dt v-if="Fitnessdata.powerGeneration<10000">{{Fitnessdata.powerGeneration}}</dt>
                    <dt v-if="Fitnessdata.powerGeneration>10000">{{Fitnessdata.powerGeneration/10000}}<em>万</em></dt>
                    <dt>总发电量/<em>千焦</em></dt>
                </li>
            </ul>
        </div>
        <!-- 日期 -->
        <div class="tabs_date">
            <div class="">
                <div class="date_info">
                    <ul>
                        <li>
                            <!-- <div class="time_list" id="monitor">
                                <ul>
                                    <li :class="active==index ? 'class-a' : 'class-b'" v-for="(item,index) in 7" :key="index">
                                        {{item}}
                                    </li>
                                </ul>
                            </div> -->
                            <van-tabs v-model="active" :swipeable="false" :swipe-threshold="8" >
                                <!-- <span class="before"></span> -->
                                
                                <van-tab v-for="(item,i) in 7" :key="i" title="选项" class="var_tab" >
                                    <div slot="title" class="slot_content" @click="onTabClick($event,item,i)">
                                        <span class="timeThis" v-if="i==0">今天</span>
                                        <span class="timeThis" v-if="i==1">昨天</span>
                                        <span class="timeThis" v-if="i==2">前天</span>
                                        <dd>{{getNextDate(dayTime,-(i))}}</dd>
                                        <span>{{getnewDay(i)}}</span>
                                        
                                    </div>
                                    <div class="Fitness_data2" >
                                        
                                        <!-- <ul v-if="show && totalFitnessData.totalExerciseTim!==0">
                                            <li>
                                                <dt>{{totalFitnessData.totalExerciseTime}}</dt>
                                                <dt>运动时间/分钟</dt>
                                            </li>
                                            <li>
                                                <dt>{{totalFitnessData.consume}}</dt>
                                                <dt>消耗/大卡</dt>
                                            </li>
                                            <li>
                                                <dt>{{totalFitnessData.powerGeneration!=null?totalFitnessData.powerGeneration:''}}</dt>
                                                <dt>发电量/千焦</dt>
                                            </li>
                                        </ul> -->
                                        <div class="installDay" >
                        <Calendar
                        v-on:choseDay="clickDay"
                        v-on:changeMonth="changeDate"
                        v-show="show2"
                        ></Calendar>
                        <div class="Fitness_data2">
                                        <ul v-if="show && totalFitnessData.totalExerciseTim!==0">
                                            <li>
                                                <dt>{{headCreateTime(totalFitnessData.totalExerciseTime)}}</dt>
                                                <!-- <dt>运动时间/分钟</dt> -->
                                                <dt>运动时间</dt>
                                            </li>
                                            <li>
                                                <dt>{{(totalFitnessData.consume/1000).toFixed(1)}}</dt>
                                                <dt>消耗/大卡</dt>
                                            </li>
                                            <li>
                                                <dt>{{totalFitnessData.powerGeneration}}</dt>
                                                <dt>发电量/千焦</dt>
                                            </li>
                                        </ul>
                                    </div>
                    </div>
                                    </div>
                                </van-tab>
                            </van-tabs>
                        </li>
                            
                        
                    </ul>
                    <span class="before" v-if="totalFitnessData.totalExerciseTime!==0"></span>
                    <div class="ridate" @click="calendar">
                            <img :src="show3?img3:img" alt="">
                        </div>
                    
                </div>
            </div>
        </div>
        <!-- 有氧无氧数据 -->
        <div class="Aerobic_anaerobic" >
            <div class="pr_pl15">
                <div class="aerobic_info " v-if="aerobic.length > 0">
                    <div class="text-title">有氧</div>
                    <ul>
                        <li v-for="(item,i) in aerobic" :key="i">
                            <img :src="item.src" alt="">
                            <dl>
                                <dt>{{item.name}}</dt>
                                <!-- <dt v-if="item.time<3600">{{item.time}}分钟</dt> -->
                                <!-- <dt v-if="item.time>3600">{{item.time}}小时</dt> -->
                                <dt>{{headCreateTime(item.time)}}</dt>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="aerobic_info " v-if="anaerobic.length > 0">
                    <div class="text-title">无氧</div>
                    <ul>
                        <li v-for="(item,i) in anaerobic" :key="i">
                            <img :src="item.src" alt="">
                            <dl>
                                <dt>{{item.name}}</dt>
                                <!-- <dt v-if="item.time<3600">{{item.time}}分钟</dt> -->
                                <!-- <dt v-if="item.time>3600">{{item.time}}小时</dt> -->
                                <dt>{{headCreateTime(item.time)}}</dt>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- 没有数据 -->
        <div class="pr_pl15" v-if="totalFitnessData.totalExerciseTime==0 || totalFitnessData.totalExerciseTime==null">
            <div class="noDateList">
                <img :src="img2" alt="">
                <span>您还没有健身数据哦~</span>
            </div>
        </div>
        <!-- 查看详情 -->
        <div class="posi_btn" v-if="totalFitnessData.totalExerciseTime!==0 || totalFitnessData.totalExerciseTime==!null">
            <van-button type="primary" size="large" round @click="echartsSurface">查看详情</van-button>
        </div>
    </div>
</template>
<script>
import { Button,Tab, Tabs } from 'vant';
import {headFitnessData, ComprehensiveData} from '@/request/api'
import houseAimg from '../../../public/aerobic.json'
import houseAimg2 from '../../../public/anaerobic.json'
import Calendar from 'vue-calendar-component'
import {
        SearchforAweek,
    } from '@/request/coach';
export default {
    data(){
        return {
            img:require('../../assets/images/历史记录@2x.png'),
            img3:require('../../assets/images/日历@2x.png'),
            img2:require('../../assets/images/没有健身数据@2x.png'),
            active:'0',
            Fitnessdata:{},
            totalFitnessData:{},
            timeList:[],
            aerobic: houseAimg.images,//有氧
            anaerobic: houseAimg2.images,//无氧
            show:true,
            show2:false,
            show3:false,
            show4:true,
            disabledTab:false,
            // userId:'1128609374529040385',
            userId:this.$route.query.userId,
            dayTime:''
        }
    },
    components:{
        [Button.name]:Button,
        [Tabs.name]:Tabs,
        [Tab.name]:Tab,
        Calendar
    },
    
    mounted(){
        var that = this;
        // this.initTime();
        // this.getAweek();
        sessionStorage.setItem('aa',JSON.stringify(this.aerobic))
        sessionStorage.setItem('bb',JSON.stringify(this.anaerobic))
        this.initFitnessData();
        // this.initComprehensiveData();
        that.show4 = true;
        this.$nextTick(() =>{
            var startx, starty;
            document.addEventListener("touchstart", function(e){
                startx = e.touches[0].pageX;
                starty = e.touches[0].pageY;
            }, false);
            document.addEventListener("touchend", function(e) {
                console.log(e)
                var endx, endy;
                endx = e.changedTouches[0].pageX;
                endy = e.changedTouches[0].pageY;
                var direction = that.getDirection(startx, starty, endx, endy);
                switch (direction) {
                    case 0:
                        // alert("未滑动！");
                        break;
                    case 1:
                        // alert("向上！");
                        break;
                    case 2:
                        // alert("向下！");
                        // that.show = false;
                        that.show4 = true;
                        that.show = true
                        
                        // this.disabledTab = !this.disabledTab;
                        break;
                    case 3:
                        // alert("向左！");
                        break;
                    case 4:
                        // alert("向右！");
                        break;
                    default:
                }
            }, false);
        })
    },
    created(){
        let newDate;
        var now = new Date();
        var year=now.getFullYear(); 
                var month=now.getMonth()+1; 
                var date=now.getDate(); 
                var m,d;
                if(month<10){
                        m = '0' + month
                    }else{
                        m = month
                    };
                    if(date<10){
                        d = '0' + date
                    }else{
                        d = date;
                    }
                    // return m + d ;
                 newDate = year+"-"+m+"-"+d;
                console.log('当天日期',newDate)
                this.$set(this,'dayTime',newDate)
                this.initComprehensiveData(newDate)
    },
    methods:{
         getAngle(angx, angy) {
            return Math.atan2(angy, angx) * 180 / Math.PI;
        },

        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        getDirection(startx, starty, endx, endy) {
            var angx = endx - startx;
            var angy = endy - starty;
            var result = 0;

            //如果滑动距离太短
            if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                return result;
            }

            var angle = this.getAngle(angx, angy);
            if (angle >= -135 && angle <= -45) {
                result = 1;
            } else if (angle > 45 && angle < 135) {
                result = 2;
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            } else if (angle >= -45 && angle <= 45) {
                result = 4;
            }

            return result;
        },
        onTabClick(event,item,i){
            this.show = true;
            this.show2 = false;
            this.show3 = false;
            var dd = new Date();
            var y = dd.getFullYear();
            console.log(y)
            console.log('tab',event,item,i)
            console.log('哦哦',event.target.nextElementSibling.innerHTML)
            if(event.target.innerHTML=='今天' || event.target.innerHTML=='昨天' || event.target.innerHTML=='前天'){
                var inHtml = event.target.nextElementSibling.innerHTML;
                var date = y+'-'+inHtml;
            }else{
                var inHtml = event.target.innerHTML;
                var date = y+'-'+inHtml;
            }   
            
            console.log('lolo ',date)
            this.initComprehensiveData(date)
        },
        clickDay(data) {
      console.log(data); //选中某天
      var data = data.split('/');
      if(data[1]<10){
          var month = '0'+data[1]
      }
      if(data[2]<10){
          var day = '0'+ data[2]
      }else {
          var day = data[2]
      }
    //   console.log(month)
    //   console.log(day)
    //   console.log(data)
      var datatime = data[0]+ '-' +month+ '-'+day
      console.log('最终时间',datatime)
      this.initComprehensiveData(datatime)
    },
    changeDate(data){
        console.log(data);
        var data = data.split('/');
      if(data[1]<10){
          var month = '0'+data[1]
      }
      if(data[2]<10){
          var day = '0'+ data[2]
      }else {
          var day = data[2]
      }
    //   console.log(month)
    //   console.log(day)
    //   console.log(data)
      var datatime = data[0]+ '-' +month+ '-'+day
      console.log('最终时间',datatime)
      this.initComprehensiveData(datatime)
    },
        initTime() {
                let params = {
                    createTime: Date.parse(new Date()),
                    classRoomId: 1,
                }
                SearchforAweek(params).then(res => {
                    // console.log('时间', res);
                    if (res.data.obj != undefined)
                        this.timeList = res.data.obj.timeList;
                        console.log('时间戳',this.formatDate(new Date(this.timeList[0])))
                        this.$set(this,'dayTime',this.formatDate(new Date(this.timeList[0])))
                        this.initComprehensiveData(this.formatDate(new Date(this.timeList[0])))
                }).catch(err => {
                    console.log(err)
                })
            },
            tabClick(index,title){
                // alert(1)
                console.log('哈哈',index,title)
                //     this.initComprehensiveData(this.formatDate(new Date(this.timeList[index])))
            },
            calendar(){
                // alert(1)
                // this.show = !this.show;
                this.show2 = !this.show2;
                this.show3 = !this.show3;
                this.show4 = !this.show4;
                // this.disabledTab = !this.disabledTab;
            },
            getnewDay(i){
                var curDate = new Date();
                var preDate = new Date(curDate.getTime() - 24*60*60*1000*i).getDay(); //前一天
                var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
                return weekday[preDate];
            },
            getNextDate(date,day) {  
                var dd = new Date(date);
                dd.setDate(dd.getDate() + day);
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
                var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
                // return y + "-" + m + "-" + d;
                return  m + "-" + d;
            },
            
            getAweek() {
                // console.log(JSON.stringify(this.obj))
                var cells = document.getElementById('monitor').getElementsByTagName('li');
                var clen = cells.length;
                var currentFirstDate;
                var formatDate = function(date) {
                    var month = (date.getMonth() + 1) + '.';
                    var day = date.getDate();
                    var m,d;
                    // console.log('日期',day);
                    // return month+day
                    if(month<10){
                        m = '0' + month
                    }else{
                        m = month
                    };
                    if(day<10){
                        d = '0' + day
                    }else{
                        d = day;
                    }
                    return m + d ;
                };
                var addDate = function(date, n) {
                    date.setDate(date.getDate() - n);
                    return date;
                };
                var setDate = function(date) {
                    currentFirstDate = new Date(date);
                    for (var i = 0; i < clen; i++) {
                        
                        cells[0].innerHTML = '今天';
                        cells[1].innerHTML = '昨天';
                        cells[2].innerHTML = '前天';
                        cells[i].innerHTML = formatDate(i == 0 ? date : addDate(date, 1));
                    }
                };

                setDate(new Date());
            },
            headCreateTime(time){
            var hh;
            var mm;
            var ss;
           //传入的时间为空或小于0
            if(time==null||time<0){
                return;
            }
            //得到小时
            hh=time/3600|0;
            time=parseInt(time)-hh*3600;
            if(parseInt(hh)<10){
                  hh="0"+hh;
            }
            //得到分
            mm=time/60|0;
            //得到秒
            ss=parseInt(time)-mm*60;
            if(parseInt(mm)<10){
                 mm="0"+mm;    
            }
            if(ss<10){
                ss="0"+ss;      
            }
            return hh+":"+mm+":"+ss;
        },
            //时间戳转换日期
            formatDate(now) { 
                // console.log(now)
                var year=now.getFullYear(); 
                var month=now.getMonth()+1; 
                var date=now.getDate(); 
                // var hour=now.getHours(); 
                // var minute=now.getMinutes(); 
                // var second=now.getSeconds(); 
                // return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
                var m,d;
                if(month<10){
                        m = '0' + month
                    }else{
                        m = month
                    };
                    if(date<10){
                        d = '0' + date
                    }else{
                        d = date;
                    }
                    // return m + d ;
                return year+"-"+m+"-"+d
            }, 
        //日期转星期
            getWeek(dateString) {
                var d;
                var day = new Date(dateString).getDay();
                // console.log(day)
                switch (day) {
                    case 0:
                        d = "星期五";
                        break;
                    case 1:
                        d = "星期四";
                        break;
                    case 2:
                        d = "星期三";
                        break;
                    case 3:
                        d = "星期二";
                        break;
                    case 4:
                        d = "星期一";
                        break;
                    case 5:
                        d = "星期日";
                        break;
                    case 6:
                        d = "星期六";
                        break;

                }
                return d
            },
            //头部健身数据
            initFitnessData(){
                // const userId = '100';
                const userId = this.userId;
                
                headFitnessData(userId).then(res =>{
                    console.log('健身数据',res);
                    if(res.data.code == 2000){
                        this.Fitnessdata = res.data.obj;
                        console.log(this.Fitnessdata)
                    }
                    
                }).catch(err =>{
                    console.log('请求错误！')
                })
            },
            //综合数据
            initComprehensiveData(subscribeDate){
                console.log('开饭',subscribeDate)
                // const userId = '100';
                const userId = this.userId;
                // const subscribeDate = '2019-05-06'
                ComprehensiveData(userId,subscribeDate).then(res =>{
                    console.log('综合数据',res);
                    if(res.data.code == 2000){
                        this.totalFitnessData = res.data.obj
                        // const aerobic = this.aerobic;
                        const aerobic = JSON.parse(sessionStorage.getItem('aa'));
                        console.log(aerobic,'json')
                        // const anaerobic = this.anaerobic;
                        const anaerobic = JSON.parse(sessionStorage.getItem('bb'));
                        const arr = [];//有氧
                        const arr2 = [];//无氧
                        if(this.totalFitnessData.aerobicDeviceList !=null || this.totalFitnessData.aerobicDeviceList != undefined){
                            const aerobicDeviceList = this.totalFitnessData.aerobicDeviceList;
                            const anaerobicDeviceList = this.totalFitnessData.anaerobicDeviceList;
                            console.log('有氧1',aerobicDeviceList)
                            // console.log('有氧2',aerobic)
                            // var newList = aerobicDeviceList.map((value, index) => {
                            //     if (value.name !==null ? value.name.includes("跑步机") : '') {
                            //         value.name = "跑步机";
                            //     }
                            //     if (value.name !==null ? value.name.includes("动感单车") : '') {
                            //         value.name = "动感单车";
                            //     }
                                
                            //     console.log("value:" + value.name);
                            //     return value;
                            //     });
                                // console.log("还是", newList);
                            for(var n in aerobicDeviceList){
                                if(aerobicDeviceList[n].name == aerobic[n].name){
                                    arr.push({"src":aerobic[n].src,"name":aerobic[n].name,"time":aerobicDeviceList[n].time})
                                }else {
                                    for(var j in aerobic){
                                        if(aerobic[j].name == aerobicDeviceList[n].name){
                                            arr.push({"src":aerobic[j].src,"name":aerobic[j].name,"time":aerobicDeviceList[n].time})
                                        }
                                    }
                                }
                            }
                            for(var n in anaerobicDeviceList){
                                if(anaerobicDeviceList[n].name == anaerobic[n].name){
                                    arr2.push({"src":anaerobic[n].src,"name":anaerobic[n].name,"time":anaerobicDeviceList[n].time})
                                }else {
                                    for(var j in anaerobic){
                                        if(anaerobic[j].name == aerobicDeviceList[n].name){
                                            arr2.push({"src":anaerobic[j].src,"name":anaerobic[j].name,"time":anaerobicDeviceList[n].time})
                                        }
                                    }
                                }
                            }
                        }
                        console.log('有氧新数据',arr);
                        console.log('无氧新数据',arr2);
                        this.$set(this,'aerobic',[...arr])
                        console.log(this.aerobic.length)
                        this.$set(this,'anaerobic',[...arr2])
                    }
                }).catch(err =>{
                    console.log(err,'请求错误！')
                })
            },
        echartsSurface(){
            this.$router.push({
                path:'/echartsInfo',
                query:{
                    userId: this.userId,
                }
                
            })
        }
    }
}
</script>
<style lang="less" src="./fitnessHome.less"></style>

