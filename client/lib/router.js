Router.configure({
  layoutTemplate: 'PageLayout'
});

Router.route('/', function () {
  this.render('hello');
});

Router.route('/about');
Router.route('/manage/students', function() {
  this.render('StudentManager');
});

var routeTo = function(url, to) {
  Router.route(url, function() { this.render(to) });
}; 

//routeTo('/eval/classes', 'EvalClasses');
//routeTo('/eval/grades', 'EvalGrades');
//routeTo('/eval/homeworks', 'EvalHomeworks');
//routeTo('/eval/projects', 'EvalProjects');

//Router.route('/eval/classes', function() { this.render('EvalClasses') });
//Router.route('/eval/grades', function() { this.render('EvalGrades') });
//Router.route('/eval/homeworks', function() { this.render('EvalHomeworks') });
//Router.route('/eval/projects', function() { this.render('EvalProjects') });