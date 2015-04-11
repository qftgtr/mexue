var asideMenuItems = [
  { url: '/eval',          text: '总评',   name: 'eval.summary',  template: 'EvalSummary' },
  { url: '/eval/class',    text: '课堂',   name: 'eval.class',    template: 'EvalClass' },
  { url: '/eval/homework', text: '作业',   name: 'eval.homework', template: 'EvalHomework' },
  { url: '/eval/quiz',     text: '考试',   name: 'eval.quiz',     template: 'EvalQuiz' },
  { url: '/eval/project',  text: '小课题', name: 'eval.project',  template: 'EvalProject' }
];

var headerMenuItems = [
  { url: '/eval/class',    text: '课堂',   name: 'eval.class',    template: 'EvalClass' },
  { url: '/eval/homework', text: '作业',   name: 'eval.homework', template: 'EvalHomework' },
  { url: '/eval/quiz',     text: '考试',   name: 'eval.quiz',     template: 'EvalQuiz' },
  { url: '/eval/project',  text: '小课题', name: 'eval.project',  template: 'EvalProject' }
];


// 设置定栏显示内容
Template.HeaderMenuLayout.helpers({ item: headerMenuItems });

// 设置侧栏显示内容
Template.AsideMenuLayout.helpers({ item: asideMenuItems });

//Router.route('/eval/class', {name: 'eval.class'});
//Router.route('/eval/homework', {name: 'eval.homework'});
//Router.route('/eval/quiz', {name: 'eval.quiz'});
//Router.route('/eval/project', {name: 'eval.project'});

// 设置侧栏链接
for (var i = asideMenuItems.length; i--; ) {
  (function(item) {
    Router.route(item.url, {name: item.name});
  }(asideMenuItems[i]));
}