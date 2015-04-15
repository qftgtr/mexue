var upsertClass = function(_id, g, c, semester) {
  if (DB.Classes.findOne(_id)) {
    return _id;
  } else {
    var enrollIn = parseInt(semester, 10) - g + 1;
    return DB.Classes.insert({
      _id: _id,
      enrollIn: enrollIn,
      class: c
    });
  }
};

//var initEval = function(studentId, classId) {
//  var time = '',
//      semester = EvalDate.getSemester();
//  DB.EvalRange.find({}).forEach(function(e) {
//    var scores = e.scores;
//    DB.EvalScores.insert({
//      studentId: studentId,
//      semester: semester,
//      classId: classId,
//      time: time,
//      norm: e.norm,
//      scores: scores
//    });
//  });
//};

var initEval = function(studentId, classId) {
  DB.EvalScores.insert({
    studentId: studentId,
    semester: EvalDate.getSemester(),
    classId: classId,
    norm: '测验',
    scores: [
      Math.floor(Math.random()*70+30),
      Math.floor(Math.random()*70+30),
      Math.floor(Math.random()*70+30)
    ]
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