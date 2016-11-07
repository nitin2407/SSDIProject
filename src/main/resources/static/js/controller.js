
app.controller('LoginCtrl',function($scope,$http, $window) {

    $scope.check = function () {
      var dataObj = {
        username : $scope.user,
        password : $scope.pass
      };
      var res = $http.post('/login', dataObj);
      res.success(function (data, status, headers, config) {
        $scope.access = data;
        if ($scope.access.allow == true) {
          var url = "http://" + $window.location.host + "/html/home.html";
          $window.location.href = url;
        }
        else {
          alert("Username/password invalid.");
        }
      });
      res.error(function (data,status) {
        console.log(data);
        alert(data);
      });
    };
    $scope.signup = function () {
      var url = "http://" + $window.location.host + "/html/signup_page.html";
      $window.location.href = url;
    };
});


app.controller('skillController', function($scope){

    alert(12345);

});


app.controller('homeCntrl',function($scope,$http, $window) {
        $scope.name = "";
        var res = $http.get('/home');
        res.success(function (data, status, headers, config) {
            $scope.user = data;
            $scope.name = $scope.user.username;
        });
        res.error(function (data,status) {
            console.log(data);
            alert(data);
        });
        $scope.logout = function () {
            var log = $http.get('/logout');
            log.success(function (data, status, headers, config) {
                var url = "http://" + $window.location.host + "/index.html";
                $window.location.href = url;
            });
        };
});