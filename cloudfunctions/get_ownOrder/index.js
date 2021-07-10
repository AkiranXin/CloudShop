// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"testdb123-90eht"
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
 
  return await db.collection('order').where({
    merchant_openid:wxContext.OPENID,
    product_state: event.state,
  }).get()
}