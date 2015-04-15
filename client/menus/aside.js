var asideMenuItems = [
  { url: '/eval',          text: '标准',   name: 'eval.range',    template: 'EvalRange' },
  { url: '/eval/summary',  text: '总评',   name: 'eval.summary',  template: 'EvalSummary' },
  { url: '/eval/class',    text: '课堂',   name: 'eval.class',    template: 'EvalClass' },
  { url: '/eval/homework', text: '作业',   name: 'eval.homework', template: 'EvalHomework' },
  { url: '/eval/quiz',     text: '考试',   name: 'eval.quiz',     template: 'EvalQuiz' },
  { url: '/eval/project',  text: '小课题', name: 'eval.project',  template: 'EvalProject' },
  { url: '/eval/quantum',  text: '综合素质评价', name: 'eval.quantum',  template: 'EvalQuantum' }
];

// 设置侧栏显示内容
Template.AsideMenu.helpers({
  item: asideMenuItems,
  userIs: function(type) {
    return Meteor.user().profile.userType === 'teacher';
  }
});

//Router.route('/eval/class', {name: 'eval.class'});
//Router.route('/eval/homework', {name: 'eval.homework'});
//Router.route('/eval/quiz', {name: 'eval.quiz'});
//Router.route('/eval/project', {name: 'eval.project'});

// 设置侧栏链接
for (var i = asideMenuItems.length; i--; ) {
  (function(item) {
    Router.route(item.url, function() {
      $('.sidebar-a').removeClass('active');
      $('.'+item.template).addClass('active');
      this.render(item.template);
    });
  }(asideMenuItems[i]));
}