var app = angular.module('loginApp',[]);

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

var app = angular.module('home',[]);


app.controller('homeCntrl',function($scope,$http, $window,$timeout) {
        $scope.name = "";
        var res = $http.get('/home');
        res.success(function (data) {
            $scope.user = data;
            if($scope.user.username==null){
                swal({
                    title: 'Please login',
                    type :'warning'
                });
                $timeout(function(){
                    var url = "http://" + $window.location.host + "/index.html";
                    $window.location.href = url;
                },2000);
            }
                //alert("please login");
            else{
                $scope.name = $scope.user.fname;
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
            },2000);
            //alert("please login");

        });
        $scope.logout = function () {
            var log = $http.get('/logout');
            log.success(function (data) {
                var url = "http://" + $window.location.host + "/index.html";
                $window.location.href = url;
            });
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
