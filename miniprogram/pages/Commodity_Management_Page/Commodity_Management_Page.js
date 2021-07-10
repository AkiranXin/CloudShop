var appData = getApp().globalData;

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var is_admin = appData.merchant_account.is_admin;
    console.log(is_admin)
    wx.showLoading({
      title:"数据加载中"
    })
    let that = this
    if(is_admin==true){
      //获取所有商品
      wx.cloud.callFunction({
        name:"get_product",
        success:function(res){
          wx.hideLoading()
          console.log('订单详情获取成功',res)
          that.setData({
            product:res.result.data
          })
        },fail:function(res){
          wx.hideLoading()
          console.log('订单详情获取失败',res)
        }
      })
    }else if(is_admin==false){
      //获取商户自己商品
      wx.cloud.callFunction({
        name:"get_ownProduct",
        success:function(res){
          wx.hideLoading()
          console.log('订单详情获取成功',res)
          that.setData({
            product:res.result.data
          })
        },fail:function(res){
          wx.hideLoading()
          console.log('订单详情获取失败',res)
        }
      })
    }
    
  },



  onShow: function (options) {
    let that = this
    that.onLoad()
  }
})