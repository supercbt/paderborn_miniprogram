const cloud = require('wx-server-sdk')
cloud.init({
  env:"homework-7gii7l2555f9fe8e",
  traceUser:true
})
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  const countResult = await db.collection(event.id).count()
  // const total = countResult.total
  // const batchTimes = Math.ceil(total / 100)
  // const tasks = []
  // for (let i = 0; i < batchTimes; i++) {
  //   const promise = db.collection(event.id).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
  //  tasks.push(promise)
  // }
  // return (await Promise.all(tasks)).reduce((acc, cur) => {
  //   return {
  //     data: acc.data.concat(cur.data),
  //     errMsg: acc.errMsg,
  //   }
  // })
  const fans = db.collection(event.id).skip(event.time*60).limit(60).get()
  return await fans
  
}