const util = require("../../utils/util");

var appData = getApp().globalData;
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      order:[],
      state:"送货中"
  },
  // 选择事件
  xuanze:function(e){
    let that = this
    that.setData({
      state:e.currentTarget.dataset.state
    })
    that.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var is_admin = appData.merchant_account.is_admin;
    let that = this
    wx.showLoading({
      title: '数据加载中',
    })
    if(is_admin==true){
      wx.cloud.callFunction({
        name:'get_order',
        data:{
          state:that.data.state
        },success:function(res){
          wx.hideLoading()
          console.log('订单获取成功',res)
          that.setData({
            order:util.sort_order_by_time(res.result.data)
          })
        },fail:function(res){
          console.log('订单获取失败',res)
        }
      })
    }else if(is_admin==false){
      wx.cloud.callFunction({
        name:'get_ownOrder',
        data:{
          state:that.data.state
        },success:function(res){
          wx.hideLoading()
          console.log('订单获取成功',res)
          that.setData({
            order:res.result.data
          })
        },fail:function(res){
          console.log('订单获取失败',res)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    that.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})