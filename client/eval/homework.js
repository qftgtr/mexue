Template.EvalHomework.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter');
    return {
      collection: DB.EvalScores.find({
        evalName: '作业',
        semester: Session.get('selectedSemester'),
        //time: Session.get('selectedTime'),
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

Template.EvalHomework.events({
  'click tr': function(event) {
    event.preventDefault();
    clickToEdit(this, event, 'updateEval');
    return false;
  }
});