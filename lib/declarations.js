DB = {
  Students: new Mongo.Collection('students'),
  EvalScores: new Mongo.Collection('evalScore'),
  EvalRange: new Mongo.Collection('evalRange')
};

/*evalRange = [{
  name: '课堂',
  subject: '数学',
  indicators: ['倾听', '思考', '合作', '表达', '专心'],
  description: [],
  max: [5, 5, 5, 5, 5],
  frequency: 'weekly'
  }, {
    name: '作业',
    subject: '数学',
    indicators: ['态度', '书写', '及时改错', '正确率'],
    description: [],
    max: [1, 1, 1, 1],
    frequency: 'daily'
  }, {
    name: '成绩',
    subject: '数学',
    indicators: ['单元考试'],
    description: [],
    frequency: 'undefined'
  }, {
    name: '小课题',
    subject: '数学',
    indicators: [],
    max: []
  }];*/

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

var newEval = function(norm, indicator, max, frequency) {
  return DB.EvalRange.insert({
    semester: '2014b',
    subject: '数学',
    norm: norm,
    indicator: indicator,
    description: '',
    max: max,
    frequency: frequency || 'undefined'
  });
}

if (Meteor.isServer) {
  //ReactiveTable.publish('students', DB.Students);
  
  Meteor.startup(function () {
    // code to run on server at startup
    if(typeof DB.EvalRange.findOne() === 'undefined') {
      newEval('课堂', '倾听', 5, 'weekly');
      newEval('课堂', '思考', 5, 'weekly');
      newEval('课堂', '合作', 5, 'weekly');
      newEval('课堂', '表达', 5, 'weekly');
      newEval('课堂', '专心', 5, 'weekly');
      
      newEval('作业', '态度', 1, 'weekly');
      newEval('作业', '书写', 1, 'weekly');
      newEval('作业', '及时改错', 1, 'weekly');
      newEval('作业', '正确率', 1, 'weekly');
      
      newEval('成绩', '单元考试', 100);
      
      newEval('小课题', '总评', 100);
    }
  });
}

indicators = {
  class: ['倾听', '思考', '合作', '表达', '专心'],
  hw: ['态度', '书写', '及时改错', '正确率'],
  quiz: ['单元考试'],
  project: ['总评']
};