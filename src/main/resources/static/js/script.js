
app.controller('LoginCtrl',function($scope,$http, $window) {

    var load = $http.get('/home');
    load.success(function (data, status, headers, config) {
        if(data.username!=null){
            var url = "http://" + $window.location.host + "/html/home.html";
            $window.location.href = url;
        }
    });

    $scope.check = function () {
      var dataObj = {
        username : $scope.user,
        password : $scope.pass
      };

      var res = $http.post('/login', dataObj);
      res.success(function (data) {
        $scope.access = data;
        if ($scope.access.allow == true) {
          var url = "http://" + $window.location.host + "/html/home.html";
          $window.location.href = url;
        }
        else {
          swal({
                title: 'Username/password invalid.',
                type: 'error'
          });
          //alert("Username/password invalid.");
        }
      });
      res.error(function (data) {
        swal({
            title: 'Unable to login.',
            type: 'error'
          });
      });
    };
    $scope.signup = function () {
      var url = "http://" + $window.location.host + "/html/signup_page.html";
      $window.location.href = url;
    };
});


app.controller('skillsController', function($rootScope, $http, $scope){
    var result=$http.get('/skills');
    result.success(function (data) {
        $rootScope.skills = data;
    });

    $scope.viewSkill = function(id){
        var result=$http.get('/skills/'+id);
        result.success(function (data) {
            $scope.skillDetails = data;
            alert(data.skillName);
        });
    }

});



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


app.controller('MainController', function($scope) {
    $scope.fruits = ['study', 'dance', 'singing', 'arts', 'sports'];
    $scope.checked_fruits = [];
    $scope.addFruit = function(fruit) {
        if ($scope.checked_fruits.indexOf(fruit) != -1) return;
        $scope.checked_fruits.push(fruit);
    };
});





//for signup page

var app = angular.module('signUpApp',['signUpApp.directives']);


app.controller('signUpCntrl',function($scope,$http, $window,$timeout) {

    $scope.cancel = function () {
        var url = "http://" + $window.location.host + "/index.html";
        $window.location.href = url;
    };

    $scope.submitForm = function(isValid) {
        //$scope.register = function () {
        if(isValid) {
            var dataObj = {
                username: $scope.email,
                password: $scope.pass,
                address: {
                    addressLine1: $scope.addr1, addressLine2: $scope.addr2,
                    city: $scope.city, state: $scope.state, zip_code: $scope.zipcode
                },
                fname: $scope.f_name,
                lname: $scope.l_name,
                phoneNumber: $scope.ph_number
            };
            var res = $http.post('/signup', dataObj);
            res.success(function (data, status) {
                swal({
                    title: 'User created',
                    type: 'success'
                });
                //alert("user created");
                $timeout(function() {
                    var url = "http://" + $window.location.host + "/index.html";
                    $window.location.href = url;
                },2000)
            });
            res.error(function (data, status) {
                if(status==409){
                    swal({
                        title: "Username already exists",
                        type: "info"
                    });
                    //alert("username already exists");
                }
                else{
                    swal({
                        title: "User not created",
                        type: "error"
                    });
                    //alert("user not created");
                }
            });
        }
    };
});

angular.module('signUpApp.directives', [])
    .directive('compareTo', function() {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                ngModel.$parsers.unshift(validate);

                // Force-trigger the parsing pipeline.
                scope.$watch(attrs.CompareTo, function () {
                    ngModel.$setViewValue(ngModel.$viewValue);
                });

                function validate(value) {
                    var isValid = scope.$eval(attrs.compareTo) == value;

                    ngModel.$setValidity('compare-to', isValid);

                    return isValid ? value : undefined;
                }
            }
        };
    });

//for profile page

var app = angular.module('profile',['profileApp.directives']);

app.controller('profileCntrl',function($scope,$http, $window,$timeout) {

    var res = $http.get('/profile');
    res.success(function (data) {
        $scope.user=data;
        if($scope.user.username==null){
            //alert("please login");
            swal({
                title: 'Please login',
                type :'warning'
            });
            $timeout(function() {
                var url = "http://" + $window.location.host + "/index.html";
                $window.location.href = url;
            },2000)
        }
        else{
            $scope.f_name=$scope.user.fname;
            $scope.l_name=$scope.user.lname;
            $scope.email=$scope.user.username;
            $scope.pass=$scope.user.password;
            $scope.cnfPass=$scope.pass;
            $scope.ph_number=$scope.user.phoneNumber;
            $scope.addr1=$scope.user.address.addressLine1;
            $scope.addr2=$scope.user.address.addressLine2;
            $scope.city=$scope.user.address.city;
            $scope.state=$scope.user.address.state;
            $scope.zipcode=$scope.user.address.zip_code;
        }
    });
    res.error(function (data,status) {
        swal({
            title: 'Please login',
            type :'warning',
            showCloseButton: true
        });
        $timeout(function(){
            var url = "http://" + $window.location.host + "/index.html";
            $window.location.href = url;
        },2000)
        //alert("please login");

    });

    $scope.cancel = function () {
        var url = "http://" + $window.location.host + "/html/home.html";
        $window.location.href = url;
    };

    $scope.logout = function () {
        var log = $http.get('/logout');
        log.success(function (data) {
            var url = "http://" + $window.location.host + "/index.html";
            $window.location.href = url;
        });
    };

    $scope.submitForm = function(isValid) {
        if(isValid) {
            var dataObj = {
                username: $scope.email,
                password: $scope.pass,
                address: {
                    addressLine1: $scope.addr1, addressLine2: $scope.addr2,
                    city: $scope.city, state: $scope.state, zip_code: $scope.zipcode
                },
                fname: $scope.f_name,
                lname: $scope.l_name,
                phoneNumber: $scope.ph_number
            };
            var res = $http.post('/profile', dataObj);
            res.success(function (data, status, headers, config) {
                swal({
                    title: "User details saved",
                    type: "success"
                });
                    //alert("user details have been saved");
            });
            res.error(function (data, status) {
                swal({
                    title: "Unable to save user details",
                    type: "error"
                    //alert("user details have been saved");
                });
                //alert("user not created");
            });
        }
    };
});

angular.module('profileApp.directives', [])
    .directive('compareTo', function() {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                ngModel.$parsers.unshift(validate);

                // Force-trigger the parsing pipeline.
                scope.$watch(attrs.CompareTo, function () {
                    ngModel.$setViewValue(ngModel.$viewValue);
                });

                function validate(value) {
                    var isValid = scope.$eval(attrs.compareTo) == value;

                    ngModel.$setValidity('compare-to', isValid);

                    return isValid ? value : undefined;
                }
            }
        };
    });


var app = angular.module('addSkillApp',[]);


app.controller('addSkillCntrl',function($scope,$http, $window,$timeout) {
    $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };
  
});


