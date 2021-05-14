// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "homework-7gii7l2555f9fe8e",
  traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}