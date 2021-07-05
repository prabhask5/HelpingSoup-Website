function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error"); // change to error text
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = message; // changes error to input message
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error"); // removes error class
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = ""; // removes message
}

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
      $(status).html("Thanks! Your donation has been submitted.");
    }).fail(function (data) {
      console.log("error");
      $(status).addClass('error');
      $(status).html("Sorry, an error has occurred");
    });

    event.preventDefault();
  });

  document.querySelectorAll(".form__input").forEach(inputElement => { // looks at all form__input classes
    inputElement.addEventListener("blur", e => { // when user inputs something then clicks off

        if(e.target.id === "zip" && (e.target.value.length > 0 && (e.target.value.match(/^[0-9]+$/) == null || e.target.value.length !== 5))){
            setInputError(inputElement, "Please make sure you inputted your zip code in the correct format.");
        }
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(e.target.id === "email" && (e.target.value.length > 0 && !re.test(e.target.value))){
            setInputError(inputElement, "Please make you inputted your email address in the corrent format.");
        }
    });

    inputElement.addEventListener("input", e => { // when user types again
        clearInputError(inputElement); // clears error
    });
  });
});