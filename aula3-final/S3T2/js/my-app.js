var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'contactos',
    // App id
    id: 'pt.dominio.contactos',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/home/',
            url: 'index.html',
    },
        {
            path: '/contactos/',
            url: 'contactos.html',
            master: true,
            detailRoutes: [
                {
                    path: '/detalhes/:Num/:Nome/:Mail/:Telefone/:Telemovel/:Morada/:Coordenadas/',
                    templateUrl: 'detalhes.html',
                },
            ]

    },
  ],
    // ... other parameters
});

var $$ = Dom7;

//*****************************************//
//************TEMPLATE 7*******************//
//*****************************************//

$$(document).on('page:init', '.page[data-name="contactos"]', function (e) {
    //verificar que a página foi carregada  
    console.log('contactos');

    // Select Template
    var template = $$('#template-aluno').html();

    // Compile and render
    var compiledTemplate = Template7.compile(template);

    // Get JSON Data 
    app.request.json('alunos.json', function (json) {

        //verificar que os dados foram lidos 
        console.log(json);
        // Insert rendered template
        $$('#result-wrap-aluno').html(compiledTemplate(json))
    });
})
//**********FIM TEMPLATE 7****************//

var mainView = app.views.create('.view-main');
