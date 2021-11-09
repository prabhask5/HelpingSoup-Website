var protocol = "http://";
const config = {
    frontendDomain: protocol + "localhost:5500/",
    backendDomain: protocol + "localhost:4000/"
};

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
  var emailError = false;
  var zipError = false;
  var timeError = false;
  var dateError = false;
  var rangeDateError = false;
  var rangeError = false;
  var canSubmit = true;

  $(document).on("click", "#donationSubmit", e => {
    e.preventDefault();
    $(status).removeClass();
    $(status).html("");
    var optIn = false;
    var submit = finalSubmit(canSubmit);
    if(submit){
      if(document.getElementById('emailOpt').checked){
        optIn = true;
      }
      var formData = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        email: $("#email").val(),
        address: $("#address").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        zip: $("#zip").val(),
        firstDate: $("#firstDate").val(),
        lastDate: $("#lastDate").val(),
        startTime: $("#firstTime").val(),
        endTime: $("#secondTime").val(),
        emailOpt: optIn,
        message: $("#message").val()
      }
  
      $.ajax({
        type: "POST",
        url: config.backendDomain + "donation",
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
          alert("Sorry, an error has occurred. Please try again later.");
        }
      });
    }
    else{
      console.log("Can't submit!");
      alert("Sorry, an error occurred with your inputs. Please try again.");
    }
    
  });

  document.querySelectorAll(".form__input").forEach(inputElement => { // looks at all form__input classes
    inputElement.addEventListener("blur", e => { // when user inputs something then clicks off
        if(e.target.id === "zip" && (e.target.value.length > 0 && (e.target.value.match(/^[0-9]+$/) == null || e.target.value.length !== 5))){
            setInputError(inputElement, "Please make sure you inputted your zip code in the correct format.");
            canSubmit = false;
            zipError = true;
        }
        var re = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if(e.target.id === "email" && (e.target.value.length > 0 && !re.test(e.target.value))){
            setInputError(inputElement, "Please make you inputted your email address in the correct format.");
            canSubmit = false;
            emailError = true;
        }
        if((e.target.id === "secondTime" || e.target.id === "firstTime") && !timeError){
          var t1 = document.querySelector("#firstTime");
          var t2 = document.querySelector("#secondTime");
          if ($("#firstTime").val() != "" && ($("#firstTime").val() < "10:00" || $("#firstTime").val() > "20:00")){
            setInputError(t1, "Please make sure this time is within our office hours.");
            canSubmit = false;
            rangeError = true;
          }
          if ($("#secondTime").val() != "" && ($("#secondTime").val() < "10:00" || $("#secondTime").val() > "20:00")){
            setInputError(t2, "Please make sure this time is within our office hours.");
            canSubmit = false;
            rangeError = true;
          }
        }
        if(e.target.id === "secondTime" || e.target.id === "firstTime"){
          var valuestart = $("#firstTime").val();
          var valuestop = $("#secondTime").val();    
          var timeStart = new Date("01/01/2007 " + valuestart);
          var timeEnd = new Date("01/01/2007 " + valuestop);
          var diffMin = (timeEnd - timeStart) / 60 / 1000;
          //console.log(diffMin);
          if((valuestart != "" && valuestop != "") && !timeError){
            if(diffMin < 30){
              var t1 = document.querySelector("#firstTime");
              var t2 = document.querySelector("#secondTime");
              setInputError(t1, "Please make sure your time range is 30 minutes or greater.");
              setInputError(t2, "Please make sure your time range is 30 minutes or greater.");
              canSubmit = false;
              timeError = true;
            }
          } 
        }
        if((e.target.id === "firstDate" || e.target.id === "lastDate") && !dateError){
          var t1 = document.querySelector("#firstDate");
          var t2 = document.querySelector("#lastDate");
          var today = new Date();
          today.setHours(0,0,0,0);
          today.setDate(today.getDate() - 1);
          if (new Date($("#firstDate").val()) < today){
            setInputError(t1, "Make sure your date is valid.");
            canSubmit = false;
            rangeDateError = true;
          }
          if (new Date($("#lastDate").val()) < today){
            setInputError(t2, "Make sure your date is valid.");
            canSubmit = false;
            rangeDateError = true;
          }
        }
        if(e.target.id === "firstDate" || e.target.id === "lastDate"){
          var valuestart = $("#firstDate").val();
          var valuestop = $("#lastDate").val();    
          if((valuestart != "" && valuestop != "") && !dateError){
            var d1 = new Date($("#firstDate").val());
            var d2 = new Date($("#lastDate").val());
            if(d1 > d2 || d1.getTime() === d2.getTime()){
              var t1 = document.querySelector("#firstDate");
              var t2 = document.querySelector("#lastDate");
              setInputError(t1, "Please make sure your dates are sequential.");
              setInputError(t2, "Please make sure your dates are sequential.");
              canSubmit = false;
              dateError = true;
            }
          } 
        }
        //console.log(rangeError + " " + timeError + " " + zipError + " " + emailError);
    });

    inputElement.addEventListener("input", e => { // when user types again
      if(inputElement.id == "firstTime" || inputElement.id == "secondTime"){
        clearInputError(inputElement);
        rangeError = false;
      }
      if(inputElement.id == "firstDate" || inputElement.id == "lastDate"){
        clearInputError(inputElement);
        rangeDateError = false;
      }  
      if((inputElement.id == "firstTime" || inputElement.id == "secondTime") && timeError){
          var t1 = document.querySelector("#firstTime");
          var t2 = document.querySelector("#secondTime");
          clearInputError(t1);
          clearInputError(t2);
          timeError = false;
        }
      else if((inputElement.id == "firstDate" || inputElement.id == "lastDate") && dateError){
        var t1 = document.querySelector("#firstDate");
        var t2 = document.querySelector("#lastDate");
        clearInputError(t1);
        clearInputError(t2);
        dateError = false;
      }
      else if(inputElement.id == "zip"){
          clearInputError(inputElement);
          zipError = false;
        }
      else if(inputElement.id == "email"){
          clearInputError(inputElement);
          emailError = false;
        }
      else clearInputError(inputElement);
        if((!rangeError && !timeError) && ((!zipError && !emailError) && (!rangeDateError && !dateError))) canSubmit = true;
        //console.log(rangeError + " " + timeError + " " + zipError + " " + emailError);
    });
  });
});