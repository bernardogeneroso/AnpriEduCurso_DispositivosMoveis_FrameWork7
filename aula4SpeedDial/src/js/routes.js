import HomePage from "../pages/home.f7.html";
import AboutPage from "../pages/about.f7.html";
import FormPage from "../pages/form.f7.html";

import DynamicRoutePage from "../pages/dynamic-route.f7.html";
import RequestAndLoad from "../pages/request-and-load.f7.html";
import NotFoundPage from "../pages/404.f7.html";
import contactosPage from "../pages/contactos.f7.html";
//import detalhesPage from '../pages/detalhes.f7.html';

import listContact from "./listaContactos.json";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/contactos/",
    master: true,
    detailRoutes: [
      {
        path: "/detalhes/:title/:uri/:position/:email/:tel/:sms/:geo/:name/",
        //componentUrl: '../pages/detalhes.html', //Não funcionou para mim | templateUrl, url, componentUrl
        template: `
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner sliding">
              <div class="left">
                <a href="#" class="link back">
                  <i class="icon icon-back"></i>
                  <span class="if-not-md"></span>
                </a>
              </div>
              <div class="title">Detalhes</div>
            </div>
          </div>
          <div class="page-content">
            <div style="display:flex;flex-direction: column;justify-content:center;align-items:center;margin-top: 50px">
              <img src="static/images/contactos/{{$route.params.uri}}" width="120px" class="lazy lazy-fade-in demo-lazy" />
              <label><strong>Nº {{$route.params.position}}, {{$route.params.title}}</strong></label>
            </div>
            <div class="list">
              <ul>
                <li>
                  <a href="#" class="item-link item-content">
                    <div class="item-media"><i class="f7-icons">envelope</i></div>
                    <div class="item-inner">
                      <div class="item-title">
                        <div class="item-header">Mail</div>
                        {{$route.params.email}}
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="item-link item-content">
                    <div class="item-media"><i class="f7-icons">Telefone</i></div>
                    <div class="item-inner">
                      <div class="item-title">
                        <div class="item-header">Phone</div>
                        {{$route.params.tel}}
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="item-link item-content">
                    <div class="item-media"><i class="f7-icons">chat_bubble_text</i></div>
                    <div class="item-inner">
                      <div class="item-title">
                        <div class="item-header">SMS</div>
                        {{$route.params.sms}}
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" class="item-link item-content">
                    <div class="item-media"><i class="f7-icons">location_north_fill</i></div>
                    <div class="item-inner">
                      <div class="item-title">
                        <div class="item-header">Morada</div>
                        {{$route.params.name}}
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        `,
      },
    ],
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      //var userId = routeTo.params.userId;

      // Simulate Ajax Request

      var listaContactos = listContact;
      // Hide Preloader
      app.preloader.hide();

      // Resolve route to load page
      resolve(
        {
          component: contactosPage,
        },
        {
          context: {
            listaContactos: listaContactos,
          },
        }
      );
    },
  },
  {
    path: "/about/",
    component: AboutPage,
  },
  {
    path: "/form/",
    component: FormPage,
  },

  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage,
  },
  {
    path: "/request-and-load/user/:userId/",
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: "Vladimir",
          lastName: "Kharlampidi",
          about: "Hello, i am creator of Framework7! Hope you like it!",
          links: [
            {
              title: "Framework7 Website",
              url: "http://framework7.io",
            },
            {
              title: "Framework7 Forum",
              url: "http://forum.framework7.io",
            },
          ],
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            },
          }
        );
      }, 1000);
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
