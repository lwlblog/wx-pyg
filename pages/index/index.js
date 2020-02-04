import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

  /**
   * 获取轮播图数据
   */
  async getSwiperList() {
    const result = await request({url: '/home/swiperdata'});
    this.setData({
      swiperList: result
    })
  },

  /**
   * 获取导航数据
   */
  async getCatesList() {
    const result = await request({url: '/home/catitems'});
    this.setData({
      catesList: result
    })
  },

  /**
   * 获取楼层数据
   */
  async getFloorList() {
    const result = await request({url: '/home/floordata'});
    this.setData({
      floorList: result
    })
  }
})