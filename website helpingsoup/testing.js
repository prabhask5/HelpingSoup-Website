$(document).ready(function () {
  $("form").submit(function (event) {
    var formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      superheroAlias: $("#superheroAlias").val(),
    };

    $.ajax({
      type: "POST",
      url: "https://formspree.io/f/xyylpbdw",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log("success!");
    });

    event.preventDefault();
  });
});