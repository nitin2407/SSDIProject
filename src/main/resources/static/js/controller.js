
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



app.controller('MainController', function($scope) {
    $scope.fruits = ['study', 'dance', 'singing', 'arts', 'sports'];
    $scope.checked_fruits = [];
    $scope.addFruit = function(fruit) {
        if ($scope.checked_fruits.indexOf(fruit) != -1) return;
        $scope.checked_fruits.push(fruit);
    };
});



app.controller('homeCntrl',function($scope,$http, $window,$timeout,$mdDialog) {
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

        });
        $scope.openDialog = function(){
            $mdDialog.show({
                controller: function($scope, $mdDialog){     
                },
                controller: DialogController,
                templateUrl: '/tpl.html',
                windowClass: 'large-Modal',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:true,
      //fullscreen: $scope.customFullscreen     
            });
        };
        function DialogController($scope, $mdDialog) {

            $scope.categories = [{name:'Computer Science'},{name:'Cookery'},{name:'Electronics'},{name:'Maths'}];
            $scope.skill = [{name:'nitin',category:'Computer Science'}];
            $scope.categoryChoice = 'Computer Science';
            $scope.choices = [{day: 'Monday',toTime: new Date(1970, 0, 1, 14, 57, 0),fromTime: new Date(1970, 0, 1, 14, 57, 0)}];
            $scope.days = [{name:'Monday'},{name:'Tuesday'},{name:'Wednesday'},{name:'Thurday'},{name:'Friday'},{name:'Saturday'},{name:'Sunday'}];
            $scope.description="";
                $scope.addNewChoice = function() {
                  var newItemNo = $scope.choices.length+1;
                  $scope.choices.push({day: 'Monday',toTime:'+new Date(1970, 0, 1, 14, 57, 0)+',fromTime:'+new Date(1970, 0, 1, 14, 57, 0)'});
                };
            
                $scope.removeChoice = function() {
                  var lastItem = $scope.choices.length-1;
                  $scope.choices.splice(lastItem);
                };


            $scope.hide = function() {
              $mdDialog.hide();
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };


            $scope.submitForm = function(isValid) {
                if(isValid) {
                    var dataObj = {
                        skillName: $scope.skill_name,
                        category: $scope.categoryChoice,
                        time: $scope.choices,
                        description: $scope.description
                    };
                    console.log(dataObj);
                    var res = $http.post('/addskill', dataObj);
                    res.success(function (data, status) {
                        $mdDialog.cancel();
                        swal({
                            title: "skill added",
                            type: "success"
                        });
                    });
                    res.error(function (data, status) {
                        swal({
                            title: "Unable to add skill details",
                            type: "error"
                            //alert("user details have been saved");
                        });
                        //alert("user not created");
                    });
                }
            };
        }
        $scope.logout = function () {
            var log = $http.get('/logout');
            log.success(function (data) {
                var url = "http://" + $window.location.host + "/index.html";
                $window.location.href = url;
            });
        };
});
