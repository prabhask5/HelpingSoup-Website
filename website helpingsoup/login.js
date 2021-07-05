function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message"); // looks at every html element with class form__message

    messageElement.textContent = message; // changing noti to message passed in input
    messageElement.classList.remove("form__message--success", "form__message--error"); //refeshing classes
    messageElement.classList.add(`form__message--${type}`); // adding success or error class depending on input
}

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
            setFormMessage(createAccountForm, "success", "Great! Your account has been made!");
          }).fail(function (data) {
            console.log("error");
            setFormMessage(createAccountForm, "error", "Sorry, an error occurred.");
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