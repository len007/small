// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  var newuid;
  if (event.action === 'add') {
    var total = await db.collection('users').where().count();
    newuid = total.total + 1
    newuid = newuid.toString();
  } else if (event.action === 'edit') {
    newuid = event.uid;
  }
  if (event.action === 'add') {
    try {
      return await db.collection('users').add({
        data: {
          name: event.name,
          tel: event.tel,
          locations: event.locations,
          location: event.location,
          uid: newuid,
          openid: event.openid
        }
      })
    } catch (e) {
      console.error(e)
    }
  } else if (event.action === 'edit') {
    try {
      return await db.collection('users').where({
        uid: newuid,
        openid: event.openid
      })
        .update({
          data: {
            name: event.name,
            tel: event.tel,
            locations: event.locations,
            location: event.location
          },
        })
    } catch (e) {
      console.error(e)
    }
  }

}