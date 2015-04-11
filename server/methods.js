var newStudent = function(data) {
  console.log('NEW    client:'+Meteor.isClient+',server:'+Meteor.isServer);
  // Make sure the user is logged in before inserting a task
  //if (! Meteor.userId()) {
  //  throw new Meteor.Error("not-authorized");
  //}
  
  // TODO: need to check for multiple request

  var createdAt = new Date(),
      g = parseInt(data.grade, 10),
      c = parseInt(data.class, 10),
      n = parseInt(data.number, 10);
  
  var studentId = DB.Students.insert({
    name: data.name,
    grade: g>0?g:'',
    class: c>0?c:'',
    number: n>0?n:'',
    createdAt: createdAt
  });
  console.log(studentId);

  DB.EvalScores.insert({
    name: data.name,
    studentId: studentId,
    createdAt: createdAt,
    class: [{
      time: '3月',
      listen: 5, // 倾听
      think: 5, // 思考
      cooperate: 5, // 合作
      express: 5, // 表达
      focus: 5 // 专心
    }],
    quiz: [],
    homework: []
  });
};

var updateStudent = function(data) {
  console.log('UPDATE client:'+Meteor.isClient+',server:'+Meteor.isServer);
  // change type to int
  if (data.key === 'name')
    DB.Students.update(data.id, {$set: {'name': data.value}});
  
  if (data.key === 'grade' || data.key === 'class' || data.key === 'number') {
    var v = parseInt(data.value, 10),
        setTo = {};
    setTo[data.key] = v = v>0?v:'';

    DB.Students.update(data.id, {$set: setTo});
  }
}

Meteor.methods({
  newStudent: newStudent,
  updateStudent: updateStudent
});