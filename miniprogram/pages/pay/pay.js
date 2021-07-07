// pages/pay/pay.js
const util = require('../../utils/util.js')
const  db = wx.cloud.database()
var appData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    money:0,
    name:"",
    phone_number:"",
    address:"",
    beizhu:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('shopping_cart').where({
      product_checked:"true",
      _openid:appData.openid,
    }).get({
      success:function(res){
        console.log('获取商品成功',res)
        that.setData({
          product:res.data
        })
        that.get_money_sum()
      },fail:function(res){
        console.log('获取商品失败',res)
      }
    })
    console.log(options)
    this.setData({
      money:options.id,
      address:options.address,
      beizhu:options.beizhu,
      name:options.name,
      phone_number:options.phone_number
    })
  },
  pay:function(e){
    let that = this
    var DATE = util.formatDate(new Date());
    if(that.data.name!==""&&that.data.address!==""&&that.data.phone_number!==""){

      //发送订阅消息
      wx.requestSubscribeMessage({
        tmplIds: ['RsgWT2Vu40U4K1ORjYrFVCnDrTJ2BB1-O1BGym2WeJw'],
        success(res){
          wx.request({
            url:'https://api.kinlon.work/focus_assistant/wechat_message/',
            method:'GET',
            data:{
              openid:appData.openid,
              order_id:appData.openid,
              amount:that.data.product.length,
              page:'/Index_me/Index_me'
            },
            success(res){
              console.log(res)


      db.collection('order').add({
            data:{
              name:that.data.name,
              phone_number:that.data.phone_number,
              address:that.data.address,
              beizhu:that.data.beizhu,
              money:that.data.money,
              product:that.data.product,
              time:DATE,
              product_state:"送货中",
              buyer_openid:appData.openid
            },success:function(res){
              console.log('下单成功',res)
              wx.cloud.callFunction({
                name:"product_delet",
                data:{
                },
                success:function(res){
                  console.log('购物车删除成功',res)
                  for(var i= 0;i<that.data.product.length;i++){
                    wx.cloud.callFunction({
                      name:"inc_product_num",
                      data:{
                        product_id:that.data.product[i].product_id
                      },success:function(res){
                        console.log('商品销量自加成功',res)
                      }
                    })
                  }
                  wx.switchTab({
                    url: '../Index_cart/Index_cart',
                  })
                },fail:function(res){
                  console.log('购物车删除失败',res)
                }
              })
            },fail:function(res){
              console.log('下单失败',res)
            }
          });
        }
      })
    }
  });
    }else{
      wx.showToast({
        title: '地址信息有误',
        icon:"none"
      })
    }
    
  },
  close:function()
  {
    wx.switchTab({
      url: '../Index_cart/Index_cart',
    })
  }

  
})