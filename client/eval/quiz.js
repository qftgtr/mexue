Template.EvalQuiz.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter');
    return {
      collection: DB.EvalScores.find({
        evalName: '成绩',
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

Template.EvalQuiz.events({
  'click tr': function(event) {
    event.preventDefault();
    clickToEdit(this, event, 'updateEval');
    return false;
  }
});