
const db = wx.cloud.database();
var appData = getApp().globalData;
Page({


  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    pwd:'',
    re_pwd:'',
    is_register:false
  },
  _name(e){
    this.setData({name: e.detail.value})
  },
  _pwd(e){
    this.setData({pwd: e.detail.value})
  },
  _re_pwd(e){
    this.setData({re_pwd: e.detail.value})
  },

  _register(){
    var current_state = this.data.is_register;
    this.setData({is_register:!current_state});
    //到注册界面
    if(!current_state){
     
    }
    //返回登陆界面
    else{
      this.setData({
        name:appData.merchant_account.name,
        pwd:appData.merchant_account.pwd,
        re_pwd:''
      })
    }
  },

  formsubmit(){
    var that = this;
    //登录
    if(!that.data.is_register){
    if(that.data.name!==""&&that.data.pwd!==""){

      //管理员
      if(that.data.name==="admin"&&that.data.pwd==="admin"){
        appData.merchant_account = {
          name:that.data.name,
          pwd:that.data.pwd,
          is_admin:true
        };
        wx.redirectTo({
          url: '../Merchant_Management_Page/Merchant_Management_Page',
        })
      }

      //非管理员
      else{
      db.collection('user').where({
            _openid:appData.openid,
            zhanghu:that.data.name,
            pwd:that.data.pwd
          }).get({
            success:function(res){
               console.log(res)
              if(res.data.length == 0){
                wx.showToast({
                  title: '账户或密码错误',
                  icon:"none"
                })
              }else{
                appData.merchant_account = {
                  name:that.data.name,
                  pwd:that.data.pwd,
                  is_admin:false
                }
                wx.redirectTo({
                  url: '../Merchant_Management_Page/Merchant_Management_Page',
                })
              }
            },fail:function(res){
              console.log(res)
            }
          })
        }
    }else{
      wx.showToast({
        title: '你还有信息未填',
        icon:"none"
      })
    }
  }

  //注册
  else{
    if(that.data.name==="admin"){
      wx.showToast({
        title: '不可使用此账户信息进行注册',
        icon:"none"
      })
    }

    else if(that.data.name!==""&&that.data.pwd!==""&&that.data.re_pwd===that.data.pwd){
      //查看数据库是否存在
      db.collection('user').where({
        _openid:appData.openid,
      }).get({
        success(res){
          //新用户
          if(res.data.length === 0){
              //加入数据库
              db.collection('user').add({
                data:{
                  zhanghu:that.data.name,
                  pwd:that.data.pwd
                },
                success(res){
                  wx.showToast({
                    title: '注册成功',
                    icon:"none"
                  });
                  appData.merchant_account = {
                    name:that.data.name,
                    pwd:that.data.pwd,
                    is_admin:true
                  }
                  that._register();
                }
              })
          }
          //已存在的老用户
          else{
            wx.showToast({
              title: '您的账户已存在',
              icon:"none"
            })
          }
        }
      })
  }else{
    wx.showToast({
      title: '信息填写有误',
      icon:"none"
    })
  }
  }

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:appData.merchant_account.name,
      pwd:appData.merchant_account.pwd
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