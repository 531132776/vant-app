<template>
    <div class="Fitness_data">
        <div class="Fitness_data_info">
            <ul>
                <li>
                    <dt>216500</dt>
                    <dt>总运动时间/<em>分钟</em></dt>
                </li>
                <li>
                    <dt>4384</dt>
                    <dt>总消耗/<em>大卡</em></dt>
                </li>
                <li>
                    <dt>8231</dt>
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
                                    <li :class="active==index ? 'class-a' : 'class-b'" v-for="(item,index) in 5" :key="index">
                                        {{item}}
                                    </li>
                                </ul>
                            </div>
                            <van-tabs v-model="active" :swipeable="false" :swipe-threshold="8">
                            <span class="before"></span>
                                
                                <van-tab v-for="(item,i) in timeList!=undefined?timeList.slice(0,5):''" :key="i" :title="getWeek(item)" class="var_tab">
                                    
                                    <div class="Fitness_data">
                                        <ul>
                                            <li>
                                                <dt>640</dt>
                                                <dt>运动时间/分钟</dt>
                                            </li>
                                            <li>
                                                <dt>389</dt>
                                                <dt>消耗/大卡</dt>
                                            </li>
                                            <li>
                                                <dt>233</dt>
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
                        <li>
                            <img :src="img" alt="">
                            <dl>
                                <dt>跑步机</dt>
                                <dt>30min</dt>
                            </dl>
                        </li>
                        <li>
                            <img :src="img" alt="">
                            <dl>
                                <dt>跑步机</dt>
                                <dt>30min</dt>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="aerobic_info ">
                    <div class="text-title">无氧</div>
                    <ul>
                        <li>
                            <img :src="img" alt="">
                            <dl>
                                <dt>蝴蝶机</dt>
                                <dt>30min</dt>
                            </dl>
                        </li>
                        <li>
                            <img :src="img" alt="">
                            <dl>
                                <dt>坐式背肌训练</dt>
                                <dt>30min</dt>
                            </dl>
                        </li>
                        <li>
                            <img :src="img" alt="">
                            <dl>
                                <dt>高拉背肌训练</dt>
                                <dt>30min</dt>
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
import {
        SearchforAweek,
    } from '@/request/coach';
export default {
    data(){
        return {
            img:require('../../assets/images/3.jpg'),
            active:0,
            timeList:[]
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
                    return month + day ;
                };
                var addDate = function(date, n) {
                    date.setDate(date.getDate() - n);
                    return date;
                };
                var setDate = function(date) {
                    currentFirstDate = new Date(date);
                    for (var i = 0; i < clen; i++) {
                        cells[i].innerHTML = formatDate(i == 0 ? date : addDate(date, 1));
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
                    console.log('时间', res);
                    if (res.data.obj != undefined)
                        this.timeList = res.data.obj.timeList
                    // this.getTeamClass(this.timeList[0])
                    console.log('时间', this.timeList)
                }).catch(err => {
                    console.log(err)
                })
            },
        //日期转星期
            getWeek(dateString) {
                var d;
                var day = new Date(dateString).getDay();
                switch (day) {
                    case 6:
                        d = "星期五";
                        break;
                    case 0:
                        d = "星期四";
                        break;
                    case 1:
                        d = "星期三";
                        break;
                    case 2:
                        d = "星期二";
                        break;
                    case 3:
                        d = "星期一";
                        break;
                    case 4:
                        d = "星期日";
                        break;
                    case 5:
                        d = "星期六";
                        break;

                }
                return d
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

