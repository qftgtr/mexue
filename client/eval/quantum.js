Template.EvalQuantum.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter');
    return {
      collection: DB.EvalScores.find({
        evalName: '综合素质评价',
        semester: Session.get('selectedSemester'),
        classId: classFilter || { $exists: true }
      }),
      class: 'table table-striped table-hover table-condensed reactive-table',
      rowsPerPage: 40,
      showFilter: false,
      showNavigationRowsPerPage: false,
      fields: [
        {
          key: 'studentId',
          label: '学号',
          headerClass: 'col-md-1 col-sm-1',
          cellClass: 'col-md-1 col-sm-1',
          fn: function(v) { return DB.Students.findOne(v).number; }
        }, {
          key: 'studentId',
          label: '姓名',
          headerClass: 'col-md-1 col-sm-1',
          cellClass: 'col-md-1 col-sm-1',
          fn: function(v) { return DB.Students.findOne(v).name; }
        }
      ]
    };
  }
});

Template.QuantumField.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter');
    return {
      collection: DB.EvalScores.findOne({
        evalName: '综合素质评价',
        semester: Session.get('selectedSemester'),
        classId: classFilter || { $exists: true }
      }).scores,
      class: 'table table-striped table-hover table-condensed reactive-table',
      rowsPerPage: 24,
      showFilter: false,
      showNavigationRowsPerPage: false,
      fields: [
        {
          key: 'tag',
          label: '评价要求',
          sortable: false, 
          headerClass: 'col-md-1 col-sm-1',
          cellClass: 'col-md-1 col-sm-1'
        }, {
          key: 'desc',
          label: '关键表现',
          sortable: false, 
          headerClass: 'col-md-8 col-sm-8',
          cellClass: 'col-md-8 col-sm-8'
        }, {
          key: 'score',
          label: '评定等级',
          sortable: false, 
          headerClass: 'col-md-1 col-sm-1',
          cellClass: 'eval-editable scores-1 col-md-1 col-sm-1'
        }
      ]
    };
  }
});

Template.QuantumField.events({
  'click tr': function(event) {
    event.preventDefault();
    clickToEdit(this, event, 'updateQuantum');
    return false;
  }
});