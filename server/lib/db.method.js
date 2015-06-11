var upsertClass = function(_id, g, c, semester, name) {
  if (DB.Classes.findOne(_id)) {
    return _id;
  } else {
    var enrollIn = parseInt(semester, 10) - g + 1;
    return DB.Classes.insert({
      _id: _id,
      enrollIn: enrollIn,
      class: c,
      name: name
    });
  }
};

var initEval = function(studentId, classId) {
  var time = EvalDate.getWeek(new Date(), {format: 'value'}),
      semester = EvalDate.getSemester();
  DB.EvalRange.find().forEach(function(eval) {
    var score = 5;
    var scores = eval.range.map(function(item, index) {
      item.score = score;
      item.index = index;
      return item;
    });
    DB.EvalScores.insert({
      studentId: studentId,
      semester: semester,
      classId: classId,
      time: time,
      evalName: eval.name,
      scores: scores
    });
  });
};

var upsertStudent = function(_id, name, classId, number) {
  if (DB.Students.findOne(_id)) {
    return _id;
  } else {
    var semester = EvalDate.getSemester();
    DB.Students.insert({
      _id: _id,
      name: name,
      number: number || '',
      history: [{
        classId: classId,
        since: semester,
        until: '2222b'
      }]
    });
    
    initEval(_id, classId);
  }
};

DBmethods = {
  upsertClass: upsertClass,
  upsertStudent: upsertStudent
};