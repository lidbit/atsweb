app.factory('TestService', function () {

    var testService = {};

    testService.SetTest = function (test) {
        testService.test = test;
    };
    return testService;
});

