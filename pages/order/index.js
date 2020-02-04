import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        title: '全部订单',
        isActive: true
      },
      {
        id: 1,
        title: '待付款',
        isActive: false
      },
      {
        id: 2,
        title: '待收货',
        isActive: false
      },
      {
        id: 3,
        title: '退款/退货',
        isActive: false
      }
    ]
  },
  // onShow事件无法获取页面传递过来的参数 options，只有onLoad事件可以获取
  // 解决方法：使用小程序页面栈
  onShow() {
    // 判断是否有token
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }

    // 获取当前小程序的页面栈-数组  长度最大是10个页面
    let pages = getCurrentPages();
    // 数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length-1];
    // 获取url上的type参数
    const { type } = currentPage.options;
    // 激活选中页面标题
    this.changeTitleByIndex(type-1);
    this.getOrderList(type);
  },
  // 获取订单列表
  async getOrderList(type) {
    const res = await request({url: '/my/orders/all', data: {type}});
    this.setData({
      // 处理时间
      orders: res.orders.map(v => ({...v, creat_time_cn: (new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((item, i) => item.isActive = index === i ? true : false);
    this.setData({
      tabs
    })
  },
  handleItemChange(e) {
    // 获取被点击的标题索引
    const { index } = e.detail;
    changeTitleByIndex(index);
    // 重新发送请求 type=1 index=0
    this.getOrderList(index+1);
  }
})