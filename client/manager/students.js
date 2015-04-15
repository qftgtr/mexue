Template.StudentManager.events({
  // called when the new student form is submitted
  // insert a student
  'submit .new-task': function (event) {
    event.preventDefault();

    var target = event.target;
    
    if (target.name.value) {
      var studentId = Meteor.call('newStudent', {
        name: target.name.value,
        grade: target.grade.value,
        class: target.class.value,
        number: target.number.value,
        semesterAt: Session.get('selectedSemester')
      });
      
      // Clear form
      target.name.value = '';
      //target.grade.value = 3;
      //target.class.value = 2;
      var number = parseInt(target.number.value, 10);
      if (number>0)
        target.number.value = number + 1;
    }
    return false;
  },
  // called when a cell is clicked
  // change the cell to an input and update the DB with the new value
  'click tr': function(event) {
    event.preventDefault();
    clickToEdit(this, event, 'updateStudent');
    return false;
  }
});


Template.StudentManager.helpers({
  settings: function () {
    var classFilter = Session.get('classFilter'),
        selectedSemester = Session.get('selectedSemester');
    return {
      collection: DB.Students.find(classFilter?{
        history: {
          $elemMatch: {
            classId: classFilter,
            since: {$lte: selectedSemester},
            until: {$gte: selectedSemester}
          }
        }
      }:{}),
      rowsPerPage: 40,
      fields: [
        { key: 'history.0.since', label: '入学', sortable: false, fn: function(v) { return semesterName(v); } },
        { key: 'history.0', label: '入学班级', sortable: false, fn: function(v) { return className(DB.Classes.findOne(v.classId), v.since); } },
        { key: 'number', label: '学号', cellClass: 'eval-editable number' },
        { key: 'name', label: '姓名', sortable: false, cellClass: 'eval-editable name' },
        { key: 'history.0', label: '本学期班级', sortable: false, fn: function(v) { return className(DB.Classes.findOne(v.classId), selectedSemester); } }
      ]
    };
  }
});