// search class of grade g and class c at semester semesterAt
// return class id
// create a class if not exists
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

DBmethods = {
  upsertClass: upsertClass
};