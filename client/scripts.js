//Accounts.ui.config({
//  passwordSignupFields: "USERNAME_ONLY"
//});
//
//Accounts.config({forbidClientAccountCreation: true});

Template.UserLogin.events({
  'submit .user-login': function(event) {
    event.preventDefault();
    var username = event.target.username.value,
        password = event.target.password.value;
    
    Meteor.call('userLogin', {
      username: username,
      password: password
//      namespace: event.target.namespace.value,
//      query: event.target.query.value
    }, function(error, result) {
      if (result) {
        Router.configure({ layoutTemplate: 'PageLayout' });
        Meteor.loginWithPassword(username, password);
      }
    });
    
    return false;
  }
});
//
//Template.UserLogin.helpers({
//  settings: function () {
//    return {
//      collection: DB.Queries,
//      rowsPerPage: 20,
//      showFilter: true,
//      fields: [
//        { key: 'time', label: 'time' },
//        { key: 'query', label: 'queries', sortable: false },
//        { key: 'return', label: 'returns', sortable: false }
//      ]
//    };
//  }
//});