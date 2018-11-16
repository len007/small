// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('product').where({
      pid: event['pid']
    }).update({
        data: {
          laudcount: event['action']=='a' ? _.inc(1):_.inc(-1)
        },
      })
  } catch (e) {
    console.error(e)
  }
}