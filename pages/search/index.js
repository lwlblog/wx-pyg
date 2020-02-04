import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({
  data: {
    goods: [],
    isFocus: false,
    inputValue: ''
  },
  // 防抖
  TimeId: 1,
  handleInput(e) {
    const { value } = e.detail;
    // 检测合法性
    if(!value.trim()) {
      // 值不合法 为空值 重置数组和隐藏按钮
      this.setData({
        goods: [],
        isFocus: false
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    // 发送请求
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  // 获取搜索数据
  async qsearch(query) {
    const goods = await request({url: '/goods/qsearch', data: {query}});
    this.setData({
      goods
    })
  },
  // 取消按钮点击事件
  handleCancle() {
    this.setData({
      inputValue: '',
      goods: [],
      isFocus: false
    })
  }
})