import {
  get
} from 'sortablejs'

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}


/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
 * guid
 */
export const newGuid = () => {
  var guid = "";
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    // if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
    //   guid += "-";
  }
  return guid;
}

/**
 * 循环遍历添加属性
 */
export const objAddAtt = (array) => {
  if (!array) {
    return;
  }
  array.map((item, index) => {
    item._loading = false,
      item.children = []
  });
  return array;
}

// 改值
export const changeTrue = (obj) => {
  obj.addSetting = obj.addSetting == 1 ? false : true;
  obj.hideSetting = obj.hideSetting == 0 ? false : true;
  obj.releaseSetting = obj.releaseSetting == 0 ? false : true;
  return obj;
}

// 改位number
export const changeNumber = (boolean, str) => {
  let number;
  if (str == "addSetting") {
    number = str == "addSetting" && boolean == true ? 0 : 1;
    return number
  }
  if (str == "hideSetting") {
    number = str == "hideSetting" && boolean == true ? 1 : 0;
    return number
  }
  if (str == "releaseSetting") {
    number = str == "releaseSetting" && boolean == true ? 1 : 0;
    return number
  }
}

export const getShijain = () => {
  var date = new Date();
  //年
  var year = date.getFullYear();
  //月
  var month = date.getMonth() + 1;
  //日
  var day = date.getDate();
  //时
  var hh = date.getHours();
  //分
  var mm = date.getMinutes();
  //秒
  var ss = date.getSeconds();
  var rq = year + "-" + month + " " + day + "-" + hh + ":" + mm + ":" + ss;
  // var rq = year + "-" + month + "-" + day;
  return rq;
}

// 获取多少天的气体
export const getRiqi = (count) => {
  if (!count) {
    return;
  }
  let arr = []
  // 获取当前日期
  for (let index = count - 1; index >= 0; index--) {
    var myDate = new Date();
    //获取三十天前日期
    var lw = new Date(myDate - 1000 * 60 * 60 * 24 * index); //最后一个数字30可改，30天的意思
    var lastY = lw.getFullYear();
    var lastM = lw.getMonth() + 1;
    var lastD = lw.getDate();
    var startdate =
      lastY +
      "-" +
      (lastM < 10 ? "0" + lastM : lastM) +
      "-" +
      (lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
    arr.push(startdate)
  }
  return arr
}

// 获取时间差
export const time_dis = (end_time, direct_time) => {
  // direct_time格式为yyyy-mm-dd hh:mm:ss 指定时间
  var now_time = Date.parse(new Date(end_time)); //当前时间的时间戳
  var end_time = Date.parse(new Date(direct_time)); //指定时间的时间戳
  if (end_time < now_time) {
    //  截止时间已过
    return false
  } else {
    //计算相差天数
    var time_dis = end_time - now_time;
    var days = Math.floor(time_dis / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = time_dis % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算小时数后剩余的毫秒数
    var second = leave3 / 1000;

    // return days + "天" + hours + "小时" + minutes + "分" + second + "秒";
    return days;
  }
}


const getArrDifference = (arr1, arr2) => {
  return arr1.concat(arr2).filter(function (v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  });
};

const tab = (date1, date2) => {
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if (oDate1.getTime() > oDate2.getTime()) {
    return true;
  } else {
    return false;
  }
};

export const getSortAtt = (dateList, map, str) => {
  // 深拷贝一下数组
  let arr = JSON.parse(JSON.stringify(dateList));
  let floorNumMap = JSON.parse(JSON.stringify(map));
  let res = [];
  let newRes = [];

  // 先获取
  // 日期循环
  floorNumMap.forEach((item, i) => {
    res.push(item.time);
  });

  // // 获取不相同的数组
  let newArr = getArrDifference(res, arr);
  // console.log(newArr, "差值list");

  if (str == "floor") {
    newArr.forEach(item => {
      newRes.push({
        dailyCount: 0,
        time: item
      });
    });
  } else if (str == "comment") {
    newArr.forEach(item => {
      newRes.push({
        commentCount: 0,
        time: item
      });
    });
  } else if (str == "people") {
    newArr.forEach(item => {
      newRes.push({
        commentNumOfPeople: 0,
        time: item
      });
    });
  } else {
    newArr.forEach(item => {
      newRes.push({
        praiseNum: 0,
        time: item
      });
    });
  }
  // console.log(newRes, "加直之后");

  let floorSortArr = [...newRes, ...floorNumMap];
  let newSort = floorSortArr.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );
  // console.log(dateList, newRes, newArr, "数组合并", floorNumMap, newSort);
  return newSort
}

// 去重
export const getA = (list, map) => {
  let dateList = JSON.parse(JSON.stringify(list));
  for (let i = 0; i < dateList.length; i++) {
    for (let index = 0; index < map.length; index++) {
      const element = map[index];
      if (dateList[i] == element.time) {
        //把元素分别从两个list中删除
        dateList.splice(i, 1);
        map.splice(i, 1);
        i--;
        index--;
      }
    }
  }
  return dateList
}


export const getB = (alist, blist, str) => {
  let map = JSON.parse(JSON.stringify(alist));
  let list = JSON.parse(JSON.stringify(blist));
  console.log(alist, blist);

  if (str == 'comment') {
    for (let index = 0; index < map.length; index++) {
      const element = map[index];
      list.push({
        time: element,
        commentCount: 0
      })
    }
    list.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    console.log(list);
    return list
  } else if (str == 'people') {
    for (let index = 0; index < map.length; index++) {
      const element = map[index];
      list.push({
        time: element,
        commentNumOfPeople: 0
      })
    }
    list.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    return list
  } else if (str == 'floor') {
    for (let index = 0; index < map.length; index++) {
      const element = map[index];
      list.push({
        time: element,
        dailyCount: 0
      })
    }
    list.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    return list
  } else {
    for (let index = 0; index < map.length; index++) {
      const element = map[index];
      list.push({
        time: element,
        praiseNum: 0
      })
    }
    list.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    return list
  }
}

//获取两日期之间日期列表函数
export const getdiffdate = (stime, etime) => {
  //初始化日期列表，数组
  var diffdate = new Array();
  var i = 0;
  //开始日期小于等于结束日期,并循环
  while (stime <= etime) {
    diffdate[i] = stime;
    //获取开始日期时间戳
    var stime_ts = new Date(stime).getTime();
    //增加一天时间戳后的日期
    var next_date = stime_ts + (24 * 60 * 60 * 1000);

    //拼接年月日，这里的月份会返回（0-11），所以要+1
    var next_dates_y = new Date(next_date).getFullYear() + '-';
    var next_dates_m = (new Date(next_date).getMonth() + 1 < 10) ? '0' + (new Date(next_date).getMonth() + 1) + '-' : (new Date(next_date).getMonth() + 1) + '-';
    var next_dates_d = (new Date(next_date).getDate() < 10) ? '0' + new Date(next_date).getDate() : new Date(next_date).getDate();
    stime = next_dates_y + next_dates_m + next_dates_d;
    //增加数组key
    i++;
  }
  return diffdate
}
