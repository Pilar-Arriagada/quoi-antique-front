import Route from "./Route.js";

// Mes routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
    new Route("/signin", "Connexion", "/pages/signin.html"),
    new Route("/signup","Inscription", "/pages/signup.html"),
    new Route("/account", "Mon compte", "/pages/account.html"),
    new Route("/editPassword", "Changer mon mot de passe", "/pages/editPassword.html"),
    new Route("/reservations", "Mes réservations", "/pages/reservations.html"),
    new Route("/reserver", "Ma réservation", "/pages/reserver.html"),
];

// Exemple : "Mon compte - Quai Antique"
export const websiteName = "Quai Antique";
