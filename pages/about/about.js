//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: [],
    navbar: [{
      name: "我的订单",
      img: "../../img/icon/sales-icon.png"
    }, {
        name: "收货地址",
      img: "../../img/icon/location-icon.png"
    },{
        name: "咨询与反馈",
        img: "../../img/icon/help-icon.png"
    }]
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  redirectFunc: function(event){
    var action = event['currentTarget']['dataset']['action'];
    var navUrl = '';
    switch(action){
      case 0: navUrl = "/pages/sales/sales"; break;
      case 1: navUrl = "/pages/location/location"; break;
      case 2: navUrl = "/pages/suggestion/suggestion"; break;
    }
    wx.navigateTo({
      url: navUrl,
    })
  }
})