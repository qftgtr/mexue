mobileAPI = {
  new: function(url) {
    var url = url || 'http://111.204.178.102:8080/mobile/api/';
    
    var username, password, token, userId, realName, userType;
    
    var accountId;
    
    var login = function(u, p) {
      username = u;
      password = p;
      
      var result;
      try {
        result = HTTP.post(url+'login', {params: {
          m: 'login',
          userName: u,
          password: p,
          device: 'ios'
        }});
      } catch (error) {
        return false;
      }
      
      if (result.data.success) {
        token = result.data.token;
        userId = result.data.userId;
        realName = result.data.realName;
        userType = result.data.userType;

        return true;
      }
      
      return false;
    };
    
    var createUser = function() {
      accountId = Accounts.createUser({
        username: username,
        password: password,
        profile: {
          userId: userId,
          name: realName,
          userTyep: userType
        }
      });
      return accountId;
    };
    
    var changePassword = function(aid) {
      accountId = aid;
      Accounts.setPassword(aid, password);
    };
    
    var getUserInfo = function() {
      HTTP.post(url+'userInfo', {params: {
        m: 'getUserInfo',
        userId: userId,
        token: token
      }}, function(error, result) {
        Meteor.users.update(accountId, {$set: {'profile.userInfo': result.data.userInfo}});
        classes = result.data.userInfo;
        console.log(classes);
        for (var i = classes.length; i--; ) {
          var classId = classes[i].classId,
              name = classes[i].className;
          
          var t = name.split('年级');
          
          var toNumber = { '一': 1, '二': 2, '三': 3, 
                           '四': 4, '五': 5, '六': 6 };
          DBmethods.upsertClass(classId, toNumber[t[0]], 
                                parseInt(t[1],10), '2014b');
        }
      });
    };
    
    var getContacts = function() {
      if (userType === 'teacher') {
        HTTP.post(url+'communication', {params: {
          m: 'getMyClassesandGroup',
          type: 'teacher',
          userId: userId,
          token: token
        }}, function(error, result) {
          var school = result.data.School[0];
          //console.log(school.SchoolName);
          var classes = school.list;
          for (var i = classes.length; i--; ) {
            var contact = classes[i].contact;
            for (var j = contact.length; j--; ) {
              if (contact[j].type === 'parent')
                console.log(contact[j]);
            }
          }
        });
      }
    };
    
    var post = function(namespace, post_data) {
      var query = namespace+'?'+post_data;
      
      var callback = function(error, result) {
        console.log(result.data);
        DB.Queries.insert({
          time: (new Date()).toJSON(),
          query: query,
          return: result.content
        });
      };
      
      post_data = post_data + '&userId=' + userId + '&token=' + token;
      console.log(post_data);
      HTTP.post(url+namespace, {query: post_data}, callback);
    };
    
    return {
      login: login,
      createUser: createUser,
      changePassword: changePassword,
      getUserInfo: getUserInfo,
      getContacts: getContacts,
      post: post
    };
  }
};
