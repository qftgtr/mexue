var updateEval = function(data) {
  if (data.key === 'teacherComment') {
    console.log(data);
    DB.EvalScores.update(data.id, {$set: {'teacherComment': data.value}});
  }
  
  // TODO: add more check for data.key
  if (data.key.substr(0,7) === 'scores-') {
    var v = parseInt(data.value, 10),
        setTo = {};
    
    setTo['scores.'+data.key[7]+'.score'] = v>-1?v:'';

    DB.EvalScores.update(data.id, {$set: setTo});
  }
};

var updateQuantum = function(data) {
  //console.log(data);
  
  // TODO: add more check for data.key
  var v = parseInt(data.value, 10),
      setTo = {};

  setTo['scores.'+data.index+'.score'] = v>-1?v:'';

  //console.log(setTo);
  
  DB.EvalScores.update({
    evalName: '综合素质评价',
    semester: '2014b',
    classId: '55276d6645ce226af8deb7af'
  }, {$set: setTo});
};


Meteor.methods({
  updateEval: updateEval,
  updateQuantum: updateQuantum
});