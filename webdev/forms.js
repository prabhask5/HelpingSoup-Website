function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error"); // change to error text
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = message; // changes error to input message
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error"); // removes error class
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = ""; // removes message
}

function finalSubmit(canSubmit){
  var ret = true;
  document.querySelectorAll(".form__input").forEach(inputElement => {
      if(inputElement.value.length === 0){
          setInputError(inputElement, "Please enter information here.");
          ret = false;
      }
  });
  //console.log("Ret is " + ret);
  if(canSubmit == false) ret = false;
  return ret;
}

document.addEventListener("DOMContentLoaded", () => {
  var form = document.getElementById("my-form");
  var status = document.getElementById("status");
  var errors = 0;
  var timeError = false;
  var canSubmit = true;

  $(document).on("click", "#donationSubmit", e => {
    e.preventDefault();
    $(status).removeClass();
    $(status).html("");
    canSubmit = finalSubmit(canSubmit);
    if(canSubmit){
      var formData = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        email: $("#email").val(),
        address: $("#address").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        zip: $("#zip").val(),
        date: $("#date").val(),
        startTime: $("#firstTime").val(),
        endTime: $("#secondTime").val(),
        message: $("#message").val(),
      }
  
      $.ajax({
        type: "POST",
        url: "http://localhost:4000/donation",
        data: formData,
        dataType: "text",
        encode: true,
        success: function(data){
          console.log("success!");
          $(form).trigger("reset");
          $(status).addClass('success');
          $(status).html("Thanks! Your donation has been submitted.");
        },
        error: function(data){
          console.log("error");
          $(form).trigger("reset");
          $(status).addClass('error');
          $(status).html("Sorry, an error has occurred. Please try again later.");
        }
      });
    }
    else{
      console.log("Can't submit!");
      $(status).addClass('error');
      $(status).html("Sorry, an error occurred with your inputs. Please try again.");
    }
    
  });

  document.querySelectorAll(".form__input").forEach(inputElement => { // looks at all form__input classes
    inputElement.addEventListener("blur", e => { // when user inputs something then clicks off
        //console.log(inputElement.id);
        //console.log($("#1appt"));
        if(e.target.id === "zip" && (e.target.value.length > 0 && (e.target.value.match(/^[0-9]+$/) == null || e.target.value.length !== 5))){
            setInputError(inputElement, "Please make sure you inputted your zip code in the correct format.");
            canSubmit = false;
            errors++;
        }
        var re = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if(e.target.id === "email" && (e.target.value.length > 0 && !re.test(e.target.value))){
            setInputError(inputElement, "Please make you inputted your email address in the correct format.");
            canSubmit = false;
            errors++;
        }
        if((e.target.id === "secondTime" || e.target.id === "firstTime") && (e.target.value < "10:00" || e.target.value > "20:00")){
          setInputError(inputElement, "Please make sure this time is within our office hours.");
          canSubmit = false;
          errors++;
        }
        if(e.target.id === "secondTime" || e.target.id === "firstTime"){
          //console.log($("#1appt").val());
          //console.log($("#2appt").val());
          var valuestart = $("#firstTime").val();
          var valuestop = $("#secondTime").val();
          //console.log(valuestart);
          //console.log(valuestop);         
          var timeStart = new Date("01/01/2007 " + valuestart);
          var timeEnd = new Date("01/01/2007 " + valuestop);
          var diffMin = (timeEnd - timeStart) / 60 / 1000;
          //console.log(diffMin);
          if((valuestart != "" && valuestop != "") && !timeError){
            if(diffMin < 30){
              setInputError(inputElement, "Please make sure your time range is 30 minutes or greater.");
              //setInputError($("#2appt"), "Please make sure your time range is 30 minutes or greater.");
              canSubmit = false;
              errors++;
              timeError = true;
            }
          } 
        }
        //console.log(errors + " " + canSubmit);
    });

    inputElement.addEventListener("input", e => { // when user types again
        if(inputElement.id == "firstTime" || inputElement.id == "secondTime"){
          var t1 = document.querySelector("#firstTime");
          var t2 = document.querySelector("#secondTime");
          clearInputError(t1);
          clearInputError(t2);
          timeError = false;
          if(errors == 0) errors = 0;
          else errors--;
        }
        else{
          clearInputError(inputElement);
          if(errors == 0) errors = 0;
          else errors--;
        }
        if(errors == 0){
          canSubmit = true;
        }
        //console.log(errors + " " + canSubmit);
    });
  });
});