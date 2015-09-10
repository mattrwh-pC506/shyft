app.directive('mealForm', function() {
    return {
        restrict: 'A',
        templateUrl: './templates/meal_form.html'
    };
});

app.directive('staffEarnings', function() {
    return {
        restrict: 'A',
        templateUrl: './templates/staff_earnings.html'
    };
});

app.directive('customerCharge', function() {
    return {
        restrict: 'A',
        templateUrl: './templates/customer_charge.html'
    };
});

app.directive('chargeToast', function() {
    return {
        restrict: 'A',
        templateUrl: './templates/charge-toast.html'
    };
});