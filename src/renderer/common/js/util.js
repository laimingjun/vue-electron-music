export function pad(num) {
  return num < 10 ? '0' + num : num
}

export function formatSingers(arr) {
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
  if (val > 10000) {
    return (val / 10000).toFixed(1) + '万'
  }
  return val.toFixed()
}