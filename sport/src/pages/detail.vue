<template>
  <div>
    <div>
    <x-header :left-options="{backText: ''}" :right-options="{showMore: false}" @on-click-more="showMenus = true">指数历史</x-header>
    </div>
    <div class="conment">
         <scroller style="margin-top:40px"  :on-refresh="onRefresh" :on-infinite="onInfinite" ref="myscroller">
          <div v-for="item in listdata" :key="item.healthWeeklyId">
            <div class="historyContent">
            <div class="data">
            <div class="dataTitle">
              <div>
                <p>周期</p>
                <p class="date">{{item.timeSection}}</p>
              </div>
              <div class="count">{{item.userScore}}</div>
            </div>
            <div class="dataContent ">
              <div class="dataContentLeft">
                <div>
                  <p>
                    <span class="number">{{item.reachDay}}</span>
                    <span>天</span>
                  </p>
                  <p class="text">达标天数</p>
                </div>
                <div style="margin-top:15px;">
                  <p>
                    <span>
                        <img v-if="item.reachDayContrast>=0" src="../assets/images/Path 3@2x.png" alt="">
                        <img v-if="item.reachDayContrast<0" src="../assets/images/Path 3@2x(1).png" alt="">
                    </span>
                    <span class="number">{{Math.abs(item.reachDayContrast)}}</span>
                    <span>天</span>
                  </p>
                  <p class="text">比上一周期</p>
                </div>
              </div>
              <div class="dataContentLeft">
                <div>
                  <p>
                    <span class="number">{{item.distance}}</span>
                    <span>公里</span>
                  </p>
                  <p class="text">运动距离</p>
                </div>
                <div style="margin-top:15px;">
                  <p>
                    <span>
                        <img v-if="item.reachDayContrast>=0" src="../assets/images/Path 3@2x.png" alt="">
                        <img v-if="item.reachDayContrast<0" src="../assets/images/Path 3@2x(1).png" alt="">
                    </span>
                    <span class="number">{{Math.abs(item.reachDayContrast)}}</span>
                    <span>公里</span>
                  </p>
                  <p class="text">比上一周期</p>
                </div>
              </div>
              <div class="dataContentLeft">
                <div>
                  <p>
                    <span class="number">{{item.avgStep}}</span>
                    <span>步</span>
                  </p>
                  <p class="text">平均步数</p>
                </div>
                <div style="margin-top:15px;">
                  <p>
                    <span>
                          <img v-if="item.avgStepContrast>=0" src="../assets/images/Path 3@2x.png" alt="">
                        <img v-if="item.avgStepContrast<0" src="../assets/images/Path 3@2x(1).png" alt="">
                    </span>
                    <span class="number">{{Math.abs(item.avgStepContrast)}}</span>
                    <span>步</span>
                  </p>
                  <p class="text">比上一周期</p>
                </div>
              </div>
            </div>
          </div>
    </div>
    </div>
    </scroller>
    </div>
  </div>
</template>
<script>
import { XHeader,LoadMore} from 'vux'
import axios from 'axios'
export default {
  components: {
    XHeader,
    LoadMore,
  },
  data () {
    return {
      listdata:[],
      pageNum:1,
      pageSize:10,
      showFlag:false,
      noDate:false,
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
  },
  created(){
    this.getList(1,0,10)
  },
  methods:{
    getList(healthUserId,pageNum,pageSize){
      axios({
        url:'/isport/concumer_basic/basic/healthWeekly/findHistory?healthUserId='+healthUserId+'&pageNum='+pageNum+'&pageSize='+pageSize,
        method: 'post',
        }).then(res=>{
            if(res.data.obj.pageNum==0){
                this.listdata  = res.data.obj.list
            }else{
                this.listdata= this.listdata.concat(res.data.obj.list)
            }
        })
      },
    onRefresh(done) {
         this.noDate=false;//重置数据判断
          setTimeout(function(){
              this.getList(1,0,10);
             this.$refs.myscroller.finishPullToRefresh();//刷新完毕关闭刷新的转圈圈
      }.bind(this),1700)
      // done() 
    },
    onInfinite(){
        // let healthUserId = 1
        // let pageNum = 1
        // let pageSize = 10
       if(this.noDate){
             this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
      }else{
          setTimeout(() => {
            alert(1)
               this.pageNum++;//下拉一次页数+1
                this.getList(1,this.pageNum,10);
          }, 1500);
      }
    }
  }
}
</script>

<style lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
  .conment{
    margin-top:40px;
    background-color: #F2F2F2;
  }
  ._v-container[data-v-ecaca2b0]{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    top: 0;
    left: 0;
  }
 .historyContent{
    padding:15px;
    background-color: #F2F2F2;
    // min-height: 700px;
    .data{
    .w(345);
    background:rgba(255,255,255,1);
    border-radius:8px;
    .dataContent{
      display: flex;
      justify-content: space-around;
      padding: 15px 0px;
    }
    .dataTitle{
      display: flex;
      justify-content: space-between;
      color:rgba(16,29,55,1);
      font-size:17px;
      font-weight:400;
      padding: 10px 15px;
      align-items: center;
      border-bottom:1px solid #E7E8EB;
      text-align: left;
      .date{
        margin-top: 10px;
      }
      .count{
        .h(72);
        font-size:40px;
        font-family:BebasNeue;
        color:rgba(29,206,116,1);
        line-height:72px
      }
    }
    .number{
      height:36px;
      font-size:30px;
      font-family:BebasNeue;
      color:rgba(16,29,55,1);
      line-height:36px;
    }
    img{
      height: 15px;
    }
    .text{
      height:18px;
      font-size:13px;
      font-weight:400;
      color:rgba(147,153,165,1);
      line-height:18px;
      margin-top:5px;
    }
  }
  }
.Router{
  .vux-header {
    position: fixed;
    top:0px;
    left: 0px;
    z-index: 999;
    width: 100%;
    padding: 3px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #ffffff;
    border-bottom:1px solid #E7E8EB;
    .vux-header-title {
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        color: #000 !important;
    }
    .vux-header-left .left-arrow:before {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid #151414;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 8px;
    left: 7px;
  }
 
  }
}
</style>