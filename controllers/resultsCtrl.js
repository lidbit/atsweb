app.controller('resultsCtrl', function ($scope, $http, $location, SharedService) {

    $scope.results = [];

    $http.get('http://twistttwig.azurewebsites.net/results/').
        success(function (data) {
            $scope.results = angular.fromJson(data);
        }).
        error(function (e) {
            console.log(e);
        });

    $scope.Back = function () {
        $location.url('/app');
    };
});
