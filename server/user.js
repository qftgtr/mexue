//Accounts.validateLoginAttempt(function(attempt) {
//  console.log(attempt);
//});

var userLogin = function(data) {
  var user = mobileAPI.new();
  success = user.login(data.username, data.password);
  
  if (success) {
    var account = Meteor.users.findOne({username: data.username});

    if (account) {
      user.changePassword(account._id);
    } else {
      user.createUser(); 
    }
    
    Meteor.setTimeout(function() { user.getUserInfo(); }, 100);
    Meteor.setTimeout(function() { user.getContacts(); }, 100);
    
    //console.log(data);
    //user.post(data.namespace, data.query);
    
    return true;
  }
  
  return false;
  //return true;
};

Meteor.methods({
  userLogin: userLogin
});