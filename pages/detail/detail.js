// pages/detail/detail.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLauded: false,
    guigeChoosed: true, // 规格种类是否被选中
    action: false, // 是否显示 规格选择弹窗
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [], //商品图片集
    detailId: 0, //商品内部ID
    userInfo: {},
    openid: "", // 用户 openid
    product: {}, // 当前商品的信息
    salesCount: 1, // 规格
    cartsCount: 0 //数据库中购物车已有的商品记录量，包含其他商品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      detailId: options.id,
      userInfo: app.globalData.userInfo,
      openid: app.globalData.openid
    });
    var that = this;
    db.collection('product').where({
      pid: this.data.detailId
    }).get({
      success: function(res) {
        if (res.data.length > 0) {
          wx.setNavigationBarTitle({
            title: res.data[0]['name'],
          });
          var tmpUrls = [];
          for (var i = 0; i < res.data[0]['imgurl'].length; i++) {
            tmpUrls.push(res.data[0]['imgurl'][i]);
          }
          that.setData({
            product: res.data[0],
            imgUrls: tmpUrls
          });
        }
      }
    });
    this.getCartsCount();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getCartsCount();
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
  getCartsCount: function() {
    var that = this;
    db.collection('carts').where({
      openid: this.data.openid
    }).count({
      success: function(res) {
        // console.log(res.total);
        that.setData({
          cartsCount: res.total
        })
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '黎川特产-' + this.data.product['name'],
      path: '/pages/detail/detail?id=' + this.data.detailId
    }
  },
  openSale: function() {
    this.setData({
      action: true
    });
  },
  closeSale: function() {
    this.setData({
      action: false
    })
  },
  stopBoll: function() {},
  laudProduct: function(event) { // 点赞商品
    var that = this;
    var action = event['currentTarget']['dataset']['action']
    wx.cloud.callFunction({
      name: 'updateProduct',
      data: {
        pid: this.data.detailId,
        action: action
      }
    }).then(res => {
      if (res.result['errMsg'] === "collection.update:ok" && res.result['stats']['updated'] == 1) {
        var product = that.data.product;
        if (action === 'a') {
          product['laudcount'] += 1
          
        } else {
          product['laudcount'] -= 1
        }
        that.setData({
          isLauded: true,
          product: product
        });
        wx.showToast({
          title: action === 'a'?'已赞':'已取消赞',
          icon: 'success',
          duration: 1000
        });
      }
    }).catch(err => {
      wx.showToast({
        title: '系统繁忙，请尝试重新进入',
        icon: 'warn',
        duration: 1000
      });
    });
  },
  addSalesCount: function() {
    if (this.data.salesCount < 99) {
      this.setData({
        salesCount: this.data.salesCount + 1
      })
    }
  },
  cutSalesCount: function() {
    if (this.data.salesCount > 1) {
      this.setData({
        salesCount: this.data.salesCount - 1
      })
    }
  },
  addCartRecord: function() {
    wx.cloud.callFunction({
      name: "addCartRecord",
      data: { // 这里不需要加openid，云函数里自带的
        pid: this.data.detailId,
        salesCount: this.data.salesCount
      }
    }).then(res => {
      // console.log(res);
      if (res.result['errMsg'] === "collection.add:ok") {
        this.setData({
          action: false
        });
        this.getCartsCount();
        wx.showToast({
          title: '商品已加入购物车',
          icon: 'success',
          duration: 2000
        });
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'warn',
        duration: 2000
      })
    });
  },
  redirectToHome: function() {
    wx.switchTab({
      url: '/pages/index/index',
    });
  }
})