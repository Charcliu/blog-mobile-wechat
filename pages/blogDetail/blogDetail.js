// pages/blogDetail/blogDetail.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleObj: {},
    detailObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.coffeecola.cn:8080/blog/getBlogDeitailById',
      data: {
        blogId: options.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'POST',
      success: res => {
        this.setData({
          detailObj: res.data
        })
        var article = this.data.detailObj.content;
        var that = this;
        WxParse.wxParse('article', 'md', article, that, 5);
        wx.hideLoading()
      }
    })

    wx.request({
      url: 'https://www.coffeecola.cn:8080/blog/getOneBlogListById',
      data: {
        blogId: options.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'POST',
      success: res => {
        this.setData({
          titleObj: res.data
        })
      }
    })

    wx.request({
      url: 'https://www.coffeecola.cn:8080/blog/addVistorCount',
      data: {
        blogId: options.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': app.globalData.cookie
      },
      method: 'POST'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})