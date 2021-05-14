// miniprogram/pages/chatroom/chatroom.js
wx.cloud.init()
const db = wx.cloud.database();
const chatroomCollection = db.collection('chatroom');
const app = getApp();
const util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null, // 存储当前用户的信息
    textInputValue: '', //发送的消息
    chats: [], // 存储聊天记录
    openId: '', //当前用户openid
    InputBottom: 0,
    bearingName: ['1号轴承', '2号轴承', '3号轴承', '4号轴承', '5号轴承'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
    console.log(e.detail.height)
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  onLoad: function(options) {
      wx.setNavigationBarTitle({ title:this.data.bearingName[options.id]})
     this.setData({
       userInfo:wx.getStorageSync('userInfo'),
       openId:wx.getStorageSync('openid'),
       groupId:options.id
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {
    chatroomCollection.where({
      groupId: this.data.groupId
    }).watch({
      onChange: this.onChange.bind(this),
      onError(err) {
        console.error(err)
      }
    })

 
  },

  onChange(snapshot) {
    // 监听
    console.log(snapshot)
    if (snapshot.type == 'init') { // 初始化
      this.setData({
        chats: [
          ...this.data.chats,
          ...[...snapshot.docs].sort((x, y) => x.sendTimeTs - y.sendTimeTs)
        ]
      });
      this.setData({
        toView: 'm'+(this.data.chats.length - 1)
    })
    } else {
      const chats = [...this.data.chats]
      for (const docChange of snapshot.docChanges) {
        switch (docChange.queueType) {
          case 'enqueue':
            chats.push(docChange.doc)
            break
        }
      }
      this.setData({
        chats: chats.sort((x, y) => x.sendTimeTs - y.sendTimeTs)
      });
      this.setData({
        toView: 'm'+(this.data.chats.length - 1)
      })
      

    }

  },



  onSend() {
    // 发送消息，插入云数据库
    if (!this.data.textInputValue) {
      return
    }

    const doc = {
      textContent: this.data.textInputValue, // 用户输入信息
      avatar: this.data.userInfo.avatarUrl, // 头像
      nickName: this.data.userInfo.nickName, //  昵称
      groupId: this.data.groupId,
      msgType: 'text',
      sendTime: util.formatTime(new Date),
      sendTimeTs: Date.now(),
    }

    chatroomCollection.add({
      data: doc
    })

    // 清空输入框
    this.setData({
      textInputValue: ''
    })

  },

  onTextInput(e) {
    // 获取用户输入的信息
    this.setData({
      textInputValue: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})