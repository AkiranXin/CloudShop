const db = wx.cloud.database()
var appData = getApp().globalData;
Page({
  data: {
    banner:[],
    fenlei:[],
    product:[],
    search:[],
    num:20,
    ss:false,
    inputVal:"",
    flag:0
  },
  // 分类跳转事件
  fenlei:function(e){
    console.log(e)
  },

  input_value(e){
    this.setData({
      inputVal:e.detail.value
    })
  },

  search1:function(e){
    var serachInput=e.currentTarget.dataset.search||e.detail.value
    let that = this
    db.collection('product')
    .where({
      // name:e.detail.value
      name:{					
        //columnName表示欲模糊查询数据所在列的名
        // $regex:'.*' + e.detail.value + '.*',		
        $regex:'.*' + serachInput + '.*',		
        //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
        $options: 'i'							
        //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
      }
    })
    .get({
      success:function(res){
        that.setData({
          search:res.data,
          flag:1
        })
        console.log('搜索成功！',that.data.search)
        if(that.data.search == ""){
          wx.showToast({
            title: '未找到商品',
            icon:"none"
          })
        }
      },
      fail:function(res){
        console.log('搜索失败',res)
      },
    })
  },
  getOpenId() {
   wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      appData.openid = resp.result.openid;
   }).catch((e) => {
      this.setData({
        showUploadTip: true
      })
    })
  },
  cancle:function(options){
    var that=this;
    that.setData({
      inputVal:''
    })
  },
  onLoad: function() {
    this.getOpenId()
    let that = this
    db.collection('swiper').get({
      success:function(res){
        console.log('轮播图获取成功',res)
        that.setData({
          banner:res.data
        })
      },
      fail:function(res){
        console.log('轮播图获取失败',res)
      },
    })
    db.collection('fenlei').get({
      success:function(res){
        console.log('分类获取成功',res)
        that.setData({
          fenlei:res.data
        })
      },
      fail:function(res){
        console.log('分类获取失败',res)
      },
    })
    db.collection('product').get({
      success:function(res){
        console.log('商品获取成功',res)
        that.setData({
          product:res.data
        })
      },
      fail:function(res){
        console.log('商品获取失败',res)
      },
    })
  },
  onShow:function(e){
    let that = this
    db.collection('swiper').get({
      success:function(res){
        console.log('轮播图获取成功',res)
        that.setData({
          banner:res.data
        })
      },
      fail:function(res){
        console.log('轮播图获取失败',res)
      },
    })
    db.collection('fenlei').get({
      success:function(res){
        console.log('分类获取成功',res)
        that.setData({
          fenlei:res.data
        })
      },
      fail:function(res){
        console.log('分类获取失败',res)
      },
    })
    db.collection('product').get({
      success:function(res){
        console.log('商品获取成功',res)
        that.setData({
          product:res.data
        })
      },
      fail:function(res){
        console.log('商品获取失败',res)
      },
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    wx.showLoading({
      title: '刷新中！',
      duration: 1000
    })
    let old_data = that.data.product
    const db = wx.cloud.database()
    db.collection('product').skip(that.data.num)
      .get()
      .then(res => {
      // 利用concat函数连接新数据与旧数据
      // 并更新emial_nums  
        this.setData({
          product: old_data.concat(res.data),
          num:that.data.num+20
        })
        if(res.data==""){
          wx.showToast({
          icon: 'none',
          title: '已经加载完毕'
        })
        }
      })
      .catch(err => {
        console.error(err)
      })
    console.log('circle 下一页');
  },
  inputFocus(e){
    console.log("input focus");
    this.setData({
      flag:1
    })
 },
 inputBlur(e){
  console.log("input blur");
  this.setData({
    flag:0,
    inputVal:e.detail.value
  })
},
toSwiperPage:function(options){
  var page=options.currentTarget.dataset.page;
  if(page=="0"){
    wx.navigateTo({
      url: '../swiperOne/swiperOne',
    })
  }else if(page=="1"){
    wx.navigateTo({
      url: '../swiperTwo/swiperTwo',
    })
  }else{
    wx.navigateTo({
      url: '../swiperThree/swiperThree',
    })
  }
}
})