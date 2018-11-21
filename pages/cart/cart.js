//获取应用实例
const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    cartsCount: [],
    openid: '',
    action: 'show'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!(app.globalData.openid)) {
      wx.cloud.callFunction({
        name: "getOpenId",
        data: {}
      }).then(res => {
        // console.log(res);
        this.setData({
          openid: res.result["OPENID"]
        });
        this.getCarts();
      }).catch(err => {
        console.log(err);
      });
    }
  },
  turnEdit: function(){
    this.setData({
      action: 'edit'
    })
  },
  commitEdit: function () {
    this.setData({
      action: 'show'
    })
  },
  addCartsCount: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var cartsCount = this.data.cartsCount;
    if (cartsCount[idx] < 99) {
      cartsCount[idx] += 1;
    }
    this.setData({
      cartsCount: cartsCount
    })
    console.log(this.data.cartsCount);
  },
  cutCartsCount: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var cartsCount = this.data.cartsCount;
    if (cartsCount[idx] > 1) {
      cartsCount[idx] -= 1;
    }
    this.setData({
      cartsCount: cartsCount
    })
    console.log(this.data.cartsCount);
  },
  checkboxChange: function(event) {
    console.log(event);
  },
  getCarts: function() {
    var that = this;
    db.collection('carts').where({
      openid: this.data.openid || app.globalData.openid
    }).get({
      success: function(res) {
        console.log(res);
        if (res.data.length > 0) {
          var cartsCount = [];
          for (var cart = 0; cart < res.data.length; cart++) {
            cartsCount.push(res.data[cart].salescount);
          }
          that.setData({
            carts: res.data,
            cartsCount: cartsCount
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
    this.getCarts();
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