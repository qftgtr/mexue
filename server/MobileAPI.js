mobileAPI = {
  new: function(username, password, url) {
    var querystring = Npm.require('querystring');
    //var http = Npm.require('http');
    //var fs = Npm.require('fs');

    var url = url || 'http://111.204.178.102:8080/mobile/api/';

    var result = HTTP.post(url+'login', {params: {
      m: 'login',
      userName: username,
      password: password,
      device: 'ios'
    }});
    
    if (!result.data.success)
      return;
    
    token = result.data.token;
    userId = result.data.userId;
    realName = result.data.realName;
    userType = result.data.userType;
    
    Accounts.createUser({
      username: username,
      password: password,
      profile: {
        userId: userId,
        name: realName,
        userTyep: userType
      }
    });
    
    result = '';

    var getUserInfo = function() {
      var post_data = {
        m: 'getUserInfo',
        userId: userId,
        token: token
      };

      var callback = function(error, result) {
        console.log(result.data);
      };

      HTTP.post(url+'login', {params: post_data}, callback);
    };

    var post = function(namespace, post_data) {
      post_data = JSON.parse(post_data);
      var query = namespace+'?'+querystring.stringify(post_data);
      
      var callback = function(error, result) {
        console.log(result.data);
        DB.Queries.insert({
          time: (new Date()).toJSON(),
          query: query,
          return: result.content
        });
      };

      post_data.userId = userId;
      post_data.token = token;
      HTTP.post(url+namespace, {params: post_data}, callback);
    };
    
    return {
      getUserInfo: getUserInfo,
      post: post
    };
  }
};