Template.StudentManager.events({
  'submit .new-task': function (event) {
    event.preventDefault();
    // This function is called when the new task form is submitted

    var target = event.target;

    var studentId = Students.insert({
      name: target.name.value,
      grade: target.grade.value,
      class: target.class.value,
      number: target.number.value,
      createdAt: new Date() // current time
    });
    
    Evaluations.insert({
      name: target.name.value,
      studentId: studentId,
      class: target.class.value,
      number: target.number.value,
      createdAt: new Date() // current time
    });
    
    // Clear form
    target.name.value = '';
    //target.grade.value = 3;
    //target.class.value = 2;
    //target.number.value = 0;
    
    return false;
  },
  'click tr': function(event) {
    event.preventDefault();
    var post = this;
    var clickedItem = event.target; // the clicked element
    
    if (!clickedItem.childElementCount) { // check if already clicked
      var inputDiv = document.createElement('div');
      inputDiv.innerHTML = '<input class="oninput" type="text" value="' + clickedItem.innerHTML + '"/>';
      
      clickedItem.appendChild(inputDiv.firstChild);
      
      $('.oninput').focus().focusout(function(event) {
        var key = clickedItem.className,
            value = event.target.value,
            setTo = {};
        setTo[key] = value;
        
        // remove input box
        event.target.parentElement && event.target.parentElement.removeChild(event.target);
        
        Students.update(post._id, {$set: setTo}); // update db
      }).keypress(function(event) {
        if (event.which === 13) event.target.blur();
      });
      
      return false;
    }
  }
});


Template.StudentManager.helpers({
  settings: function () {
    return {
      collection: Students,
      rowsPerPage: 10,
      showFilter: true,
      fields: [
        { key: 'name', label: '姓名' },
        { key: 'grade', label: '年级', sortable: false },
        { key: 'class', label: '班级', sortable: false, fn: function(v,o) { return v;} },
        { key: 'number', label: '学号', sortable: false }
      ]
    };
  }
});