// pages/user/index.js
Page({
  data: {
    userinfo: {},
    // 收藏商品数量
    collectNums: 0
  },
  onShow(){
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];
    
    this.setData({
      userinfo,
      collectNums: collect.length
    })
  }
})