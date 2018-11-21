// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async(event, context) => {
  if (event.action === 'delete') {
    try {
      return await db.collection('carts').where({
        pid: event['pid'],
        openid: event['userInfo']['openId']
      }).remove()
    } catch (e) {
      return e;
    }
  } else {
    try {
      var result = await db.collection('carts').where({
        pid: event['pid'],
        openid: event['userInfo']['openId']
      }).count();
      if (result.total == 0) {
        try {
          return await db.collection('carts').add({
            data: {
              pid: event['pid'],
              salescount: event.salesCount,
              name: event.name,
              imgurl: event.imgurl,
              unitprice: event.unitprice,
              openid: event['userInfo']['openId']
            }
          })
        } catch (e) {
          return e;
        }
      } else if (result.total > 0) {
        try {
          return await db.collection('carts').where({
              pid: event['pid'],
              openid: event['userInfo']['openId']
            })
            .update({
              data: {
                salescount: _.inc(event.salesCount)
              },
            })
        } catch (e) {
          return e;
        }
      }
    } catch (e) {
      return e;
    }
  }
  return event;
}