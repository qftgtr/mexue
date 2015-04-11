Template.EvalSummary.helpers({
  settings: function () {
    return {
      collection: Evaluations,
      rowsPerPage: 10,
      showFilter: true,
      fields: [
        { key: 'name', label: '姓名' },
        { key: 'time', label: '时间', sortable: false },
        { key: 'grade', label: '分数', sortable: false, fn: function(v,o) { return v;} },
      ]
    };
  }
});