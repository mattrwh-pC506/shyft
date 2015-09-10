app.filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    });

app.filter('transaction', function($filter) {
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
