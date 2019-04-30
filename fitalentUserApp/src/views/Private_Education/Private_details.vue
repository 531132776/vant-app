<template>
    <div class="Private_education">
        <div class="coach_info p15">
            <div class="name_info">
                <ul>
                    <li>
                        <img :src="oneImg" alt="">
                    </li>
                    <li>
                        <span>Wander</span>
                        <span>25 女</span>
                        <span>累计上课200节，累计学员80个</span>
                    </li>
                </ul>
            </div>
            <div class="curriculum_Label">
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </ul>
                <span class="before"></span>
            </div>
        </div>
        <!-- 关于ta -->
        <div class="aboutTa p15">
            <div class="aboutTa_info">
                <span class="title_text">关于TA</span>
                <dt>
                    带你了解更多健康饮食和健身方式，这是我的职业。健身是 你心血来潮还是坚持不懈，这是你的选择！
                </dt>
                <span class="before"></span>
            </div>
        </div>
        <!-- 专业证书 -->
        <div class="Professional_certificate p15">
            <div class="Professional_info pb20">
                <ul @click="certificate">
                    <li>专业证书</li>
                    <li>
                        <dt>
                            <span>6张</span>
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
        <div class="Professional_certificate p15">
            <div class="Professional_info pb20">
                <ul>
                    <li>教练相册</li>
                    <li>
                        <dt>
                            <span>6张</span>
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
                    <li>松岗满京华店1</li>
                    <li>松岗满京华店2</li>
                    <li>松岗满京华店3</li>
                </ul>
                <span class="before"></span>
            </div>
        </div>
        <!-- 所授课程 -->
        <div class="Teaching p15">
            <span class="title_text">所授课程</span>
            <div class="Teaching_info">
                <ul>
                    <li>
                        <div class="details_img">
                            <img :src="oneImg" alt="">
                        </div>
                        <div class="deatils_info"><span>私教体验课</span></div>
                        <div class="deatils_stuts">
                            <span>
                            免费体测一次，仅限新人
                        </span>
                        </div>
                        <div class="deatils_price">
                            <span>
                                <em>￥</em>
                                <em>240</em>
                                <em>/节</em>
                            </span>
                            <span @click="Course_Details">购买</span>
                        </div>
                    </li>
                    <li @click="Course_Details">
                        <div class="details_img">
                            <img :src="oneImg" alt="">
                        </div>
                        <div class="deatils_info"><span>包月私教</span></div>
                        <div class="deatils_stuts">
                            <span>
                            免费体测一次，仅限新人
                        </span>
                        </div>
                        <div class="deatils_price">
                            <span>
                                <em>￥</em>
                                <em>2000</em>
                                <em>/30天</em>
                            </span>
                            <span @click="Course_Details">购买</span>
                        </div>
                    </li>
                    <li>
                        <div class="details_img">
                            <img :src="oneImg" alt="">
                        </div>
                        <div class="deatils_info"><span>私教体验课</span></div>
                        <div class="deatils_stuts">
                            <span>
                            免费体测一次，仅限新人
                        </span>
                        </div>
                        <div class="deatils_price">
                            <span>
                                <em>￥</em>
                                <em>240</em>
                                <em>/节</em>
                            </span>
                            <span>购买</span>
                        </div>
                    </li>
                    <li>
                        <div class="details_img">
                            <img :src="oneImg" alt="">
                        </div>
                        <div class="deatils_info"><span>私教体验课</span></div>
                        <div class="deatils_stuts">
                            <span>
                            免费体测一次，仅限新人
                        </span>
                        </div>
                        <div class="deatils_price">
                            <span>
                                <em>￥</em>
                                <em>240</em>
                                <em>/节</em>
                            </span>
                            <span>购买</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            oneImg:require("../../assets/images/1.jpg"),
            rightIcon:require("../../assets/images/14.png"),
        }
    },
    methods:{
        //私教详情
        Course_Details(){
            this.$router.push({
                path:'/CourseDetails'
            })
        },
        //证书
        certificate(){
            this.$router.push({
                path:'/certificate'
            })
        }
    }
}
</script>
<style scoped lang="less">
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
                        align-content: center;
                        flex-flow: column wrap;
                        height: 64px;
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
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-flow: row wrap;
                    li{
                        width: 50px;
                        height: 24px;
                        color: #CBCBCB;
                        font-size: 12px;
                        font-weight: 400;
                        border-radius:12px;
                        border:1px solid rgba(203,203,203,1);
                        line-height: 24px;
                        text-align: center;
                    }
                }
            }
        }
        .aboutTa{
            .aboutTa_info{
                position: relative;
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
                    font-weight: 600;
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
                display:flex;
                flex-flow: row wrap;
                li{
                    padding: 5px 8px;
                    font-size: 12px;
                    color:#CBCBCB;
                    border-radius:12px;
                    border:1px solid rgba(203,203,203,1);
                    margin-right:6px;
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
                    .details_img{
                        width: 165px;
                        height: 145px;
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
                        padding-bottom: 4px;
                    }
                    .deatils_stuts{
                        font-size: 12px;
                        color: #9399A5;
                        font-weight: 400;
                        padding-bottom: 4px;
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
                                padding: 0 8px 0 3px;
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
