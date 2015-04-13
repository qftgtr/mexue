var headerMenuItems = [
  { url: '/eval/class',    text: '课堂',   name: 'eval.class',    template: 'EvalClass' },
  { url: '/eval/homework', text: '作业',   name: 'eval.homework', template: 'EvalHomework' },
  { url: '/eval/quiz',     text: '考试',   name: 'eval.quiz',     template: 'EvalQuiz' },
  { url: '/eval/project',  text: '小课题', name: 'eval.project',  template: 'EvalProject' }
];

// 设置定栏显示内容
Template.HeaderMenu.helpers({
  item: headerMenuItems,
  currentDate: function() {
    var selectedTime = Session.get('selectedTime');
    return EvalDate.getMonthDate(selectedTime, {format: 1}) + ',' + EvalDate.getWeek(selectedTime, {format: 1}).join('--');
  }
});

// get class lists from DB.Classes
Template.ClassFilter.helpers({
  filters: function () {
    return DB.Classes.find({}).map(function(doc) {
      return { _id: doc._id, name: className(doc) };
    });
  }
});