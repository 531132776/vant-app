<template>
    <div class="Fitness_data">
        <div class="Fitness_data_info">
            <ul>
                <li>
                    <dt>{{Fitnessdata.totalExerciseTime}}</dt>
                    <dt>总运动时间/<em>分钟</em></dt>
                </li>
                <li>
                    <dt>{{Fitnessdata.consume}}</dt>
                    <dt>总消耗/<em>大卡</em></dt>
                </li>
                <li>
                    <dt>{{Fitnessdata.powerGeneration}}</dt>
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
                            <div class="time_list" id="monitor">
                                <ul>
                                    <li :class="active==index ? 'class-a' : 'class-b'" v-for="(item,index) in 6" :key="index">
                                        {{item}}
                                    </li>
                                </ul>
                            </div>
                            <van-tabs v-model="active" :swipeable="false" :swipe-threshold="8">
                            <span class="before"></span>
                                
                                <van-tab v-for="(item,i) in timeList.slice(0,7).reverse()" :key="i" :title="getWeek(item)" class="var_tab">
                                    
                                    <div class="Fitness_data">
                                        <ul>
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
                                        </ul>
                                    </div>
                                </van-tab>
                            </van-tabs>
                        </li>
                        
                    </ul>
                    <span class="before"></span>
                    <div class="ridate">
                            <img :src="img" alt="">
                        </div>
                </div>
            </div>
        </div>
        <!-- 有氧无氧数据 -->
        <div class="Aerobic_anaerobic">
            <div class="pr_pl15">
                <div class="aerobic_info ">
                    <div class="text-title">有氧</div>
                    <ul>
                        <li v-for="(item,i) in aerobic" :key="i">
                            <img :src="item.src" alt="">
                            <dl>
                                <dt>{{item.name}}</dt>
                                <dt v-if="item.time<3600">{{Math.floor(item.time/60)}}分钟</dt>
                                <dt v-if="item.time>3600">{{Math.floor(item.time/3600)}}小时</dt>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="aerobic_info ">
                    <div class="text-title">无氧</div>
                    <ul>
                        <li v-for="(item,i) in anaerobic" :key="i">
                            <img :src="item.src" alt="">
                            <dl>
                                <dt>{{item.name}}</dt>
                                <dt v-if="item.time<3600">{{Math.floor(item.time/60)}}分钟</dt>
                                <dt v-if="item.time>3600">{{Math.floor(item.time/3600)}}小时</dt>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 查看详情 -->
        <div class="posi_btn">
            <van-button type="primary" size="large" round @click="echartsSurface">查看详情</van-button>
        </div>
    </div>
</template>
<script>
import { Button,Tab, Tabs } from 'vant';
import {headFitnessData, ComprehensiveData} from '@/request/api'
import houseAimg from '../../../public/aerobic.json'
import houseAimg2 from '../../../public/anaerobic.json'
import {
        SearchforAweek,
    } from '@/request/coach';
export default {
    data(){
        return {
            img:require('../../assets/images/3.jpg'),
            active:0,
            Fitnessdata:{},
            totalFitnessData:{},
            timeList:[],
            aerobic: houseAimg.images,//有氧
            anaerobic: houseAimg2.images,//无氧
        }
    },
    components:{
        [Button.name]:Button,
        [Tabs.name]:Tabs,
        [Tab.name]:Tab,
    },
    mounted(){
        this.initTime();
        this.getAweek();
        this.initFitnessData();
        this.initComprehensiveData();
    },
    methods:{
        getAweek() {
                // console.log(JSON.stringify(this.obj))
                var cells = document.getElementById('monitor').getElementsByTagName('li');
                var clen = cells.length;
                var currentFirstDate;
                var formatDate = function(date) {
                    var month = (date.getMonth() + 1) + '.';
                    var day = date.getDate();
                    console.log('日期',day)
                    if(month<10){
                        var m = '0' + month
                    }if(day<10){
                        var d = '0' + day
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
                        cells[i].innerHTML = formatDate(i == 0 ? date : addDate(date, 1));
                        cells[0].innerHTML = '今天';
                        cells[1].innerHTML = '昨天';
                        cells[2].innerHTML = '前天';
                    }
                };

                setDate(new Date());
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
                        // return this.timeList.reverse();
                    // this.getTeamClass(this.timeList[0])
                    // console.log('时间', this.timeList)
                    console.log('时间2', this.timeList.reverse())
                }).catch(err => {
                    console.log(err)
                })
            },
        //日期转星期
            getWeek(dateString) {
                var d;
                var day = new Date(dateString).getDay();
                console.log(day)
                switch (day) {
                    case 0:
                        d = "星期一";
                        break;
                    case 1:
                        d = "星期日";
                        break;
                    case 2:
                        d = "星期六";
                        break;
                    case 3:
                        d = "星期五";
                        break;
                    case 4:
                        d = "星期四";
                        break;
                    case 5:
                        d = "星期三";
                        break;
                    case 6:
                        d = "星期二";
                        break;

                }
                return d
            },
            //头部健身数据
            initFitnessData(){
                const params = '100'
                
                headFitnessData(params).then(res =>{
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
            initComprehensiveData(){
                const userId = '100';
                const subscribeDate = '2019-05-05'
                ComprehensiveData(userId,subscribeDate).then(res =>{
                    console.log('综合数据',res);
                    if(res.data.code == 2000){
                        this.totalFitnessData = res.data.obj
                        const aerobic = this.aerobic;
                        const anaerobic = this.anaerobic;
                        const arr = [];//有氧
                        const arr2 = [];//无氧
                        if(this.totalFitnessData.aerobicDeviceList !=null || this.totalFitnessData.aerobicDeviceList != undefined){
                            const aerobicDeviceList = this.totalFitnessData.aerobicDeviceList;
                            const anaerobicDeviceList = this.totalFitnessData.anaerobicDeviceList;
                            console.log('有氧1',aerobicDeviceList)
                            console.log('有氧2',aerobic)
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
                                    arr.push({"src":anaerobic[n].src,"name":anaerobic[n].name,"time":anaerobicDeviceList[n].time})
                                }else {
                                    for(var j in anaerobic){
                                        if(anaerobic[j].name == aerobicDeviceList[n].name){
                                            arr.push({"src":anaerobic[j].src,"name":anaerobic[j].name,"time":anaerobicDeviceList[n].time})
                                        }
                                    }
                                }
                            }
                        }
                        console.log('有氧新数据',arr);
                        console.log('无氧新数据',arr2);
                        this.$set(this,'aerobic',[...arr])
                        this.$set(this,'anaerobic',[...arr2])
                    }
                }).catch(err =>{
                    console.log(err,'请求错误！')
                })
            },
        echartsSurface(){
            this.$router.push({
                path:'/echartsInfo'
            })
        }
    }
}
</script>
<style lang="less" src="./fitnessHome.less"></style>

