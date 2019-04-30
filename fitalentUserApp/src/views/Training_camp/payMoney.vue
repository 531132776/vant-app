<template>
    <div class="order_details">
        <div class="tip">
            <span>请在20分钟内完成支付</span>
        </div>
        <div class="order_img pr_pl15">
            <div >
                <img src="../../assets/images/1.jpg" alt="">
            </div>
            <div class="order_text">
                <span>GRIT高间歇LOVEFITT- 03.01班</span>
                <span>
                    <img src="" alt="">
                    <span>Wander</span>
                </span>
            </div>
        </div>
        <div class="order_cell">
            <van-cell-group>
                <van-cell title="开始时间" value="2019.03.01" />
                <van-cell title="上课时间" value="周一 / 周三 /周四/ 周五 19:00～20:00" />
                <van-cell title="地点" value="松岗满京华店" />
                <van-cell title="课时数" value="剩余10节" />
                <van-cell title="价格" value="¥ 1300" />
                <van-cell>
                    <span>购前须知</span>
                    <p style="display:flex;justify-content: space-between;">
                        <span>同意《健康传奇训练营服务协议》</span>
                        <van-radio name="1"></van-radio>
                    </p>
                </van-cell>
            </van-cell-group>
        </div>
          <!-- 预约 -->
        <div class="appointment pr_pl15">
            <van-button class="appointment_btn"  @click="appointment()" type="primary">确认支付 ¥ 1300</van-button>
        </div>
    </div>
</template>
<script>
import { Cell, CellGroup,Radio } from 'vant';
export default {
       data(){
        return{
      
        }
    },
     components:{
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Radio.name]:Radio,
    }
}
</script>
<style lang="less" scoped>
    .order_details{
        background: #fff;
        .tip{
            text-align: center;
            padding:20px;
            font-weight:400;
            color:rgba(16,29,55,1);
            line-height:21px;
            font-size: 15px;
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
                width:273px;
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
