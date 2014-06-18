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
                style: {
                    fillColor: "green",
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            }  
        });

        $scope.geojson.style = function(feature) {
          switch (feature.properties.Couleur_TP) {
            case '1': return {color: "#ff0000"};
            case '2':   return {color: "#0000ff"};
          }
        };

        refresh();

    });

  var refresh = function() {
    $http
    .get('/traffic')
    .success(function (data, status, headers, config) {
      
      var odata = data['opendata']['answer']['data']['Troncons'];
      $scope.timestamp = odata['Horodatage'];

      var fluidity = odata['Troncon'];
      var sections = $scope.geojson.data.features;
      for(var i=0; i<fluidity.length; i++){
        var item = fluidity[i];
        for(var j=0; j<sections.length; j++){
          var section = sections[j];
          if(item['Id'] == section['properties']['ID']) {
            section.Couleur_TP = item['Couleur_TP'];
            continue;
          }
        }
      }

    });

  };


}]);