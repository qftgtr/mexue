/* data models 

Classes: {
  _id: '',
  enrollIn: 2014, // 上小学一年级的年份
  class: 2,
  // active: 'before' || 'active' || 'graduated', hasn't implemented
}

Students: {
  _id: '',
  name: '',
  number: '',
  history: [{
    classId: '',
    since: '2014b',
    until: '2222b'
  }]
  // usedNames: [''], hasn't implemented
  // active: 'before' || 'active' || 'graduated', hasn't implemented
}

EvalScores: {
  _id: '',
  studentId: '',
  semester: '2014b',
  classId: '', // 如果学生中途转班，之前的成绩仍然在前一个班中，不会转过来。之前的也不会被删除。
  time: 'Date object',
  norm: '',
  scores: [5, 5, 5],
  // active: 'transferred' || 'active', hasn't implemented
}

EvalRange: {
  _id: '',
  semester: '2014b',
  subject: '数学',
  norm: '',
  indicator: [''],
  description: [''],
  max: [5],
  frequency: 'weekly' || 'monthly' || 'once' || 'sporadic'
}

*/

DB = {
  Classes: new Mongo.Collection('classes'),
  Students: new Mongo.Collection('students'),
  EvalScores: new Mongo.Collection('evalScores'),
  EvalRange: new Mongo.Collection('evalRange'),
  Queries: new Mongo.Collection('queries')
};