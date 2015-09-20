var app = angular.module('app', ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeController'
	})
	.when('/new-meal/', {
		templateUrl: 'templates/new-meal.html',
		controller: 'WaitCalcCtrl'
	})
	.when('/my-earnings/', {
		templateUrl: 'templates/my-earnings.html',
		controller: 'WaitCalcCtrl'
	})	
	.when('/transaction-history/', {
		templateUrl: 'templates/transaction-history.html',
		controller: 'WaitCalcCtrl'
	})
	.when('/error', {
		templateUrl: 'templates/error.html'
	})
	.otherwise('/error');
}]);

app.run(function($rootScope, $location, $timeout, $log) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
        $log.log($rootScope.isLoading);
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
        $log.log($rootScope.isLoading, "1 second later");
      }, 1000);
    });
})