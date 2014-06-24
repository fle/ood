var oodApp = angular.module('oodApp', ['leaflet-directive', 'ui.bootstrap'])


oodApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});


oodApp.controller('TanCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  var query = '*';
  var code = 'CNAV';
  var URL = 'http://open.tan.fr/ewp/tempsattente.json/' + code + '?lang=fr-FR';
  
  $scope.slots_1 = [];
  $scope.slots_2 = [];
  
  (function refresh() {
    var url, config;
      config = {
        params: {
          q: "select " + query + " from json where url='" + URL + "'",
          format: 'json'
        },
        headers: {
          'Accept-language': 'fr_FR'
        }
      };
      url = 'http://query.yahooapis.com/v1/public/yql';
      $http.get(url, config).then(
        function(data){
            items = data.data.query.results.json.json;

            $scope.slots_1 = [];
            $scope.slots_2 = [];

            if (data.data.query.results === null){
                $scope.slots_1 = [];
                $scope.slots_2 = [];
                return;
            }
            
            for(var i=0; i < items.length; i++){
              item = items[i];
              slot = {
                'terminus': item.terminus,
                'time': item.temps,
                'infotrafic': item.infotrafic,          
              };
              if (item.sens == 1 && $scope.slots_1.length < 3) {
                $scope.slots_1.push(slot);
              }
              else if($scope.slots_2.length < 3) {
                $scope.slots_2.push(slot);
              }
              else {
                break;
              }
            }

            $timeout(refresh, 30000);
        });
    })();

}]);


oodApp.controller('NewsCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  var query = 'content';
  var URL = 'http://www.axiogestion.fr/actualites/';
  var xpath = '//div[contains(@class,"blog-title")]/p';

  (function refresh() {
    var url, config;
      config = {
        params: {
          q: "select " + query + " from html(0,3) where url='" + URL + "' and xpath='" + xpath + "'",
          format: 'json'
        }
      };
      url = 'http://query.yahooapis.com/v1/public/yql';
      $http.get(url, config).then(
        function(data){
            $scope.news = [];
            if (data.data.query.results === null){
                $scope.news = [];
                return;
            }
            $scope.news = data.data.query.results.p;
            $timeout(refresh, 72000000);
        });
    })();

}]);


oodApp.controller('PropertiesCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  var URL = 'http://nantes.vos-bureaux.fr/toutes-nos-locations-a-nantes/';
  var query = 'div.a.img.src, h2.a.content, h2.a.title';
  var xpath = '//div[contains(@class,"fiche")]';


  $scope.myInterval = 10000;

  (function refresh() {
    var url, config;
      config = {
        params: {
          q: "select " + query + " from html(0,5) where url='" + URL + "' and xpath='" + xpath + "'",
          format: 'json'
        }
      };
      url = 'http://query.yahooapis.com/v1/public/yql';
      $http.get(url, config).then(
        function(data){

            if (data.data.query.results === null){
                $scope.slides = [];
                return;
            }

            var properties = data.data.query.results.div;
            var slides = []
            for(var i=0; i < properties.length; i++){
              var slide = {};
              slide.title = properties[i].h2.a.content;
              slide.text = properties[i].h2.a.title;
              slide.image = properties[i].div.a.img.src;
              slides.push(slide);
            }

            $scope.slides = slides;
            

            $timeout(refresh, 72000000);
        });
    })();

}]);


oodApp.controller('TrafficCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  /* Change section color based on fluidity */
  var leaflet_style = function(feature) {
    var color;
    switch (feature.properties.Couleur_TP) {
      case '3': color = "#00aa55"; break;
      case '4': color = "#ffff00"; break;
      case '5': color = "#ff9900"; break;
      case '6': color = "#ff0000"; break;
      default: color = "#ffffff";
    }
    return {
      color: color,
      weight: 4,
      opacity: 1
    }
  }

  /* Base map parameters */
  angular.extend($scope, {
      center: {
        lat: 47.218371,
        lng: -1.553621,
        zoom: 13
      },
      defaults: {
        scrollWheelZoom: false
      },
  });

  /* Base map layer : static road sections */
  $http
  .get('/static/geojson/nantes-sections.geo.json')
  .success(function(data, status) {
    angular.extend($scope, {
      geojson: {
        data: data,
        style: leaflet_style,
      }  
    });
    refresh();
  });


  var key = '5AJ4BA535ELOG63';
  var URL = 'http://data.nantes.fr/api/getFluiditeAxesRoutiers/1.0/' + key + '/?output=json';
  var query = '*';

  var refresh = function() {
    var url, config;
      config = {
        params: {
          q: "select " + query + " from json where url='" + URL + "'",
          format: 'json'
        }
      };
      url = 'http://query.yahooapis.com/v1/public/yql';
      $http.get(url, config).then(
        function(data){
          
          if (data.data.query.results === null){
              $scope.geojson = {};
              return;
          }

          var odata = data.data.query.results.opendata.answer.data.Troncons;
          $scope.timestamp = odata.Horodatage;

          var fluidity = odata.Troncon;
          var sections = $scope.geojson.data;
          for(var i=0; i < fluidity.length; i++){
            var item = fluidity[i];
            for(var j=0; j < sections.features.length; j++){
              var section = sections.features[j];
              if(item.Id == section.properties.ID) {
                sections.features[j].properties.Couleur_TP = item.Couleur_TP;
                continue;
              }
            }
          }

          $scope.geojson = {};
          $scope.geojson = {
            data: sections,
            style: leaflet_style
          };
          
          $timeout(refresh, 600000);
        });

  };

}]);