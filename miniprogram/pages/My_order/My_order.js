
const db = wx.cloud.database()
var appData = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      order:[],
      state:"送货中",
      state_if_change:false
  },
  // 选择事件
  xuanze:function(e){
    let that = this
    console.log(e)
    that.setData({
      state:e.currentTarget.dataset.state,
      state_if_change:true
    })
    that.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!this.data.state_if_change){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options
    
    this.setData({
      state:options.state
    })
  }


    let that = this
    db.collection('order').where({
      product_state:that.data.state,
      _openid:appData.openid
    }).get({
      success:function(res){
        console.log('订单获取成功',res)
        that.setData({
          order:res.data
        })
      },fail:function(res){
        console.log('订单获取失败',res)
      }
    })
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