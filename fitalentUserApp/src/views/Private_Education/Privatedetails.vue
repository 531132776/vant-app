<template>
    <div class="Private_education">
        <div class="coach_info p15">
            <div class="name_info">
                <ul>
                    <li>
                        <img :src="headUrl.url" alt="">
                    </li>
                    <li>
                        <span>{{coachInfo.nickName}}</span>
                        <span>{{coachInfo.age}} {{coachInfo.gender}}</span>
                        <span>累积上课{{coachInfo.privateCourseNum && coachInfo.privateMonthCourseNum && coachInfo.privateTasteCourseNum && coachInfo.teamClassCourseNum && coachInfo.trainingCampCourseNum ? coachInfo.privateCourseNum+coachInfo.privateMonthCourseNum+coachInfo.privateTasteCourseNum+coachInfo.teamClassCourseNum+coachInfo.trainingCampCourseNum : ''}}节,累积学员{{coachInfo.totalStudent}}人</span>
                    </li>
                </ul>
            </div>
            <div class="curriculum_Label">
                <ul>
                    <li v-for="(item,i) in goodCourse" :key="i">{{item}}</li>
                </ul>
                <span class="before"></span>
            </div>
        </div>
        <!-- 关于ta -->
        <div class="aboutTa pr_pl15">
            <div class="aboutTa_info">
                <span class="title_text">关于TA</span>
                <dt>
                    {{coachInfo.personalProfile}}
                </dt>
                <span class="before"></span>
            </div>
        </div>
        <!-- 专业证书 -->
        <div class="Professional_certificate pr_pl15">
            <div class="Professional_info pt_pb20">
                <ul @click="certificate">
                    <li>专业证书</li>
                    <li>
                        <dt>
                            <span>{{seniorityUrl.length}}张</span>
                            <span class="head_people">
                                <img :src="rightIcon" alt="">
                            </span>
                            
                        </dt>
                    </li>
                </ul>
                <span class="before"></span>
            </div>
        </div>
        <!-- 教练相册 -->
        <div class="Professional_certificate pr_pl15">
            <div class="Professional_info pt_pb20">
                <ul @click="lifeImg">
                    <li>教练相册</li>
                    <li>
                        <dt >
                            <span>{{swiperImgs.length}}张</span>
                            <span class="head_people">
                                <img :src="rightIcon" alt="">
                            </span>
                            
                        </dt>
                    </li>
                </ul>
                <span class="before"></span>
            </div>
        </div>
        <!-- 上课门店 -->
        <div class="Professional_certificate p15">
            <span class="title_text">上课门店</span>
            <div class="pb20 scoolHouse">
                <ul>
                    <li>{{coachInfo.clubName}}</li>
                    <!-- <li>松岗满京华店2</li>
                    <li>松岗满京华店3</li>
                    <li>松岗满京华店3</li>
                    <li>松岗满京华店3</li> -->
                </ul>
                <span class="before"></span>
            </div>
        </div>
        <!-- 所授课程 -->
        <div class="Teaching p15">
            <span class="title_text">所授课程</span>
            <div class="Teaching_info">
                <ul>
                    <li v-for='(item,index) in Coursedata' :key="index" @click="Course_Details(item,index)">
                        <div class="details_img">
                            <img :src="item.courseImage" alt="">
                        </div>
                        <div class="deatils_info single_row"><span>{{item.courseName}}</span></div>
                        <div class="deatils_stuts single_row">
                            <span>{{item.introduction}}</span>
                        </div>
                        <div class="deatils_price">
                            <span>
                                <em>￥</em>
                                <em>{{item.coursePrice}}</em>
                                <em>/节</em>
                            </span>
                            <span v-if="item.courseType == 4">预约</span>
                            <span v-else>购买</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
import {getCoachDetail,getCourseClass} from '@/request/api'
export default {
    data(){
        return{
            show:false,
            // oneImg:require("../../assets/images/1.jpg"),
            rightIcon:require("../../assets/images/14.png"),
            Coursedata:[],
            coachId:'',
            coachInfo:{},//教练信息
            goodCourse:[],
            swiperImgs:[],
            seniorityUrl:[],
            headUrl:{},
            clubNames:[],//上课门店(后期是一个数组格式)
            scrollTop:'',
            userId:this.$route.query.userId
        }
    },
        //在页面离开时记录滚动位置
    // beforeRouteLeave(to, from, next) {
            // window.scrollTo(0,0)
            // this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // console.log(this.scrollTop)
            // next()
        // },
        //进入该页面时，用之前保存的滚动位置赋值
    // beforeRouteEnter(to, from, next) {
    //     next(vm => {
    //         document.body.scrollTop = vm.scrollTop
    //     })
    // },
    beforeRouteLeave(to, from, next) {
        let position = window.scrollY  //记录离开页面的位置
        if (position == null) position = 0
        this.$store.commit('changeRecruitScrollY', position) //离开路由时把位置存起来
        next()
    },
    watch: {
        '$route' (to, from) {
            alert(1)
            console.log('$route',to,from)
        if (to.name === 'Privatedetails') {//跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面
            let recruitScrollY = this.$store.state.recruitScrollY
            window.scroll(0, recruitScrollY)
        }
        }
    },
    mounted(){
        console.log(this.$route)
        // window.scrollTo(0,0)
        this.coachId = this.$route.query.coachId;
        this.CoachDetail();
        this.getCoursessold();
        // window.addEventListener('scroll', this.handleScroll,true);
        
    },
    // activated() {
    
    //     this.scrollTop = sessionStorage.getItem('scrollTop')
    //     window.addEventListener('scroll',this.handelscroll,true)
    // },
    // deactivated(){
    //     this.scrollTop = sessionStorage.removeItem('scrollTop')
    //     window.removeEventListener('scroll', this.handleScroll);
    // },

    methods:{
        // handleScroll () {
        //     let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //     this.scrollTop = scrollTop;
        //     sessionStorage.setItem('scrollTop',this.scrollTop)
        //     //   console.log(this.scrollTop
        // },
        //跳转到生活照页面
        lifeImg(){
            this.$router.push({
                path:'/lifeImg',
                query:{
                    images:this.swiperImgs
                }
            })
        },
        //获取教练详情
        CoachDetail(){
            let params = {
                coachId:this.coachId
            }
            getCoachDetail(params).then(res =>{
                console.log('教练详情',res);
                if(res.data.code == 2000){
                    this.coachInfo = res.data.obj;
                    let goodCourse = res.data.obj.goodCourse ? res.data.obj.goodCourse.split('、') : '';
                    // console.log('w完成',this.coachInfo)
                    this.swiperImgs = res.data.obj.immageDto.lifeUrl;
                    this.seniorityUrl = res.data.obj.immageDto.seniorityUrl;
                    this.headUrl = res.data.obj.immageDto.headUrl;
                    this.goodCourse = goodCourse;
                }
                
            }).catch(err => {
                console.log(err)
            })
        },
        //根据教练ID获取教练所售课程
        getCoursessold(){
            let params = {
                coachId:this.coachId
            }
            getCourseClass(params).then(res =>{
                if(res.data.code == 2000){
                    console.log('所售课程',res);
                    this.Coursedata = res.data.obj.list;
                }
                
            }).catch(err=>{
                console.log(err)
            })

        },
        //私教体验课详情
        Course_Details(item,index){
            console.log(item,index)
            if(item.courseType == 2){
                //私教体验课详情
                this.$router.push({
                    path:'/CourseDetails',
                    query:{
                        status:0,
                        educationexperienceId:item.courseId,
                        courseType:item.courseType,
                        userId:this.userId
                    }
                })
            }else if(item.courseType == 3){
                //包月私教详情
                this.$router.push({
                    path:'/privatemonthly',
                    query:{
                        status:1,
                        educationsectorId:item.courseId,
                        courseType:item.courseType,
                        userId:this.userId
                    }
                })
            }else if(item.courseType == 1){
                //私教课详情
                this.$router.push({
                    path:'/CourseDetails',
                    query:{
                        status:2,
                        privateCourseId:item.courseId,
                        courseType:item.courseType,
                        userId:this.userId
                    }
                })
            }else if(item.courseType == 0){
                //订单
                this.$router.push({
                    path:'/orderDetails?courseId='+item.courseId+'&userId='+this.userId,
                    // query:{
                    //     privateCourseId:item.courseId,
                    //     courseType:item.courseType
                    // }
                })
            }
            else if(item.courseType == 4){
                //团课预约
                this.$router.push({
                    path:'/leagueDetails?courseId='+item.courseId+'&userId='+this.userId,
                    // query:{
                    //     privateCourseId:item.courseId,
                    //     courseType:item.courseType
                    // }
                })
            }
        },
        //证书
        certificate(){
            this.$router.push({
                path:'/certificate',
                query:{
                    obj:this.seniorityUrl
                }
            })
        }
    },
    
}
</script>
<style lang="less">
.title_text{
    font-family:PingFangSC-Medium;
}
.single_row {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.multiple_rows {
    overflow: hidden;
    text-overflow: ellipisis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
    .Private_education{
        .coach_info{
            .name_info{
                padding-bottom: 18px;
                ul{
                    display:flex;
                    flex-flow:row wrap;
                    justify-content: flex-start;
                    align-items: center;
                    li:nth-child(1){
                        width:64px;
                        height: 64px;
                        margin-right: 10px;
                        border-radius: 100%;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                        }
                    }
                    li:nth-child(2){
                        display:flex;
                        justify-content: space-between;
                        align-content: flex-start;
                        flex-flow: column wrap;
                        flex: 0 1 76%;
                        span:nth-child(1){
                            font-size: 17px;
                            font-weight: 600;
                        }
                        span:nth-child(2),
                        span:nth-child(3){
                            font-size: 13px;
                            font-weight: 400;
                            color: #9399A5
                        }
                    }
                }
                
            }
            .curriculum_Label{
                padding-bottom: 20px;
                position: relative;
                ul{
                    // display:flex;
                    // justify-content: space-between;
                    // align-items: center;
                    // flex-flow: row wrap;
                    li{
                        // width: 50px;
                        height: 24px;
                        padding: 0px 12px;
                        color: #CBCBCB;
                        font-size: 12px;
                        font-weight: 400;
                        border-radius:12px;
                        border:1px solid rgba(203,203,203,1);
                        line-height: 24px;
                        text-align: center;
                        margin-right: 5px;
                        margin-bottom: 5px;
                        display: inline-block;
                        // flex: 0 1 15%;
                    }
                }
            }
        }
        .aboutTa{
            .aboutTa_info{
                position: relative;
                padding-top: 20px;
                padding-bottom: 20px;
                span:nth-child(1){
                    padding-bottom: 7px;
                    display: inline-block
                }
                dt{
                    font-size: 13px;
                    line-height: 20px;
                }
            }
            
        }
        .Professional_info{
            position: relative;
            ul{
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
                li:nth-child(1){
                    font-size: 20px;
                    font-weight: 500;
                    font-family:PingFangSC-Medium;
                }
                li:nth-child(2){
                    font-size: 13px;
                    font-weight: 400;
                    
                    dt{
                        /* padding-top:5px; */
                        display: flex;
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    align-items: center;
                        .head_people{
                            width: 13px;
                            height: 13px;
                            display: inline-block;
                            img{
                                display: block;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
        .scoolHouse{
            position: relative;
            padding-top:12px;
            ul{
                // display:flex;
                // flex-flow: row wrap;
                li{
                    height: 24px;
                    padding: 0px 12px;
                    line-height: 24px;
                    font-size: 12px;
                    color:#CBCBCB;
                    border-radius:12px;
                    border:1px solid rgba(203,203,203,1);
                    margin-right: 5px;
                    margin-bottom: 5px;
                    display: inline-block;
                }
            }
        }
        .Teaching_info{
            padding-top:22px;
            ul{
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-content: center;
                li{
                    padding-bottom: 24px;
                    display: flex;
                    flex-flow: column nowrap;
                    flex:0 1 48%;
                    overflow: hidden;
                    .details_img{
                        // width: 165px;
                        height: 150px;
                        border-radius: 8px;
                        padding-bottom: 10px;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                            border-radius: 8px;
                        }
                    }
                    .deatils_info{
                        font-size:17px;
                        font-weight: 600;
                        padding-bottom: 7px;
                        font-family:PingFangSC-Semibold;
                    }
                    .deatils_stuts{
                        font-size: 12px;
                        color: #9399A5;
                        font-weight: 400;
                        padding-bottom: 7px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .deatils_price{
                        color:#1DCE74;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        span:nth-child(1){
                            em:nth-child(1),
                            em:nth-child(3){
                                font-size:10px;
                                font-style:normal;
                            }
                            em:nth-child(2){
                                font-size: 17px;
                                font-style:normal;
                                padding: 0 3px 0 3px;
                                font-weight: 400;
                                font-family:BebasNeue;
                            }
                        }
                        span:nth-child(2){
                            width: 60px;
                            height: 24px;
                            line-height: 24px;
                            font-size: 13px;
                            background-color: #1DCE74;
                            color: #fff;
                            text-align: center;
                            border-radius: 12px;
                        }
                    }
                }
            }
        }
    }
</style>
