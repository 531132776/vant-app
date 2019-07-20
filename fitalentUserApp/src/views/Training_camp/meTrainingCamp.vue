<template>
    <div class="PrivateTeachingStatus">
        <div class="Status_content">
            <div class="Class_status p15">
                <ul>
                    <li v-if="meTrainingCampList.status == 0">
                        课程进行中
                    </li>
                    <li v-if="meTrainingCampList.status == 1">
                        课程已完成
                    </li>
                    <li v-if="meTrainingCampList.status == 2">
                        课程未开始
                    </li>
                    <li v-if="meTrainingCampList.status == 10">
                        课程已取消
                    </li>
                    <li>
                        <span>{{meTrainingCampList.schedule}}</span>
                    </li>
                </ul>
                <span class="before"></span>
            </div>
            <!-- 头部信息 -->
            <div class="p15">
                <div class="header_info pb15">
                    <ul>
                        <li>
                            <!-- <img :src="meTrainingCampList.reduceUrl" alt=""> -->
                            <img :src="meTrainingCampList.coverUrl" alt="">
                            </li>
                        <li>
                            <!-- <dt v-if="className1==1">包月私教</dt> -->
                            <dt>{{meTrainingCampList.courseName}}</dt>
                            <!-- <dt v-if="className1==0">私教体验课</dt> -->
                            <dt>
                                <span class="head_people">
                                    <img :src="peopleHead" alt="">
                                </span>
                                <span>{{meTrainingCampList.coachName}}</span>
                            </dt>
                        </li>
                    </ul>
                    <span class="before"></span>
                </div>
            </div>
            <div class="courseMsg">
                <div style="position:relative;line-height: 2.5;">
                    <span class="title_text">上课信息</span>
                    <span class="before"></span>
                </div>
                <div class="adress_time">
                     <span>上课门店</span>
                     <span>{{meTrainingCampList.clubAddr}}</span>
                     <span class="before"></span>
                 </div>
                <div class="start_time">
                     <span>开始时间</span>
                     <span>{{meTrainingCampList.courseStartTime}}</span>
                     <span class="before"></span>
                 </div>
                 <div class="course_time">
                     <p>上课时间</p>
                     <p style="width:48%">{{meTrainingCampList.courseTime}}</p>
                     <!-- <p style="width:48%">星期六 18:00~19:00/星期六 18:00~19:00/星期六 18:00~19:00星期六 18:00~19:00</p> -->
                     <span class="before"></span>
                 </div>
            </div>
            <div class="CurriculumHistory pr_pl15">
                <span class="title_text" style="margin-top:20px;">上课历史</span>
                <div class="history_list pt20">
                    <ul class="steps_list">
                        <li v-for="(item,index) in stepList" :key="index">
                            <div class="steps_nmb">
                                <dt>{{item}}</dt>
                                <dt></dt>
                            </div>
                        </li>
                    </ul>
                    <div class="history_content_list">
                        <ul class="history_list_info" v-for="(item,index) in newArr" :key="index">
                            <li class="history_details">
                                <dt>{{item}}</dt>
                                <!-- <dt>{{item.time}}</dt> -->
                                <span class="before"></span>
                            </li>
                        </ul>
                        
                    </div>
                    
                </div> 
            </div>
        </div>
        <!-- 联系客服+购买课程 -->
            <!-- <div class="Immediate_purchase">
                <div class="purchase_info">
                    <ul>
                        <li @click="tell" :class="{'classA':isAlign}">
                            <dt>
                                <img :src="phomeIcon" alt="">
                            </dt>
                            <dt>联系教练</dt>
                        </li>
                        <li @click="signIn" v-if="conditionHide==!1">
                            <span>签到</span>
                        </li>
                    </ul>
                </div>
            </div> -->
    </div>
</template>
<script>
import { GetMeTrainingCamp } from '@/request/api-liu';// 导入我们的api接口
export default {
    data(){
        return{
            peopleHead:require('../../assets/images/10.png'),
            phomeIcon:require("../../assets/images/13.png"),
            oneImg:require('../../assets/images/4.jpg'),
            tell2:'400 075 5088',
            meTrainingCampList:{},
            stepList:[],
            courseId:this.$route.query.courseId,
            userId:this.$route.query.userId,
            className1:1,
            className2:2,
            className3:3,
            lessonTwo:5,//当前正在进行的第5节课
            totalNumber:12,//当前课程总数是12节课
            Classtimeanddate:[
                {
                    date:'2019.02.21 15:00',
                    time:'健身50分钟'
                },
                {
                    date:'2019.02.23 15:00',
                    time:'健身50分钟'
                },
                {
                    date:'2019.02.25 15:00',
                    time:'健身50分钟'
                },
                {
                    date:'2019.02.27 15:00',
                    time:'健身50分钟'
                },
            ],
            newArr:[],
            singInObj:{
                type: '1',
                name: 'zxy'
            },
            conditionHide:'',
            isAlign:false
        }
    },
    mounted(){
        
        this.onLoad()
    },
    methods:{
        // 获取数据            
        onLoad() {
            // 调用api接口，并且提供了两个参数
            const parmas = {
                userId:this.userId,
                type:0,
                courseId:this.courseId,
            }           
            GetMeTrainingCamp(parmas).then(res => {
                // 获取数据成功后的其他操作
                this.meTrainingCampList = res.data.obj
                this.Classtimeanddate = res.data.obj.timeList
                this.dd();
            })            
        },
        //联系教练
        tell(){
            window.location.href='tel://'+this.tell2
        },
        dd(){
            this.newArr = this.Classtimeanddate;
            console.log(this.newArr,'ss')
            var _index = [];
            this.stepList = [];
            var star = this.newArr.length
            for(var i =0 ;i<this.newArr.length;i++){
                this.stepList.push(star-i)
            }
            console.log(this.stepList,"stepList")
            var sam = 1;
            for(let i in this.Classtimeanddate){
                _index.push(i+sam)
                console.log(_index,'ssaa')
            }
            _index.map(v=>v+1)
            console.log(_index.reverse(),'aa')
        },
        //签到
        signIn(){
            // alert('签到')
            if(this.isAndroid){
                window.andriod.postMessage(JSON.stringify(this.singInObj))
            }else if (this.isiOS){
                window.webkit.messageHandlers.sing_In.postMessage(this.singInObj)
            }
            this.$router.back(-1)
        }
    },
    watch:{
        lessonTwo:{
            handler(newVal,oldVal){
                console.log(newVal)
                if(newVal !== this.totalNumber){
                    // alert('11')
                    this.$set(this,'conditionHide',1);
                    this.isAlign=true;
                    console.log(this.conditionHide);
                }
            },
            immediate: true, //最初绑定值的时候也执行函数
        }
    }
}
</script>
<style lang="less" scoped>
    .Status_content{
        padding-bottom: 70px;
        .Class_status{
            position: relative;
            ul{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                li:nth-child(1){
                    font-size: 17px;
                    font-weight: 400;
                }
                li:nth-child(2){
                    font-weight: 400;
                    span:nth-child(1){
                        font-size: 15px;
                    }
                    span:nth-child(2){
                        font-size: 12px;
                    }
                }
            }
        }
        .header_info{
            position: relative;
            ul{
                display: flex;
                justify-content: flex-start;
                flex-flow: row nowrap;
                li:nth-child(1){
                    padding-right: 15px;
                    width: 100px;
                    height: 100px;
                    border-radius: 8px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                        border-radius: 8px; 
                    }
                }
                li:nth-child(2){
                    display: flex;
                    justify-content: space-between;
                    align-content: flex-start;
                    flex-flow: column nowrap;
                    dt:nth-child(1){
                        font-size: 17px;
                        font-weight: 600;
                    }
                    dt:nth-child(2){
                        padding-top:5px;
                        font-size: 12px;
                        color: #9399A5;
                        .head_people{
                            width: 12px;
                            height: 12px;
                            display: inline-block;
                            padding-right: 5px;
                            img{
                                display: block;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
         .courseMsg{
            padding:15px;
            font-size:17px;
            font-weight:400;
            color:rgba(16,29,55,1);
             position: relative;
             .adress_time{
                display: flex;
                justify-content: space-between;
                line-height: 2;
                padding: 10px 0;
                position: relative;
                span:nth-child(1){
                    width: 130px;
                    margin-right: 10px;
                }
                span:nth-child(2){
                    font-size: 13px;
                }
             }
            .start_time{
                display: flex;
                justify-content: space-between;
                line-height: 2;
                padding: 10px 0;
                position: relative;
                 span:nth-child(1){
                    width: 130px;
                    margin-right: 10px;
                }
                span:nth-child(2){
                    font-size: 13px;
                }
            }
            .course_time{
                display: flex;
                justify-content: space-between;
                line-height: 2;
                padding: 10px 0;
                position: relative;
                 span:nth-child(1){
                    width: 130px;
                    margin-right: 10px;
                }
                span:nth-child(2){
                    font-size: 13px;
                }
            }
        }


        .CurriculumHistory{
            margin-top: 20px;
            .history_list{
                
                    overflow: hidden;
                    .steps_list{
                        margin-left: 15px;
                        float:left;
                        padding-top: 17px;
                        li{
                            margin-bottom:2px;
                            .steps_nmb{
                                display: flex;
                                justify-content:space-around;
                                align-content: center;
                                align-items: center;
                                height: 100%;
                                flex-flow: column nowrap;
                                dt:nth-child(1){
                                    width:28px;
                                    height:28px;
                                    background:rgba(216,216,216,1);
                                    font-size: 15px;
                                    font-weight: 400;
                                    line-height: 28px;
                                    text-align: center;
                                    color: #fff;
                                    border-radius: 100%;
                                    margin-bottom:3px;
                                }
                                dt:nth-child(2){
                                    // width:1px;
                                    height:30px;
                                    border:1px dashed rgba(236,236,236,1);
                                    transform: scaleX(0.5);
                                }
                            }
                        }
                        li:last-child{
                            dt:nth-child(2){
                                border:none;
                            }
                        }
                        
                    }
                    .history_content_list{
                        width: 80%;
                        float: right;
                        .history_list_info{
                            display: flex;
                            justify-content: space-around;
                            align-items: flex-start;
                            height: 65px;
                            flex-flow: column nowrap;
                            position: relative;
                            .history_details{
                                dt:nth-child(1){
                                    font-size: 15px;
                                    font-weight: 500;
                                    // padding-bottom: 5px;
                                }
                                dt:nth-child(2){
                                    font-size: 13px;
                                    font-weight: 500;
                                    color: #9399A5
                                }
                            }
                            
                        }
                    }
            }
        }
    }
    .Immediate_purchase{
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 333;
            padding: 10px 15px;
            background-color: #fff;
            border-top: 0.5px solid rgba(0, 0, 0, .12);
            .purchase_info{
                ul{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-flow: row nowrap;
                    li:nth-child(1){
                        padding-left: 10px;
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: space-between;
                        align-items: center;
                        dt:nth-child(1){
                            padding-bottom: 8px;
                            width:26px;
                            height: 26px;
                            img{
                                display: block;
                                width: 100%
                            }
                        }
                        dt:nth-child(2){
                            font-size: 12px;
                            font-weight: 400;
                            color: #9399A5
                        }
                    }
                    .classA{
                        margin: 0 auto;
                        padding-left: 0px !important;
                    }
                    li:nth-child(2){
                        width: 60%;
                        flex:0 1 70%;
                        padding: 10px 0;
                        font-size: 17px;
                        color: #fff;
                        font-weight: 400;
                        border-radius: 23px;
                        background:rgba(29,206,116,1);
                        text-align: center;
                    }
                }
            }
        }
</style>

