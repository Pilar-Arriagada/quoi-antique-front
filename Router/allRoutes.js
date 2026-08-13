import Route from "./Route.js";

// Mes routes
export const allRoutes = [
    // Pages publiques
    new Route(
        "/",
        "Accueil",
        "/pages/home.html"
    ),

    new Route(
        "/galerie",
        "Galerie",
        "/pages/galerie.html"
    ),

    // Pages réservées aux utilisateurs déconnectés
    new Route(
        "/signin",
        "Connexion",
        "/pages/signin.html",
        "/js/signin.js",
        ["disconnected"]
    ),

    new Route(
        "/signup",
        "Inscription",
        "/pages/signup.html",
        "/js/signup.js",
        ["disconnected"]
    ),

    // Pages accessibles aux utilisateurs connectés
    new Route(
        "/account",
        "Mon compte",
        "/pages/account.html",
        "",
        ["client", "admin"]
    ),

    new Route(
        "/editPassword",
        "Changer mon mot de passe",
        "/pages/editPassword.html",
        "",
        ["client", "admin"]
    ),

    // Pages réservées aux clients
    new Route(
        "/reservations",
        "Mes réservations",
        "/pages/reservations.html",
        "",
        ["client"]
    ),

    new Route(
        "/reserver",
        "Ma réservation",
        "/pages/reserver.html",
        "",
        ["client"]
    ),
];

// Exemple : "Mon compte - Quai Antique"
export const websiteName = "Quai Antique";
