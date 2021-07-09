const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    name:"",
    xiaopai:true,
    jiaPai:true,
    xuan:true,
    xiao:false,
    jia:false
  },
  // 比较函数
  compare:function (property) {
    return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value2 - value1;
    }
  },

  // 点击事件
  xuanze:function(e){
    let that = this
    if(e.currentTarget.dataset.xuanze=='num'){
      console.log(e)
      var flag=!that.data.xiaopai
      var res;
      if(flag){
        res = that.data.product.sort(that.compare('num'));
      }else{
        res=that.data.product.sort(that.compare('num')).reverse();
      }
      that.setData({
        product:res,
        xiaopai:flag,
        xiao:true,
        xuan:false,
        jia:false
      })
    }else if(e.currentTarget.dataset.xuanze=='price'){
      console.log(e)
      var flag=!that.data.jiapai
      var res;
      if(flag){
        res = that.data.product.sort(that.compare('price'));
      }else{
        res=that.data.product.sort(that.compare('price')).reverse();
      }
      that.setData({
        product:res,
        jiapai:flag,
        xiao:false,
        xuan:false,
        jia:true
      })
    }else{
      that.setData({
        xiao:false,
        xuan:true,
        jia:false
      })
    }
    // console.log(e)
    // var res = that.data.product.sort(that.compare(e.currentTarget.dataset.xuanze));
    // var flag=!that.data.xiaopai
    //   that.setData({
    //     product:res,
    //     xiaopai:flag
    //   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      name:options.name
    })
    db.collection('product').where({
      fenlei:options.name
    }).get({
      success:function(res){
        console.log('获取商品成功',res)
        that.setData({
          product:res.data
        })
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