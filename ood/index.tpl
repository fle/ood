<html xmlns:ng="http://angularjs.org">

  <head>
    <link href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700" rel="stylesheet" type="text/css">
    <link href="/app/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/app/css/front.css" rel="stylesheet" />
    <link href="/app/css/leaflet.css" rel="stylesheet" />
  </head>

  <body ng-app="oodApp">

    <header>
      <img src="/static/img/logo.png" />
    </header>


    <div class="container-fluid">

      <div class="row">

        <div class="col-lg-6">

          <div ng-controller="TrafficCtrl">
            <h2>Se déplacer</h2>
            <leaflet width="100%" height="400px" center="center" geojson="geojson"></leaflet>
          </div>



          <h3>Tramway</h3>

          <div ng-controller="TanCtrl" class="row tan">

            <ul class="col-lg-6">
              <li ng-repeat="slot in slots_1">
                [[slot.terminus]] &nbsp;&nbsp; &#8636; &nbsp;&nbsp; [[ slot.time ]]
              </li>
            </ul>

            <ul class="col-lg-6">
              <li ng-repeat="slot in slots_2">
                [[ slot.time ]] &nbsp;&nbsp; &#8640; &nbsp;&nbsp; [[slot.terminus]]
              </li>
            </ul>

          </div>

        </div>

        <div class="col-lg-6">

          <h2>Actualités Axio Gestion</h2>

          <div ng-controller="PropertiesCtrl">

            <div id="properties">
              <div>
                <carousel interval="myInterval">
                  <slide ng-repeat="slide in slides" active="slide.active">
                    <div class="carousel-image col-lg-5">
                      <img ng-src="[[ slide.image ]]" />
                    </div>
                    <div class="carousel-caption col-lg-7">
                      <h4>[[ slide.title ]]</h4>
                      <p>[[ slide.text ]]</p>
                    </div>
                  </slide>
                </carousel>
              </div>

              <div class="teaser">
              Retrouvez tous nos biens sur <a href="http://nantes.vos-bureaux.fr"> http://nantes.vos-bureaux.fr</a>
              </div>

            </div>

          </div>

          <h3 class="clearfix">À lire sur axiogestion.fr</h3>

          <div ng-controller="NewsCtrl">
            <ul class="news">
              <li ng-repeat="n in news">
                [[ n ]]
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>

    <footer>Axio Gestion, Immobilier d'entreprise. Réalisation <a href="http://fle.github.io">FL&IH</a></footer> 


    <script src="/app/js/leaflet.js"></script>
    <script src="/app/js/angular.min.js"></script>
    <script src="/app/js/angular-leaflet-directive.min.js"></script>
    <script src="/app/js/angular-bootstrap-directive.min.js"></script>
    <script src="/app/js/angular-bootstrap-directive-tpls.min.js"></script>
    <script src="/app/js/app.js"></script>
  </body>
</html>