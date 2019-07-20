<template>
    <div class="PrivateTeachingStatus">
        <div class="Status_content">
            <div class="Class_status p15">
                <ul>
                    <!-- <li v-if="lessonTwo==totalNumber">
                        课程已完成
                    </li> -->
                    <li v-if="courseInfo.status == 0">课程进行中</li>
                    <li v-if="courseInfo.status == 1">课程已完成</li>
                    <li v-if="courseInfo.status == 10">已取消</li>
                    <li>
                        <!-- <span>{{lessonTwo}}</span><span> /{{totalNumber}}节</span> -->
                        <span>{{courseInfo.schedule}}</span>
                    </li>
                </ul>
                <span class="before"></span>
            </div>
            <!-- 头部信息 -->
            <div class="p15">
                <div class="header_info pb15">
                    <ul>
                        <li>
                            <img :src="courseInfo.coverUrl" alt="">
                            </li>
                        <li>
                            <dt>{{courseInfo.courseName}}</dt>
                            <dt>
                                <span class="head_people">
                                    <img :src="peopleHead" alt="">
                                </span>
                                <span>{{courseInfo.coachName}}</span>
                                <span>{{courseInfo.priceType}}</span>
                            </dt>
                            <!-- <dt>
                                <span>{{courseInfo.clubAddr}}</span>
                            </dt> -->
                        </li>
                    </ul>
                    <span class="before"></span>
                </div>
            </div>
            <div class="classInfo_mess pr_pl15 pt20">
                <ul class="pb15">
                    <span class="text-title">上课信息</span>
                    <span class="before"></span>
                </ul>
                
            </div>
            <div class="classInfo_mess pr_pl15 pt15">
                <ul class="pb15 addressClass">
                    <li>上课门店</li>
                    <li>{{courseInfo.clubAddr}}</li>
                    <span class="before"></span>
                </ul>
                
            </div>
            <div class="CurriculumHistory pr_pl15 pt20" v-if="courseType == 1 || courseType ==2">
                <span class="title_text">上课历史</span>
                <div class="history_list pt20">
                    <ul class="steps_list">
                        <li v-for="(item,idx) in indexs" :key="idx">
                            <div class="steps_nmb">
                                <dt>{{item+1}}</dt>
                                <dt></dt>
                            </div>
                        </li>
                    </ul>
                    <div class="history_content_list">
                        <ul class="history_list_info" v-for="(item,index) in timeList" :key="index">
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
            <div class="Immediate_purchase">
                <div class="purchase_info">
                    <ul>
                        <li @click="tell" :class="{'classA':isAlign}">
                            <dt>
                                <img :src="phomeIcon" alt="">
                            </dt>
                            <dt>联系教练</dt>
                        </li>
                        <!-- <li @click="signIn" v-if="conditionHide!==1"> -->
                        <!-- <span v-esle> -->
                            <li v-if="courseInfo.status == 10">
                                <van-button  type="primary" @click="CancelledSignIn" class="disabledClass">签到</van-button>
                            </li>
                            <li v-if="courseInfo.status !== 10 && courseType == 1 || courseInfo.status !== 10 && courseType ==2">
                               <van-button type="primary" @click="signIn" :class="{'disabledClass':disabledClass}">签到</van-button> 
                            </li>
                        <!-- </span> -->
                        
                        
                    </ul>
                </div>
            </div>
    </div>
</template>
<script>
import { courseHistoricarecord,postPrivateEducationCheck,postPrivateEducation,postPrivateEducationexCheck,postPrivateEducationexPerience } from '@/request/api';// 导入我们的api接口
import {Dialog,Button,Toast} from 'vant'
export default {
    data(){
        return{
            disabled2:true,
            peopleHead:require('../../assets/images/10.png'),
            phomeIcon:require("../../assets/images/电话 2@2x.png"),
            // oneImg:require('../../assets/images/4.jpg'),
            tell2:'400 075 5088',
            lessonTwo:'',//当前正在进行的第5节课
            totalNumber:'',//当前课程总数是12节课
            Classtimeanddate:[],
            newArr:[],
            singInObj:{
                type: '1',
                name: 'zxy'
            },
            conditionHide:'',
            isAlign:false,
            indexs:[],
            timeList:[],
            courseId:this.$route.query.courseId,
            courseType:this.$route.query.courseType,
            courseInfo:{},
            // courseType:1,
            disabled:false,
            disabledClass:false,
            Front:'',
            after:'',
            couerStatus:''
        }
    },
    components:{
        [Dialog.name]:Dialog,
        [Button.name]:Button,
        [Toast.name]:Toast,
    },
    //在页面离开时记录滚动位置
        beforeRouteLeave(to, from, next) {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            next()
        },
        //进入该页面时，用之前保存的滚动位置赋值
        beforeRouteEnter(to, from, next) {
            next(vm => {
                document.body.scrollTop = vm.scrollTop
            })
        },
    mounted(){
        this.onLoad();
        // this.dd()
        if(this.courseType == 1){
            this.privateEducationCheck();
        }else if(this.courseType == 2){
            this.experienceSignIn();
        }
    },
    methods:{
        // 获取数据            
        onLoad() {
            let params = {
                userId:this.$route.query.userId,
                courseId:this.courseId,
                type:this.courseType,
            }                
            courseHistoricarecord(params).then(res => {
                // 获取数据成功后的其他操作
                console.log(res);
                if(res.data.code == 2000){
                    this.courseInfo = res.data.obj
                    this.timeList = res.data.obj.timeList;
                    this.dd(this.timeList);
                    this.totalNumber = res.data.obj.scheduleAll;
                    this.lessonTwo = res.data.obj.scheduleUser;
                    this.$set(this,'Front',this.courseInfo.schedule.substring(0,1))
                    this.$set(this,'after',this.courseInfo.schedule.substring(2,3))
                }
                
            }).catch(error => {
                console.log(error)
            })            
        },
        //联系教练
        tell(){
            window.location.href='tel://'+this.tell2
        },
        dd(timeList){
            this.newArr = timeList;
            console.log('哈哈',this.newArr)
            // var indexs = this.indexs;
            // console.log(indexs)
            // var sam = 1;
            const _len = timeList;
            // debugger
            for(var i=_len.length-1;i>=0;i--){
                this.indexs.push(i)
            }
            console.log(this.indexs)
        },
        //私教课先查询是否可以签到
        privateEducationCheck(){
            // debugger
            let params = {
                    userId:this.$route.query.userId,
                    privateCourseId:this.courseId
                }
                postPrivateEducationCheck(params).then(res =>{
                    console.log('私教课查询是否可签到',res);
                    if(res.data.code == 2000){
                        if(res.data.obj.status == 0){
                            // alert(2)
                            return
                        }else{
                            this.disabled = true;
                            this.disabledClass = true;
                        }
                    }
                    
                }).catch(err =>{
                    console.log(err)
                })
        },
        //私教课签到接口请求
        getPrivateEducation(){
            Dialog.confirm({
                title: '提示',
                message: '是否确认签到'
            }).then(() => {
            // on confirm
                let para = {
                    userId: this.$route.query.userId,
                    privateCourseId:this.courseId,
                    coachId:this.courseInfo.coachId,
                    coachName:this.courseInfo.coachName,
                }
                postPrivateEducation(para).then(res =>{
                    console.log('私教课签到',res);
                    if(res.data.obj == 1){
                        this.disabled = true;
                        this.disabledClass = true;
                    }
                    
                    Toast.success('签到成功');
                    // this.$set(this,'timeList',[])
                    this.$set(this,'indexs',[])
                    console.log('签到成功',this.timeList)
                    this.onLoad();
                }).catch(err =>{
                    console.log(err)
                })
            }).catch(() => {
            // on cancel
            });
            
        },
        //私教体验课签到之前先查询
        experienceSignIn(){
            let params = {
                // userId:101,
                userId:this.$route.query.userId
            }
            postPrivateEducationexCheck(params).then(res =>{
                console.log('体验课查询是否可签到',res);
                    if(res.data.code == 2000){
                        if(res.data.obj.status == 0){
                            // alert(2)
                            return
                        }else{
                            this.disabled = true;
                            this.disabledClass = true;
                        }
                    }
            }).catch(err =>{

            })
        },
        getExperienceSignIn(){
            Dialog.confirm({
                title: '提示',
                message: '是否确认签到'
            }).then(() => {
                let para = {
                    userId: this.$route.query.userId,
                    privateTasteCourseId:this.courseId,
                    coachId:this.courseInfo.coachId,
                    coachName:this.courseInfo.coachName,
                }
                postPrivateEducationexPerience(para).then(res =>{
                    console.log('私教体验课签到',res)
                    if(res.data.obj == 1){
                        this.disabled = true;
                        this.disabledClass = true;
                    }
                    
                    Toast.success('签到成功');
                    // this.$set(this,'timeList',[])
                    this.$set(this,'indexs',[])
                    console.log('签到成功',this.timeList)
                    this.onLoad()
                }).catch(err =>{
                    console.log(err)
                })
            }).catch(() => {
            // on cancel
            });
            
        },
        CancelledSignIn(){
            // alert(1)
            Toast('课程已取消')
        },
        //签到
        signIn(){
            // alert('签到')
            // if(this.isAndroid){
            //     window.andriod.postMessage(JSON.stringify(this.singInObj))
            // }else if (this.isiOS){
            //     window.webkit.messageHandlers.sing_In.postMessage(this.singInObj)
            // }
            console.log(this.couerStatus)
            if(this.courseType == 1){
                console.log('私教课')
                // this.privateEducationCheck()
                if(this.couerStatus == 2){
                    Toast('课程已完成')
                }
                else if(this.disabled == true){
                    // alert(1)
                    Toast('您已签到！每次签到时隔1小时！')
                }else{
                    this.getPrivateEducation()
                }
                

            }else if(this.courseType == 2){
                // alert(2)
                console.log('私教体验课')
                // this.experienceSignIn();
                // alert(this.disabled)
                if(this.disabled == true){
                    // alert(1)
                    Toast('您已签到！私教体验课只有一次签到！')
                }else{
                    this.getExperienceSignIn()
                }

            }
            else if(this.courseType == 3){
                console.log('包月私教课')
                this.isAlign=false;
            }
        }
    },
    computed: {
      changeData() {
        const { index, Front,after} = this
        return {
          index,
          Front,
          after,
        }
      }
    },
        
    watch:{
        changeData:{
            handler(newVal,oldVal){
                console.log(newVal,oldVal,'监听');
                if(newVal.Front == newVal.after){
                    this.couerStatus = 2
                }
            },
            deep: true
        },
        lessonTwo:{
            handler(newVal,oldVal){
                console.log(newVal)
                console.log(this.totalNumber)
                if(newVal !== this.totalNumber){
                    this.$set(this,'conditionHide','');
                    this.isAlign=false;
                }else {
                    this.$set(this,'conditionHide',1);
                    this.isAlign=true;
                }
            },
            immediate: true, //最初绑定值的时候也执行函数
        },
        courseType:{
            handler(newVal,oldVal){
                console.log('监听',newVal,oldVal)
                if(newVal == 3){
                    // alert(1)
                    this.$set(this,'conditionHide',1);
                    this.isAlign=true;
                }else {
                    // alert(2)
                    this.$set(this,'conditionHide','');
                    this.isAlign=false;
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
        .classInfo_mess{
            ul{
                position: relative;
            }
            .addressClass{
                display: flex;
                justify-content:space-between;
                flex-flow: row nowrap;
                align-items: center;
                li:nth-child(1){
                    font-size: 17px;
                    font-weight: 400;
                }
                li:nth-child(2){
                    font-size: 13px;
                    font-weight: 400;
                    text-align: right;
                    flex:2;
                    width:80%;
                }
            }
            .text-title{
                font-size: 17px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(16,29,55,1);
            }
        }
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
                    width: 50%;
                    flex:2;
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
                        span:nth-child(2){
                            margin-right:20px;
                        }
                    }
                    dt:nth-child(3){
                        font-size: 12px;
                        color: #9399A5;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .CurriculumHistory{
            .title_text{
                font-size: 17px;
            }
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
                        .van-button--primary{
                            height: auto;
                            border-radius:25px;
                            border:0;
                            width:100%;
                            font-size: 17px;
                            letter-spacing: 2px;
                            font-weight: 400;
                            
                            // padding: 10px 0;
                            // font-size: 17px;
                            color: #fff;
                            // font-weight: 400;
                            border-radius: 23px;
                            // background:rgba(29,206,116,1);
                            text-align: center;
                        }
                        .disabledClass{
                            opacity: .5;
                        }
                    }
                }
            }
        }
</style>

