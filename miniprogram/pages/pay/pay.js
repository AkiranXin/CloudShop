// pages/pay/pay.js
const util = require('../../utils/util.js')
const  db = wx.cloud.database()
var appData = getApp().globalData;
var product_contain_merchant = [];
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
    beizhu:"",
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
        that.get_money_sum();
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
    });
  },

  // add_into_merchant(){
  //   var that = this;
  //   //遍历商品存在的商店
  //   for(var i=0;i<that.data.product.length;i++){
  //     var product_item = that.data.product[i];
  //     db.collection('product').where({
  //       _id:product_item.product_id
  //     }).get({
  //       success(res){
  //           var merchant = res.data[0]._openid;
  //           //如果没有此商户 加入商户列表
  //           var isExist = false;
  //           for(var j=0;j<product_contain_merchant.length;j++){
  //             var temp = product_contain_merchant[j];
  //               if(temp.merchant_id === merchant){
  //                 isExist = true;
  //                 temp.product.push(product_item);
  //                 product_contain_merchant[j] = temp;
  //               }
  //           }
  //           if(!isExist){
  //             var temp = {
  //               merchant_id:merchant,
  //               product:[product_item]
  //             };
  //             product_contain_merchant.push(temp);
  //             console.log(product_contain_merchant)
  //           }
  //       }
  //     })
  //   }
  // },

  pay:function(e){

    let that = this
    var DATE = util.formatDate(new Date());
    if(that.data.name!==""&&that.data.address!==""&&that.data.phone_number!==""){

      //发送订阅消息
      wx.requestSubscribeMessage({
        tmplIds: ['RsgWT2Vu40U4K1ORjYrFVCnDrTJ2BB1-O1BGym2WeJw'],
        success(res){
          // that.add_into_merchant();
          wx.showLoading({
            title: '执行中',
          });
          wx.request({
            url:'https://api.kinlon.work/focus_assistant/wechat_message/',
            method:'GET',
            data:{
              openid:appData.openid,//用户openid
              order_id:'cbddf0af60dd56a313d97a8d0491c81c',//订单编号
              amount:that.data.money,//订单金额
              page:'index',//点击消息跳转界面
              msg:'送货中'//订单即将状态
            },
            success(res){
                for(var i=0;i<that.data.product.length;i++){
                  that.add_product(that.data.product[i]);
                }
          wx.hideLoading({
            success: (res) => {
              wx.switchTab({
                url: '../Index_cart/Index_cart',
                 });
            },
          })
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


  add_product(current_products){
    var that = this;
    // console.log('当前商品',current_products)
    db.collection('order').add({
      data:{
        name:that.data.name,
        phone_number:that.data.phone_number,
        address:that.data.address,
        beizhu:that.data.beizhu,
        money:current_products.product_num * current_products.product_price,
        product:[current_products],
        time:util.formatDate(new Date()),
        product_state:"送货中",
        merchant_openid:current_products._openid//商户id
      },success:function(res){
        console.log('下单成功',res)
        wx.cloud.callFunction({
          name:"product_delet",
          data:{
          },
          success:function(res){
            console.log('购物车删除成功',res)

              wx.cloud.callFunction({
                name:"inc_product_num",
                data:{
                  product_id:current_products.product_id
                },success:function(res){
                  console.log('商品销量自加成功',res)
                }
              })

          },fail:function(res){
            console.log('购物车删除失败',res)
          }
        })
      },fail:function(res){
        console.log('下单失败',res)
      }
    });
  },


  close:function()
  {
    wx.switchTab({
      url: '../Index_cart/Index_cart',
    })
  }

  
})