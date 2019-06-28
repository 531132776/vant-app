<template>
    <div class="storeHome">
        <!-- my-group -->
        <div class="house_shop pr_pl15">
            <div class="moreList">
                <span class="title_text">{{clubInfo.name}}</span>
                <!-- <span @click="moreVue">更多<img :src="rightIcon" alt=""></span> -->
            </div>
            
            <div class="house_shop_info">
                <ul>
                    <li>
                        <img :src="clubInfo.headShotUrl" alt="">
                    </li>
                    <li>
                        <!-- <dl>
                            <dt><span class="people_nmb">可容纳{{clubInfo.maxPeople}}人同时健身</span></dt>
                            <dt><span class="current_nmb">当前健身人数{{currentNum}}人</span></dt>
                        </dl> -->
                        <dl>
                            <dd>即将开业</dd>
                            <dd>敬请期待</dd>
                        </dl>
                        <span class="shop_detail_info" v-show="jumpAvailable" @click="toStoreShop">
                            查看详情
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 团体课 -->
        <div class="Group_course pr_pl15">
            <span class="title_text">门店团课</span>
            <div class="cours_list">
                <div class="time_list" id="monitor">
                    <ul>
                        <li :class="active==index ? 'class-a' : 'class-b'" v-for="(item,index) in clen" :key="index">{{item}}</li>
                    </ul>
                </div>
                <van-tabs v-model="active" class="tabs_group" :swipe-threshold="8" :swipeable="false"  @click="onClick">
                    <!--<span id="time">2.19</span>-->
                    <van-tab v-for="(item,i) in timeList" :key="i" :title="i==0 ? '今天' : getWeek(item)" class="var_tab">
                        <div class="Course_list">
                            <ul v-if="teamClassList.length > 0" v-show="jumpAvailable" @click="toLeagueClass(item)" v-for="item in teamClassList" >
                                <li>
                                    <img :src="item.coverUrl" alt="">
                                </li>
                                <li>
                                    <span class="text_ellipsis">{{item.courseName}}</span>
                                    <dt>
                                        <span class="head_people">
                                            <img :src="peopleHead" alt="">
                                        </span>
                                        <span>{{item.coachName}}</span>
                                    </dt>
                                    <dt>
                                        <span class="head_people">
                                            <img :src="getTime" alt="">
                                        </span>
                                        <span>{{item.courseTime}}</span>
                                        <span class="coachTime">{{item.priceAndCourse}}课时</span>
                                    </dt>
                                    <dt>
                                        <span class="head_people">
                                            <img :src="fullStarffed" alt="">
                                        </span>
                                        <span>已报名 {{item.reservationAndTotal}}</span>
                                    </dt>
                                </li>
                                <div class="appointment" v-if="item.status == 7">可购买</div>
                                <div class="Full_starffed" v-if="item.status == 6">已满员</div>
                                <div class="Full_starffed" v-if="item.status == 8">已购买</div>
                            </ul>
                            <div class="tipsImgInfo" v-if="teamClassList.length == 0">
                                <div class="noDataImgWarp" >
                                    <img  src="../../assets/images/no_data.png" >
                                </div>
                                <div class="noDataImgWarp">
                                    <span style="color:rgba(178,182,188,1);font-size:17px;" >暂时还没有课程哦～</span>
                                </div>
                                <!-- <div class="noDataImgWarp" v-if="teamClassList.length == 0">
                                    <span style="color:rgba(178,182,188,1);font-size:17px;" >暂时还没有课程哦～</span>
                                </div> -->
                            </div>
                            
                        </div>

                    </van-tab>

                </van-tabs>
            </div>
        </div>
        <!-- 门店私教 -->
        <div class="Private_education_stores ">
            <div class="title_text pr_pl15">门店私教</div>
            <div class="scroll_overflow">
                <div class="coverDiv"></div>
                <div class="swiper_list">
                <!-- <div class="swiper-container"> -->
                    <!-- <div class="swiper-wrapper"> -->
                        <div v-if="coachList.length > 0" class="swiper-slide" v-for="(item,i) in coachList" :key="i">
                            <div  class="swiper_list_dt" @click="toPrivateEducation(item)" :class="[item.coachGender=='女'? classA : classB]">
                                <ul>
                                    <li>
                                        <img :src="item.coachUrl" alt="">
                                    </li>
                                    <li>
                                        <span>{{item.coachName}}</span>
                                    </li>
                                    <li>
                                        <span>¥{{item.coursePrice}}</span>
                                    </li>
                                    <li>
                                        <span>累计上课{{item.reservationNum}}节</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="tipsImgInfo" v-if="coachList.length == 0">
                            <div class="noDataImgWarp" >
                                <img src="../../assets/images/no_data.png" >
                            </div>
                            <div class="noDataImgWarp" >
                                <span style="color:rgba(178,182,188,1);font-size:17px;" >暂时还没有教练哦～</span>
                            </div>
                        </div>
                        
                    <!-- </div> -->
                <!-- </div> -->
            </div>
        </div>
        </div>
        <!-- 门店训练营 -->
        <div class="Training_camp pr_pl15">
            <span class="title_text">
                门店训练营
            </span>
            <div class="Training_camp_list">
                <ul if="trainingList.length > 0" v-for="item in trainingList" @click="toTrainingCamp(item)">
                    <li>
                        <img :src="item.coverUrl" alt="">
                        <span>仅剩{{item.surplusNum}}人开班</span>
                    </li>
                    <li>
                        <span class="single_row">{{item.courseName}}</span>
                        <span>{{item.priceAndCourse}}课时</span>
                    </li>
                    <li>
                        <span>{{item.courseTime}}</span>
                        <dt>
                            <span class="head_people">
                                <img :src="peopleHead" alt="">
                            </span>
                            <span>{{item.coachName}}</span>
                        </dt>
                    </li>
                </ul>
                <div class="tipsImgInfo" v-if="trainingList.length == 0">
                    <div class="noDataImgWarp" >
                        <img src="../../assets/images/no_data.png" >
                    </div>
                    <div class="noDataImgWarp">
                        <span style="color:rgba(178,182,188,1);font-size:17px;">暂时还没有训练营哦～</span>
                    </div>
                    <!-- <div class="noDataImgWarp" v-if="teamClassList.length == 0">
                        <span style="color:rgba(178,182,188,1);font-size:17px;">暂时还没有训练营哦～</span>
                    </div> -->
                </div>
                
            </div>
        </div>
    </div>
</template>
<style src="./index.less" lang="less" scoped></style>
<script>
    import Swiper from 'swiper';
    import {
        Button,
        Popup,
        Swipe,
        SwipeItem,
        Tab,
        Tabs
    } from 'vant';
    import {
        getClubDetail,
        getH5Config
    } from '@/request/manager'; //
    import {
        countPeopleByClub
    } from '@/request/device'; //
    import {
        getTeamClass,
        SearchforAweek,
        getCoach,
        getTrainingCamp
    } from '@/request/coach'; //

    export default {
        data() {
            return {
                classA: 'waman',
                classB: 'man',
                timeList: [],
                teamClassList: [],
                coachList: [],
                trainingList: [],
                jumpAvailable: false,
                lat2: 0,
                lng2: 0,
                currentNum: 0,
                clubId: null,
                userId: null,
                clubInfo: {},
                currentPage: 1,
                pagesize: 5,
                clen: 7,
                active: 0,
                rightIcon: require('../../assets/images/14.png'),
                oneImg: require("../../assets/images/1.jpg"),
                peopleHead: require('../../assets/images/10.png'),
                getTime: require('../../assets/images/9.png'),
                fullStarffed: require('../../assets/images/11.png'),
                swiperImgs: [{
                        oneImg: require('../../assets/images/2.jpg'),
                    }, {
                        oneImg: require('../../assets/images/3.jpg'),
                    }, {
                        oneImg: require('../../assets/images/4.jpg'),
                    }, {
                        oneImg: require('../../assets/images/5.jpg'),
                    }

                ],
                //门店
                StoreShop: {
                    url: "http://192.168.10.15/fitalentUserApp/#/storeDetails/showShareBtn?id=xx@",
                },
                //训练营
                TrainingCamp: {
                    url: "http://192.168.10.15/fitalentUserApp/#/trainingCamp/showShareBtn",
                },
                //团课
                LeagueClass: {
                    url: "http://192.168.10.15/fitalentUserApp/#/leagueDetails",
                },
                //私教
                PrivateEducation: {
                    url: "http://192.168.10.15/fitalentUserApp/#/Privatedetails/showShareBtn",
                }
            }

        },
        components: {
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
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
            });
        },
        mounted() {
            console.log(this.active)
            this.getAweek(); //获取7天日期
            window.oc_to_js = this.oc_to_js;
        },
        created() {
            this.lat2 = this.$route.query.lat;
            this.lng2 = this.$route.query.lng;
            this.clubId = this.$route.query.clubId;
            this.userId = this.$route.query.userId;
            this.getClubDetail(this.clubId);
            this.countPeopleByClub(this.clubId);
            this.getH5Config();
            if(this.active==0){
                this.initTime(Date.parse(new Date()));
            }else{
                this.initTime(sessionStorage.getItem('dayTime'));
            }
            
            this.getCoach() //获取教练list
            this.getTrainingList();
            this.$store.commit('getUserId', this.userId)
        },
        methods: {
            moreVue() {
                // alert(1)
                let params = {
                    url: 'http://192.168.10.15/fitalentUserApp/#/storeDetails?userId=100&courseId=100'
                }
                if (this.isAndroid) {
                    window.andriod.postMessage(JSON.stringify(params))
                } else if (this.isiOS) {
                    window.webkit.messageHandlers.moreList.postMessage(params)
                }
            },
            // oc_to_js(){
            //     this.lat2 = this.$route.query.lat;
            //     this.lng2 = this.$route.query.lng;
            //     this.clubId = this.$route.query.clubId;
            //     this.userId = this.$route.query.userId;
            //     this.getClubDetail(this.clubId);
            //     this.countPeopleByClub(this.clubId);
            //     this.getH5Config();
            //     this.initTime(sessionStorage.getItem('dayTime'));
            //     this.getCoach() //获取教练list
            //     this.getTrainingList();
            // },
            initTime(dayTime) {
                let params = {
                    createTime: Date.parse(new Date()),
                    classRoomId: 1,
                }
                SearchforAweek(params).then(res => {
                    console.log('时间', res);
                    if (res.data.obj != undefined)
                        this.timeList = res.data.obj.timeList || []
                    this.getTeamClass(dayTime)
                    console.log('时间', this.timeList)
                    
                }).catch(err => {
                    console.log(err)
                })
            },
            getTrainingList() {
                let para = {
                    clubId: this.clubId
                }
                getTrainingCamp(para).then(res => {
                    console.log('训练营',res)
                    if (res.data.code == 2000) {
                        this.trainingList = res.data.obj || [];
                    }
                    this.$store.commit('trainingList', JSON.parse(this.teamClassList))
                }).catch(error => {

                })
            },
            getTeamClass(time) {
                let para = {
                    userId: this.userId,
                    clubId: this.clubId,
                    time: time
                }
                getTeamClass(para).then(res => {
                    console.log('团课',res)
                    if (res.data.code == 2000) {
                        this.teamClassList = res.data.obj || [];
                    }
                    this.$store.commit('teamClassList', JSON.parse(this.teamClassList))
                }).catch(error => {

                })
            },
            getCoach() {
                let para = {
                    clubId: this.clubId,
                    // clubId: 10000,
                }
                getCoach(para).then(res => {
                    console.log('教练', res)
                    if (res.data.code == 2000) {
                        this.coachList = res.data.obj || [];
                    }
                }).catch(error => {

                })
            },
            getH5Config() {
                getH5Config().then(res => {
                    console.log('刚', res)
                    if (res.data.code == 2000) {
                        res.data.obj.forEach((item, index, arr) => {
                            switch (item.businessTypeName) {
                                case "StoreShop":
                                    this.StoreShop = {
                                        url: item.url
                                    }
                                    console.log("StoreShop url:" + this.StoreShop.url)
                                    break;
                                case "TrainingCamp":
                                    this.TrainingCamp = {
                                        url: item.url
                                    }
                                    console.log("TrainingCamp url:" + this.TrainingCamp.url)
                                    break;
                                case "LeagueClass":
                                    this.LeagueClass = {
                                        url: item.url
                                    }
                                    console.log("LeagueClass url:" + this.LeagueClass.url)
                                    break;
                                case "PrivateEducation":
                                    this.PrivateEducation = {
                                        url: item.url
                                    }
                                    console.log("PrivateEducation url:" + this.PrivateEducation.url)
                                    break;
                            }
                            this.jumpAvailable = true;
                        })
                    }
                }).catch(error => {

                })
            },
            countPeopleByClub(clubId) {
                countPeopleByClub(clubId).then(res => {
                    console.log(res,'00000000000')
                    if (res.data.code == 2000) {
                        this.currentNum = res.data.obj;
                    }
                }).catch(error => {

                })
            },
            getClubDetail(clubId) {
                getClubDetail(clubId).then(res => {
                    console.log('门店详情',res)
                    if (res.data.code == 2000) {
                        this.oneImg = res.data.obj.headShotUrl;
                        this.clubInfo = res.data.obj
                    }
                    this.$store.commit('clubInfo', JSON.parse(this.clubInfo))
                        console.log('哈哈',this.clubInfo)
                }).catch(error => {

                })
            },

            //日期转星期
            getWeek(dateString) {
                var d;
                var day = new Date(dateString).getDay();
                switch (day) {
                    case 6:
                        d = "周六";
                        break;
                    case 0:
                        d = "周日";
                        break;
                    case 1:
                        d = "周一";
                        break;
                    case 2:
                        d = "周二";
                        break;
                    case 3:
                        d = "周三";
                        break;
                    case 4:
                        d = "周四";
                        break;
                    case 5:
                        d = "周五";
                        break;

                }
                return d
            },
            //团课一周时间
            getAweek() {
                // console.log(JSON.stringify(this.obj))
                var cells = document.getElementById('monitor').getElementsByTagName('li');
                var clen = cells.length;
                var currentFirstDate;
                var formatDate = function(date) {
                    var month = (date.getMonth() + 1) + '.';
                    var day = date.getDate();
                    return month + day + ' ';
                };
                var addDate = function(date, n) {
                    date.setDate(date.getDate() + n);
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


            //门店详情
            toStoreShop(item) {
                let url = {
                        url: this.StoreShop.url + "?clubId=" + this.clubId + "&userId=" + this.userId + "&lat=" + this.lat2 + "&lng=" + this.lng2
                    }
                    // alert(url.url)
                console.log("StoreShop jump url:" + url.url)
                if (this.isAndroid) {
                    window.andriod.postMessage(JSON.stringify(url))
                } else if (this.isiOS) {
                    window.webkit.messageHandlers.StoreShop.postMessage(url)
                }
            },
            //团课 userId,courseId
            toLeagueClass(item) {
                let url = {
                    // url: this.LeagueClass.url + "?courseId=" + item.courseId + "&userId=" + this.userId
                    url: this.TrainingCamp.url + "?courseId=" + item.courseId + "&userId=" + this.userId + '&leagueStatus=4'+'&isShare=1'
                }
                console.log("LeagueClass jump url:" + url.url)
                if (this.isAndroid) {
                    window.andriod.postMessage(JSON.stringify(url))
                } else if (this.isiOS) {
                    window.webkit.messageHandlers.LeagueClass.postMessage(url)
                }
            },
            //训练营详情 userId,courseId
            toTrainingCamp(item) {
                let url = {
                    url: this.TrainingCamp.url + "?courseId=" + item.courseId + "&userId=" + this.userId
                }
                console.log("TrainingCamp jump url:" + url.url)
                if (this.isAndroid) {
                    window.andriod.postMessage(JSON.stringify(url))
                } else if (this.isiOS) {
                    window.webkit.messageHandlers.toTrainingCamp.postMessage(url)
                }
            },
            //私教  userId,coachId
            toPrivateEducation(item) {
                let url = {
                    url: this.PrivateEducation.url + "?coachId=" + item.coachId + "&userId=" + this.userId
                }
                console.log("私教详情+PrivateEducation jump url:" + url.url)
                if (this.isAndroid) {
                    window.andriod.postMessage(JSON.stringify(url))
                } else if (this.isiOS) {
                    window.webkit.messageHandlers.PrivateEducation.postMessage(url)
                }
            },
            share(obj) {
                console.log(obj)
            },
            //团课tabs切换
            onClick(index, title) {
                console.log(this.timeList[index]);
                this.getTeamClass(this.timeList[index]);
                sessionStorage.setItem('dayTime',this.timeList[index])
            },
            //拨号
            tell() {
                alert("0755-88889889")
            },

        },
    }
</script>
