className = function(doc, semesterAt) {
  var gradeNames = ['一', '二', '三', '四', '五', '六'];
  semesterAt = semesterAt?parseInt(semesterAt):'';
  if (!semesterAt)
    semesterAt = parseInt(Session.get('selectedSemester'), 10);
  var g = semesterAt - doc.enrollIn + 1;
  
  if (g > 6)
    return doc.enrollIn+6 + '年毕业(' + doc.class + ')班';
  
  if (g > 0)
    return gradeNames[g-1] + '年级(' + doc.class + ')班';
  
  return doc.enrollIn + '年入学(' + doc.class + ')班';
};

semesterName = function(semesterAt) {
  if (semesterAt && semesterAt.length === 5)
  {
    var name = parseInt(semesterAt, 10);
    if (semesterAt[4] === 'a')
      return name + '秋';

    if (semesterAt[4] === 'b')
      return name+1 + '春';
  }
  return '???';
}

indicators = {
  class: ['倾听', '思考', '合作', '表达', '专心'],
  hw: ['态度', '书写', '及时改错', '正确率'],
  quiz: ['第一单元', '第二单元', '第三单元', '', '', '', '', '', '', '期末考试'],
  project: ['总评']
};