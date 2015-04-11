var newStudent = function (data) {
  console.log('NEW    client:'+Meteor.isClient+',server:'+Meteor.isServer);
  // Make sure the user is logged in before inserting a task
  //if (! Meteor.userId()) {
  //  throw new Meteor.Error("not-authorized");
  //}
  // check for multiple request

  var createdAt = new Date();

  var studentId = DB.Students.insert({
    name: data.name,
    grade: parseInt(data.grade, 10),
    class: parseInt(data.class, 10),
    number: parseInt(data.number, 10),
    createdAt: createdAt
  });
  console.log(studentId);

  DB.Evaluations.insert({
    name: data.name,
    studentId: studentId,
    createdAt: createdAt
  });
};


Meteor.methods({
  newStudent: newStudent
});