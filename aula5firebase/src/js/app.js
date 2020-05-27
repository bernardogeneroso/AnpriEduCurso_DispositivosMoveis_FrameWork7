import $$ from "dom7";
import Framework7 from "./framework7-custom.js";

// Import F7 Styles
import "../css/framework7-custom.less";

// Import Icons and App Custom Styles
import "../css/my-app.css";
import "../css/icons.css";
import "../css/app.less";
// Import Cordova APIs
import cordovaApp from "./cordova-app.js";
// Import Routes
import routes from "./routes.js";

// Import main app component
import App from "../app.f7.html";

var app = new Framework7({
  root: "#app", // App root element
  component: App, // App main component
  id: "io.framework7.myapp", // App bundle ID
  name: "Speed Dial", // App name
  theme: "auto", // Automatic theme detection

  // App routes
  routes: routes,

  // Register service worker
  serviceWorker: Framework7.device.cordova
    ? {}
    : {
        path: "/service-worker.js",
      },
  // Input settings
  input: {
    scrollIntoViewOnFocus:
      Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered:
      Framework7.device.cordova && !Framework7.device.electron,
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
});

$$(document).on("page:afterin", '.page[data-name="contactos"]', function (e) {
  // Child checkbox change
  $$('[name="checkboxAluno"]').on("change", function (e) {
    var totalChecked = $$('[name="checkboxAluno"]:checked').length;
    var totalChecks = $$('[name="checkboxAluno"]').length;
    console.log(totalChecked + "/" + totalChecks);
    if (totalChecked === 0) {
      $$('[name="checkboxAlunos"]').prop("checked", false);
    } else if (totalChecked === totalChecks) {
      $$('[name="checkboxAlunos"]').prop("checked", true);
    }
    if (totalChecked > 0 && totalChecked < totalChecks) {
      $$('[name="checkboxAlunos"]').prop("indeterminate", true);
    } else {
      $$('[name="checkboxAlunos"]').prop("indeterminate", false);
    }
  });
  // Parent checkbox change
  $$('[name="checkboxAlunos"]').on("change", function (e) {
    if (e.target.checked) {
      $$('[name="checkboxAluno"]').prop("checked", true);
    } else {
      $$('[name="checkboxAluno"]').prop("checked", false);
    }
  });

  //Botão mail (id="mail")
  $$("#mail").on("click", function () {
    console.log("mail");
    //limpar o atributo href
    $$(this).attr("href", "#");

    //leitura dos dados do formulário (id="my-form")
    var formData = app.form.convertToData("#my-form");
    console.log(formData);
    var destinatarios = "";
    formData.checkboxAluno.forEach(function (item, i) {
      console.log(item);
      //Transformação de cada item do array de texto em objeto JSON
      var obj = JSON.parse(item);
      console.log(obj.Mail);
      //concatenar (juntar) os mails, separados por ;
      destinatarios += obj.Mail + ";";
    });
    console.log(destinatarios);

    var numdestinatarios = Object.keys(formData.checkboxAluno).length;
    console.log(numdestinatarios);
    //se n.º de selecionados=0
    if (numdestinatarios == 0) {
      //faz um alert
      app.dialog.alert(
        "Selecione pelo menos um contacto!",
        "<i class='material-icons'>mail</i> Mail"
      );
    } else {
      //se não, altera o atributo 'href' do botão mail (this) para"mailto:fgdgf@gfghsf.net;adf@dhg.com...
      $$(this).attr("href", "mailto:" + destinatarios);
    }
  });
});
