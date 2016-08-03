app.controller('userCtrl', function ($scope, $http, $q, $routeParams, $location, SharedService, AppSettings) {

    $scope.users = [];

    $scope.getUsers = function() {
      $http.get(AppSettings.APIurl + '/users/').
          success(function(data) {
              $scope.users = angular.fromJson(data);
          }).
          error(function(e){
             console.log(e)
          });
    };

    if(typeof SharedService.userId != 'undefined') {
      $scope.getUsers();
    }
    else {
      $location.path("/app/login");
    }

    $scope.Back = function(){
        $location.path('/app');
    };

    $scope.addUser = function(){
        $location.path('/app/users/edit');
    };
});
