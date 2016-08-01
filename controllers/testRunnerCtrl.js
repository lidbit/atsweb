app.controller('testRunnerCtrl', function ($scope, $http, $q, $location, $timeout, $filter, TestService, SharedService) {

    $scope.test = TestService.test;
    $scope.index = 0;
    $scope.timelimit = $scope.test.test.TimeLimit;
    $scope.currentQuestion = $scope.test.questions[$scope.index];
    $scope.currentSecond = 0;
    $scope.Answer = '';
    $scope.TestEnded = false;
    $scope.testResultId = -1;

    $scope.StartTest = function() {

        // add test result
        var dataObj = {
            userid: SharedService.userId,
            testid: $scope.test.test.Id,
            datetaken: $filter('date')(new Date(),'medium'),
            timetaken: 0,
            correct: 0,
            total: $scope.test.questions.length,
            testname: $scope.test.test.Name
        };
        console.log(dataObj);
        $http.post('http://twistttwig.azurewebsites.net/addTestResult', dataObj).
            success(function (data) {
                $scope.testResultId = data;
                console.log(data);
            }).
            error(function(e){
                console.log(e);
            });
    };

    $scope.StartTest();

    $scope.SubmitAnswer = function () {


        var dataObj = {
            testresultid: $scope.testResultId,
            questionid: $scope.test.questions[$scope.index].Id,
            useranswer: $scope.Answer,
            answer: $scope.test.questions[$scope.index].Answer,
            correct: $scope.test.questions[$scope.index].Correct,
            responsetime: $scope.currentSecond,
            result: $scope.test.questions[$scope.index].Correct
        };

        console.log('dataObj:' + dataObj);

        $http.post('http://twistttwig.azurewebsites.net/addAnswer/', dataObj).
            success(function (data) {
                console.log(data);
            }).
            error(function(e){
               console.log(e);
            });
        if ($scope.test.questions[$scope.index].Answer == $scope.Answer) {
            $scope.test.questions[$scope.index].Correct = 1;
            $scope.test.questions[$scope.index].TimetoAnswer = $scope.currentSecond;
            $scope.test.questions[$scope.index].UserAnswer = $scope.Answer;
            $scope.test.Correct++;
        }
        else {
            $scope.test.questions[$scope.index].Correct = 0;
            $scope.test.questions[$scope.index].TimetoAnswer = $scope.currentSecond;
            $scope.test.questions[$scope.index].UserAnswer = $scope.Answer;
        }
        $scope.currentQuestion = $scope.test.questions[++$scope.index];
    };

    $scope.Back = function () {
        $location.path('/api/tests');
    };

    $scope.onTimeout = function () {
        $scope.currentSecond++;
        if($scope.currentSecond >= $scope.timelimit){
            $scope.stop();
            $scope.TestEnded = true;
        }
        else {
            mytimeout = $timeout($scope.onTimeout, 1000);
        }
    };

    var mytimeout = $timeout($scope.onTimeout, 1000);

    $scope.stop = function () {
        $timeout.cancel(mytimeout);
    };

    $scope.isEnd = function () {
        if($scope.index <= $scope.test.questions.length) {
            $scope.TestEnded = false;
        }
        else {
            $scope.TestEnded = true;
        }
    };
});
