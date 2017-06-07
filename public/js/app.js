$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

$(document).on('click', '.add-note', function () {
  // Grab the id associated with the article from the submit button
  var id = $(this).data('id');

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: 'POST',
    url: '/articles/add-note/' + id,
    data: {
      body: $('#textarea-' + id).val()
    }
  })
    // With that done
    .done(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val('');
  $('#bodyinput').val('');
});
