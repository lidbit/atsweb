app.controller('editCtrl', function ($scope, $http, $q, $routeParams, $location, SharedService) {

    $scope.currentTest = null;

    $scope.currentTest = {};
    $scope.lastQuestionId = 1;
    $scope.testid = -1;
    $scope.userId = SharedService.userId;


    $scope.name = '';
    $scope.type = '';
    $scope.timelimit = 1;
    $scope.Quest = '1 + 1';
    $scope.Answer = '';
    $scope.questions = [];
    $scope.selectedQuestion = null;
    $scope.newQueston = null;
    $scope.newAnswer = null;

    $scope.testid = $routeParams['id'];

    if ('undefined' != typeof $scope.testid) {

        var deferred = $q.defer();
        $http.get("http://twistttwig.azurewebsites.net/test/" + $scope.testid).
            success(function (data) {
                deferred.resolve(data);
                $scope.name = data.test.Name;
                $scope.type = data.test.TestType;
                $scope.timelimit = data.test.TimeLimit;
                $scope.questions = data.questions;
                _.each($scope.questions, function (item, index) {
                    item.index = index;
                });
                $scope.selectedQuestion = $scope.questions[3];
                $scope.lastQuestionId = data.length + 1;
            }).
            error(function (e) {
                console.log(e);
            });
    }

    $scope.cancelEdit = function () {
        $location.path('/tests');
    };

    $scope.updateTest = function () {
        var postData = {
            userid: $scope.userId,
            id: $scope.testid,
            name: $scope.name,
            type: $scope.type,
            timelimit: $scope.timelimit,
            questions: $scope.questions
        };

        $http.post("http://twistttwig.azurewebsites.net/test/save/", postData).
            success(function (data) {
                console.log(data);
            }).
            error(function (e) {
                console.log(e);
            });
    };

    $scope.createTest = function () {
        var postData = {
            userid: SharedService.userId,
            id: -1,
            name: $scope.name,
            type: $scope.type,
            timelimit: $scope.timelimit,
            questions: $scope.questions
        };

        $http.post("http://twistttwig.azurewebsites.net/test/create/", postData).
            success(function (data) {
                console.log(data);
            }).
            error(function (e) {
                console.log(e);
            });
    };

    $scope.updateSelected = function (index) {
        if ('undefined' != typeof index)
            console.log(index[0].index);
    };

    $scope.deleteQuestion = function (selectedQuestion) {
        var selected = _.find($scope.questions, function (item) {
            return item.Id = selectedQuestion[0].Id;
        });
        $scope.questions.splice(selected.index, 1);
        // reindex the array
        _.each($scope.questions, function (item, index) {
            item.index = index;
        });

        // delete on the server
        $http.post('http://twistttwig.azurewebsites.net/question/delete/' + selected.Id).
            success(function (data) {
                console.log(data);
            }).
            error(function (e) {
                console.log(e);
            });
    };

    $scope.AddQuestion = function () {
        var newQuestion = {Id: -1, Quest: $scope.newQuestion, Answer: $scope.newAnswer};
        $scope.questions.push(newQuestion);
        $scope.newQuestion = '';
        $scope.newAnswer = '';
        _.each($scope.questions, function (item, index) {
            item.index = index;
        });
    };

    $scope.saveEdit = function () {

        if (('undefined' != typeof $scope.testid) && ($scope.testid != -1)) {
            $scope.updateTest();
        } else {
            $scope.createTest();
        }
    };
});
