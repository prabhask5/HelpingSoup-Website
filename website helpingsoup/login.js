function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error"); // change to error text
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message; // changes error to input message
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error"); // removes error class
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = ""; // removes message
}

document.addEventListener("DOMContentLoaded", () => { // form has loaded
    const loginForm = document.querySelector("#login"); 
    const createAccountForm = document.querySelector("#createAccount");
    var status = document.getElementById("status");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault(); // preventing href link, or refreshing the page when link clicked
        loginForm.classList.add("form--hidden"); // hiding login form and showing create-account form
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault(); // preventing href link, or refreshing the page when link clicked
        loginForm.classList.remove("form--hidden"); //hiding create-account form and showing login form
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault(); // ??????

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid email/password combination"); // default error message
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
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
            url: "https://formspree.io/f/xjvjoloo",
            data: formData,
            dataType: "json",
            encode: true,
          }).done(function (data) {
            console.log("success!");
            $(createAccountForm).trigger("reset");
            $(status).addClass('success');
            $(status).html("Great! Your account has been made!");
          }).fail(function (data) {
            console.log("error");
            $(status).addClass('error');
            $(status).html("Sorry, an error has occurred");
          });
    })

    document.querySelectorAll(".form__input").forEach(inputElement => { // looks at all form__input classes
        inputElement.addEventListener("blur", e => { // when user inputs something then clicks off
            if (e.target.id === "confirmPassword" && (e.target.value > 0 && e.target.value !== $("#password").val())) {
                // ^ if statement to check if id of html elemnt is signupUsername and checks if that username is long enough
                setInputError(inputElement, "Please make sure your passwords match."); // calls setInputError method
            }
            if(e.target.id === "zip" && (e.target.value.length > 0 && (e.target.value.match(/^[0-9]+$/) == null || e.target.value.length != 5))){
                setInputError(inputElement, "Please make sure you inputted your zip code in the correct format.");
            }
            var re = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            if(e.target.id === "email" && (e.target.value.length > 0 && !re.test(e.target.value))){
                setInputError(inputElement, "Please make you inputted your email address in the correct format.");
            }
        });

        inputElement.addEventListener("input", e => { // when user types again
            clearInputError(inputElement); // clears error
        });
    });
});