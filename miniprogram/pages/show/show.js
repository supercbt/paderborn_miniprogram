// miniprogram/pages/show/show.js
import * as echarts from '../../ec-canvas/echarts';
let util = require("../../utils/util")
var initChart = null
let app = getApp()

function setOption(chart, ylist, ylist1, name1, name2) {
  var options = {
    color: ["#37A2DA", "#3CB371"],
    legend: {
      data: [name1, name2],
      right: 'right',
      bottom: '50',
      icon: "roundRect"
    },
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
      boundaryGap: false,
      data: ['5s前', '5s前', '4s前', '3s前', '2s前', '现在']
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
        name: name1,
        type: 'line',
        smooth: true,
        data: ylist
      },
      {
        name: name2,
        type: 'line',
        smooth: true,
        data: ylist1
      }
    ]
  }
  chart.setOption(options);
}

function setOption2(chart, ylist, ylist1, name1, name2) {
  var options = {
    animation: false,
    color: ["#37A2DA", "#3CB371"],
    legend: {
      data: [name1, name2],
      right: 'right',
      icon: "roundRect"
    },
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
        name: name1,
        type: 'bar',
        smooth: true,
        data: ylist,
        force: {
          layoutAnimation: false
        }
      },
      {
        name: name2,
        type: 'bar',
        smooth: true,
        data: ylist1
      }
    ]
  }
  chart.setOption(options);
}

function setOption1(chart, ylist) {
  var options = {

    color: "#FF6347",
    grid: {
      top: 20,
      left: 50,
      bottom: 30
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['5s前', '5s前', '4s前', '3s前', '2s前', '现在']
    },
    yAxis: {
      x: 'center',
      left:10,
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: ylist
    }]
  }
  chart.setOption(options);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    fanImg: "/miniprogram/images/fan.png",
    time: 0,
    time1: 0,
    data: [],
    labels1: [],
    labels2: [],
    sum1: 0,
    p1: [],
    sum2: 0,
    p2: [],
    ec: {
      lazyLoad: true
    },
    ec1: {
      lazyLoad: true
    },
    ec2: {
      lazyLoad: true
    },

    index1: 0,
    array1: ['1号轴承', '2号轴承', '3号轴承', '4号轴承', '5号轴承','6号轴承','7号轴承','8号轴承','9号轴承','10号轴承','11号轴承','12号轴承'],
    array1Eng:['1_M01_F10',
      '2_M01_F10',
      '3_M01_F10',
      '4_M01_F10',
      '5_M07_F04',
      '6_M07_F04',
      '7_M07_F04',
      '8_M07_F04',
      '9_M07_F10',
      '10_M07_F10',
      '11_M07_F10',
      '12_M07_F10'],
    csvName:['1_M01_F10_test.csv',
      '2_M01_F10_test.csv',
      '3_M01_F10_test.csv',
      '4_M01_F10_test.csv',
      '5_M07_F04_test.csv',
      '6_M07_F04_test.csv',
      '7_M07_F04_test.csv',
      '8_M07_F04_test.csv',
      '9_M07_F10_test.csv',
      '10_M07_F10_test.csv',
      '11_M07_F10_test.csv',
      '12_M07_F10_test.csv'],
    source:[],
    bearingName: ['1号轴承', '2号轴承', '3号轴承', '4号轴承', '5号轴承','6号轴承','7号轴承','8号轴承','9号轴承','10号轴承','11号轴承','12号轴承'],
    bearingIndex1: 0,
    bearingIndex2: 1,
    index2: 0,
    array2: ['径向力', '第一相电流', '第二相电流', '旋转速率', '负荷扭矩', '振动信号'],
    array2Eng:['force','phase_current_1','phase_current_2','speed','torque','vibration_1'],
    states: ['健康', '外环损伤1级', '外环损伤2级', '内环损伤1级', '内环损伤2级'],
    ldata: [],
    rdata: [],
    lhealth: 0,
    rhealth: 0,
    rrate: [],
    lrate: [],
    rtype: [0, 0, 0, 0, 0],
    ltype: [0, 0, 0, 0, 0],
    rtypeRate: [],
    ltypeRate: []
  },
  onChange(e) {
    console.log(e)
    this.setData({
      active: Number(!this.data.active)
    })
  },
  bearingChange1(e) {
    this.setData({
      bearingIndex1: e.detail.value,
      // ldata: this.data.postData[e.detail.value]
    }, () => {
     this.bearingChange()
    })
  },
  bearingChange2(e) {

    this.setData({
      bearingIndex2: e.detail.value,
      // rdata: this.data.postData[e.detail.value]
    }, () => {
      this.bearingChange()
    })
  },
  pickerChange1(e) {

    this.setData({
      index1: e.detail.value
    }, () => {
      this.pickerChange()
    })


  },
  pickerChange2(e) {
    this.setData({
      index2: e.detail.value
    }, () => {
      this.pickerChange()
    })
  },
  bearingChange(){
    console.log(app.globalData.source)
    let that = this
    if(app.globalData.source){
      if(this.data.postData){
      this.setData({
        ldata:this.data.postData[this.data.bearingIndex1]
       })
       
       this.setData({
        rdata:this.data.postData[this.data.bearingIndex2]
        })
      }
    }

 else{
   wx.showLoading({
     title: '加载中',
   })
   
   
  for(let i=0;i<2;i++){

    wx.request({
      url: 'https://phmlearn.com/component/upload/2/437',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: "ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9",
        file_name: this.data.csvName[i?this.data.bearingIndex1:this.data.bearingIndex2]
      },
      success: function (res) {

        wx.request({
          url: 'https://phmlearn.com/component/upload/ML/model/141/316',
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            access_token: "ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9",
            file_name: res.data.data.file_name
          },
          success: function (res) {
            console.log(res)
            if(i)
            that.setData({
             ldata:res.data.data.predict
            })
            else 
            that.setData({
              rdata:res.data.data.predict
             })
             if (i){
         
            wx.hideLoading({
              success: (res) => {},
            })
             }
          }
        })
      }
    })}


  }

  },
  pickerChange() {
    // this.closeTimer(this.data.timer1)
    // this.startTimer1()
    wx.showLoading({
      title: '加载中',
    })

    let that=this
    wx.request({
      url: 'https://phmlearn.com/component/data/paderborn',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: "ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9",
        // device_id:'1_M01_F10',
        device_id:that.data.array1Eng[that.data.index1],
        attribute:that.data.array2Eng[that.data.index2]
        // attribute:'label'
      },
      success: function (res) {
        // console.log('source',Object.values(res.data.data)[0])
       that.setData({
          source:Object.values(res.data.data)[0]
       })

    wx.hideLoading({
      success: (res) => {},
    })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.oneComponent = this.selectComponent('#mychart-dom-bar')
    this.oneComponent1 = this.selectComponent('#mychart-dom-bar1')
    this.oneComponent2 = this.selectComponent('#mychart-dom-bar2')

    let that=this
     

      this.startTimer() 
      this.pickerChange() 

  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this
    if(app.globalData.source){
      let postData = wx.getStorageSync('postData')
      if(!postData){
        wx.showLoading({
          title: '加载中',
        })
     
      wx.request({
        url: 'https://phmlearn.com/component/upload/data/data_308075602643621595',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          access_token: "ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9",
          attribute: "label"
        },
        success: function (res) {
          that.setData({
            postData: [res.data.data.data.slice(0, 1000),res.data.data.data.slice(1000, 2000),res.data.data.data.slice(2000, 3000),res.data.data.data.slice(3000, 4000),res.data.data.data.slice(4000, 5000),res.data.data.data.slice(5000, 6000),res.data.data.data.slice(6000, 7000),res.data.data.data.slice(7000, 8000),res.data.data.data.slice(8000, 9000),res.data.data.data.slice(9000, 10000),res.data.data.data.slice(10000, 11000),res.data.data.data.slice(11000)],
            ldata: res.data.data.data.slice(0, 2500),
            rdata: res.data.data.data.slice(2500, 5000)
          })
          wx.setStorageSync('postData', [res.data.data.data.slice(0, 1000),res.data.data.data.slice(1000, 2000),res.data.data.data.slice(2000, 3000),res.data.data.data.slice(3000, 4000),res.data.data.data.slice(4000, 5000),res.data.data.data.slice(5000, 6000),res.data.data.data.slice(6000, 7000),res.data.data.data.slice(7000, 8000),res.data.data.data.slice(8000, 9000),res.data.data.data.slice(9000, 10000),res.data.data.data.slice(10000, 11000),res.data.data.data.slice(11000)])
        wx.hideLoading({
          success: (res) => {},
        })
        }
      })}
      else{
        let postData=wx.getStorageSync('postData')
        that.setData({
          postData: postData,
          ldata: postData[0],
          rdata: postData[1]
        })
      }
    }
    this.bearingChange()
  },
  addCollect(e){
    let collect = wx.getStorageSync('collect')?wx.getStorageSync('collect'):[]
    
      console.log(e)
    let item =Number( Number(e.currentTarget.id)?this.data.bearingIndex2:this.data.bearingIndex1 )
    console.log(e.currentTarget.id,this.data.bearingIndex1,this.data.bearingIndex2,item)
    if(collect.indexOf(item)==-1){
      collect.push(item)
      wx.setStorageSync('collect', collect)
      wx.showToast({
        title: '添加成功',
        icon:'none'
      })
    }
    else wx.showToast({
      title: '已经添加过',
      icon:'none'
    })
  },
  startTimer() {
    this.setData({
      time: 0 //time指当前为预测数据的第几个数据
    })
    this.setData({
      //定时器
      timer: setInterval(() => {
        let time = this.data.time
        let lhealth = this.data.lhealth
        let rhealth = this.data.rhealth
        this.setData({
          time: time + 1,
          date: util.formatTime(new Date)
        })

        if (!this.data.ldata[time % this.data.ldata.length]) {
          this.setData({
            lhealth: lhealth + 1
          })
        }
        if (!this.data.rdata[time % this.data.rdata.length]) {
          this.setData({
            rhealth: rhealth + 1
          })
        }

        let lrate = this.data.lrate
        lrate.push(time ? (1 - lhealth / time) : 0)
        let rrate = this.data.rrate
        rrate.push(time ? (1 - rhealth / time) : 0)
        this.setData({
          lrate: lrate,
          rrate: rrate
        })

        if (!this.data.active && time % 2) {
          this.oneComponent.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            })

            setOption(chart, this.data.lrate.slice(-5), this.data.rrate.slice(-5),this.data.bearingName[this.data.bearingIndex1],this.data.bearingName[this.data.bearingIndex2])
            this.chart = chart
            return chart
          })
        }


        let rtype = this.data.rtype
        let ltype = this.data.ltype
        let rtypeRate = this.data.rtypeRate
        let ltypeRate = this.data.ltypeRate
        if (time) {
          rtype[this.data.rdata[time % this.data.rdata.length]]++
          ltype[this.data.ldata[time % this.data.ldata.length]]++

          for (let i = 0; i < rtype.length; i++) {
            rtypeRate[i] = rtype[i] / time
            ltypeRate[i] = ltype[i] / time
          }

          this.setData({
            rtype,
            ltype,
            rtypeRate,
            ltypeRate
          })
        }
        if (!this.data.active && time % 2) {
          this.oneComponent2.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            })

            setOption2(chart, ltypeRate, rtypeRate, this.data.bearingName[this.data.bearingIndex1], this.data.bearingName[this.data.bearingIndex2])
            this.chart = chart
            return chart
          })
        }

        //source数据展示
    
        this.setData({
          showData:this.data.source[time].toFixed(2),
           max: Math.max(...this.data.source.slice(0, time + 1)).toFixed(2),
           min: Math.min(...this.data.source.slice(0, time + 1)).toFixed(2),
           av: (this.data.source.slice(0, time + 1).reduce(sum) / (time + 1)).toFixed(2)
        })
        if (this.data.active && time % 2) {
        this.oneComponent1.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          })

          setOption1(chart, this.data.source.slice(time - 6, time + 1))
          this.chart = chart
          return chart
        })}
      }, 1000)


    })
    function sum(total, num) {
      return total + num
    }
  },

 

  closeTimer(timer) {
    clearInterval(timer)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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