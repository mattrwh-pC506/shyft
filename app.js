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
}])