var upsertClass = function(_id, g, c, semesterAt) {
  if (DB.Classes.findOne(_id)) {
    return _id;
  } else {
    var enrollIn = parseInt(semesterAt, 10) - g + 1;
    return DB.Classes.insert({
      _id: _id,
      enrollIn: enrollIn,
      class: c
    });
  }
}

var upsertStudent = function(_id, name, classId, number) {
  if (DB.Students.findOne(_id)) {
    return _id;
  } else {
    DB.Students.insert({
      _id: _id,
      name: name,
      number: number || '',
      history: [{
        classId: classId,
        since: '2014b',
        until: '2222b'
      }]
    });
  }
};

DBmethods = {
  upsertClass: upsertClass,
  upsertStudent: upsertStudent
};