EvalDate = (function() {
  var msPerDay = 1000*3600*24;
  
  // get month+date from a Date object or date number
  // format === 'value', return Date object
  // format is anything true, return m月d日
  // otherwise, return m/d
  var getMonthDate = function(date, options) {
    options = options || {};
    if (typeof date === 'number')
      date = new Date(date);
      
    if (date && date.getTime) {
      if (options.offset)
        date = offsetDay(date, options.offset);
      
      if (options.format === 'value')
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      
      if (options.format)
        return date.getMonth()+1 + '月' + date.getDate() + '日';
      
      return date.getMonth()+1 + '/' + date.getDate();
    }
    
    log.error('EvalDate.getMonthDate: date format error.');
    return false;
  };
  
  // get the current week from a Date object
  // options.firstDayOfWeek, set first day of a week, [0: Sun, 1: Mon (default), ...]
  // options.format === 'value', return first day of the week as a Date object
  // options.format is other, return [first day, last day]
  var getWeek = function(date, options) {
    options = options || {};
    
    var firstDayOfWeek = parseInt(options.firstDayOfWeek, 10);
    if (isNaN(firstDayOfWeek)) firstDayOfWeek = 1;
    
    if (options.offset)
        date = offsetDay(date, options.offset);
      
    var firstDayOfWeekOffset = (date.getDay() - firstDayOfWeek + 7) % 7;
    
    var firstDay = date.getTime() - firstDayOfWeekOffset * msPerDay,
        lastDay = firstDay + 6 * msPerDay;
    
    if (options.format === 'value')
      return getMonthDate(firstDay, {format: 'value'});
    
    return [getMonthDate(firstDay, {format: options.format}), getMonthDate(lastDay, {format: options.format})];
  };
  
  var offsetDay = function(date, offset) {
    return new Date(date.getTime() + offset * msPerDay);
  };
  
  
  var getSemester = function(date) {
    date = date || new Date();
    var month = date.getMonth(),
        year = date.getFullYear();
    
    if (month > 7)
      return year+'a';
    
    year--;
    
    if (month < 1)
      return year+'a';
    
    return year+'b';
  };
  
  return {
    getMonthDate: getMonthDate,
    getWeek: getWeek,
    offsetDay: offsetDay,
    getSemester: getSemester
  };
}());