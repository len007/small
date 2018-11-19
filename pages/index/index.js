//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    products:[
      {
        id: 1,
        name:"香菇",
        url:"../../img/xg.jpg"
      }, {
        id: 2,
        name: "米粉",
        url: "../../img/mf.jpg"
      }, {
        id: 3,
        name: "灌芯糖",
        url: "../../img/gxt.jpg"
      }, {
        id: 4,
        name: "香菇",
        url: "../../img/xg.jpg"
      }, {
        id: 5,
        name: "米粉",
        url: "../../img/mf.jpg"
      }, {
        id: 6,
        name: "灌芯糖",
        url: "../../img/gxt.jpg"
      }, {
        id: 7,
        name: "香菇",
        url: "../../img/xg.jpg"
      }, {
        id: 8,
        name: "米粉",
        url: "../../img/mf.jpg"
      }, {
        id: 9,
        name: "灌芯糖",
        url: "../../img/gxt.jpg"
      }
    ]
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '正宗黎川特产',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse){
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
  }
})
