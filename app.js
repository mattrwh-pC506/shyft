angular.module('app', [])
    .factory("DataService", function DataService() {
        return {
            staff_earnings: {
                tip_total: 0,
                meal_count: 0,
                avg_tip: 0
            },

            transaction_history: [],

            addCharge: function addCharge(charge) {
                this.staff_earnings.tip_total += charge.tip;
                this.staff_earnings.meal_count++;
                this.staff_earnings.avg_tip = this.staff_earnings.tip_total / this.staff_earnings.meal_count;
                this.transaction_history.push({
                    time: new Date().toLocaleTimeString(),
                    charge: charge
                });
            },
            reset: function() {
                for (var prop in this.staff_earnings) {
                    this.staff_earnings[prop] = 0
                }
                this.transaction_history = []
            }
        };
    })

    .filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    })

    .filter('transaction', function($filter) {
        return function(items, show_all, count) {
            if (angular.isArray(items)) {
                var filtered_items = $filter('reverse')(items);
                if (!show_all && count) {
                    filtered_items = $filter('limitTo')(filtered_items, count);
                }
                return filtered_items;

            } else {
                return items;
            }
        };
    })

    .controller('WaitCalcCtrl', function($scope, DataService) {
        var init = function() {
            $scope.show_all = false;
            $scope.fresh_state = true;

            $scope.transaction_history = DataService.transaction_history;
            $scope.staff_earnings = DataService.staff_earnings;
        }

        init()

        var reset_charge = function() {
            $scope.charge = {};
            $scope.fresh_state = true;
        }

        $scope.reset_all = function() {
            reset_charge();
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
                reset_charge();
            } else {
                console.log('Fail Whale.');
            }
        };

    });
