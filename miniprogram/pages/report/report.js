// miniprogram/pages/report/report.js
import * as echarts from '../../ec-canvas/echarts';
var initChart = null
function setOption2(chart, ylist) {
  console.log('setOption2',ylist)
  var options = {
    animation: false,
    color: ["#65B9A6"],
    grid: {
      top: 20,
      right: 20,
      bottom: 30
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },

    xAxis: {
      type: 'category',
      boundaryGap: [0, 0.2],
      data: ['健康', '外损1级', '外损2级', '内损1级', '内损2级'],

      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      boundaryGap: [0, 1],
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'bar',
      barWidth:'60%',
      itemStyle: {
         normal: {           
               barBorderRadius:[3, 3, 0, 0]
         }
    },
      smooth: true,
      data: ylist,
    }]
  }
  chart.setOption(options);

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bearingName: ['1号轴承', '2号轴承', '3号轴承', '4号轴承', '5号轴承', '6号轴承', '7号轴承', '8号轴承', '9号轴承', '10号轴承', '11号轴承', '12号轴承'],
    bearingIndex: 0,
    ec: {
      // lazyLoad:false
    },
    
  },
  bearingChange(e) {

    this.setData({
      bearingIndex: e.detail.value
    })
    let allData = wx.getStorageSync('postData')
    let data = allData[e.detail.value]
    let sum = 0
    for (let i = 0; i < 1000; i++) {
      if (!data[i]) sum = sum + 1
    }

    let data1 = (sum / 1000 * 100).toFixed(2)
    let data2 = Math.round(sum * 7 * 24 * 60 * 60 / 1000)
    this.setData({
      data1,
      data2
    })

    let type = [0,0,0,0,0]
    let typeRate = []

    for (let i = 0; i < data.length; i++) {
      type[data[i]]++
    }
    for (let i = 0; i < type.length; i++) {
      typeRate[i] = type[i] / data.length
    }



    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })

      setOption2(chart, typeRate)
      this.chart = chart
      return chart
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.oneComponent = this.selectComponent('#mychart-dom-bar')
    this.bearingChange({
      detail: {
        value: 0
      }
    })

    let now = new Date();
    console.log(now.getDay())
    let date1=new Date(now.getTime()-Number(now.getDay())*24*60*60*1000)
    console.log(date1)
    let date2=new Date(now.getTime()-(now.getDay()+7)*24*60*60*1000)
    this.setData({
      date1:date1.getFullYear()+'-'+Number(date1.getMonth()+1)+'-'+date1.getDate(),
      date2:date2.getFullYear()+'-'+Number(date2.getMonth()+1)+'-'+date2.getDate()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})