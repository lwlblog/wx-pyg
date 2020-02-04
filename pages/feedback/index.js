Page({
  data: {
    tabs: [
      {
        id: 0,
        title: '体验问题',
        isActive: true
      },
      {
        id: 1,
        title: '商品、商家反馈',
        isActive: false
      }
    ],
    chooseImgs: [],
    // 文本域内容
    textVal: ''
  },
  // 外网的图片的路径数组
  UploadImgs: [],
  // Tab 栏切换
  handleItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((item, i) => item.isActive = index === i ? true : false);
    this.setData({
      tabs
    })
  },
  // 选择照片
  handleChooseImg() {
    // 调用小程序内部原则图片 api
    wx.chooseImage({
      // 同时选中图片的数量
      count: 9,
      // 图片的格式 原图 压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  // 点击删除图片
  handleRemoveImg(e) {
    console.log(e)
    // 获取被点击的组件索引
    const { index } = e.currentTarget.dataset;
    // 获取data中的图片数组
    let { chooseImgs } = this.data;
    // 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 点击提交事件
  handleFormSubmit() {
    // 获取文本域内容 图片数组
    const { textVal, chooseImgs } = this.data;
    // 合法验证
    if(!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    // 上传图片到专门的服务器 图床
    // 显示正在等待图标
    wx.showLoading({
      title: '正在上传中',
      mask: true
    });
    // 判断有没有需要上传的图片数组
    if(chooseImgs.length !== 0) {
      // 上传文件的 api 不支持 多个文件同时上传  遍历数组 挨个上传
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          // 图片上传路径 图床
          url: 'https://images.ac.cn/api/upload',
          // 被上传文件的路径
          filePath: v,
          // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
          name: "file",
          // 顺带的文本信息
          formData: {},
          success: (result) => {
            let url = JSON.parse(result.data).url;
            this.UploadImgs.push(url);

            // 所有的文件都上传完毕才触发
            if(i === chooseImgs.length-1) {
              // 关闭等待图标
              wx.hideLoading();
              // 发送请求  暂时没有接口  模拟
              console.log('把文本的内容和外网的图片数据 提交到后台中');
              // 重置页面
              this.setData({
                textVal: '',
                chooseImgs: []
              });
              // 返回上一页面
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    }else{
      wx.hideLoading();
      console.log('向后台只提交了文本')
    }
  }
})