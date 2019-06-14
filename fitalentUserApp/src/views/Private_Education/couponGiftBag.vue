<template>
    <div class="couponGiftBag">
        <div class="couponGiftBag_top">
            <img :src="imgTop" alt="">
            <div class="couponGiftBag_btn">
                <van-button type="default" @click="onChange">查看我的优惠券</van-button>
            </div>
        </div>
        <div class="couponGiftBag_bottom">
            <img :src="imgBtn" alt="">
        </div>
    </div>
</template>
<script>
import { Button } from 'vant';
export default {
    data(){
        return{
            imgTop:require('../../assets/images/1@2x.png'),
            imgBtn:require('../../assets/images/2@2x.png'),
        }
    },
    components:{
        [Button.name]:Button,
        
    },
    methods:{
        onChange(){
            // alert(1)
            if(this.isAndroid){
                window.andriod.postMessage(JSON.stringify({
                    type:'couponList'
                }))
            }else if (this.isiOS){
                window.webkit.messageHandlers.orderCenter.postMessage({
                    type:'couponList'
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .couponGiftBag{
        .couponGiftBag_top{
            // height: 500px;
            position: relative;
            img{
                display: block;
                width: 100%;
            }
            .couponGiftBag_btn{
                position: absolute;
                    bottom: 20px;
                    width: 60%;
                    right: 20%;
                    left: 20%;
                .van-button{
                    height:40px;
                    background:rgba(255,147,104,1);
                    border-radius:20px;
                    line-height: 40px;
                    text-align: center;
                    color: #fff;
                    font-size: 15px;
                    width: 100%;
                }
                
            }
        }
        .couponGiftBag_bottom{

            img{
                display: block;
                width:100%;
            }
        }
        
    }
</style>
