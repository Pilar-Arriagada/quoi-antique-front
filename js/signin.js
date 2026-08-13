const signinForm = document.getElementById("signinForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

signinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    checkCredentials();
});

function checkCredentials() {
    // Simulation temporaire.
    // Plus tard : appel à l'API avec fetch()

    const demoEmail = "test@mail.com";
    const demoPassword = "QuaiAntique1!";


    if (
        emailInput.value.trim() === demoEmail &&
        passwordInput.value === demoPassword
    ) {
        setToken("demo-token");
        setRole("client");

        window.location.href = "/";
    } else {
        emailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}