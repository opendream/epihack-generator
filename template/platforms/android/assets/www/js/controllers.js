angular.module('epihack.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Uncomment below for simulate app at the first time
    // window.localStorage.removeItem('user');
})

.controller('SplashCtrl', function($scope, $ionicModal, $timeout, $state, $ionicViewService) {
    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };
    $scope.next = function() {
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;

            if (window.localStorage['user']) {
                $ionicViewService.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.home');
            }
            else {
                $scope.login();
            }

        });
    };
    $scope.doLogin = function() {
        // TODO: POST API to epihack

        window.localStorage['user'] = JSON.stringify($scope.user);
        console.log('Doing login', $scope.user);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
    $scope.closeLogin = function() {
        $scope.modal.hide();
        $ionicViewService.nextViewOptions({
            disableBack: true
        });
        $state.go('app.home');
    };

})
.controller('HomeCtrl', function($scope) {
    // TODO: something with design
})

.controller('MapCtrl', function($scope, $ionicLoading) {
    $scope.mapCreated = function(map) {
        $scope.map = map;
    };

    $scope.centerOnMe = function () {
        console.log("Centering");
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            console.log('Got pos', pos);
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    };
})

.controller('ReportCtrl', function($scope, $ionicModal, $timeout, $state, $ionicViewService) {

    // =============
    // USER
    // =============
    $scope.user = {
        gender: '',
        yearOfBirth: '',
        origin: ''
    };
    $scope.genders = GENDERS;
    $scope.countries = COUNTRIES;
    $scope.years = YEAR_OF_BIRTH;
    $scope.symptoms = SYMPTOMS;


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;

        if (window.localStorage['user']) {
            $scope.user = JSON.parse(window.localStorage['user']);
        }
        else {
            $scope.login();
        }

    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };


    $ionicModal.fromTemplateUrl('templates/thank.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.thankModal = modal;
    });

    // Open the login modal
    $scope.thank = function() {
        $scope.thankModal.show();
    };
    $scope.closeThank = function() {
        $scope.thankModal.hide();
        $ionicViewService.nextViewOptions({
            disableBack: true
        });
        $state.go('app.home');
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        // TODO: POST API to epihack

        window.localStorage['user'] = JSON.stringify($scope.user);
        console.log('Doing login', $scope.user);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    // =============
    // REPORT
    // =============
    $scope.report = {};
    $scope.doReport = function (form) {

        // TODO: POST API to epihack
        console.log($scope.report);
        $scope.thankModal.show();

        //$ionicViewService.nextViewOptions({
        //    disableBack: true
        //});
    };
});