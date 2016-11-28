
app.controller('signUpCntrl',function($scope,$http, $window,$timeout,urlFactory,signUpService) {

    $scope.cancel = function () {
        $window.location.href = urlFactory.index();
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

            signUpService.register(dataObj).then(
            	function (data, status) {
	                swal({
	                    title: 'User created',
	                    type: 'success'
	                });
	                //alert("user created");
	                $timeout(function() {
	                    $window.location.href = urlFactory.index();
	                },2000)
            	},
            	function (data, status) {
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
	                }
            });
        }
    };
});


//for profile page
app.controller('profileCntrl',function($scope,$http, $window,$timeout,urlFactory,signUpService,loginService) {

    loginService.userDetails().then(
    	function (user) {
	        $scope.user=user.data;
	        if($scope.user.username==null){
	            //alert("please login");
	            swal({
	                title: 'Please login',
	                type :'warning'
	            });
	            $timeout(function() {
	                $window.location.href = urlFactory.index();
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
    	},
    	function (data,status) {
	        swal({
	            title: 'Please login',
	            type :'warning',
	            showCloseButton: true
	        });
	        $timeout(function(){
	            $window.location.href = urlFactory.index();
	        },2000)
    	});

    $scope.cancel = function () {
        $window.location.href = urlFactory.home();
    };

    $scope.logout = function () {
            loginService.logout().then(
            	function () {
                $window.location.href = urlFactory.index();
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
            signUpService.editProfile(dataObj).then(
            	function (data, status, headers, config) {
	                swal({
	                    title: "User details saved",
	                    type: "success"
	                });
	            },
            	function (data, status) {
	                swal({
	                    title: "Unable to save user details",
	                    type: "error"
	                });
            	});
        }
    };

    $scope.openManageCourses = function(){                     
        $window.location.href = urlFactory.manageCourses();            
    };          
             
    $scope.showSkill = function(tutor){

        var result=$http.get('/skills/'+tutor);         
        result.success(function (skillDetails) {            
            $scope.skillDetails = skillDetails.data;                   
        });         
    };
});
