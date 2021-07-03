

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    product:[],
    fenlei_now:""
  },
  get_product_fenlei:function(e){
    let that = this
    that.setData({
      fenlei_now:e.currentTarget.dataset.name
    })
    that.get_product()
  },
  // 获取当前分类的商品
  get_product:function(){
    let that = this
    db.collection('product').where({
      fenlei:that.data.fenlei_now
  }).get({
    success:function(res){
      console.log('获取分类成功',res)
      that.setData({
        product:res.data
      })
    },fail:function(res){
      console.log('获取分类成功',res)
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    db.collection('fenlei').get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          fenlei:res.data
        })
      },fail:function(res){
        console.log('获取分类成功',res)
      }
    })
    db.collection('product').where({
        fenlei:"手机"
    }).get({
      success:function(res){
        console.log('获取分类成功',res)
        that.setData({
          product:res.data
        })
      },fail:function(res){
        console.log('获取分类成功',res)
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