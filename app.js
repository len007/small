//app.js
App({
  onLaunch: function() {
    wx.cloud.init({
      env: 'len007-4fe07e',
      traceUser: true
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.cloud.callFunction({
          name: "getOpenId",
          data: {}
        }).then(res => {
          this.globalData.openid = res.result["OPENID"];
          // console.log(this.globalData);
        }).catch(err => {});
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // console.log('已授权');
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.redirectTo({
            url: '/pages/author/author',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    appid: "wx89d147cca3fc7464",
    openid: "",
    isAdmin: false
  }
})