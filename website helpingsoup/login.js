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

    document.querySelectorAll(".form__input").forEach(inputElement => { // looks at all form__input classes
        inputElement.addEventListener("blur", e => { // when user inputs something then clicks off
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                // ^ if statement to check if id of html elemnt is signupUsername and checks if that username is long enough
                setInputError(inputElement, "Username must be at least 10 characters in length"); // calls setInputError method
            }
        });

        inputElement.addEventListener("input", e => { // when user types again
            clearInputError(inputElement); // clears error
        });
    });
});