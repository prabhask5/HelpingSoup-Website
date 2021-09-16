function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error"); // change to error text
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message; // changes error to input message
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error"); // removes error class
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = ""; // removes message
}

function finalSubmit(canSubmit) {
    var ret = true;
    document.querySelectorAll(".forgotform__input").forEach(inputElement => {
        if(inputElement.value.length === 0){
            setInputError(inputElement, "Please enter information here.");
            ret = false;
        }
    });
    if(canSubmit == false) ret = false;
    return ret;
}

document.addEventListener("DOMContentLoaded", e => {
    const forgotForm = document.querySelector("forgot");
    var status = document.getElementById("status");
    var canSubmit = true;
    var passError = false;

    $(document).on("click", "#resetSubmit", e => {
        e.preventDefault();
        $(status).removeClass();
        $(status).html("");
        var submit = finalSubmit(canSubmit);
        if(submit){
            var formData = {
                password: $("#resetPassword").val()
              }
            $.ajax({
                type: "POST",
                url: "http://localhost:4000/resetVolunteerPassword",
                data: formData,
                dataType: "json",
                encode: true,
                success: function(data){
                    if(data.success == true){
                        console.log("password reset!");
                        $(forgotForm).trigger("reset");
                        $(status).addClass('success');
                        $(status).html("Great! Your password has been reset!");
                    }
                    else if(data.success == false){
                        console.log("didn't work!");
                        alert("Sorry, please choose a password that isn't an old password.");
                    }
                },
                error: function(data){
                    console.log("error");
                    $(forgotForm).trigger("reset");
                    alert("Sorry, an error has occurred. Please try again later.");
                }
              });
        }
        else{
            console.log("Can't submit!");
            alert("Sorry, an error occurred with your inputs. Please try again.");
        }
    });

    document.querySelectorAll(".forgotform__input").forEach(inputElement => { // looks at all form__input classes
        inputElement.addEventListener("blur", e => { // when user inputs something then clicks off
            if ((e.target.id === "resetConfirmPassword" || e.target.id === "resetPassword") && (($("#resetConfirmPassword").val().length > 0 && $("#resetPassword").val().length > 0) && $("#resetConfirmPassword").val() !== $("#resetPassword").val())) {
                setInputError(inputElement, "Please make sure your passwords match."); // calls setInputError method
                canSubmit = false;
                passError = true;
            }
        });

        inputElement.addEventListener("input", e => { // when user types again
            if(inputElement.id == "resetPassword" || inputElement.id == "resetConfirmPassword"){
                var p1 = document.querySelector("#resetPassword");
                var p2 = document.querySelector("#resetConfirmPassword");
                clearInputError(p1);
                clearInputError(p2);
                passError = true;
            }
            if(!passError) canSubmit = true;
            //console.log("errors " + errors + " canSubmit " + canSubmit);
        });
    });
});