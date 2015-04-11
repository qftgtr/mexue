DB.Students.before.insert(function(id, doc) {
  console.log('MODIFY client:'+Meteor.isClient+',server:'+Meteor.isServer);
  doc.grade = doc.grade;
});