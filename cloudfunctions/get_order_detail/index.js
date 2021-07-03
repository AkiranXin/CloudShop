const cloud = require('wx-server-sdk')

cloud.init({
  env:"testdb123-90eht"
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('order').doc(event.id).get()
}