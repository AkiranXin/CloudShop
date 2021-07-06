const db = wx.cloud.database()
var appData = getApp().globalData;
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    order:{
      shipping_num:0,
      finish_num:0
    }
  },
  cc:function(){
    
  },

  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    });
  },

  onShow(){
    //获得相关状态订单数量
    let that = this
    db.collection('order').where({
      product_state:'送货中',
      _openid:appData.openid
    }).get({
      success:function(res){
        that.setData({
          'order.shipping_num':res.data.length,
        })
      }
    })
    db.collection('order').where({
      product_state:'已送达',
      _openid:appData.openid
    }).get({
      success:function(res){
        that.setData({
          'order.finish_num':res.data.length
        })
      }
    })
  },

  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  },
  address:function(e){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                }
              })
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  }
  

  
})