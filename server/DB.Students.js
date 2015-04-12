// Student DB operations

// search class of grade g and class c at semester semesterAt
// return class id
// create a class if not exists
var getClassId = function(g, c, semesterAt) {
  var enrollIn = parseInt(semesterAt, 10) - g + 1;
  var selectClass = DB.Classes.findOne({enrollIn: enrollIn, class: c});
  if (selectClass) {
    return selectClass._id;
  } else {
    return DB.Classes.insert({
      enrollIn: enrollIn,
      class: c
    });
  }
}

// insert a student to the Students DB
// into class of data.grade, data.class at selectedSemester
// create a class if not exists
// create the evaluations in the EvalScores DB
var newStudent = function(data) {
  console.log('NEW    client:' + Meteor.isClient+',server:' + Meteor.isServer);
  // Make sure the user is logged in before inserting a task
  //if (! Meteor.userId()) {
  //  throw new Meteor.Error("not-authorized");
  //}
  
  // TODO: need to check for multiple request

  var g = parseInt(data.grade, 10),
      c = parseInt(data.class, 10),
      n = parseInt(data.number, 10);
  
  // NaN, negative number ---> ''
  g = g>0?g:'';
  c = c>0?c:'';
  n = n>0?n:'';
  
  if (g && c) {
    var classId = getClassId(g, c, data.semesterAt);
    var studentId = DB.Students.insert({
      name: data.name,
      number: n,
      history: [{since: data.semesterAt, until: '2222b', classId: classId}],
    });
    
    DB.EvalScores.insert({
      studentId: studentId,
      semester: '2014b',
      classId: classId,
      time: EvalDate.getMonthDate(new Date(), 'value'),
      norm: '作业',
      scores: [1, 1, 0, 1]
    });

    DB.EvalScores.insert({
      studentId: studentId,
      semester: '2014b',
      classId: classId,
      time: EvalDate.getWeek(new Date(), {format: 'value'}),
      norm: '课堂',
      scores: [5, 4, 5, 5, 4]
    });
  }
};

// update the student information
// TODO: didn't check whether the class exists
var updateStudent = function(data) {
  console.log('UPDATE client:'+Meteor.isClient+',server:'+Meteor.isServer);
  // change type to int
  if (data.key === 'name')
    DB.Students.update(data.id, {$set: {'name': data.value}});
  
  if (data.key === 'grade' || data.key === 'class' || data.key === 'number') {
    var v = parseInt(data.value, 10),
        setTo = {};
    
    // NaN, negative number ---> ''
    setTo[data.key] = v = v>0?v:'';

    //DB.Students.update(data.id, {$set: setTo});
  }
};

Meteor.methods({
  newStudent: newStudent,
  updateStudent: updateStudent
});