// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"testdb123-90eht"
})

const db = cloud.database()
//获取用户的openid
exports.main = async (event, context) => {
  return await db.collection('order').where({
    product_state: event.state,
  }).get()
}