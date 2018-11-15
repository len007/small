// pages/detail/detail.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    action: true,
    autoplay:true,
    circular: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [],
    detailId:0,
    userInfo:{},
    openid:"",
    product:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailId: options.id,
      userInfo: app.globalData.userInfo,
      openid: app.globalData.openid
    });
    var that = this;
    db.collection('product').where({
      _openid: this.openid,
      pid: this.data.detailId
    }).get({
      success: function (res) {
        if(res.data.length>0){
          wx.setNavigationBarTitle({
            title: res.data[0]['name'],
          });
          var tmpUrls = [];
          for (var i = 0; i < res.data[0]['imgurl'].length;i++){
            tmpUrls.push(res.data[0]['imgurl'][i]);
          }
          that.setData({
            product : res.data[0],
            imgUrls : tmpUrls
          });
        }
      }
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
  onShareAppMessage: function (res) {
    return {
      title: '黎川特产-'+this.data.product['name'],
      path: '/pages/detail/detail?id=' + this.data.detailId
    }
  },
  openSale : function(){
    this.setData({
      action: true
    })
  },
  closeSale: function(){
    this.setData({
      action: false
    })
  },
  stopBoll:function(){

  }
})