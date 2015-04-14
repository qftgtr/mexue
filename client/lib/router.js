//Router.configure({ layoutTemplate: 'PageLayout' });

Router.route('/', function () {});

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

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Accounts.config({forbidClientAccountCreation: true});

Template.UserLogin.events({
  'submit .user-login': function(event) {
    event.preventDefault();
    var success = Meteor.call('userLogin', {
      username: event.target.username.value,
      password: event.target.password.value,
      namespace: event.target.namespace.value,
      query: event.target.query.value
    });
    return false;
  }
});

Template.UserLogin.helpers({
  settings: function () {
    return {
      collection: DB.Queries,
      rowsPerPage: 20,
      showFilter: true,
      fields: [
        { key: 'time', label: 'time' },
        { key: 'query', label: 'queries', sortable: false },
        { key: 'return', label: 'returns', sortable: false }
      ]
    };
  }
});