app.controller('WaitCalcCtrl', function($scope, DataService) {
    var init = function() {
        $scope.show_all = false;
        $scope.fresh_state = true;

        $scope.transaction_history = DataService.getTransactionHistory();
        $scope.staff_earnings = DataService.getStaffEarnings();
    };

    init()

    $scope.reset_charge = function() {
        $scope.charge = {};
        $scope.fresh_state = true;
    }

    $scope.reset_all = function() {
        $scope.reset_charge();
        DataService.reset()
        init()
    }

    $scope.show_all_transactions = function(val) {
        $scope.show_all = val
    }

    $scope.submit = function(form) {
        $scope.fresh_state = false;
        if (form.$valid) {
            $scope.charge.tip = $scope.charge.sub_total * $scope.charge.tip_percentage / 100;
            $scope.charge.tax = $scope.charge.sub_total * $scope.charge.tax_rate / 100;
            $scope.charge.total = $scope.charge.sub_total + $scope.charge.tax + $scope.charge.tip;

            DataService.addCharge($scope.charge);

            $scope.current_charge = $scope.charge;
            $scope.reset_charge();
        } else {
            console.log('Fail Whale.');
        }
    };

});

app.controller('HomeController', function($scope) {
    $scope.about = "Click on New Meal above to get started."
});