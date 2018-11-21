//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    userInfo: null,
    navbar: [{
      name: "我的订单",
      img: "../../img/icon/sales-icon.png"
    }, {
      name: "收货地址",
      img: "../../img/icon/location-icon.png"
    }, {
      name: "咨询与反馈",
      img: "../../img/icon/help-icon.png"
    }]
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.redirectTo({
        url: '/pages/author/author',
      })
    }
    this.getAdmin();
  },
  getAdmin: function() {
    var that = this;
    if (app.globalData.openid) {
      db.collection('admins').where({
        openid: app.globalData.openid
      }).get({
        success: res => {
          // console.log(res);
          if (res.data.length > 0 && res.data[0] && res.data[0].isadmin) {
            var navbar = that.data.navbar;
            navbar.push({
              name: "添加商品(限管理员)",
              img: "../../img/icon/edit-icon.png"
            });
            that.setData({
              navbar: navbar
            })
          }
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },
  redirectFunc: function(event) {
    var action = event['currentTarget']['dataset']['action'];
    var navUrl = '';
    switch (action) {
      case 0:
        navUrl = "/pages/sales/sales";
        break;
      case 1:
        navUrl = "/pages/location/location";
        break;
      case 2:
        navUrl = "/pages/suggestion/suggestion";
        break;
      case 3:
        navUrl = "/pages/addproduct/addproduct";
        break;
    }
    wx.navigateTo({
      url: navUrl,
    })
  }
})