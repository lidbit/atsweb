app.controller('testIntroCtrl', function ($scope, $http, $q, $location, $routeParams, TestService) {

    $scope.name = '';

    $scope.id = $routeParams['id'];

    $scope.LoadTest = function () {
        var deferred = $q.defer();
        $http.get('http://twistttwig.azurewebsites.net/test/' + $scope.id).
            success(function (data) {
                deferred.resolve();

                var testdata = data;
                TestService.SetTest(testdata);

                $scope.name = testdata.test.Name;
                $scope.type = testdata.test.TestType;
                $scope.timelimit = testdata.test.TimeLimit;
                $scope.id = testdata.test.Id;
                $scope.questions = testdata.questions;
            }).
            error(function (e) {
                console.log(e);
            });
    };

    $scope.LoadTest();

    $scope.Cancel = function () {
        $location.url('/app/tests');
    };

    $scope.runTest = function () {
        $location.url('/app/testRunner');
    };
});
