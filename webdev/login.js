function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error"); // change to error text
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message; // changes error to input message
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error"); // removes error class
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = ""; // removes message
}

function finalSignUpSubmit(canSubmit){
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

function finalLoginSubmit(canSubmit){
    var ret = true;
    document.querySelectorAll(".loginform__input").forEach(inputElement => {
        if(inputElement.value.length === 0){
            setInputError(inputElement, "Please enter information here.");
            ret = false;
        }
    });
    if(canSubmit == false) ret = false;
    return ret;
}

document.addEventListener("DOMContentLoaded", () => { // form has loaded
    const loginForm = document.querySelector("#login"); 
    const createAccountForm = document.querySelector("#createAccount");
    var status = document.getElementById("status");
    var zipError = false;
    var emailError = false;
    var passError = false;
    var canSubmit = true;

    $(document).on("click", "#linkCreateAccount", e => {
        e.preventDefault(); // preventing href link, or refreshing the page when link clicked
        loginForm.classList.add("form--hidden"); // hiding login form and showing create-account form
        createAccountForm.classList.remove("form--hidden");
    });

    $(document).on("click", "#linkLogin", e => {
        e.preventDefault(); // preventing href link, or refreshing the page when link clicked
        loginForm.classList.remove("form--hidden"); //hiding create-account form and showing login form
        createAccountForm.classList.add("form--hidden");
    });

    $(document).on("click", "#loginSubmit", e => {
        e.preventDefault();
        $(status).removeClass();
        $(status).html("");
        canSubmit = finalLoginSubmit(canSubmit);
        if(canSubmit){
            var formData = {
                email: $("#loginEmail").val(),
                password: $("#loginPass").val(),
              }
            $.ajax({
                type: "POST",
                url: "http://localhost:4000/volunteerLogin",
                data: formData,
                dataType: "text",
                encode: true,
                success: function(data){
                    var obj = JSON.parse(data);
                    pass = []
                    for(var i = 0; i < obj.data.length; i++){
                        pass.push(obj.data[i].volunteerPassword);
                    }
                    console.log("success!");
                    var canLogin = false;
                    for(var i = 0; i < pass.length; i++){
                        if(pass[i] == formData.password) canLogin = true;
                    }
                    if(canLogin){
                        $(loginForm).trigger("reset");
                        $(status).addClass('success');
                        $(status).html("Great! You've been logged in (theoretically)!");
                    }
                    else{
                        $(loginForm).trigger("reset");
                        $(status).addClass('error');
                        $(status).html("Sorry, this username and password combination is incorrect. Please try again.");
                    }
                },
                error: function(data){
                    console.log("error");
                    $(loginForm).trigger("reset");
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

        //setFormMessage(loginForm, "error", "Invalid email/password combination"); // default error message
    });

    $(document).on("click", "#signUpSubmit", e => {
        e.preventDefault();
        $(status).removeClass();
        $(status).html("");
        canSubmit = finalSignUpSubmit(canSubmit);
        if(canSubmit) {
            var formData = {
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                email: $("#email").val(),
                address: $("#address").val(),
                city: $("#city").val(),
                state: $("#state").val(),
                zip: $("#zip").val(),
                school: $("#school").val(),
                password: $("#password").val(),
              }
            $.ajax({
                type: "POST",
                url: "http://localhost:4000/volunteerSignUp",
                data: formData,
                dataType: "text",
                encode: true,
                success: function(data){
                    console.log("success!");
                    $(createAccountForm).trigger("reset");
                    $(status).addClass('success');
                    $(status).html("Great! Your account has been made!");
                },
                error: function(data){
                    console.log("error");
                    $(createAccountForm).trigger("reset");
                    $(status).addClass('error');
                    $(status).html("Sorry, an error has occurred. Please try again later.");
                }
              });
        }
        else {
            console.log("Can't submit!");
            $(status).addClass('error');
            $(status).html("Sorry, an error occurred with your inputs. Please try again.");
        }
    });

    document.querySelectorAll(".form__input, .loginform__input").forEach(inputElement => { // looks at all form__input classes
        inputElement.addEventListener("blur", e => { // when user inputs something then clicks off
            if (e.target.id === "confirmPassword" && (e.target.value.length > 0 && e.target.value !== $("#password").val())) {
                setInputError(inputElement, "Please make sure your passwords match."); // calls setInputError method
                canSubmit = false;
                passError = true;
            }
            if(e.target.id === "zip" && (e.target.value.length > 0 && (e.target.value.match(/^[0-9]+$/) == null || e.target.value.length != 5))){
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
            //console.log("errors " + errors + " canSubmit " + canSubmit);;
        });

        inputElement.addEventListener("input", e => { // when user types again
            if(inputElement.id == "password" || inputElement.id == "confirmPassword"){
                clearInputError(inputElement);
                passError = false;
            }
            else if(inputElement.id == "zip"){
                clearInputError(inputElement);
                zipError = false;
            }
            else if(inputElement.id == "email" || inputElement.id == "loginEmail"){
                clearInputError(inputElement);
                emailError = false;
            }
                if((!rangeError && !timeError) && (!zipError && !emailError)) canSubmit = true;
            //console.log("errors " + errors + " canSubmit " + canSubmit);
        });
    });
});