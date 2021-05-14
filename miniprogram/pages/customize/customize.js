// pages/my/my.js
wx.cloud.init()
const app = getApp();
const db = wx.cloud.database();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: 0,
    bg: "https://6261-ball-9akln-1301606952.tcb.qcloud.la/bg.jpg?sign=7133250c9e1e502bd88813efdd17a950&t=1587120589",
    avatar: "https://6c6f-lol-1owmo-1301381904.tcb.qcloud.la/login.png?sign=8973dfaeb8a56a4d5c80a2dfe42d6595&t=1582778377",
    openid: "",
    copyright: " Copyright © 2021 第3组.",
    bearingName: ['1号轴承', '2号轴承', '3号轴承', '4号轴承', '5号轴承'],
    csvName: ['1_M01_F10_test.csv',
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
    state: [],
    checked: app.globalData.source,
    time: 0
  },
  getUserProfile() {
    let that = this
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别",
      success: res => {
        console.log(res)
        wx.setStorageSync("userInfo", res.userInfo);
        let nickName = res.userInfo.nickName;
        let avatar = res.userInfo.avatarUrl;
        wx.cloud.callFunction({
          name: "getOpenid",
          complete: res => {
            console.log(res);
            wx.setStorageSync("openid", res.result.openid);
            this.setData({
              openid: res.result.openid
            });
            db.collection("user").where({
              _openid: res.result.openid
            }).get().then((e) => {
              if (e.data == "") {
                db.collection("user").add({
                  data: {
                    nickName: nickName,
                    avatar: nickName,
                    time: util.formatTime(new Date())
                  }
                }).then((res) => {})
              }
            })
          }
        })
        this.setData({
          nickName: nickName,
          avatar: avatar,
        })
      },
      fail: res => {
        //拒绝授权
        console.log(res)
        return;
      }
    })
  },
  getUserInfo: function (e) {
    let that = this
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */

  changeData(e) {
    console.log(e.detail.value)
    app.globalData.source = e.detail.value
    this.setData({
      checked: e.detail.value
    })

    this.onShow()
  },
  onLoad: function (options) {
    let that = this
    if (wx.getStorageSync("userInfo")) {
      this.setData({
        nickName: wx.getStorageSync("userInfo").nickName,
        avatar: wx.getStorageSync("userInfo").avatarUrl
      })
    };
    if (wx.getStorageSync("openid")) {
      this.setData({
        openid: wx.getStorageSync("openid")
      })
    };
    this.setData({
      //定时器
      timer: setInterval(() => {
        let time = this.data.time
        let data = this.data.data
        this.setData({
          time: time + 1
        })
        let state = []
        if (data)
          for (let i = 0; i < data.length; i++) {
            // console.log(data)
            state[i] = data[i][time % data[i].length] == 0
          }
        this.setData({
          state
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
    let that = this
    let collect = wx.getStorageSync('collect')
    this.setData({
      collect
    })
    if (app.globalData.source) {
      console.log('使用高故障')
      let postData = wx.getStorageSync('postData')
      if (!postData) {
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
              data: [res.data.data.data.slice(0, 1000), res.data.data.data.slice(1000, 2000), res.data.data.data.slice(2000, 3000), res.data.data.data.slice(3000, 4000), res.data.data.data.slice(4000, 5000), res.data.data.data.slice(5000, 6000), res.data.data.data.slice(6000, 7000), res.data.data.data.slice(7000, 8000), res.data.data.data.slice(8000, 9000), res.data.data.data.slice(9000, 10000), res.data.data.data.slice(10000, 11000), res.data.data.data.slice(11000)],
              ldata: res.data.data.data.slice(0, 2500),
              rdata: res.data.data.data.slice(2500, 5000)
            })
            wx.setStorageSync('postData', [res.data.data.data.slice(0, 1000), res.data.data.data.slice(1000, 2000), res.data.data.data.slice(2000, 3000), res.data.data.data.slice(3000, 4000), res.data.data.data.slice(4000, 5000), res.data.data.data.slice(5000, 6000), res.data.data.data.slice(6000, 7000), res.data.data.data.slice(7000, 8000), res.data.data.data.slice(8000, 9000), res.data.data.data.slice(9000, 10000), res.data.data.data.slice(10000, 11000), res.data.data.data.slice(11000)])
          }
        })
      } else {
        that.setData({
          data: postData
        })
      }
    } else {
      let data = []
      for (let i = 0; i < collect.length; i++) {

        wx.request({
          url: 'https://phmlearn.com/component/upload/2/437',
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            access_token: "ed11ed1d978a42a4bb77ed24d9cfe4eb.ff3f3663c9303bc418afa7358c2d9cd9",
            file_name: this.data.csvName[collect[i]]
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
                // console.log(res)
                data[i] = res.data.data.predict
                if (i == collect.length - 1) {
                  that.setData({
                    data: data
                  })
                }
              }
            })
          }
        })

      }
    }
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