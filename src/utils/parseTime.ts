/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time: string | number | Date, cFormat?: string) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'undefined' || time === null || time === 'null') {
    return '';
  } else if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key as keyof typeof formatObj];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][value];
    }
    let valueStr = value.toString();
    if (result.length > 0 && value < 10) {
      valueStr = '0' + value;
    }
    return valueStr || '0';
  });
  return time_str;
}
