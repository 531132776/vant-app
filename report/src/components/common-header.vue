<template>
    <div class="header-box">
      <div class="left-icon">
        <span v-if="showback" @click="back" class="icon-back"></span>
      </div>
      <div class="header-tittle">
        <!-- <span v-if="showinput">
          <cus-input></cus-input>
        </span>
        <span v-if="!showinput">{{tittle}}</span> -->
      </div>
      <div class="right-icon">
        <span v-if="showmore" @click="toHistory()" class="iconSug">
        </span>
        <span v-if="showmore" class="iconHel"></span>
      </div>
    </div>
</template>

<script>
import cusInput from 'common/cus-input'
export default {
  data() {
    return {}
  },
  props: {
    showright: {
      type: Boolean,
      default: false
    },
    showleft: {
      type: Boolean,
      default: false
    },
    showinput: {
      type: Boolean,
      default: false
    },
    tittle: {
      type: String,
      default: '标题'
    },
    showback: {
      type: Boolean,
      default: true
    },
    showmore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      const u = window.navigator.userAgent
      if(!this.$route.query.userId){
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
          window.andriod.postMessage('0')
        }else if (u.indexOf('iPhone') > -1){
          window.webkit.messageHandlers.change_Top_Right_Write.postMessage('0')
        }
      }else{
         if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
          window.andriod.postMessage('1')
        }else if (u.indexOf('iPhone') > -1){
           window.webkit.messageHandlers.change_Top_Left_Write.postMessage('1')
        }
        this.$router.back(-1)
      }
    },
    toHistory(){
      const u = window.navigator.userAgent
      if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
         window.andriod.postMessage('1')
      }else if (u.indexOf('iPhone') > -1){
        window.webkit.messageHandlers.change_Top_Right_Write.postMessage('1')
      }
      const uid = localStorage.getItem("uid")
      this.$router.push('./detail?userId='+uid)
    }
  },
  components: {
    cusInput
  }
}
</script>

<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.header-box{
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  .h(50);
  .lh(50);
  background-color: @base-color;
  color: @base-header-color;
  .fs(@base-header-size);
  display: flex;
  .left-icon{
    position: relative;
    flex: 1;
    .icon-back{
      position: absolute;
      display: inline-block;
      .w(25);
      .h(25);
      .left(12.5);
      .top(12.5);
      background-image: url("../assets/imgs/w-back.svg");
      background-size: cover;
    }
  }
  .header-tittle{
    flex: 3;
  }
  .right-icon{
    position: relative;
    flex: 1;
    .iconSug{
      position: absolute;
      display: inline-block;
      .w(25);
      .h(25);
      .right(50);
      .top(12.5);
      background-image: url("../assets/images/历史记录@2x.png");
      background-size: cover;
    }
    .iconHel{
       position: absolute;
      display: inline-block;
      .w(25);
      .h(25);
      .right(12.5);
      .top(12.5);
      background-image: url("../assets/images/帮助@2x.png");
      background-size: cover;
    }
  }
}
</style>
