// 授权页面
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
      wx.switchTab({
        url: '/pages/cart/cart',
        success: res => {
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    }else{
      wx.setNavigationBarTitle({
        title: '公开信息授权',
      })
    }
  },
  getUserInfo: function(e) {
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      wx.showModal({
        title: '获取公开信息授权',
        content: '您拒绝了授权获取您的微信公开信息',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    } else {
      app.globalData.userInfo = e.detail.userInfo;
      wx.switchTab({
        url: '/pages/cart/cart',
        success: res => {
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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