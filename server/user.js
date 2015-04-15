//Accounts.validateLoginAttempt(function(attempt) {
//  console.log(attempt);
//});

var userLogin = function(data) {
  var user = mobileAPI.new();
  success = user.login(data.username, data.password);
  console.log(success);
  
  if (success) {
    var account = Meteor.users.findOne({username: data.username});

    if (account) {
      user.changePassword(account._id);
    } else {
      user.createUser(); 
    }

    user.getUserInfo();
    return true;
  }
  
  return false;
  //return true;
};

Meteor.methods({
  userLogin: userLogin
});