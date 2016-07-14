import _ from 'lodash'

const polyfill = (context, name, fun) => {
  if (_.isUndefined(context[name])) {
    context[name] = fun
  }
}

//  为Date对象添加日期格式化的函数
//  对Date的扩展,将 Date 转化为指定格式的String
//  月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符,
//  年(y)可以用 1-4 个占位符,毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//  例:
//  (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//  (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
polyfill(Date.prototype, 'format', function (fmt) {
  const o = {
    'M+': this.getMonth() + 1,                    // 月份
    'd+': this.getDate(),                         // 日
    'h+': this.getHours(),                        // 小时
    'm+': this.getMinutes(),                      // 分
    's+': this.getSeconds(),                      // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3),  // 季度
    'S': this.getMilliseconds()                   // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    let v = o[k]
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? v : `00${v}`.substr(`${v}`.length))
    }
  }
  return fmt
})

