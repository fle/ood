var oodApp = angular.module('oodApp', ['leaflet-directive'])

oodApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

oodApp.controller('TanCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
  
  $scope.slots_1 = {};
  $scope.slots_2 = {};
  
  (function refresh() {
    $http
    .get('/tan')
    .success(function (data, status, headers, config) {
      $scope.slots_1 = data[1];
      $scope.slots_2 = data[2];
      $timeout(refresh, 10000);
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

    var refresh = function() {
    $http
    .get('/traffic')
    .success(function (data, status, headers, config) {
      
      var odata = data.opendata.answer.data.Troncons;
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

    });

  };


}]);