app.factory("DataService", function DataService() {

        function getStaffEarnings() {
            return staff_earnings;
        }

        function getTransactionHistory() {
            return transaction_history;
        }

        function addCharge(charge) {
            staff_earnings.tip_total += charge.tip;
            staff_earnings.meal_count++;
            staff_earnings.avg_tip = staff_earnings.tip_total / staff_earnings.meal_count;
            transaction_history.push({
                time: new Date().toLocaleTimeString(),
                charge: charge
            });
        }

        function reset() {
            for (var prop in staff_earnings) {
                staff_earnings[prop] = 0
            }
            transaction_history = []
        }

        var staff_earnings = {
            tip_total: 0,
            meal_count: 0,
            avg_tip: 0
        };

        var transaction_history = [];

        var publicAPI = {        
            getStaffEarnings: getStaffEarnings,
            getTransactionHistory: getTransactionHistory,
            addCharge: addCharge,
            reset: reset
        };

    return publicAPI;
});

