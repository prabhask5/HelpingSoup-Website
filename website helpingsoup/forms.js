$(document).ready(function () {
  var form = document.getElementById("my-form");
  var status = document.getElementById("status");
  $("#email").attr("required", false);
  $("#phone").attr("required", false);
  $(form).submit(function (event) {
    var formData = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      address: $("#address").val(),
      city: $("#city").val(),
      zip: $("#zip").val(),
      date: $("#date").val(),
      time: $("#appt").val(),
      message: $("#message").val(),
    }

    $.ajax({
      type: "POST",
      url: "https://formspree.io/f/xyylpbdw",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log("success!");
      $(form).trigger("reset");
      $(status).addClass('success');
      $(status).html("Thanks!");
    }).fail(function (data) {
      console.log("error");
      $(status).addClass('error');
      $(status).html("An error has occurred");
    });

    event.preventDefault();
  });
});

function emailorphoneshower() {
  var chkYes = document.getElementById("chkYes");
  var chkNo = document.getElementById('chkNo');
  var emailaddress = document.getElementById("emailaddress");
  var phonenumber = document.getElementById('phonenumber')
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  if(chkYes.checked){
    emailaddress.style.display = "block";
    email.required = true;
    phone.required = false;
  }
  else{
    emailaddress.style.display = "none";
  } 
  if(chkNo.checked){
    phonenumber.style.display = "block";
    phone.required = true;
    email.required = false;
  }
  else{
    phonenumber.style.display = "none";
  } 
}