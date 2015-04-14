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

var getEvalFields = function(labels, editable, options) {
  var fields = [
    {
      key: 'studentId',
      label: '学号',
      headerClass: 'col-md-1 col-sm-2',
      cellClass: 'col-md-1 col-sm-1',
      fn: function(v) { return DB.Students.findOne(v).number; }
    }, {
      key: 'studentId',
      label: '姓名',
      headerClass: 'col-md-1 col-sm-2',
      cellClass: 'col-md-1 col-sm-2',
      fn: function(v) { return DB.Students.findOne(v).name; }
    }
  ];
  
  for (var i=0, len=labels.length; i<len; i++) {
    (function(j){
      fields.push({
        key: 'scores.'+i,
        label: labels[i],
        sortable: false,
        headerClass: 'scores-'+i + ' col-md-1 col-sm-1',
        cellClass: (labels[i]?'eval-'+editable:'')+' scores-'+i + ' col-md-1 col-sm-1'
        //fn: function(v,o) { return v[j]; }
      });
    }(i));
  }
  
  if (!(options && options.noSum)) {
    fields.push({
      key: 'scores',
      label: '合计',
      sortable: false,
      headerClass: 'col-md-1 col-sm-1',
      cellClass: 'col-md-1 col-sm-1',
      fn: function(v,o) { 
        var sum = 0;
        for (var i = v.length; i--;) sum += v[i];
        return sum;
      }
    });
  }
  
  if (!(options && options.noComment)) {
    fields.push({
      key: 'teacherComment',
      label: '评语',
      sortable: false,
      headerClass: 'teacherComment',
      cellClass: 'eval-editable teacherComment'
    });
  }
  
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
      class: 'table table-striped table-hover table-condensed reactive-table',
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
      class: 'table table-striped table-hover table-condensed reactive-table',
      rowsPerPage: 40,
      showFilter: true,
      showNavigationRowsPerPage: false,
      fields: getEvalFields(indicators.hw, 'clickable')
    };
  }
});

Template.EvalQuiz.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter');
    return {
      collection: DB.EvalScores.find({
        norm: '测验',
        semester: Session.get('selectedSemester'),
        classId: classFilter || { $exists: true }
      }),
      class: 'table table-striped table-hover table-condensed reactive-table',
      rowsPerPage: 40,
      showFilter: true,
      showNavigationRowsPerPage: false,
      fields: getEvalFields(indicators.quiz, 'editable', {noSum: true, noComment: true})
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

Template.EvalQuiz.events({
  'click tr': function(event) {
    event.preventDefault();
    clickToEdit(this, event, 'updateEval');
    return false;
  }
});