var g;

var clickToEdit = function(post, event, db) {
  var clickedItem = event.target,
      cNames = clickedItem.className.split(' ');
  if (cNames[0] === 'fa') {
    var value = cNames[2][0],
        key = clickedItem.parentNode.className.split(' ')[1];
    Meteor.call(db, {id: post._id, key: key, value: value});
  }
  
  var editable = cNames[0],
      key = cNames[1];
    
      

  if (editable === 'eval-editable' && clickedItem.tagName === 'TD') { // check if already clicked
    var inputDiv = document.createElement('div');
    if (key === 'teacherComment')
      inputDiv.innerHTML = '<textarea class="oninput">' + clickedItem.innerHTML + '</textarea>';
    else
      inputDiv.innerHTML = '<input class="oninput" type="text" value="' + clickedItem.innerHTML + '">';

    clickedItem.appendChild(inputDiv.firstChild);
    
    $('.oninput').focus().select().focusout(function(event) {
      var value = event.target.value;

      // remove input box
      event.target.parentElement && event.target.parentElement.removeChild(event.target);
      
      // update db
      if (db === 'updateQuantum') {
        Meteor.call(db, {id: post._id, index: post.index, value: value});
      } else {
        Meteor.call(db, {id: post._id, key: key, value: value});
      }
    }).keypress(function(event) {
      if (event.which === 13) event.target.blur();
    });
  }
  
  if (editable === 'eval-clickable' && clickedItem.tagName === 'TD') { // check if already clicked
    var value = clickedItem.innerHTML;
    Meteor.call(db, {id: post._id, key: key, value: 1-value})// update db
  }
};

var getEvalFields = function(labels, editable, options) {
  var fields = [
    {
      key: 'studentId',
      label: '学号',
      headerClass: 'col-md-1 col-sm-2',
      cellClass: 'col-md-1 col-sm-1',
      fn: function(v) { return DB.Students.findOne(v).number; }
    }, {
      key: 'studentId',
      label: '姓名',
      headerClass: 'col-md-1 col-sm-2',
      cellClass: 'col-md-1 col-sm-2',
      fn: function(v) { return DB.Students.findOne(v).name; }
    }
  ];
  
  for (var i=0, len=labels.length; i<len; i++) {
    var evalItem= {
      key: 'scores.'+i+'.score',
      label: labels[i],
      sortable: false,
      headerClass: 'scores-'+i + ' col-md-1 col-sm-1',
      cellClass: (labels[i]?'eval-'+editable:'')+' scores-'+i + ' col-md-1 col-sm-1',
    };
    
    if (editable === 'rating') {
      evalItem.fn = function(v,o) {
        return new Handlebars.SafeString(
          '<i class="fa fa-star'+(v>0?'':'-o')+' 1-fa"></i>'+
          '<i class="fa fa-star'+(v>1?'':'-o')+' 2-fa"></i>'+
          '<i class="fa fa-star'+(v>2?'':'-o')+' 3-fa"></i>'+
          '<i class="fa fa-star'+(v>3?'':'-o')+' 4-fa"></i>'+
          '<i class="fa fa-star'+(v>4?'':'-o')+' 5-fa"></i>'
        );
      };
    }
    
    fields.push(evalItem);
  }

  if (!(options && options.noSum)) {
    fields.push({
      key: 'scores',
      label: '合计',
      sortable: false,
      headerClass: 'col-md-1 col-sm-1',
      cellClass: 'col-md-1 col-sm-1',
      fn: function(v,o) { 
        var sum = 0;
        for (var i = v.length; i--;) sum += v[i].score||0;
        return sum;
      }
    });
  }
  
  if (!(options && options.noComment)) {
    fields.push({
      key: 'teacherComment',
      label: '评语',
      sortable: false,
      headerClass: 'teacherComment',
      cellClass: 'eval-editable teacherComment'
    });
  }
  
  return fields;
}
