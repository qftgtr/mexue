if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault({
    selectedSemester: EvalDate.getSemester(),
    selectedTime: EvalDate.getMonthDate(new Date(), {format: 'value'}),
    classFilter: '',
  });
}

var newEval = function(name, range, frequency) {
  return DB.EvalRange.insert({
    semester: EvalDate.getSemester(),
    subject: '数学',
    name: name,
    range: range,
    frequency: frequency || 'sporadic'
  });
};

var newStu = function(i, g) {
  Meteor.call('newStudent', {
    name: '小明'+g+1+''+i,
    grade: 1+g,
    class: 2+g,
    number: i,
    semesterAt: EvalDate.getSemester()
  });
};

if (Meteor.isServer) {
  //ReactiveTable.publish('students', DB.Students);
  
  Meteor.startup(function () {
    // code to run on server at startup
    if (!DB.EvalRange.findOne()) {
      newEval('课堂', [
        { tag: '倾听', max: 5, desc: '' }, 
        { tag: '思考', max: 5, desc: '' }, 
        { tag: '合作', max: 5, desc: '' }, 
        { tag: '表达', max: 5, desc: '' } 
        //{ tag: '专心', max: 5, desc: '' }
      ], 'weekly');
      
      newEval('作业', [
        { tag: '态度', max: 5, desc: '' }, 
        { tag: '书写', max: 5, desc: '' }, 
        { tag: '及时改错', max: 5, desc: '' }, 
        { tag: '正确率', max: 5, desc: '' }
      ], 'daily');
        
      newEval('成绩', [], 'sporadic');
      newEval('小课题', [], 'once');
      
      newEval('综合素质评价', [
        { tag: '热爱祖国', max: 5,
          desc: '尊敬国家标志，关心哺育内外大事和时事政治' },
        { tag: '遵纪守法', max: 5,
          desc: '遵守校纪校规与青少年有关的法律法规，具有法律意识' },
        { tag: '诚实守信', max: 5,
          desc: '待人诚恳，遵守诺言' },
        { tag: '关心集体', max: 5,
          desc: '珍惜集体荣誉，积极参加班级、学校教育活动和学生自主管理工作' },
        { tag: '保护环境', max: 5,
          desc: '有较强的环境意识，积极参加环保活动' },
        { tag: '遵守秩序', max: 5,
          desc: '自觉遵守各项社会秩序，提高公德意识' },
        
        { tag: '孝敬父母', max: 5,
          desc: '尊重父母，体贴父母' },
        { tag: '尊敬师长', max: 5,
          desc: '珍惜师长的关爱，听从正确教导' },
        { tag: '礼貌待人', max: 5,
          desc: '对他人有礼貌，习惯使用礼貌用语' },
        { tag: '乐于助人', max: 5,
          desc: '富有爱心，能乐意帮助他人' },
        { tag: '自尊自律', max: 5,
          desc: '重视人格尊严，有正义感，能正确评价和约束自己的行为' },
        { tag: '热心公益', max: 5,
          desc: '积极参加义务劳动、宣传活动、义卖活动、慈善募捐等社会公益活动和社会实践活动' },
        
        { tag: '学习兴趣', max: 5,
          desc: '喜欢学习，有好奇心，有求知欲，并努力克服学习中存要的困难' },
        { tag: '学习方法', max: 5,
          desc: '有良好的学习习惯，能用各种学习方式提高学习水平，形成一套适合自身发展的学习方法' },
        { tag: '计划反思', max: 5,
          desc: '能够制定有效的学习计划，善于在学习中总结与反思，听取他人意见，不断改进提高' },
        { tag: '独立探究', max: 5,
          desc: '能独立思考，善于提出问题和解决问题，能初步掌握探究的策略与方法' },
        
        { tag: '乐观开朗', max: 5,
          desc: '心胸开阔，个性开朗，学会自我调节，保持良好的心态' },
        { tag: '主动交流', max: 5,
          desc: '愿意将自己的成功和困惑告诉同学、老师和家长' },
        { tag: '尊重他人', max: 5,
          desc: '学会倾听他人意见，善于尊重和理解他人的观点和处境' },
        { tag: '乐于合作', max: 5,
          desc: '能与同学、老师、家长友好相处，在学习和活动中乐于与他人合作' },
        
        { tag: '锻炼积极', max: 5,
          desc: '热爱体育运动，积极参加各种体育锻炼活动' },
        { tag: '身体健康', max: 5,
          desc: '关心自己身体健康状况，保持体质健康' },
        
        { tag: '情趣高雅', max: 5,
          desc: '能感受并欣赏生活、自然、艺术和科学中美，具有健康的审美情趣' },
        { tag: '兴趣广泛', max: 5,
          desc: '积极参加艺术活动，用多种方式进行艺术表现' }
      ], 'once');
    }
  });
}

