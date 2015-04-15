Template.EvalClass.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter');
    return {
      collection: DB.EvalScores.find({
        evalName: '课堂',
        semester: Session.get('selectedSemester'),
        //time: EvalDate.getWeek(Session.get('selectedTime'), {format: 'value'}),
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

Template.EvalClass.events({
  'click tr': function(event) {
    event.preventDefault();
    clickToEdit(this, event, 'updateEval');
    return false;
  }
});
