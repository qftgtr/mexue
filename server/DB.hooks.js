DB.Students.before.insert(function(id, doc) {
  console.log('INSERT client:'+Meteor.isClient+',server:'+Meteor.isServer);
  //doc.grade = doc.grade;
});