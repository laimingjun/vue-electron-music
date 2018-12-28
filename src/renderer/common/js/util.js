export function pad(num) {
  // return num < 10 ? '0' + num : num
  return `00${num}`.slice(-2)
}

export function formatTime(time) {
  time = (time / 1000) | 0
  const minute = (time / 60) | 0
  const second = pad(time % 60)
  return `${minute}:${second}`
}

export function formatSingers(arr) {
  if (!arr) return
  let singers = []
  arr.forEach(item => {
    singers.push(item.name)
  })
  return singers.join('   /   ')
}

export function formatDateTime(time) {
  var date = new Date(time)
  var year = date.getFullYear()
  var mouth = date.getMonth() + 1
  var day = date.getDate()
  return `${year}-${mouth}-${day}`
}

export function convertUnit(val) {
  if (!val) return 0
  if (val > 10000) {
    return (val / 10000).toFixed(1) + '万'
  }
  return val.toFixed()
}

export function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deepCopy(obj) {
  let result = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          result[key] = deepCopy(obj[key])
        } else {
          result[key] = obj[key]
        }
      }
    }
  }
  return result
}

export function shuffle(arr) {
  let _arr = [...arr]
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    [_arr[i], _arr[j]] = [_arr[j], _arr[i]]
  }
  return _arr
}

export function debounce(fn, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}