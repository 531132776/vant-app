<template>
<div>
    <div style="height:350px">
      <div id="container"></div>
    </div>
    <!-- <div>
      <div class="outdoorsData" style="background-color: #fff;">
        <div class="outdoorsDataIocn">
          <div>
            <img src="../assets/images/路径@2x.png" alt="">
          </div>
          <div class="text">
              <p class="huwai">{{$t('share.data.outdoors')}}</p>
              <p>{{timeStr}}</p>
          </div>
        </div>
        <div>
          <span class="revenue">{{dataList.distance}}</span>
          <span>{{$t('share.data.kilometre')}}</span>
        </div>
      </div>
       <div class="speekImg" style="background-color: #fff;">
          <div class="spenekTop">
            <span>{{$t('share.speek.slowly')}}</span>
            <span class="speekLine"></span>
            <span>{{$t('share.speek.faster')}}</span>
          </div>
          <div class="speekTime">
            <span>{{dataList.minPace}}</span>
            <span>{{dataList.maxPace}}</span>
          </div>
        </div>
      </div>
      <div class="dataIcon" style="background-color: #fff;">
        <p class="dataItem"> 
          <img src="../assets/images/时间@2x1.png" alt="">
          <span>{{dataList.timeLong | formatSeconds}}</span>
        </p>
         <p class="dataItem">
          <img src="../assets/images/图表配速@2x.png" alt="">
          <span>{{dataList.avgPace}}</span>
        </p>
         <p class="dataItem">
          <img src="../assets/images/卡路里 copy@2x.png" alt="">
          <span>{{dataList.calories}}</span>
        </p>
      </div> -->
</div>
  </template>
  <script>
  import axios from 'axios'
 export default {
      name: 'amap-page',
      data() {
        return {
          trackballList:[],
          timeStr:null,
          paceList:[],
          type:null,
          dataList:{
            timeLong:null
          },
      }
      },
      mounted() {
        var iphoneSportId = this.$route.query.iphoneSportId
        var userId = this.$route.query.uid
        this.getData(iphoneSportId)
      },
      filters:{
        formatSeconds(value){
          var secondTime = parseInt(value);// 秒
          var minuteTime = 0;// 分
          if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
              //获取分钟，除以60取整数，得到整数分钟
              minuteTime = parseInt(secondTime / 60);
              //获取秒数，秒数取佘，得到整数秒数
              secondTime = parseInt(secondTime % 60);
              //如果分钟大于60，将分钟转换成小时
            }
            var result = "" + parseInt(secondTime) + "''";
            if(minuteTime > 0) {
                result = "" + parseInt(minuteTime) + "'" + result;
            }
            return result
        }
      },
      methods: {
        onClick() {
          this.count += 1;
        },
        getTrackball(lineArr){
          var px0 = lineArr[0][0]
          var px1 = lineArr[0][1]
          var pxLengthx = lineArr[lineArr.length-1][0]
          var pxLengthy = lineArr[lineArr.length-1][1]
          var map = new AMap.Map("container", {
              resizeEnable: true,
              dragEnable:true,
              zoomEnable:true,
              // center: [lineArr[0][0],lineArr[0][1]],
              zoom: 14,
              lang:localStorage.getItem("__locale__")
          });
        var marker = new AMap.Marker({
            map: map,
            position: [px0,px1],
            icon: "https://manager.fitalent.com.cn/static/2019/1/28/10-36-43-3126421.png",
            offset: new AMap.Pixel(-216, -13),
            autoRotation: true,
            angle:-90,
        });
        // 绘制轨迹
        var nubArr = [];
        for(var i=0;i<lineArr.length-1;i++){
          var polyline = new AMap.Polyline({
              map: map,
              path: [lineArr[i],lineArr[i+1]],
              // strokeColor: this.color(i),  //线颜色
               strokeColor: '#00000',  //线颜色
              strokeOpacity: 0,     //线透明度
              strokeWeight: 4,      //线宽
              // strokeStyle: "solid"  //线样式
          });
          var distance = Math.round(AMap.GeometryUtil.distanceOfLine([lineArr[i],lineArr[i+1]]));
          nubArr.push(distance/1000)
        }
          var totalDistance = parseInt(Math.round(AMap.GeometryUtil.distanceOfLine(lineArr))/1000)
          var str=0;
          var indexArr = []
          for (let i = 0; i < nubArr.length; i++) {
            str=str+nubArr[i];
            for(var j =1;j<=totalDistance;j++){
              if(str>=j && indexArr.length == j-1){
                 indexArr.push(i)
              }
            }
          }
        console.log(indexArr,'aa')
        var passedPolyline = new AMap.Polyline({
                map: map,
                path: lineArr,
                strokeColor: "#AF5",  //线颜色
                // strokeOpacity: 1,     //线透明度
                strokeWeight: 4,      //线宽
                // strokeStyle: "solid"  //线样式
            });
        // 创建一个 Icon
        var startIcons  = {
          chUrl:"https://api.mini-banana.com/sport/static/images/1.png",
          enUrl:"https://api.mini-banana.com/sport/static/images/2.png",
        }
        var endIcons  = {
          chUrl:"https://api.mini-banana.com/sport/static/images/3.png",
          enUrl:"https://api.mini-banana.com/sport/static/images/4.png",
        }
        var startIcon = new AMap.Icon({
              size: new AMap.Size(40, 40),
              // 图标的取图地址
              image: localStorage.getItem('__locale__') == 'ch'?startIcons.chUrl:startIcons.enUrl,
              // 图标所用图片大小
              imageSize: new AMap.Size(40, 40),
            // 图标取图偏移量
        
        });

        // 将 icon 传入 marker
        var startMarker = new AMap.Marker({
            position: new AMap.LngLat(px0,px1),
            icon: startIcon,
            offset: new AMap.Pixel(-13, -30)
        });
       
        // 创建一个 icon
        var endIcon = new AMap.Icon({
              size: new AMap.Size(40, 40),
              content: markerContent,
              image: localStorage.getItem('__locale__') == 'ch'?endIcons.chUrl:endIcons.enUrl,
              imageSize: new AMap.Size(40, 40),
        });

        // 将 icon 传入 marker
        var endMarker = new AMap.Marker({
            position: new AMap.LngLat(pxLengthx,pxLengthy),
            icon: endIcon,
            offset: new AMap.Pixel(-13, -30)
        });
        var kilometre = []
        for(var i= 0;i<indexArr.length;i++){
          kilometre.push(lineArr[indexArr[i]])
        }
        for(var i=0;i<kilometre.length;i++){
          var index = i+1
           var markerContent = '' +
          '<div class="custom-content-marker">'+index+'</div>';
            var icon1 = new AMap.Marker({
              position: new AMap.LngLat(kilometre[i].lng,kilometre[i].lat),
              content: markerContent,
              offset: new AMap.Pixel(-13, -30)
          });
          map.add(icon1);
        }
        // 将 markers 添加到地图
        map.add([startMarker,endMarker]);
        marker.on('moving', function (e) {
            passedPolyline.setPath(e.passedPath);
          })
        map.setFitView();
        marker.moveAlong(lineArr, 50000);
        },
        getData(iphoneSportId){  
              axios({
                url:'/isport/concumer-wristband/wristband/iphoneSportDetail/selectByIphoneSportId?iphoneSportId='+iphoneSportId,
                method: 'post',
                }).then(res=>{
            var list = JSON.parse(res.data.obj.coorArr)
            if(list.length>1){
              for(var i=0;i<list.length-1;i++){
                var c = list[i].concat(list[i+1])
              }
            }else{
              var c = list[0]
            }
            this.paceList = JSON.parse(res.data.obj.paceArr)
            let arr = []
            for(var i= 0;i<this.paceList.length;i++){
              var newstr=JSON.stringify(this.paceList[i].pace)
              var aaa = newstr.substring(1, newstr.length-3)
              var ss = aaa.split("'")
              var bb = ss.map(Number)
              var cc = bb[0]*60+bb[1]
              arr.push(cc)
            }
            this.max = Math.max.apply(null,arr);
            this.dealPace(this.max)
                this.getTrackball(c)
              })
          },
        getColorByBaiFenBi(bili){
    //var 百分之一 = (单色值范围) / 50;  单颜色的变化范围只在50%之内
              var one = (255+255) / 100;  
              var r=0;
              var g=0;
              var b=0;
          
              if ( bili < 50 ) { 
                  // 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
                  r = one * bili;
                  g=255;
              }
              if ( bili >= 50 ) {
                  // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
                  g =  255 - ( (bili - 50 ) * one) ;
                  r = 255;
              }
              r = parseInt(r);// 取整
              g = parseInt(g);// 取整
              b = parseInt(b);// 取整
              return 'rgb('+r+','+g+','+b+','+1+')';
              
          },
          color(index){
              if(index>this.paceList.length-1){
                return 'rgba(116,230,113,1)'
              }else if((100 - this.paceList[index].pace/15) < 0){
                return '#fa5a5a'  
              }else{
                  return this.getColorByBaiFenBi(this.paceList[index].pace/15)
              }
          },
          dealPace(max){
            for(var i= 0;i<this.paceList.length;i++){
                  var newstr=JSON.stringify(this.paceList[i].pace)
                  var aaa = newstr.substring(1, newstr.length-3)
                  var ss = aaa.split("'")
                  var bb = ss.map(Number)
                  this.paceList[i].pace = max - (bb[0]*60+bb[1])
              }
            },
            changePosition() {
              let position = this.markers[0].position;
              this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
            },
            chnageDraggle() {
              let draggable = this.markers[0].draggable;
              this.markers[0].draggable = !draggable;
            },
            toggleVisible() {
              let visableVar = this.markers[0].visible;
              this.markers[0].visible = !visableVar;
            },
            addMarker() {
              let marker = {
                position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
              };
              this.markers.push(marker);
            },
            removeMarker() {
              if (!this.markers.length) return;
              this.markers.splice(this.markers.length - 1, 1);
            }
          }
        };
</script>
<style lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
   #container {
        height: 100%;
        width: 100%;
        canvas {
          display: block;
          width: auto;
          height: auto;
        }
        .custom-content-marker{
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: RGBA(29, 206, 116, 1);
          border: 2px solid #fff;
          color:#fff;
          line-height: 23px;
          text-align: center;
          font-size: 15px;
        }
    }
    .outdoorsData{
      padding:21px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .revenue{
          color:#101D37;
          font-size:30px;
        }
      .outdoorsDataIocn{
        display: flex;
        align-items: center;
        .text{
          text-align: left;
          margin-left: 10px;
          .huwai{
            font-size:17px;
            font-weight:400;
            color:rgba(16,29,55,1);
            line-height: 1.5
          }
        }
        img{
          .h(40);
        }
      }
    }
    .speekImg{
      padding:5px 15px;
      color:rgba(147,153,165,1);
      .spenekTop{
        display: flex;
        justify-content: space-around;
        align-items: center;
        .speekLine{
          .w(280);
          height:6px;
          background:linear-gradient(270deg,rgba(250,90,90,1) 0%,rgba(255,208,60,1) 50%,rgba(116,230,113,1) 100%);
          border-radius:5px;
        }
      }
      .speekTime{
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
    .dataIcon{
      display: flex;
      justify-content:space-between;
      font-size:17px;
      font-weight:400;
      color:rgba(16,29,55,1);
      padding: 20px 15px;
      img{
        width:20px;
        margin-right: 8px;
      }
      .dataItem{
        display: flex;
        align-items: center;
      }
    }
    </style>