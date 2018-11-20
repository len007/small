// pages/location/location.js
const app = getApp();
const db = wx.cloud.database();
const query = wx.createSelectorQuery()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    action: '',
    uid: '',
    openid: '',
    region: ['北京市', '北京市', '东城区'],
    location: {}
  },
  bindRegionChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uid: options.uid,
      action: options.action,
      openid: app.globalData.openid
    });
    // console.log(this.data);
    if (options.action === 'edit') {
      this.getDetail()
    }
  },
  getDetail: function() {
    var that = this;
    // console.log(that.data.uid);
    db.collection('users').where({
      uid: that.data.uid
    }).get({
      success: function(res) {
        // console.log(res);
        var mylocation = {};
        if (res.errMsg == 'collection.get:ok' && res.data.length >= 0) {
          mylocation = res.data[0];
          that.setData({
            location: mylocation,
            region: mylocation['locations']
          });
        }
      },
      fail: function(err) {
        wx.showToast({
          title: '网络繁忙',
          icon: 'warn',
          duration: 1000
        })
      }
    })
  },
  saveLocation: function(e) {
    var that = this;
    var values = e.detail.value;
    var parrt = RegExp("[1-9][0-9]{10}");
    if (values.username.length < 2 || values.username.length > 8) {
      wx.showToast({
        title: '名称有误',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (!parrt.test(values.tel)) {
      wx.showToast({
        title: '手机号码有误',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (values.location.length < 1) {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.cloud.callFunction({
      name: 'addUsers',
      data: {
        action: that.data.action,
        name: values.username,
        tel: values.tel,
        locations: values.region,
        location: values.location,
        uid: that.data.uid,
        openid: that.data.openid
      }
    }).then(res => {
      // console.log(res);
      if (res.result && (res.result.errMsg === "collection.add:ok" || res.result.errMsg === "collection.update:ok")) {
        wx.showToast({
          title: '地址添加成功',
          icon: 'success',
          duration: 1000
        });
        wx.navigateBack({});
      } else {
        wx.showToast({
          title: '系统繁忙',
          icon: 'none',
          duration: 1000
        });
      }
    }).catch(err => {
      wx.showToast({
        title: '系统繁忙',
        icon: 'none',
        duration: 1000
      });
    });
  },
  rebackList: function() {
    wx.navigateBack({});
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