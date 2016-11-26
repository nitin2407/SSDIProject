
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
});



app.controller('MainController', function($scope) {
    $scope.categories = ['study', 'dance', 'singing', 'arts', 'sports', 'cooking', 'zipcode', 'city'];
    $scope.checked_category = [];
    $scope.addFruit = function(category) {
        if ($scope.checked_category.indexOf(category) != -1) return;
        $scope.checked_category.push(category);
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

            $scope.categories = [{name:'study'},{name:'dance'},{name:'singing'},{name:'arts'},{name:'sports'},{name:'cooking'}];
            $scope.skill = [{name:'nitin',category:'study'}];
            $scope.categoryChoice = 'study';
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
                        skillDescription: $scope.description
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

        $scope.clickInterest=function (id){
        var result=$http.get('/increaseInterestedCount/'+id);
            var url = "http://" + $window.location.host + "/index.html";
            $window.location.href = url;
        };
});


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


//for profile page
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

       $scope.openManageCourses = function(){           
         var url = "http://" + $window.location.host + "/html/managecourses.html";           
         $window.location.href = url;            
     };          
             
     $scope.showSkill = function(tutor){         
         var result=$http.get('/skills/'+tutor);         
         result.success(function (data) {            
             $scope.skillDetails = data;         
             alert(data.skillName);          
         });         
     };
});



app.controller('CourseControl',function($scope,$http, $window,$timeout,$location) {

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
            else{
                $scope.f_name = $scope.user.fname;
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

        var params = document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == "id")
                $scope.skillId = singleParam[1];
            }

        $scope.timings = [{day: 'Monday',toTime: new Date(1970, 0, 1, 14, 57, 0),fromTime: new Date(1970, 0, 1, 14, 57, 0)}];
        var res = $http.get('/manageSkill/'+$scope.skillId);
        res.success(function (data) {
            $scope.skillDetails = data;
                $scope.skill_ID = $scope.skillDetails.skillId;
                $scope.skill_Name = $scope.skillDetails.skillName;
                $scope.skill_Description = $scope.skillDetails.skillDescription;
                $scope.cate_gory = $scope.skillDetails.category;
                $scope.timings = $scope.skillDetails.time;
        });
        res.error(function (data, status) {
            swal({
                title: 'not able to retrieve skill details',
                type: 'warning',
                showCloseButton: true
            });
            $timeout(function () {
                var url = "http://" + $window.location.host + "/html/manageCourses.html";
                $window.location.href = url;
            }, 2000)
            //alert("please login");

        });

        $scope.cancel = function () {
            var url = "http://" + $window.location.host + "/html/manageCourses.html";
            $window.location.href = url;
        };

        $scope.logout = function () {
            var log = $http.get('/logout');
            log.success(function (data) {
                var url = "http://" + $window.location.host + "/index.html";
                $window.location.href = url;
            });
        };
    //$scope.choices = [{id: 'choice1'}, {id: 'choice2'}];

    $scope.addNewChoice = function() {
        var newItemNo = $scope.timings.length+1;
        $scope.timings.push({day: 'Monday',toTime:'+new Date(1970, 0, 1, 14, 57, 0)+',fromTime:'+new Date(1970, 0, 1, 14, 57, 0)'});
    };

    $scope.removeChoice = function() {
        var lastItem = $scope.timings.length-1;
        $scope.timings.splice(lastItem);
    };
    //};
        $scope.updateskill = function() {
                var dataObj = {
                    skillName: $scope.skill_Name,
                    category: $scope.cate_gory,
                    time: $scope.timings,
                    skillDescription: $scope.skill_Description,
                    //category: $scope.cate_gory,
                    //skillName: $scope.skill_Name,
                    //skillDescription: $scope.skill_Description,
                    skillId: $scope.skillId
                };

                var res = $http.post('/manageSkill', dataObj);

                res.success(function (data) {
                    swal({
                         title: "Skill details saved.",
                         type: "success"
                    });
                    //alert("user details have been saved");
                });
                res.error(function (data, status) {
                    swal({
                         title: "Unable to save skill details",
                         type: "error" 
                     });
                });

        };

        $scope.openManageCourses = function(){
            var url = "http://" + $window.location.host + "/html/manageCourses.html";
            $window.location.href = url;
        };

        $scope.showSkill = function(tutor){
            var result=$http.get('/skills/'+tutor);
            result.success(function (data) {
                $scope.skillDetails = data;
                alert(data.skillName);
            });
        };



});

//code for manageCourses page 
app.controller('manageSkillsCntrl', function($scope, $http,$window) {
    var result = $http.get('/skillForUser');
    result.success(function (data) {
        console.log(data);
        $scope.skills = data;
    });

    $scope.editSkill = function (id) {
        var url = "http://" + $window.location.host + "/html/courseEdit.html?id="+id;
        $window.location.href = url;
    }


    $scope.deleteSkill = function (id,index) {
        var result = $http.get('/deleteSkill/'+id);
        result.success(function (data) {
            $scope.skills.splice(index,1);
            swal({
                title: "Skill Deleted",
                type: "success"
            });
        });
        result.error(function (data, status) {
            if (status == 404) {
                swal({
                    title: "Skill cannot be deleted",
                    type: "info"
                });
            }
        })

    };
});
    app.controller('manageCtrl', function ($scope, $http, $window,$timeout) {
        $scope.name = "";
        var res = $http.get('/profile');
        res.success(function (data) {
            $scope.user = data;
            if ($scope.user.username != null) {
                    $scope.f_name = $scope.user.fname;
                }
            else{
                swal({
                    title: 'Please login',
                    type :'warning'
                });
                $timeout(function(){
                    var url = "http://" + $window.location.host + "/index.html";
                    $window.location.href = url;
                },2000);
            }

        });
        $scope.logout = function () {
            var log = $http.get('/logout');
            log.success(function (data) {
                var url = "http://" + $window.location.host + "/index.html";
                $window.location.href = url;
            });
        };
    });





