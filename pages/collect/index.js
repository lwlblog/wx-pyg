Page({
  data: {
    collect: [],
    tabs: [
      {
        id: 0,
        title: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        title: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        title: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        title: '浏览足迹',
        isActive: false
      }
    ]
  },
  onShow() {
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect
    })
  },
  handleItemChange(e) {
    // 获取被点击的标题索引
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((item, i) => item.isActive = index === i ? true : false);
    this.setData({
      tabs
    })
  },
})