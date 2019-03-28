// pages/blogDetail/blogDetail.js
//获取应用实例
const app = getApp()
const Towxml = require('../../towxml/main'); //引入towxml库
var towxml = new Towxml()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    original: null,
    article: [],
    style: 'light',
    imgSrc: '../../images/dark.png'
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
          original: res.data.content
        })
        this.parseData()
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
        wx.setNavigationBarTitle({
          title: res.data.title
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

  },

  parseData() {
    wx.showLoading({
      title: '样式切换中...',
    })
    //将markdown内容转换为towxml数据
    let data = towxml.toJson(
      this.data.original, // `markdown`或`html`文本内容
      'markdown' // `markdown`或`html`
    );
    //设置文档显示主题，默认'light'
    data.theme = this.data.style;
    //设置数据
    this.setData({
      article: data
    });
    wx.hideLoading()
  },

  changStyle() {
    if (this.data.style == 'light') {
      this.setData({
        style: 'dark',
        imgSrc: '../../images/light.png'
      })
      wx.setBackgroundColor({
        backgroundColor: '#000000'
      })
    } else {
      this.setData({
        style: 'light',
        imgSrc: '../../images/dark.png'
      })
      wx.setBackgroundColor({
        backgroundColor: '#ffffff'
      })
    }
    this.parseData()
  }
})