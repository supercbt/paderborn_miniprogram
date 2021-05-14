let app = getApp()
// // pages/timeline/timeline.js
// Component({
//   /**
//    * 组件的属性列表
//    */
//   properties: {

//   },



//   /**
//    * 组件的初始数据
//    */
//   data: {
//     list:[],
//     condition:false,
//     msg:0
//   },

//   /**
//    * 组件的方法列表
//    */
//   methods: {
//     clickMe: function() {
//       this.setData({ msg: "Hello World" })
//     }
//   }
// })

let util = require("../../utils/util")

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    csvName: [
      '1_M01_F10_test.csv',
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
      '12_M07_F10_test.csv'
    ],
    time: 0,
    data: [],
    ldata: [],
    rdata: [],
    choice: false,
    logs: [],
    multiIndex1: [0, 0, 0],
    multiArray1: [
      ['1号轴承', '2号轴承', '3号轴承', '4号轴承', '5号轴承', '6号轴承', '7号轴承', '8号轴承', '9号轴承', '10号轴承', '11号轴承', '12号轴承'],
      ['全部状态', '外环损伤', '内环损伤'],
      ['1级损伤', '2级损伤']
    ],
    multiIndex2: [0, 0],
    multiArray2: [
      ['外环损伤', '内环损伤'],
      ['1级损伤', '2级损伤']
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



  },


  bindMultiPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },

  bindMultiPickerColumnChange1: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray1: this.data.multiArray1,
      multiIndex1: this.data.multiIndex1,

    };
    data.multiIndex1[e.detail.column] = e.detail.value;
    this.setData(data);
  },


  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex2: e.detail.value
    })
  },

  bindMultiPickerColumnChange2: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray2: this.data.multiArray2,
      multiIndex2: this.data.multiIndex2,

    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  startTimer() {
    this.setData({
      time: 0 //time指当前为预测数据的第几个数据
    })


    this.setData({
      //定时器
      timer: setInterval(() => {
        let time = this.data.time
        let logs = this.data.logs
        let choice = this.data.choice


        if (choice == false)
          logs.unshift({
            status: this.data.rdata[time % this.data.rdata.length],
            logdate: util.formatTime(new Date)
          })
        else
          logs.unshift({
            // status: this.data.ldata.map(l => l[time % this.data.ldata.length]),
            status1: this.data.ldata[0][time % this.data.ldata[0].length],
            status2: this.data.ldata[1][time % this.data.ldata[1].length],
            status3: this.data.ldata[2][time % this.data.ldata[2].length],
            status4: this.data.ldata[3][time % this.data.ldata[3].length],
            status5: this.data.ldata[4][time % this.data.ldata[4].length],
            status6: this.data.ldata[5][time % this.data.ldata[5].length],
            status7: this.data.ldata[6][time % this.data.ldata[6].length],
            status8: this.data.ldata[7][time % this.data.ldata[7].length],
            status9: this.data.ldata[8][time % this.data.ldata[8].length],
            status10: this.data.ldata[9][time % this.data.ldata[9].length],
            status11: this.data.ldata[10][time % this.data.ldata[10].length],
            status12: this.data.ldata[11][time % this.data.ldata[11].length],
            logdate: util.formatTime(new Date)
          })



        this.setData({
          time: time + 1,
          logs: logs
        })



      }, 1000)


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
    this.setData({
      choice:app.globalData.source
    },()=>{
      

    wx.showLoading({
      title: '加载中'
    })
    let that = this
    let ldata = this.data.ldata
    let choice = this.data.choice
    let rdata = this.data.rdata
    if (choice == true) {
      for (let i = 0; i < 12; i++) {
        wx.request({
          url: 'https://phmlearn.com/component/upload/2/437?',
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            access_token: 'ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9',
            file_name: this.data.csvName[i]
          },
          success: function (res) {
            console.log(res.data.data.file_name)
            wx.request({
              url: 'https://phmlearn.com/component/upload/ML/model/141/316?',
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                access_token: 'ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9',
                file_name: res.data.data.file_name
              },
              success: function (res) {
                console.log(res)
                ldata[i] = res.data.data.predict
                // console.log({['ldata['+i+']']: ldata[i]})
                if (i == 11) {
                  that.setData({
                    ldata
                  })
                  wx.hideLoading()
                  that.startTimer()
                }
              }
            })
          }
        })
        // this.startTimer()
      }
    }

    if (choice == false) {
      wx.request({
        url: 'https://phmlearn.com/component/upload/2/437?',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          access_token: 'ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9',
          file_name: 'testdatashuffle_2_demo.csv'
        },
        success: function (res) {
          console.log(res.data.data.file_name)
          wx.request({
            url: 'https://phmlearn.com/component/upload/ML/model/141/316?',
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              access_token: 'ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9',
              file_name: res.data.data.file_name
            },
            success: function (res) {
              console.log(res)
              that.setData({
                rdata: res.data.data.predict
              })
              wx.hideLoading()
              that.startTimer()
            }
          })
        }
      })
    }    })
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