var allRange = function () {
  return {
    collection: DB.EvalRange,
    rowsPerPage: 20,
    showFilter: false,
    showNavigation: 'never',
    showNavigationRowsPerPage: false,
    fields: [
      { key: 'name', label: '标准' },
      { 
        key: 'range',
        label: '分支',
        sortable: false, 
        fn: function(v) {
          return v.map(function(item) {
            return item.tag;
          }).join(', ');
        }
      },
      { key: 'frequency', label: '频率', sortable: false }
    ]
  };
};

var ping = function() {
  var range = DB.EvalRange.findOne({'name': '综合素质评价'}).range;
  return {
    collection: range,
    rowsPerPage: 24,
    showFilter: false,
    showNavigation: 'never',
    showNavigationRowsPerPage: false,
    fields: [
      { key: 'tag', label: '标准', sortable: false },
      { key: 'desc', label: '描述', sortable: false }
    ]
  };
};

Template.EvalRange.helpers({
  settings: allRange
});

Template.EvalSummary.helpers({
  settings: function () {
    return {
      collection: DB.EvalScores,
      rowsPerPage: 40,
      showFilter: true,
      fields: [
        { key: 'name', label: '姓名' },
        { key: 'time', label: '时间', sortable: false },
        { key: 'grade', label: '分数', sortable: false, fn: function(v,o) { return v;} }
      ]
    };
  }
});
