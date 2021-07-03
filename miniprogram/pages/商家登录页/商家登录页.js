// pages/store_login/store_login.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formsubmit:function(e){
    console.log(e)
    if(e.detail.value.zhanghu!==""&&e.detail.value.pwd!==""){
      db.collection('user').where({
            zhanghu:e.detail.value.zhanghu,
            pwd:e.detail.value.pwd
          }).get({
            success:function(res){
               console.log(res)
              if(res.data.length == 0){
                wx.showToast({
                  title: '账户或密码错误',
                  icon:"none"
                })
              }else{
                wx.redirectTo({
                  url: '../商户管理页/商户管理页',
                })
              }
            },fail:function(res){
              console.log(res)
            }
          })
    }else{
      wx.showToast({
        title: '你还有信息未填',
        icon:"none"
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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