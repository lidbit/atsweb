app.controller('RegisterCtrl', function($scope, $http){

    $scope.name = '';
    $scope.email = '';
    $scope.showSuccess = false;
    $scope.showWarning = false;
    $scope.showDanger = false;
    $scope.msg = '';

    $scope.closeAlerts = function(){
        $scope.showSuccess = false;
        $scope.showWarning = false;
        $scope.showDanger = false;
    };

    $scope.SubmitReg = function() {
        $scope.closeAlerts();
        var postData = { name: $scope.name, email: $scope.email };
        $http.post('http://twistttwig.azurewebsites.net/register', postData).
            success(function(data){
                var result = angular.fromJson(data);
                if (result.success) {
                    $scope.showSuccess = true;
                    $scope.msg = 'Your have been registered.';
                } else {
                    $scope.showWarning = true;
                    $scope.msg = 'This email has already been registered. Try a different one';
                }

            }).
            error(function(){
                $scope.showDanger = true;
                $scope.msg = 'There was an error with your registration';
            });
    };
});
