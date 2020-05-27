import $$ from "dom7";
import Framework7 from "./framework7-custom.js";

// Import F7 Styles
import "../css/framework7-custom.less";

// Import Icons and App Custom Styles
import "../css/icons.css";
import "../css/app.less";
// Import Cordova APIs
import cordovaApp from "./cordova-app.js";
// Import Routes
import routes from "./routes.js";

// Import main app component
import App from "../app.f7.html";

/*var app = new Framework7({
  root: '#app', // App root element
  component: App, // App main component
  id: 'io.framework7.myapp', // App bundle ID
  name: 'Lista de Contactos V2', // App name
  theme: 'auto', // Automatic theme detection



  // App routes
  routes: routes,

  // Register service worker
  serviceWorker: Framework7.device.cordova ? {} : {
    path: '/service-worker.js',
  },
  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});*/

var app = new Framework7({
  // App root element
  root: "#app",
  // App Name
  name: "contactos",
  // App id
  id: "pt.dominio.contactos",
  // Enable swipe panel
  panel: {
    swipe: "left",
  },
  // Add default routes
  routes: [
    {
      path: "/home/",
      url: "index.html",
    },
    {
      path: "/contactos/",
      url: "contactos.html",
      master: true,
      detailRoutes: [
        {
          path:
            "/detalhes/:Num/:Nome/:Mail/:Telefone/:Telemovel/:Morada/:Coordenadas/",
          templateUrl: "detalhes.html",
        },
      ],
    },
  ],
  // ... other parameters
});

var $$ = Dom7;

//*****************************************//
//************TEMPLATE 7*******************//
//*****************************************//

$$(document).on("page:init", '.page[data-name="contactos"]', function (e) {
  //verificar que a página foi carregada
  console.log("contactos");

  // Select Template
  var template = $$("#template-aluno").html();

  // Compile and render
  var compiledTemplate = Template7.compile(template);

  // Get JSON Data
  app.request.json("alunos.json", function (json) {
    //verificar que os dados foram lidos
    console.log(json);
    // Insert rendered template
    $$("#result-wrap-aluno").html(compiledTemplate(json));
  });
});
//**********FIM TEMPLATE 7****************//

var mainView = app.views.create(".view-main");
