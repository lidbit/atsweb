var app = angular.module('AtsAdminApp', ['ngRoute', 'ui.bootstrap']);

app.factory('AppSettings', function() {
    return {
        APIurl: "http://twistttwig.azurewebsites.net/"
    }
});

app.config(function ($routeProvider, $locationProvider, $httpProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/app', {
        templateUrl: '/adminMain.html'
    });

    $routeProvider.when('/app/tests', {
        templateUrl: '/tests.html'
    });

    $routeProvider.when('/app/load/:id', {
        templateUrl: '/testIntro.html'
    });

    $routeProvider.when('/app/testRunner', {
        templateUrl: '/testRunner.html',
        controller: 'testRunnerCtrl'
    });

    $routeProvider.when('/app/tests/edit/:id?', {
        templateUrl: '/editTest.html',
        controller: 'editCtrl'
    });

    $routeProvider.when('/app/results', {
        templateUrl: '/results.html',
        controller: 'resultsCtrl'
    });

    $routeProvider.when('/app/results/view/:id', {
        templateUrl: '/resultDetail.html',
        controller: 'resultDetailCtrl'
    });

    $routeProvider.when('/app/users', {
        templateUrl: '/users.html',
        controller: 'userCtrl'
    });

    $routeProvider.when('/app/users/edit/:id?', {
        templateUrl: '/editUser.html',
        controller: 'editUserCtrl'
    });

    
    $routeProvider.when('/app/login', {
        templateUrl: '/adminLogin.html'
    });

    $routeProvider.when('/app/register', {
        templateUrl: '/Register.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });

var interceptor = ['$rootScope', '$q', '$location', function (scope, $q, $location) {
        function success(response) {
            return response;
        }
        function error(response) {
            var status = response.status;
            if (status == 401) {
                $location.url("/app/login");
                return;
            }
            // otherwise
            return $q.reject(response);
        }
        return function (promise) {
            return promise.then(success, error);
        }
    }];
    $httpProvider.responseInterceptors.push(interceptor);
});

app.controller('mainCtrl', function($scope, $location, SharedService) {
	if(typeof SharedService.userId == 'undefined') {
		$location.url("/app/login");
	}

	$scope.Logout = function() {
        $scope.$broadcast('Token', "");
        $http.defaults.headers.common['Authorization'] = '';
		SharedService.userId = 'undefined';
		$location.url("/app");
	}
});

app.controller('authCtrl', function ($scope, $http, $location, SharedService, AppSettings) {

    $scope.authenticate = function (user, pass) {
        $http.post(AppSettings.APIurl + 'auth', {
            UserName: user,
            Password: pass
        }).success(function (data) {
            $scope.$broadcast('Token', data.Token);
            $http.defaults.headers.common['Authorization'] = 'Token ' + data.Token;
            SharedService.BroadcastUserId(data.UserId);
            $location.url("/app");
        }).error(function (response) {
            $scope.authenticationError = response.error || response;
        });
    };
});

app.controller('TestCtrl', function ($scope, $http, $q, $location, SharedService, AppSettings) {

    $scope.tests = [];

    $scope.getTests = function () {
        var deferred = $q.defer();
        $http.get(AppSettings.APIurl + 'tests/').
            success(function (data) {
                deferred.resolve(data);
                $scope.tests = angular.fromJson(data);
            }).error(function (response) {
            });
    };

    if(typeof SharedService.userId != 'undefined') {
    	$scope.getTests();
    }
    else {
    	$location.url('/app/login');
    }

    $scope.Back = function() {
        $location.url("/app");
    };

    $scope.addTest = function() {
        $location.url("/app/tests/edit/");
    };
});






