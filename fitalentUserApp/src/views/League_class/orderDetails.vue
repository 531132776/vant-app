<template>
    <div class="order_details">
        <div class="order_img pr_pl15">
            <div >
                <img :src="immageDto.coverUrl.url" alt="">
            </div>
            <div class="order_text">
                <span>{{trainingCampList.courseName}}</span>
                <span>
                    <img style="width: 12px;height: 12px;" src="../../assets/images/10.png" alt="">
                    <span>{{coachList.userName}}</span>
                </span>
            </div>
        </div>
        <div class="order_cell">
            <van-cell-group>
                <van-cell>
                    <div class="flex_between">
                        <span>开始时间</span>
                        <span>{{trainingCampList.classDay}}</span>
                    </div>
                </van-cell>
                <van-cell>
                    <p>上课时间</p>
                    <p>{{trainingCampList.classStartTime}}</p>
                </van-cell>
                <van-cell>
                    <div class="flex_between">
                        <span>地点</span>
                        <span>{{trainingCampList.clubName}}</span>
                    </div>
                </van-cell>
                <van-cell>
                    <div class="flex_between">
                        <span>课时数</span>
                        <span>{{trainingCampList.classHour}}节</span>
                    </div>
                </van-cell>
                <van-cell>
                    <div class="flex_between">
                        <span>价格</span>
                        <span style="color: #1DCE74;">¥ {{trainingCampList.price}}</span>
                    </div>
                </van-cell>
                <van-cell>
                    <span>购前须知</span>
                    <p style="display:flex;justify-content: space-between;">
                        <router-link to="/trainingCampAgreement" style="color:#3A5891">同意《健康传奇训练营服务协议》</router-link>
                        <van-checkbox v-model="checked">
                            <img
                                style="width:22px;"
                                slot="icon"
                                slot-scope="props"
                                :src="props.checked ? icon.active : icon.normal"
                            >
                        </van-checkbox>
                    </p>
                </van-cell>
            </van-cell-group>
        </div>
          <!-- 预约 -->
        <div class="appointment pr_pl15">
            <div class="appointment_icon" @click="callService()"> 
                <span>共计：¥{{trainingCampList.price}}</span>
            </div>
            <van-button class="appointment_btn"  @click="trainingMayment()" type="primary">确认订单</van-button>
        </div>
    </div>
</template>
<script>
import { Cell, CellGroup,Checkbox,Button,Toast  } from 'vant';
import { GetTrainingCamp,AddTrainingOrder } from '@/request/api-liu'
export default {
       data(){
        return{
            checked: false,
            courseId:'',
            icon: {
            normal:require("../../assets/images/勾 2@2x.png"),
            active: require('../../assets/images/勾 2@2x(1).png'),
            },
            trainingCampList:{},
            coachList:{},
            immageDto:[],
            obj:{},
            userId:'',

        }
    },
     components:{
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Button.name]:Button,
        [Checkbox.name]:Checkbox,
        [Toast .name]:Toast,
    },
    created(){
        this.courseId = this.$route.query.courseId
        this.userId = this.$route.query.userId
        this.init()
        
    },
    methods:{
        //确认订单
        init(){
             GetTrainingCamp({
              trainingCampBusinessId:this.courseId
            }).then(res=>{
                this.trainingCampList = res.data.obj
                this.coachList = res.data.obj.coach
                this.immageDto = res.data.obj.immageDto
                // this.goodCourse = res.data.obj.coach.goodCourse.split("、")
                // this.onlyPeopele = (res.data.obj.startClassNum - res.data.obj.peopleNum)
                // this.swiperImgs = this.immageDto.spreadUrl
                console.log(this.onlyPeopele)
            })
        },
        appointment(){
            if(!this.checked){
                Toast('请勾选健康传奇训练营服务协议');
            }
        },
         trainingMayment(){
           if(!this.checked){
                Toast('请勾选健康传奇训练营服务协议');
                return
            }
            const params = 
                {   
                    amount: 1,
                    courseId: this.trainingCampList.trainingCampBusinessId,
                    courseType: 0,
                    userId: this.userId
                }
            AddTrainingOrder(params).then(res=>{
                this.obj = res.data.obj
                this.obj.type = 'pay'
                if(this.isAndroid){
                    window.andriod.postMessage(JSON.stringify(this.obj))
                }else if (this.isiOS){
                    window.webkit.messageHandlers.Training_payment.postMessage(this.obj)
                }
            })
         
            // this.$router.back(-1)
        },
    },
}
</script>
<style lang="less" scoped>
    .order_details{
        background: #fff;
        .flex_between{
            display: flex;
            justify-content: space-between;
        }
        .order_img{
            display: flex;
            justify-content: flex-start;
            padding-top: 15px;
            img{
                width:100px;
                height: 100px;
            }
        }
        .order_cell{
            margin-top: 30px;
        }
        .order_text{
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            span:first-child{
                    font-size: 20px;
                    color:#101D37;
                    font-weight: 600;
                    display: inline-block;
                    margin-bottom: 20px;
             }
             span:last-child{
                    font-size:12px;
                    font-weight:400;
                    color:rgba(147,153,165,1);
                    line-height:17px;
             }
        }
        .appointment{
            display: flex;
            justify-content: space-around;
            padding: 15px;
            position: fixed;
            bottom: 0px;
            left:0px;
            background: #fff;
            width: 100%;
            .appointment_icon{
                display: flex;
                align-items: center;
                font-weight:400;
                color:rgba(16,29,55,1);
                line-height:24px;
                font-size: 17px;
            }
            .appointment_btn{
                width:173px;
                height:45px;
                background:rgba(29,206,116,1);
                border-radius:23px;
                font-size: 17px;
                margin-right: 15px;
                text-align: center;
                line-height: 45px;
                color:#fff
            }
        }
    }
</style>
