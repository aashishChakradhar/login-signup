const toggleMobileViewUI = () => {
    const width = window.innerWidth;

    const signupBtn = document.getElementById("signupCollapseBtn");
    const loginBtn = document.getElementById("loginCollapseBtn");
    const switchWrapper = document.getElementById("switchWrapper");
    const signinBtn = document.querySelector(".form-btn.signin.hidden");
    const signupHiddenBtn = document.querySelector(".form-btn.signup.hidden");

    if (width < 500) {
      signupBtn?.classList.add("hidden");
      loginBtn?.classList.add("hidden");
      switchWrapper?.classList.add("hidden");
      signinBtn?.classList.remove("hidden");
      signupHiddenBtn?.classList.remove("hidden");
    } else {
      signupBtn?.classList.remove("hidden");
      loginBtn?.classList.remove("hidden");
      switchWrapper?.classList.remove("hidden");
      // Optionally re-hide those hidden buttons
      document.querySelector(".form-btn.signin")?.classList.add("hidden");
      document.querySelector(".form-btn.signup")?.classList.add("hidden");
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    toggleMobileViewUI(); // Run on initial load
  });

  window.addEventListener("resize", () => {
    toggleMobileViewUI(); // Re-run on screen resize
  });

function validateName(name, idName) {
    const valid = /^[a-zA-Z]+$/; // Regex for alphabetic characters only
    const inputElement = document.getElementById(idName);
    const errorElement = inputElement.parentElement.querySelector(".error"); // Select the <small> element with the class "error"

    // Clear the error message if present
    errorElement.innerText = "";

    if(name.trim() === ""){ // checks for empty field
        errorElement.innerText = "Input Required";
        errorElement.style.display = "block"; // Ensure the error message is visible
        return false;
    }else if (!valid.test(name)) {
        // Display the error message in the <small> element
        errorElement.innerText = "Invalid Name: Only alphabetic characters are allowed.";
        errorElement.style.display = "block"; // Ensure the error message is visible
        return false;
    } else {
        errorElement.style.display = "none"; // Hide the error message if input is valid
        return true;
    }
}

function validateEmail(mail,idName){
    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const errorElement = document.querySelector(`#${idName} + .error`);

    // Clear the error message if present
    errorElement.innerText = "";

    if(mail.trim() === ""){ // checks for empty field
        errorElement.innerText = "Input Required";
        errorElement.style.display = "block"; // Ensure the error message is visible
        return false;
    }else if(!valid.test(mail)){
        errorElement.innerText = "Invalid Email: Please enter a valid email address.";
        errorElement.style.display = "block";
        return false;
    }else{
        errorElement.style.display = "none";
        return true;
    }
}

function validatePhone(number, idName) {
    const valid = /^(98|97)[0-9]{8}$/; // Corrected regex for phone numbers
    const inputElement = document.getElementById(idName);
    const errorElement = inputElement.parentElement.querySelector(".error"); // Select the <small> element with the class "error"

    // Clear the error message if present
    errorElement.innerText = "";

    if (number.trim() === "") { // Check for empty field
        errorElement.innerText = "Input Required";
        errorElement.style.display = "block"; // Ensure the error message is visible
        return false;
    } else if (!valid.test(number)) {
        errorElement.innerText = "Invalid Phone Number: Please enter a valid phone number starting with 98 or 97.";
        errorElement.style.display = "block";
        return false;
    } else {
        errorElement.style.display = "none"; // Hide the error message if input is valid
        return true;
    }
}

function validatePassword(password,idName){
    const inputElement = document.getElementById(idName);
    const errorElement = inputElement.parentElement.querySelector(".error"); // Select the <small> element with the class "error"

    // Clear the error message if present
    errorElement.innerText = "";

    if (password.trim() === ""){
        errorElement.innerText = "Input Required";
        errorElement.style.display = "block";
        return false;
    }

    if (idName == "cpassword"){
        const first = document.getElementById("password").value;
        if(first != password){
            errorElement.innerText = "Password does not match";
            errorElement.style.display = "block";
            return false;
        }
    }
    errorElement.style.display = "none";
    return true;
}
function validateSignupForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Validate each field
    const isFirstNameValid = validateName(document.getElementById("fname").value, "fname");
    const isLastNameValid = validateName(document.getElementById("lname").value, "lname");
    const isPhoneValid = validatePhone(document.getElementById("phone").value, "phone");
    const isEmailValid = validateEmail(document.getElementById("signup-email").value,"signup-email");
    const isPasswordCorrect = validatePassword(document.getElementById("password").value, "password");
    const isCPasswordCorrect = validatePassword(document.getElementById("cpassword").value, "cpassword");

    // Check if all validations passed
    if (isFirstNameValid && isLastNameValid && isPhoneValid && isEmailValid && isPasswordCorrect && isCPasswordCorrect) {
        alert("Form submitted successfully!");
        // Optionally, you can submit the form here
        document.querySelector("form").submit();
    } else {
        alert("Please correct the errors in the form before submitting.");
    }
}
function validateLoginForm(event){
    event.preventDefault();
    
    const isEmailValid = validateEmail(document.getElementById("login-email").value,"login-email")
    const isPasswordCorrect = validatePassword(document.getElementById("login-password").value, "login-password");  

    if (isEmailValid && isPasswordCorrect){
        alert("Form submitted successfully!");
        // Optionally, you can submit the form here
        document.querySelector("form").submit();
    }else{
        alert("Please correct the errors in the form before submitting.");
    }
}

function collapseForm(event,idName) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    const collapseBtn = document.getElementById(idName);
    const switchBtn = document.getElementById("switchWrapper");

    if(idName == "signupCollapseBtn"){
        var formContainer = document.getElementById("signupFormContainer");
    }else{
        var formContainer = document.getElementById("loginFormContainer");
    }

    if (formContainer.classList.contains("collapsed")) {
        // Expand the form
        formContainer.classList.remove("collapsed");
        switchBtn.classList.remove("hidden");
        collapseBtn.innerHTML = "&#10095;"; // Change button icon to ">"
    } else {
        // Collapse the form
        formContainer.classList.add("collapsed");
        switchBtn.classList.add("hidden");
        collapseBtn.innerHTML = "&#10094;"; // Change button icon to "<"
    }
}

function switchForms() {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const toggleSwitch = document.getElementById("toggleSwitch");

    if (toggleSwitch.checked) {
        // Show signup form, hide login form
        document.querySelector(".slider").innerText = "Login";
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden"); 
    } else {
        // Show login form, hide signup form
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        document.querySelector(".slider").innerText = "Signup";
    }
}
function toggleForm(event){
    event.preventDefault();
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    if(signupForm.classList.contains("hidden")){
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
    }else{
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    }
}