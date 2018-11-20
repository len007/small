// pages/sales/sales.js
const app = getApp();
const db = wx.cloud.database();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    openid: '',
    sales:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.util
    this.setData({
      userInfo: app.globalData.userInfo,
      openid: app.globalData.openid
    });
    var that = this;
    db.collection('sales').where({
      openid: this.data.openid
    }).get({
      success: function (res) {
        console.log(res.data);
        if (res.errMsg ==='collection.get:ok'&&res.data.length >= 0) {
          for (var i = 0; i < res.data.length; i++){
            res.data[i].purchasetime = util.formatTime(new Date(res.data[i].purchasetime));
          }
          that.setData({
            sales: res.data
          });
        }
      }
    });
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