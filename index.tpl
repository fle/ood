<html xmlns:ng="http://angularjs.org">

  <head>
    <link href="/css/leaflet.css" rel="stylesheet" />
  </head>

  <body ng-app="oodApp">

    <header>{{ company }}</header>

    <div ng-controller="TanCtrl">

      <ul>
        <li ng-repeat="slot in slots_1">
          [[ slot.time ]] -> [[slot.terminus]]
        </li>
      </ul>
      <ul>
        <li ng-repeat="slot in slots_2">
          [[ slot.time ]] -> [[slot.terminus]]
        </li>
      </ul>

    </div>

    <div ng-controller="TrafficCtrl">
      [[ timestamp ]]
      <leaflet width="500px" height="500px" center="center" geojson="geojson"></leaflet>
    </div>

    <!-- <footer>Créé par <a href="http://fle.github.io">Florent Lebreton</a></footer> -->

    <script src="/js/leaflet.js"></script>
    <script src="/js/angular.min.js"></script>
    <script src="/js/angular-leaflet-directive.min.js"></script>
    <script src="/js/app.js"></script>
  </body>
</html>