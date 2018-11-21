//index.js
//获取应用实例
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    motto: 'Hello World',
    userInfo: null,
    products:[]
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

    // 是否获取授权
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      wx.redirectTo({
        url: '/pages/author/author',
      })
    }

    // 获取商品列表数据
    db.collection('product').field({
      name: true,
      pid: true,
      imgurl: true
    })
      .get()
      .then(res=>{
        // console.log(res);
        if (res.errMsg == "collection.get:ok"){
          this.setData({
            products: res.data
          })
        }else{
          wx.showToast({
            title: '系统繁忙',
            icon: 'none',
            duration: 1000
          });
        }
      })
      .catch(err=>{
        console.error(err);
      })
  }
})
