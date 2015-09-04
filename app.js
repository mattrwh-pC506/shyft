angular.module('app', [])
  .factory("CachedData", function cachedData() {
    return {
      customer_charges: [],
      staff_earnings: {
        tip_total: 0,
        meal_count: 0,
        avg_tip: 0
      }
    }
  })
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })
  .controller('WaitCalcCtrl', ['$scope', 'CachedData', function($scope, CachedData) {
    $scope.charge = {}

    $scope.customer_charges = CachedData.customer_charges;
    $scope.staff_earnings = CachedData.staff_earnings;

    $scope.fresh_state = true;

    $scope.reset_charge = function() {
      $scope.charge = {};
      $scope.fresh_state = true;
      //obj = {}
    }

    $scope.reset_all = function() {
      $scope.reset_charge();
      $scope.customer_charges = [];
      for (item in $scope.staff_earnings) {
        item = 0;
      }
    }

    $scope.show_all_transactions = function(val) {
      $scope.show_all = val;
    }

    $scope.submit = function(form) {
      $scope.fresh_state = false;
      if (form.$valid) {
        console.log($scope.charge);
        $scope.charge.tip = $scope.charge.sub_total * $scope.charge.tip_percentage;
        $scope.charge.tax = $scope.charge.sub_total * $scope.charge.tax_rate;
        $scope.charge.total = $scope.charge.sub_total + $scope.charge.tax + $scope.charge.tip;
        $scope.staff_earnings.tip_total += $scope.charge.tip;
        $scope.staff_earnings.meal_count += 1;
        $scope.staff_earnings.avg_tip = $scope.staff_earnings.tip_total / $scope.staff_earnings.meal_count;
        var today = new Date();
        $scope.customer_charges.push({
          time: today.toLocaleTimeString(),
          charge: $scope.charge
        });        
        $scope.current_charge = $scope.charge;
        $scope.reset_charge();
        console.log($scope.customer_charges);
      } else {
        console.log('Fail Whale.');
      }
    };


  }]);