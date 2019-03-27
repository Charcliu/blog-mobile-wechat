// pages/blogList/blogList.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogList: [],
    pageNum: 1,
    pageSize: 10,
    pages: 0
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function(options) {
    if (app.globalData.cookie) {
      this.getBlogList()
    } else {
      // 设置回掉，防止BlogList加载在Login之前
      app.getMyBlogCallBack = (res) => {
        this.getBlogList()
      }
    }
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
    this.setData({
      pageNum: 1
    })
    this.getBlogList('top')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.pageNum < this.data.pages) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getBlogList('bottom')
    } else {
      wx.showToast({
        title: '到底啦！！！',
        icon: 'success',
        duration: 1000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  convertTime(data) {
    data.forEach(item => {
      item.time = util.formatTime(new Date(item.time))
    })
  },
  getBlogList(type) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.coffeecola.cn:8080/blog/getMyBlog',
      data: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      },
      header: {
        'content-type': 'application/json',
        'cookie': app.globalData.cookie
      },
      method: 'POST',
      success: res => {
        let blogList = []
        this.convertTime(res.data.list)
        type === 'bottom' ? blogList = [...this.data.blogList, ...res.data.list] : blogList = res.data.list
        this.setData({
          blogList: blogList,
          pages: res.data.pages
        })
        wx.stopPullDownRefresh()
        wx.hideLoading()
      }
    })
  },
  goToDetail(event) {
    wx.navigateTo({
      url: '/pages/blogDetail/blogDetail?id=' + event.currentTarget.id
    })
  }
})