$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

$(document).on('click', '.add-note', function () {
  var id = $(this).data('id');

  $.ajax({
    method: 'POST',
    url: '/articles/add-note/' + id,
    data: {
      body: $('#textarea-' + id).val()
    }
  }).done(function (data) {
    console.log(data);
    $('#textarea-' + id).val('');

    window.location.replace('/articles');
  });
});
