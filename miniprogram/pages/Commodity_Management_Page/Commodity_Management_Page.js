
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name:"get_product",
      data:{
        
      },success:function(res){
        console.log('订单详情获取成功',res)
        that.setData({
          product:res.result.data
        })
      },fail:function(res){
        console.log('订单详情获取失败',res)
      }
    })
  },



  onShow: function (options) {
    let that = this
    wx.cloud.callFunction({
      name:"get_product",
      data:{
      },success:function(res){
        console.log('订单详情获取成功',res)
        that.setData({
          product:res.result.data
        })
      },fail:function(res){
        console.log('订单详情获取失败',res)
      }
    })
  }
})