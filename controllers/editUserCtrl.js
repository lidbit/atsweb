app.controller('editUserCtrl', function ($scope, $http, $q, $routeParams, $location, AppSettings) {

    $scope.name = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.password = '';

    $scope.id = $routeParams['id'];

    $scope.getUser = function () {
        $http.get(AppSettings.APIurl + $scope.id).
            success(function (data) {
                var userdata = angular.fromJson(data);
                $scope.id = userdata.Id;
                $scope.name = userdata.Name;
                $scope.lastname = userdata.LastName;
                $scope.email = userdata.Email;
                $scope.password = userdata.Pass;
            }).
            error(function (e) {
                console.log(e);
            });
    };

    if('undefined' != typeof $scope.id && $scope.id != -1)
        $scope.getUser();

    $scope.cancelEdit = function () {
        $location.path('/app/users');
    };

    $scope.saveEdit = function () {
        if (('undefined' != typeof $scope.id) && ($scope.id != -1)) {
            $scope.updateUser();
        } else {
            $scope.createUser();
        }
    };

    $scope.updateUser = function () {
        if($scope.password == null) {
            $scope.password = "";
        }
        var postData = {
            id: $scope.id,
            name: $scope.name,
            lastname: $scope.lastname,
            password: $scope.password,
            email: $scope.email
        };

        $http.post(AppSettings.APIurl, postData).
            success(function (data) {
                console.log(data);
            }).
            error(function (e) {
                console.log(e);
            });
    };

    $scope.createUser = function () {
        var postData = {
            name: $scope.name,
            lastname: $scope.lastname,
            password: $scope.password,
            email: $scope.email
        };

        $http.post(AppSettings.APIurl, postData).
            success(function (data) {
                console.log(data);
            }).
            error(function (e) {
                console.log(e);
            });
    };
});
