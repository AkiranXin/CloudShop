const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getQueryString = (url, name) => {
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
      // console.log("r = " + r)
      // console.log("r[2] = " + r[2])
      return r[2]
  }
  return null;
}

const sort_order_by_time = orders =>{
  for(var i=0;i<orders.length;i++)
  {
      for (var j=0; j<orders.length-1-i; ++j){
        var a = new Date(orders[j].time).getTime();
        var b = new Date(orders[j+1].time).getTime();
          if (a < b)
          {
              var buf = orders[j];
              orders[j] = orders[j+1];
              orders[j+1] = buf;
          }
      }
  }
  return orders;
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  sort_order_by_time:sort_order_by_time
}
