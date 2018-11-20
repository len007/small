// pages/location/location.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    locations: []
  },

  toggleActionAdd: function() {
    wx.navigateTo({
      url: '/pages/location/new/new?action=add&uid=&openid=' + app.globalData.openid,
    })
  },
  toggleActionEdit: function(event) {
    var uid = event['currentTarget']['dataset']['uid'];
    wx.navigateTo({
      url: '/pages/location/new/new?action=edit&uid=' + uid + '&openid=' + app.globalData.openid,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getLocations();
  },
  getLocations: function() {
    var that = this;
    db.collection('users').where({
      openid: app.globalData.openid
    }).get({
      success: function(res) {
        if (res.errMsg == 'collection.get:ok' && res.data.length >= 0) {
          that.setData({
            locations: []
          })
          var mydata = res.data;
          for (var j = 0; j < mydata.length; j++) {
            mydata[j]['address'] = mydata[j]['locations'].join('') + mydata[j]['location'];
          }
          that.setData({
            locations: mydata
          })
        }
      },
      fail: function(err) {
        wx.showToast({
          title: '网络繁忙',
          icon: 'none',
          duration: 1000
        });
      }
    });
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
    this.onLoad();
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
    this.getLocations();
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