var app = angular.module('loginApp',[]);

app.controller('LoginCtrl',function($scope,$http){
    $scope.message="nitin";
    //var data = {username: $scope.user};
    //$scope.check=function() {
      //  $http.post("/hello", data).success(function (data, status) {
        //    $scope.access = data;
          //  if(access.allow=="yes"){
            //    $scope.message="allowed";
            //}
            //else{
             //   $scope.message="not allowed";
            //}
        //});
    //};
});