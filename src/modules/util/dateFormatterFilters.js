function shortDate(date) {
  let d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function longDate(date) {
  let d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}

export {
  shortDate,
  longDate
}