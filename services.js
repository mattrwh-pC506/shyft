app.factory("DataService", function DataService() {

        var staff_earnings = {
            tip_total: 0,
            meal_count: 0,
            avg_tip: 0
        }

        function getStaffEarnings() {
            return staff_earnings;
        }

        function setStaffEarnings(key, val) {
            staff_earnings[key] = val;
        }

        function addCharge(charge) {
            staff_earnings.tip_total += charge.tip;
            staff_earnings.meal_count++;
            staff_earnings.avg_tip = staff_earnings.tip_total / staff_earnings.meal_count;
            this.transaction_history.push({
                time: new Date().toLocaleTimeString(),
                charge: charge
            });
        }

        function reset() {
            for (var prop in staff_earnings) {
                staff_earnings[prop] = 0
            }
            this.transaction_history = []
        }

        var publicAPI = {        
            getStaffEarnings: getStaffEarnings,
            setStaffEarnings: setStaffEarnings,
            transaction_history: [],
            addCharge: addCharge,
            reset: reset
        };

    return publicAPI;
})