import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },

  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取本地数据
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates();
    } else {
      // 定义数据过期时间 5分钟
      if(Date.now() - Cates.time > 1000*60*5) {
        this.getCates();
      } else {
        this.Cates = Cates.data;
        // 重新渲染数据
        let leftMenuList = this.Cates.map(Cates => Cates.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  /**
   * 获取分类数据
   */
  async getCates() {
    const result = await request({ url: '/categories' });
    this.Cates = result;
    // 数据缓存
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });
    // 渲染数据
    let leftMenuList = this.Cates.map(Cates => Cates.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  /**
   * 左侧菜单点击事件
   */
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})