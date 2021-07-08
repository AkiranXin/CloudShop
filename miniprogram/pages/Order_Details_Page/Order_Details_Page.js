
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    id:"",
    message:''
  },
  // 拨打电话
  phone:function(){
    let that= this
    console.log(that.data.order.phone_number)
    wx.makePhoneCall({
      phoneNumber: that.data.order.phone_number
    })
  },

  songda:function(){
    let that= this
    console.log(that.data.message)
    wx.requestSubscribeMessage({
      tmplIds: ['RsgWT2Vu40U4K1ORjYrFVCnDrTJ2BB1-O1BGym2WeJw'],
      success(res){
        wx.showLoading({
          title: '执行中',
        });
        wx.request({
          url:'https://api.kinlon.work/focus_assistant/wechat_message/',
          method:'GET',
          data:{
            openid:that.data.message.buyer_openid,//用户openid
            order_id:that.data.message._id,//订单编号
            amount:that.data.message.money,//订单金额
            //page:'../Index/Index',//点击消息跳转界面
            msg:"已送达"//订单即将状态
          },
          success(res){
            wx.cloud.callFunction({
              name:'songda',
              data:{
                id:that.data.order._id
              },success:function(res){
                console.log('订单状态更新成功',res)
                wx.showToast({
                  title: '送货成功',
                })
                wx.redirectTo({
                  url: '../Commodity_order_management_page/Commodity_order_management_page',
                })
              },fail:function(res){
                console.log('订单状态更新失败',res)
              }
            })
          }
        })
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    let that = this
    that.setData({
      id:options.id
    })
    db.collection('order').doc(options.id).get({
      success:function(res){
        that.setData({
          message:res.data
        });
        wx.hideLoading();
      }
    })
    wx.cloud.callFunction({
      name:"get_order_detail",
      data:{
        id:options.id
      },success:function(res){
        console.log('订单详情获取成功',res)
        that.setData({
          order:res.result.data
        })
      },fail:function(res){
        console.log('订单详情获取失败',res)
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
    let that = this
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