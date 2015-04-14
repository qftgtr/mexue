Accounts.validateLoginAttempt (function(attempt) {
  console.log(attempt.methodArguments);
  return true;
  //mobileAPI.login();
});


var userLogin = function(data) {
  var user = mobileAPI.new(data.username, data.password);
  if (user) {
    user.post(data.namespace, data.query);
  }
};

Meteor.methods({
  userLogin: userLogin
});