export function pad(num) {
  return num < 10 ? '0' + num : num
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

export function formatTime(time) {
  time = (time / 1000) | 0
  const minute = (time / 60) | 0
  const second = pad(time % 60)
  return `${minute}:${second}`
}

export function convertUnit(val) {
  if (!val) return 0
  if (val > 10000) {
    return (val / 10000).toFixed(1) + '万'
  }
  return val.toFixed()
}