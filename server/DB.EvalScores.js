var updateEval = function(data) {
  // change type to int
  
  if (data.key === 'teacherComment') {
    console.log(data);
    DB.EvalScores.update(data.id, {$set: {'teacherComment': data.value}});
  }
  
  // TODO: add more check for data.key
  if (data.key.substr(0,7) === 'scores-') {
    var v = parseInt(data.value, 10),
        setTo = {};

    setTo['scores.'+data.key[7]] = v>-1?v:'';

    DB.EvalScores.update(data.id, {$set: setTo});
  }
};

Meteor.methods({
  updateEval: updateEval
});