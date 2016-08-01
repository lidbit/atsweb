app.factory('SharedService', function () {

    var sharedService = {};

    sharedService.BroadcastUserId = function (id) {
        sharedService.userId = id;
    };


    return sharedService;
});
