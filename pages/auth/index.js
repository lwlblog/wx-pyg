import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { login } from "../../utils/asyncWx.js"
Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try{
      const { encryptedData, rawData, iv, singnature } = e.detail;
      // 获取小程序登陆成功后的code
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, singnature, code };
      // 获取用户token
      const { token } = await request({url: "/users/wxlogin", data: loginParams, method: "post"});
      // 把token存入缓存中，跳回上一个页面
      wx.setStorageSync("token", token);
      wx.wx.navigateBack({
        delta: 1
      });
    } catch(error) {
      console.log(error);
    }
  }
})