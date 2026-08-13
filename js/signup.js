const signupForm = document.getElementById("signupForm");

const lastNameInput = document.getElementById("lastNameInput");
const firstNameInput = document.getElementById("firstNameInput");
const emailInput = document.getElementById("signupEmailInput");
const passwordInput = document.getElementById("signupPasswordInput");
const passwordConfirmInput = document.getElementById("passwordConfirmInput");

// Validation pendant la saisie
lastNameInput.addEventListener("input", () => {
    validateRequired(lastNameInput);
});

firstNameInput.addEventListener("input", () => {
    validateRequired(firstNameInput);
});

emailInput.addEventListener("input", () => {
    validateEmail(emailInput);
});

passwordInput.addEventListener("input", () => {
    validatePassword(passwordInput);

    // Si la confirmation est déjà remplie,
    // on la vérifie de nouveau si le mot de passe change.
    if (passwordConfirmInput.value !== "") {
        validatePasswordConfirmation(
            passwordInput,
            passwordConfirmInput
        );
    }
});

passwordConfirmInput.addEventListener("input", () => {
    validatePasswordConfirmation(
        passwordInput,
        passwordConfirmInput
    );
});

// Validation complète au moment de l'inscription
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isLastNameValid = validateRequired(lastNameInput);
    const isFirstNameValid = validateRequired(firstNameInput);
    const isEmailValid = validateEmail(emailInput);
    const isPasswordValid = validatePassword(passwordInput);

    const isPasswordConfirmationValid =
        validatePasswordConfirmation(
            passwordInput,
            passwordConfirmInput
        );

    const isFormValid =
        isLastNameValid &&
        isFirstNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isPasswordConfirmationValid;

    if (isFormValid) {
        // Plus tard :
        // appel à l'API d'inscription avec fetch()
        console.log("Formulaire valide");
    }
});

// Champ obligatoire
function validateRequired(input) {
    const isValid = input.value.trim() !== "";

    setValidationState(input, isValid);

    return isValid;
}

// Adresse e-mail
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValid = emailRegex.test(input.value.trim());

    setValidationState(input, isValid);

    return isValid;
}

// Mot de passe
function validatePassword(input) {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const isValid = passwordRegex.test(input.value);

    setValidationState(input, isValid);

    return isValid;
}

// Confirmation du mot de passe
function validatePasswordConfirmation(
    passwordInput,
    confirmationInput
) {
    const isValid =
        confirmationInput.value !== "" &&
        passwordInput.value === confirmationInput.value;

    setValidationState(confirmationInput, isValid);

    return isValid;
}

// Affichage Bootstrap + accessibilité
function setValidationState(input, isValid) {
    input.classList.toggle("is-valid", isValid);
    input.classList.toggle("is-invalid", !isValid);

    input.setAttribute(
        "aria-invalid",
        String(!isValid)
    );
}