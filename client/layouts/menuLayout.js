var menuItems = [
  { url: "/eval/class",    text: "课堂",   template: "EvalClass" },
  { url: "/eval/homework", text: "作业",   template: "EvalHomework" },
  { url: "/eval/quiz",     text: "考试",   template: "EvalQuiz" },
  { url: "/eval/project",  text: "小课题", template: "EvalProject" }
];


// 设置菜单显示内容
Template.MenuLayout.helpers({
  menuItems: menuItems
});


// 设置菜单链接
for (var i = menuItems.length; i--; ) {
  (function(item) {
    Router.route(item.url, function() {
      this.render(item.template);
    });
  }(menuItems[i]));
}