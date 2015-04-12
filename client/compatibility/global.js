var g;

var clickToEdit = function(post, event, db) {
  var clickedItem = event.target, // the clicked element
      cNames = clickedItem.className.split(' '),
      editable = cNames[0],
      key = cNames[1];

  if (editable === 'eval-editable' && clickedItem.tagName === 'TD') { // check if already clicked
    var inputDiv = document.createElement('div');
    inputDiv.innerHTML = '<input class="oninput" type="text" value="' + clickedItem.innerHTML + '"/>';

    clickedItem.appendChild(inputDiv.firstChild);

    $('.oninput').focus().focusout(function(event) {
      var value = event.target.value;

      // remove input box
      event.target.parentElement && event.target.parentElement.removeChild(event.target);

      Meteor.call(db, {id: post._id, key: key, value: value})// update db
    }).keypress(function(event) {
      if (event.which === 13) event.target.blur();
    });
  }
  
  if (editable === 'eval-clickable' && clickedItem.tagName === 'TD') { // check if already clicked
    var value = clickedItem.innerHTML;
    Meteor.call(db, {id: post._id, key: key, value: 1-value})// update db
  }
};