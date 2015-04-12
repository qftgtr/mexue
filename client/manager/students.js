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
    
    var post = this;
    var clickedItem = event.target; // the clicked element
    
    if (clickedItem.tagName === 'TD') { // check if already clicked
      var inputDiv = document.createElement('div');
      inputDiv.innerHTML = '<input class="oninput" type="text" value="' + clickedItem.innerHTML + '"/>';
      
      clickedItem.appendChild(inputDiv.firstChild);
      
      $('.oninput').focus().focusout(function(event) {
        var key = clickedItem.className,
            value = event.target.value;
        
        // remove input box
        event.target.parentElement && event.target.parentElement.removeChild(event.target);
        
        Meteor.call('updateStudent', {id: post._id, key: key, value: value})// update db
      }).keypress(function(event) {
        if (event.which === 13) event.target.blur();
      });
      
      return false;
    }
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
        { key: 'number', label: '学号' },
        { key: 'name', label: '姓名', sortable: false },
        { key: 'history.0', label: '本学期班级', sortable: false, fn: function(v) { return className(DB.Classes.findOne(v.classId), selectedSemester); } }
      ]
    };
  }
});