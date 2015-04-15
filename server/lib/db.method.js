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