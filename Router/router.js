import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Route utilisée si aucune page ne correspond à l'URL
const route404 = new Route(
  "404",
  "Page introuvable",
  "/pages/404.html"
);

// Cherche la route correspondant à l'URL
const getRouteByUrl = (url) => {
  let currentRoute = null;

  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element;
    }
  });

  if (currentRoute != null) {
    return currentRoute;
  } else {
    return route404;
  }
};

// Charge le contenu de la page correspondante
const LoadContentPage = async () => {
  const path = window.location.pathname;

  const actualRoute = getRouteByUrl(path);
  // Vérifie les droits d'accès à la route
const authorizedRoles = actualRoute.authorize;

if (authorizedRoles.length > 0) {

  // Route réservée aux utilisateurs déconnectés
  if (authorizedRoles.includes("disconnected")) {
    if (isConnected()) {
      window.history.replaceState({}, "", "/");
      return LoadContentPage();
    }
  }

  // Route réservée à certains rôles
  else {
    const role = getRole();

    if (!isConnected() || !authorizedRoles.includes(role)) {
      window.history.replaceState({}, "", "/");
      return LoadContentPage();
    }
  }
}
  

  const html = await fetch(actualRoute.pathHtml)
    .then((data) => data.text());

  document.getElementById("main-page").innerHTML = html;
  updateAuthDisplay();

  // Charge éventuellement le JS propre à cette page
  if (actualRoute.pathJS != "") {
    const scriptTag = document.createElement("script");

    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);

    document.querySelector("body").appendChild(scriptTag);
  }

  // Change le titre de l'onglet
  document.title = actualRoute.title + " - " + websiteName;
};

// Gère le clic sur un lien de navigation
const routeEvent = (event) => {
  event = event || window.event;
  event.preventDefault();

  window.history.pushState({}, "", event.target.href);

  LoadContentPage();
};

// Gère précédent / suivant du navigateur
window.onpopstate = LoadContentPage;

// Rend la fonction accessible depuis le HTML
window.route = routeEvent;

// Charge la bonne page au démarrage
LoadContentPage();