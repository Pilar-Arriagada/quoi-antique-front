const TOKEN_COOKIE_NAME = "accessToken";
const ROLE_COOKIE_NAME = "role";

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie =
        `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const currentCookie = cookie.trim();

        if (currentCookie.startsWith(cookieName)) {
            return decodeURIComponent(
                currentCookie.substring(cookieName.length)
            );
        }
    }

    return null;
}

function eraseCookie(name) {
    document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

function setToken(token) {
    setCookie(TOKEN_COOKIE_NAME, token, 1);
}

function getToken() {
    return getCookie(TOKEN_COOKIE_NAME);
}

function isConnected() {
    return getToken() !== null;
}

function setRole(role) {
    setCookie(ROLE_COOKIE_NAME, role, 1);
}

function getRole() {
    return getCookie(ROLE_COOKIE_NAME);
}

function signout() {
    eraseCookie(TOKEN_COOKIE_NAME);
    eraseCookie(ROLE_COOKIE_NAME);

    window.location.href = "/";
}

function updateAuthDisplay() {
    const connected = isConnected();
    const role = getRole();

    document.querySelectorAll("[data-show]").forEach((element) => {
        let shouldShow = false;

        switch (element.dataset.show) {
            case "disconnected":
                shouldShow = !connected;
                break;

            case "connected":
                shouldShow = connected;
                break;

            case "client":
                shouldShow = connected && role === "client";
                break;

            case "admin":
                shouldShow = connected && role === "admin";
                break;
        }

        element.classList.toggle("d-none", !shouldShow);
    });

    const signoutBtn = document.getElementById("signoutBtn");

    if (signoutBtn) {
        signoutBtn.onclick = signout;
    }
}