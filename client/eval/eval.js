Template.EvalRange.helpers({
  settings: function () {
    return {
      collection: DB.EvalRange,
      rowsPerPage: 20,
      showFilter: false,
      showNavigation: 'never',
      showNavigationRowsPerPage: false,
      fields: [
        { key: 'norm', label: '标准' },
        { key: 'indicator', label: '分支', sortable: false },
        { key: 'max', label: '分值', sortable: false },
        { key: 'frequencty', label: '频率', sortable: false }
      ]
    };
  }
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

//var indicators = DB.EvalRange.find({norm: '作业'}, {fields: {indicator: 1, _id: 0}});
//var indicators = DB.EvalRange.find({norm: '作业'}, {fields: {indicator: 1, _id: 0}}).fecth();

var getEvalFields = function(labels, editable) {
  var fields = [
    { key: 'studentId', label: '学号', fn: function(v) { return DB.Students.findOne(v).number; } },
    { key: 'studentId', label: '姓名', fn: function(v) { return DB.Students.findOne(v).name; } }
  ];
  
  for (var i=0, len=labels.length; i<len; i++) {
    (function(j){
      fields.push({
        key: 'scores.'+i,
        label: labels[i],
        sortable: false,
        cellClass: 'eval-'+editable+' scores.'+i
        //fn: function(v,o) { return v[j]; }
      });
    }(i));
  }
  
  fields.push({
    key: 'scores',
    label: '合计',
    sortable: false,
    fn: function(v,o) { 
      var sum = 0;
      for (var i = v.length; i--;) sum += v[i];
      return sum;
    }
  });
  
  return fields;
}

Template.EvalClass.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter');
    return {
      collection: DB.EvalScores.find({
        norm: '课堂',
        semester: Session.get('selectedSemester'),
        time: EvalDate.getWeek(Session.get('selectedTime'), {format: 'value'}),
        classId: classFilter || { $exists: true }
      }),
      rowsPerPage: 40,
      showFilter: true,
      showNavigationRowsPerPage: false,
      fields: getEvalFields(indicators.class, 'editable')
    };
  }
});

Template.EvalHomework.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter');
    return {
      collection: DB.EvalScores.find({
        norm: '作业',
        semester: Session.get('selectedSemester'),
        time: Session.get('selectedTime'),
        classId: classFilter || { $exists: true }
      }),
      rowsPerPage: 40,
      showFilter: true,
      showNavigationRowsPerPage: false,
      fields: getEvalFields(indicators.hw, 'clickable')
    };
  }
});

Template.EvalClass.events({
  'click tr': function(event) {
    event.preventDefault();
    clickToEdit(this, event, 'updateEval');
    return false;
  }
});

Template.EvalHomework.events({
  'click tr': function(event) {
    event.preventDefault();
    clickToEdit(this, event, 'updateEval');
    return false;
  }
});