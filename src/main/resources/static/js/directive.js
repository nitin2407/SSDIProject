app.directive('checkList', function($http,$rootScope) {
    return {
        scope: {
            list: '=checkList',
            value: '@'
        },
        link: function(scope, elem, attrs) {
            var handler = function(setup) {
                var checked = elem.prop('checked');
                var index = scope.list.indexOf(scope.value);

                if (checked && index == -1) {
                    if (setup) elem.prop('checked', false);
                    else scope.list.push(scope.value);
                } else if (!checked && index != -1) {
                    if (setup) elem.prop('checked', true);
                    else scope.list.splice(index, 1);
                }
            };

            var setupHandler = handler.bind(null, true);
            var changeHandler = handler.bind(null, false);

            elem.bind('change', function() {
                scope.$apply(changeHandler);
                if(scope.list.length==0){
                    var result=$http.get('/skills');
                    result.success(function (data) {
                        $rootScope.skills = data;
                    });
                }
                else{
                    var result=$http.get('/skills/category/'+scope.list);
                    result.success(function (data) {
                        $rootScope.skills = data;
                    });
                }

            });
            scope.$watch('list', setupHandler, true);
        }
    };
});
