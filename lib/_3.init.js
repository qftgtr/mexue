if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault({
    selectedSemester: EvalDate.getSemester(),
    selectedTime: EvalDate.getMonthDate(new Date(), {format: 'value'}),
    classFilter: '',
  });
}

var newEval = function(norm, indicator, max, frequency) {
  return DB.EvalRange.insert({
    semester: EvalDate.getSemester(),
    subject: '数学',
    norm: norm,
    indicator: indicator,
    description: '',
    max: max,
    frequency: frequency || 'undefined'
  });
};

var newStu = function(i, g) {
  Meteor.call('newStudent', {
    name: '小明'+g+1+''+i,
    grade: 1+g,
    class: 2+g,
    number: i,
    semesterAt: EvalDate.getSemester()
  });
};

if (Meteor.isServer) {
  //ReactiveTable.publish('students', DB.Students);
  
  Meteor.startup(function () {
    // code to run on server at startup
    if (!DB.EvalRange.findOne()) {
      newEval('课堂', '倾听', 5, 'weekly');
      newEval('课堂', '思考', 5, 'weekly');
      newEval('课堂', '合作', 5, 'weekly');
      newEval('课堂', '表达', 5, 'weekly');
      newEval('课堂', '专心', 5, 'weekly');
      
      newEval('作业', '态度', 1, 'daily');
      newEval('作业', '书写', 1, 'daily');
      newEval('作业', '及时改错', 1, 'daily');
      newEval('作业', '正确率', 1, 'daily');
      
      newEval('成绩', '单元考试', 100, 'sporadic');
      
      newEval('小课题', '总评', 100, 'once');
    }
    
//    if (!DB.Students.findOne()) {
//      for (var i=1;i<41;i++) {
//        (function(j) {
//          newStu(j, 0);
//          newStu(j, 2);
//        }(i));
//      }
//    }
  });
}

