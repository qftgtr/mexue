DB = {
  Students: new Mongo.Collection('students'),
  Evaluations: new Mongo.Collection('evaluations')
};

/*
    {data: "student", title: "姓名"},
    {data: "time", title: "日期"},
    {data: "ontime", title: "及时完成"},
    {data: "handwriting", title: "书写"},
    {data: "debug", title: "改错"},
    {data: "correct", title: "正确"},
    {data: "comment", title: "评语"}


TabularTables.Students = new Tabular.Table({
  name: "StudentList",
  collection: Students,
  columns: [
    {data: "name", title: "姓名"},
    {data: "grade", title: "年级"},
    {data: "class", title: "班级"},
    {data: "number", title: "学号"}
    //{}
    //{data: "createdAt", title: "创建日期"}
  ]
});
*/
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  //ReactiveTable.publish('students', DB.Students);
  
  Meteor.startup(function () {
    // code to run on server at startup
    
  });
}



