<template>
    <div class="storeDetails pt15">
        <!-- 轮播 -->
        <div class="pr_pl15">
            <van-swipe :autoplay="3000" indicator-color="white" class="header_swiper ">
                <van-swipe-item v-for="(item,index) in swiperImgs" :key="index">
                    <img :src="item" alt="" @click="swiperImgClick">
                </van-swipe-item>
            </van-swipe>
        </div>
        
        <!-- 地址 -->
        <div class="addres pr_pl15">
            <ul>
                <li>
                    <span>{{clubInfo.name}}</span>
                    <span>营业：周一至周日 10:00～22:00</span>
                </li>
                <li @click="tell">
                    <span class="Dividing_line"></span>
                    <span class="phoneIcon">
                        <img :src="phoneIcon" alt="">
                    </span>
                </li>
                <span class="before"></span>
            </ul>
        </div>
        <!-- 详细地址 -->
        <div class="details_addres pr_pl15">
            <ul @click="nativePostMap(clubInfo.address)">
                <li>
                    <img :src="addressIcon" alt="">
                </li>
                <li>
                    <span>{{clubInfo.address}}</span>
                    <span v-if="distance > 0">距您{{distance}}km</span>
                    <span v-else >未开启定位服务</span>
                </li>
                <li>
                    <img :src="rightIcon" alt="">
                </li>
            </ul>
        </div>
        <!-- 场馆简历 -->
        <div class="resume pr_pl15">
            <ul>
                <dt class="title_text">场馆简历</dt>
                <dt>{{clubInfo.profile}}</dt>
                <dt>
                    主要设施：{{clubInfo.characteristic}}
                </dt>
                <span class="before"></span>
            </ul>

        </div>
        <!-- 团体课 -->
        <div class="Group_course pr_pl15">
            <span class="title_text">团体课</span>
            <div class="cours_list">
                <div class="time_list" id="monitor">
                    <ul>
                        <li :class="active==index ? 'class-a' : 'class-b'" v-for="(item,index) in 7" :key="index">
                            {{item}}
                        </li>
                    </ul>
                </div>
                    <van-tabs v-model="active" class="tabs_group" :swipe-threshold="8" :swipeable="false"  @click="onClick">
                        <!--<span id="time">2.19</span>-->
                        <van-tab v-for="(item,i) in timeList" :key="i" :title="i==0?'今天':getWeek(item)" class="var_tab">
                            <div class="Course_list">
                                <ul v-if="teamClassList.length > 0" @click="toLeagueClass(item)" v-for="(item,i) in  teamClassList" :key="i">
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
                                            <!-- <span>已约{{item.reservationNum}}/{{item.reservationAndTotal}}</span> -->
                                            <span>已报名{{item.reservationAndTotal}}</span>
                                        </dt>
                                    </li>
                                    <div class="appointment" v-if="item.status == 7">可购买</div>
                                    <div class="Full_starffed" v-if="item.status == 6">已满员</div>
                                    <div class="Full_starffed" v-if="item.status == 8">已购买</div>
                                </ul>
                                <!-- <img v-if="teamClassList.length == 0" src="../../assets/images/no_data.png" > -->
                                <div class="tipsImgInfo" v-if="teamClassList.length == 0">
                                    <div class="noDataImgWarp">
                                    <img src="../../assets/images/no_data.png" >
                                        <div style="color:rgba(178,182,188,1);font-size:17px;">暂时还没有课程哦～</div>
                                    </div>
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
                        <!-- <img v-if="coachList.length == 0" src="../../assets/images/no_data.png" style="width:100%;display:block;"> -->
                        <div class="tipsImgInfo" v-if="coachList.length == 0">
                            <div class="noDataImgWarp">
                                <img src="../../assets/images/no_data.png" >
                                <div style="color:rgba(178,182,188,1);font-size:17px;">暂时还没有教练哦～</div>
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
                <ul v-if="trainingList.length > 0" v-for="(item,i) in trainingList" @click="toTrainingCamp(item)" :key="i">
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
                <!-- <img v-if="trainingList.length == 0" src="../../assets/images/no_data.png" > -->
                <div class="tipsImgInfo" v-if="trainingList.length == 0">
                    <div class="noDataImgWarp">
                    <img src="../../assets/images/no_data.png" >
                        <div style="color:rgba(178,182,188,1);font-size:17px;">暂时还没有训练营哦～</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import {
        Button,
        Popup,
        Swipe,
        SwipeItem,
        Tab,
        Tabs,
        ImagePreview
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
                currentNum: 0,
                distance: 0,
                clubInfo: {},
                clubId: null,
                userId: null,
                lat2: 0,
                lng2: 0,
                currentPage: 1,
                pagesize: 5,
                swiper: 4,
                active: 0,
                // oneImg: require("../../assets/images/1.jpg"),
                // twoImg: require('../../assets/images/2.jpg'),
                peopleHead: require('../../assets/images/10.png'),
                getTime: require('../../assets/images/9.png'),
                fullStarffed: require('../../assets/images/11.png'),
                phoneIcon: require('../../assets/images/电话@2x.png'),
                addressIcon: require('../../assets/images/12.png'),
                rightIcon: require('../../assets/images/14.png'),
                swiperImgs: [
                    'https://img.leoao.com/o_1bpj1t27i1mls139mgvv9251lkprf.png?imageslim',
                    'https://img.leoao.com/o_1bpj1t8q11jjb11mbn8bi3psb5rp.png?imageslim&imageView2/1/w/750/h/400',
                    'https://img.leoao.com/o_1bpj1t8q1sr0kdi8mbajj63cro.png?imageslim',
                    'https://img.leoao.com/o_1bpj1t8q125719b6grq10fgjdjrq.png?imageslim&imageView2/1/w/750/h/400',

                ],
                tell2: this.CustomerPhone,
                //门店
                StoreShop: {
                    url: "http://192.168.10.15/fitalentUserApp/#/storeDetails?id=xx@",
                },
                //训练营
                TrainingCamp: {
                    url: "http://192.168.10.15/fitalentUserApp/#/trainingCamp",
                },
                //团课
                LeagueClass: {
                    url: "http://192.168.10.15/fitalentUserApp/#/leagueDetails",
                },
                //私教
                PrivateEducation: {
                    url: "http://192.168.10.15/fitalentUserApp/#/Privatedetails",
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
            [ImagePreview.name]: ImagePreview,
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
        mounted() {
            window.scrollTo(0,0)
            // this._initSwiper();
            this.getAweek();
            // this.$router.afterEach((to, from, next) => {
            //     window.scrollTo(0, 0)
            // })
        },
        created() {
            this.clubId = this.$route.query.clubId;
            this.lat2 = this.$route.query.lat;
            this.lng2 = this.$route.query.lng;
            this.userId = this.$route.query.userId;
            this.getClubDetail(this.clubId);
            this.initTime();
            this.getCoacha() //获取教练list
            this.getTrainingList();
            this.$store.commit('getUserId', this.userId)
            console.log(this.lat2, this.lng2)
            console.log(this.clubInfo)
        },

        methods: {
            nativePostMap(address) {
                console.log(address,'地址')
                let map = {
                    type: "map",
                    currentLng: this.lng2,
                    currentLat: this.lat2,
                    clubLng: this.clubInfo.longitude,
                    clubLat: this.clubInfo.latitude,
                    destination: address
                }
                if (this.isAndroid) {
                    window.andriod.postMessage(JSON.stringify(map))
                } else if (this.isiOS) {
                    window.webkit.messageHandlers.nativePostMap.postMessage(map)
                }
            },
            initTime() {
                let params = {
                    createTime: Date.parse(new Date()),
                    classRoomId: 1,
                }
                SearchforAweek(params).then(res => {
                    console.log('时间', res);
                    if (res.data.obj != undefined)
                        this.timeList = res.data.obj.timeList || []
                    this.getTeamClass(this.timeList[0])
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
                    console.log('团课详情',res)
                    if (res.data.code == 2000) {
                        this.teamClassList = res.data.obj || [];
                    }
                }).catch(error => {

                })
            },
            getH5Config() {
                getH5Config().then(res => {
                    console.log('H5-url:' + res)
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
            getClubDetail(id) {
                getClubDetail(id).then(res => {
                    console.log('哈哈', res)
                    if (res.data.code == 2000) {
                        this.clubInfo = res.data.obj;
                        // this.tell2 = this.clubInfo.telephone;
                        this.getDistance(this.clubInfo.latitude, this.clubInfo.longitude, this.lat2, this.lng2);
                        if (this.clubInfo.album != null && this.clubInfo.album.length > 0) {
                            this.swiperImgs = this.clubInfo.album.map(item => {
                                return item.url;
                            })
                        }
                    }
                }).catch(error => {

                })
            },
            //团课 userId,courseId
            toLeagueClass(item) {
                console.log(item)
                this.$router.push({
                        path: '/trainingCamp/showShareBtn',
                        query: {
                            courseId: item.courseId,
                            userId: this.userId,
                            leagueStatus:4
                        }
                    })
                    // let url  = {
                    //     url: this.LeagueClass.url + "?courseId=" + item.courseId + "&userId=" + this.userId
                    // }
                    // console.log("LeagueClass jump url:" + url.url)
                    // if(this.isAndroid){
                    //     window.andriod.postMessage(JSON.stringify(url))
                    // }else if (this.isiOS){
                    //     window.webkit.messageHandlers.LeagueClass.postMessage(url)
                    // }
            },
            //训练营详情 userId,courseId
            toTrainingCamp(item) {
                console.log(item)
                this.$router.push({
                        path: '/trainingCamp/showShareBtn',
                        query: {
                            courseId: item.courseId,
                            userId: this.userId,
                            share:this.$route.query.share
                        }
                    })
                    // let url  = {
                    //     url: this.TrainingCamp.url + "?courseId=" + item.courseId + "&userId=" + this.userId
                    // }
                    // console.log("TrainingCamp jump url:" + url.url)
                    // if(this.isAndroid){
                    //     window.andriod.postMessage(JSON.stringify(url))
                    // }else if (this.isiOS){
                    //     window.webkit.messageHandlers.toTrainingCamp.postMessage(url)
                    // }
            },
            //私教  userId,coachId
            toPrivateEducation(item) {
                console.log(item)
                this.$router.push({
                        path: '/Privatedetails/showShareBtn',
                        query: {
                            coachId: item.coachId,
                            userId: this.userId,
                            share:this.$route.query.share
                        }
                    })
                    // let url ={
                    //     url: this.PrivateEducation.url + "?coachId=" + item.coachId + "&userId=" + this.userId
                    // }
                    // console.log("PrivateEducation jump url:" + url.url)
                    // if(this.isAndroid){
                    //     window.andriod.postMessage(JSON.stringify(url))
                    // }else if (this.isiOS){
                    //     window.webkit.messageHandlers.PrivateEducation.postMessage(url)
                    // }
            },
            share(obj) {
                console.log(obj)
            },
            //团课tabs切换
            onClick(index, title) {
                console.log(this.timeList[index]);
                this.getTeamClass(this.timeList[index]);
            },
            Rad(d) {
                return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
            },
            getDistance(lat1, lng1, lat2, lng2) {
                if (lat2 == 0 && lng2 == 0) {
                    return
                }
                var radLat1 = this.Rad(lat1);
                var radLat2 = this.Rad(lat2);
                var a = radLat1 - radLat2;
                var b = this.Rad(lng1) - this.Rad(lng2);
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
                s = s * 6378.137; // EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000; //输出为公里
                this.distance = s.toFixed(1);
                //s=s.toFixed(4);
            },

            getCoacha() {
                let params = {
                    clubId: this.clubId,
                    // clubId: 10000,
                }
                getCoach(params).then(res => {
                    console.log('教练', res)
                    if (res.data.code == 2000) {
                        this.coachList = res.data.obj || [];
                    }
                }).catch(error => {

                })
            },
            //图片预览
            swiperImgClick() {
                ImagePreview(this.swiperImgs)
            },
            //私教详情
            Private_Education(val) {
                this.$router.push({
                    query: {
                        id: val.coachId
                    },
                    path: '/Privatedetails'
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
            //拨号
            tell() {
                // console.log(this.CustomerPhone)
                window.location.href = 'tel://' + this.tell2
            },
            //团课tabs切换
            // onClick(index, title) {
            //     console.log(index, title);
            //     // index
            //     this.active = index
            // },
            appointment() {
                alert("预约")
            },

        },
        beforeUpdate() {
            // this.$nextTick(() => {
            //     let mySwiper2 = new Swiper('.swiper-container', {
            //         slidesPerView: 'auto',
            //         loop: false,
            //         // loopedSlides :5,
            //         // paginationClickable: true,
            //         observer: true, //修改swiper自己或子元素时，自动初始化swiper
            //         // observeParents: true,//修改swiper的父元素时，自动初始化swiper
            //     })
            // })
        },
        updated() {

        },
    }
</script>
<style scoped lang="less">
.title_text{
    font-weight: 600;
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
    .class-a {
        color: #1DCE74;
    }
    
    .class-b {
        color: #7d7e80;
    }
    
    .tipsImgInfo {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        .noDataImgWarp {
            text-align: center;
            // width:100%;
            // margin: 0 auto;
            img {
                width: 128px;
                height: 106px;
            }
        }
    }
    
    .storeDetails {
        font-size: 18px;
        /* padding: 15px; */
        overflow: hidden;
        .header_swiper {
            border-radius: 8px;
            height: 160px;
            // .van-swipe-item:nth-child(odd) {
            //     background-color: aqua
            // }
            // .van-swipe-item:nth-child(even) {
            //     background-color: aquamarine
            // }
            img {
                display: block;
                width: 100%;
                // height: 100%;
                /* border-radius: 8px; */
            }
        }
        .addres {
            ul {
                position: relative;
                padding: 20px 0px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                li:first-child {
                    display: flex;
                    justify-content: flex-start;
                    flex-flow: column nowrap;
                    align-items: flex-start;
                    letter-spacing: 1px;
                    span:first-child {
                        font-size: 20px;
                        color: #101D37;
                        font-weight: 600;
                        padding-bottom: 5px;
                    }
                    span:last-child {
                        font-size: 12px;
                        font-size: #101D37
                    }
                }
                li:nth-child(2) {
                    padding: 8px;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .Dividing_line {
                        position: absolute;
                        height: 100%;
                        width: 1px;
                        background-color: #ccc;
                        top: 0;
                        left: 0;
                        bottom: 0;
                    }
                    .phoneIcon {
                        padding-left: 7px;
                        padding-right: 15px;
                        width: 15px;
                        height: 19px;
                        img {
                            display: block;
                            width: 100%;
                        }
                    }
                }
            }
        }
        .details_addres {
            ul {
                padding: 15px 0;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                li:nth-child(1) {
                    align-self: flex-start;
                    flex: 1;
                    span {
                        display: inline-block;
                        width: 12px;
                        height: 16px;
                        img {
                            width: 100%;
                            display: block;
                        }
                    }
                }
                li:nth-child(2) {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: flex-start;
                    align-content: space-between;
                    font-size: 13px;
                    // transform: translateX(-25px);
                    // -webkit-transform: translateX(-25px);
                    flex: 0 1 80%;
                    span:nth-child(1) {
                        font-weight: 400;
                    }
                    span:nth-child(2) {
                        font-size: 10px;
                        text-align: left;
                        color: #9399A5
                    }
                }
                li:nth-child(3) {
                    align-self: flex-start;
                    flex: 1;
                    text-align: right;
                    span {
                        display: inline-block;
                        width: 13px;
                        height: 13px;
                        img {
                            width: 100%;
                            display: block;
                        }
                    }
                }
            }
        }
        .resume {
            ul {
                position: relative;
                padding-bottom: 15px;
                line-height: 20px;
                .title_text {
                    font-size: 15px;
                    color: #101D37;
                    font-weight: 500;
                    text-align: left;
                    padding-bottom: 8px;
                }
                dt {
                    font-size: 13px;
                    color: #515A6B
                }
            }
        }
        .Group_course {
            padding-top: 25px;
            .cours_list {
                position: relative;
                padding-top: 10px;
                .van-tabs--line .van-tabs__wrap {
                    height: auto;
                }
                .time_list {
                    /* padding: 15px 0; */
                    ul {
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-around;
                        align-items: center;
                        li {
                            font-size: 10px;
                            // padding: 0 5px;
                            width: calc(100% / 7);
                            text-align: center;
                        }
                    }
                }
            }
        }
        .Private_education_stores {
            /* width: 100%; */
            // overflow: hidden;
            
            .scroll_overflow {
                overflow: hidden;
                width: 100%;
                position: relative;
                .coverDiv{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    height: 15px;
                    background-color: #fff;
                    z-index: 111;
                }
                .swiper_list::-webkit-scrollbar {
                display: none;
                width: 0px;
                height: 0px;
            }
            .swiper_list {
                &::-webkit-scrollbar {
                    display: none;
                    background-color: transparent;
                }
                padding: 20px 0;
                width: 100%;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
                display: flex;
                flex-flow: row nowrap;
                
                .swiper-slide {
                    width: 120px;
                    margin-right: 10px;
                    border-radius: 5px;
                    border-radius: 5px;
                    .man {
                        background-color: rgb(29, 206, 116);
                    }
                    .waman {
                        background-color: rgb(242, 192, 87);
                    }
                    .swiper_list_dt {
                        border-radius: 5px;
                        ul {
                            display: flex;
                            flex-flow: column nowrap;
                            justify-content: center;
                            align-content: center;
                            padding: 10px 0;
                            /* background-color: #1DCE74; */
                            border-radius: 5px;
                            color: #fff;
                            text-align: center;
                            li:nth-child(1) {
                                width: 54px;
                                height: 54px;
                                border: 2px solid #fff;
                                border-radius: 100%;
                                margin: 0 auto;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                overflow: hidden;
                                background: #fff;
                                img {
                                    // width: 100%;
                                    // max-width: 100%;
                                    display: block;
                                    max-height: 100%;
                                    // border-radius: 100%;
                                }
                            }
                            li:nth-child(2) {
                                padding: 8px 5px;
                                text-align: center;
                                span {
                                    font-size: 15px;
                                    font-family:PingFangSC-Semibold;
                                    font-weight: 600;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: block;
                                }
                            }
                            li:nth-child(3),
                            li:nth-child(4) {
                                font-size: 12px;
                                font-weight: 400;
                                padding-bottom: 3px;
                                text-align: center;
                                span {
                                    text-align: center
                                }
                            }
                            li:nth-child(4) {
                                padding-bottom: 0px;
                                font-size: 10px;
                            }
                        }
                    }
                }
                .swiper-slide:nth-child(1){
                    margin-left: 15px;
                }
                }
            }
        }
        .Course_list {
            padding: 20px 0;
            ul {
                padding: 15px 12px 15px;
                display: flex;
                justify-content: flex-start;
                flex-flow: row nowrap;
                position: relative;
                box-shadow: 0px 1px 10px 0px rgba(78, 144, 158, 0.12);
                margin-bottom: 20px;
                li:nth-child(1) {
                    width: 100px;
                    height: 100px;
                    padding-right: 15px;
                    border-radius: 5px;
                    overflow: hidden;
                    img {
                        display: block;
                        width: 100%;
                        // max-height: 100%;
                        height: 100px;
                        border-radius: 5px;
                    }
                }
                li:nth-child(2) {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: space-around;
                    align-content: space-between;
                    flex: 1;
                    width: 50%;
                    font-size: 13px;
                    // color: #515A6B;
                    color: #9399A5;
                    span:nth-child(1) {
                        font-size: 17px;
                        color: #101D37;
                        font-weight: 500;
                        display: inline-block;
                    }
                    dt {
                        padding-top: 5px;
                        .head_people {
                            width: 12px;
                            height: 12px;
                            display: inline-block;
                            padding-right: 5px;
                            img {
                                display: block;
                                width: 100%;
                            }
                        }
                        .coachTime{
                                color: #1DCE74;
                                font-size:13px;
                                float: right;
                            }
                    }
                }
                .appointment {
                    height: 22px;
                    background: url('../../assets/images/7.png');
                    background-size: contain;
                    width: 63px;
                    position: absolute;
                    font-size: 13px;
                    text-align: center;
                    bottom: 15px;
                    right: 10px;
                    line-height: 22px;
                    color: #fff;
                }
                .Full_starffed {
                    background: url('../../assets/images/8.png');
                    height: 22px;
                    background-size: contain;
                    width: 63px;
                    position: absolute;
                    font-size: 13px;
                    text-align: center;
                    bottom: 15px;
                    right: 10px;
                    line-height: 22px;
                    color: #fff;
                }
            }
            ul:last-child {
                .before {
                    height: 0;
                }
            }
        }
        .Training_camp {
            padding-top: 25px;
            .Training_camp_list {
                padding: 20px 0;
                ul {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: flex-start;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    box-shadow: 0 3px 5px #ccc;
                    padding-bottom: 5px;
                    li:nth-child(1) {
                        height: 130px;
                        position: relative;
                        overflow: hidden;
                        img {
                            width: 100%;
                            border-radius: 5px 5px 0 0;
                            display: block;
                            // height: 100%;
                        }
                        span {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            left: 0;
                            background-color: rgba(0, 0, 0, .5);
                            font-size: 10px;
                            color: #fff;
                            padding: 3px;
                            z-index: 22;
                            padding-left: 10px;
                        }
                    }
                    li:nth-child(2) {
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: flex-start;
                        padding: 8px 10px 8px;
                        span:nth-child(1) {
                            font-size: 17px;
                            color: #101D37;
                            font-weight: 500;
                            padding-bottom: 5px;
                        }
                        span:nth-child(2) {
                            font-size: 13px;
                            color: #1DCE74
                        }
                    }
                    li:nth-child(3) {
                        padding: 8px 10px 10px;
                        font-size: 13px;
                        color: #9399A5;
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: flex-start;
                        align-items: flex-start;
                        position: relative;
                        /* span:nth-child(1){
                            padding-bottom: 5px;
                        } */
                        dt {
                            padding-top: 5px;
                            .head_people {
                                width: 12px;
                                height: 12px;
                                display: inline-block;
                                padding-right: 5px;
                                img {
                                    display: block;
                                    width: 100%;
                                }
                            }
                            
                        }
                    }
                }
            }
        }
    }
</style>