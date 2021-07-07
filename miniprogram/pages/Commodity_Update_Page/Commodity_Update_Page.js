
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    img:[],
    name:"",
    price:"",
    detail:"",
    id:"",
    img_xq:[]
  },
  delete_product:function(e){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除',
      success (res) {
        if (res.confirm) {
          db.collection('product').doc(that.data.id).remove({
            success: function(res) {
              console.log('删除成功',res.data)
              wx.cloud.deleteFile({
                fileList: that.data.img,
                success: res => {
                  // handle success
                  wx.showToast({
                    title: '删除成功！',
                    icon:'success',
                    duration:1000
                  })
                  console.log(res.fileList)
                },
                fail: err => {
                  // handle error
                },
              })
              wx.redirectTo({
                url: '../Commodity_Management_Page/Commodity_Management_Page',
              })
            }
          })
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  // 上传图片
  upload_img:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: 'product/'+timestamp+'.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              img:that.data.img.concat(res.fileID)
            })
          },
          fail: function(res) {
            // handle error
          }
        })
      }
    })
  },
  // 删除图片
  // 删除数组中指定下标
  delete: function (e) {
    let that = this
    // console.log(that.data.img)
    // console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var img= that.data.img;
    img.splice(id,1)
    that.setData({
      img: img
    })
    wx.cloud.deleteFile({
      fileList: [e.currentTarget.dataset.src],
      success: res => {
        // handle success
        console.log(res.fileList)

      },
      fail: err => {
        // handle error
      },
    })
    console.log(that.data.img)
  },
// 商品详情
upload_img_xq:function(){
  let that = this
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success (res) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      console.log("当前时间戳为：" + timestamp);
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      console.log(tempFilePaths)
      wx.cloud.uploadFile({
        cloudPath: 'product/'+timestamp+'.png',
        filePath: tempFilePaths[0], // 文件路径
        success: function(res) {
          // get resource ID
          console.log("成功"+res.fileID)
          that.setData({
            img_xq:that.data.img_xq.concat(res.fileID)
          })
        },
        fail: function(res) {
          // handle error
        }
      })
    }
  })
},
// 删除图片
// 删除数组中指定下标
delete_xq: function (e) {
  let that = this
  console.log(that.data.img_xq)
  console.log(e.currentTarget.dataset.id)
  var id = e.currentTarget.dataset.id;
  var img_xq= that.data.img_xq;
  img_xq.splice(id,1)
  that.setData({
    img_xq: img_xq
  })
  wx.cloud.deleteFile({
    fileList: [e.currentTarget.dataset.product_xq_src],
    success: res => {
      // handle success
      console.log(res.fileList)
    },
    fail: err => {
      // handle error
    },
  })
  console.log(that.data.img_xq)
},
  submit:function(e){
    wx.showLoading({
      title: '更新中',
    })
    let that = this
    console.log(e.detail.value)
    if(e.detail.value.name!==""&&e.detail.value.price!==""&&e.detail.value.fenlei!==""&&e.detail.value.detail!==""&&that.data.img.length!==0){
      db.collection('product').doc(that.data.id).update({
        data:{
          name:e.detail.value.name,
          price:e.detail.value.price,
          fenlei:e.detail.value.fenlei,
          detail:e.detail.value.detail,
          src:that.data.img,
          num:0,
          product_xq_src:that.data.img_xq
        },success:function(res){
          wx.hideLoading()
          wx.showToast({
            title: '更新成功',
          })
          wx.redirectTo({
            url: '../Commodity_Update_Page/Commodity_Update_Page',
          })
        },
        fail:function(err){
          console.log("提交失败"+err);
        }
      })
    }else{
      wx.showToast({
        title: '你还有未填信息',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:"数据加载中"
    })
    let that = this
    console.log(options)
    that.setData({
      id:options.id
    })
    db.collection('fenlei').get({
      success:function(res){
        wx.hideLoading()
        console.log('分类获取成功',res)
    // console.log("optionID为"+that.data.id);
        that.setData({
          fenlei:res.data
        })
      },fail:function(res){
        console.log('分类获取失败',res)
      }
    })
    db.collection('product').doc(options.id).get({
      success:function(res){
        console.log('信息获取成功',res.data.product_xq_src)
        that.setData({
          name:res.data.name,
          price:res.data.price,
          detail:res.data.detail,
          img:res.data.src,
          'img_xq[0]':res.data.product_xq_src
        })
      },fail:function(res){
        console.log('分信息获取失败',res)
      }
    })
  }
})