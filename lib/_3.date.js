EvalDate = (function() {
  // get month+date from a Date object or date number
  // format === 'value', return Date object
  // format is anything true, return m月d日
  // otherwise, return m/d
  var getMonthDate = function(date, format) {
    if (typeof date === 'number')
      date = new Date(date);
      
    if (date && date.getTime) {
      if (format === 'value')
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      
      if (format)
        return date.getMonth()+1 + '月' + date.getDate() + '日';
      
      return date.getMonth()+1 + '/' + date.getDate();
    }
    return false;
  }
  
  // get the current week from a Date object
  // options.offsetDay, set first day of a week, [0: Sun, 1: Mon (default), ...]
  // options.format === 'value', return first day of the week as a Date object
  // options.format is other, return [first day, last day]
  var getWeek = function(date, options) {
    options = options || {};
    
    var offsetDay = parseInt(options.offsetDay, 10);
    if (isNaN(offsetDay)) offsetDay = 1;
    
    var day = (date.getDay() - offsetDay + 7) % 7;
    
    var msPerDay = 1000*3600*24,
        firstDay = date.getTime() - day * msPerDay,
        lastDay = firstDay + 6 * msPerDay;
    
    if (options.format === 'value')
      return getMonthDate(firstDay, 'value');
    
    return [getMonthDate(firstDay, options.format), getMonthDate(lastDay, options.format)];
  };
  
  return {
    getMonthDate: getMonthDate,
    getWeek: getWeek
  };
}());