var updateEval = function(data) {
  // change type to int
  var v = parseInt(data.value, 10),
      setTo = {};
  
  setTo[data.key] = v>-1?v:'';
  
  DB.EvalScores.update(data.id, {$set: setTo});
};

Meteor.methods({
  updateEval: updateEval
});