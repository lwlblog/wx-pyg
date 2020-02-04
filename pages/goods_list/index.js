import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        title: '综合',
        isActive: true
      },
      {
        id: 1,
        title: '销量',
        isActive: false
      },
      {
        id: 2,
        title: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },

  // 请求数据
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.QueryParams.cid = options.cid || '';
    this.QueryParams.query = options.query || '';
    this.getGoodsList();
  },

  /**
   * 获取商品列表数据
   */
  async getGoodsList() {
    const result = await request({url: '/goods/search', data: this.QueryParams});
    this.totalPages = Math.ceil(result.total/this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },

  /**
   * 子向父转递数据
   */
  handleItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((item, i) => item.isActive = index === i ? true : false);
    this.setData({
      tabs
    })
  },

  /**
   * 页面上滑事件
   */
  onReachBottom() {
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({title: '没有数据了'});
    } else {
      this.QueryParams.pagenum ++;
      this.getGoodsList();
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
})