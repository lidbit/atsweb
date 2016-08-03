app.controller('resultsCtrl', function ($scope, $http, $location, AppSettings) {

    $scope.results = [];

    $http.get(AppSettings.APIurl + 'results/').
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
