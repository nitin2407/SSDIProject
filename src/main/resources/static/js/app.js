var app = angular.module('plunker', ['ngMaterial','ngMaterialDatePicker']);

app.controller('MainCtrl', function($scope, $mdDialog) {
  
 

  $scope.openDialog = function(){
    $mdDialog.show({
      controller: function($scope, $mdDialog){
        // do something with dialog scope      
      },
      controller: DialogController,
      //templateUrl: 'addSkill.html',
      templateUrl: '/tpl.html',
      windowClass: 'large-Modal',
      //template: '<div><p>Nitin</p><p>Neeta</p></div>',
      /*<div><md-dialog aria-label="Add a skill">'+
        '<form ng-cloak><md-toolbar><div class="md-toolbar-tools">'+
              '<h2>Skill</h2><span flex></span><md-button class="md-icon-button" ng-click="cancel()">'+
                '<md-icon md-svg-src="" aria-label="Close dialog"></md-icon></md-button>'+
            '</div></md-toolbar></form></md-dialog></div>',
      ,
      /*template: '<md-dialog aria-label="My Dialog">'+
                    '<md-dialog-content class="sticky-container">Blah Blah' +
                    '</md-dialog-content>' +
                    '<md-button ng-click=close()>Close</md-button>' +
                    '</md-dialog>',*/
      parent: angular.element(document.body),
      //targetEvent: ev,
      targetEvent: event,
      clickOutsideToClose:true,
      //fullscreen: $scope.customFullscreen     
    });
  };
    function DialogController($scope, $mdDialog) {

    /*$scope.hour = {
       value: new Date(1970, 0, 1, 14, 57, 0)
     };*/

     
    

    $scope.categories = [{name:'Computer Science'},{name:'Cookery'},{name:'Electronics'},{name:'Maths'}];
    $scope.skill = [{name:'nitin',category:'Computer Science'}];
    $scope.categoryChoice = 'Computer Science';

    $scope.choices = [{Day: 'Monday',toTime: new Date(1970, 0, 1, 14, 57, 0),fromTime: new Date(1970, 0, 1, 14, 57, 0)}];
    //$scope.choices1 = [{id: 'choice1'}, {id: 'choice2'}];
    //$scope.choices2 = [{id: 'choice1'}, {id: 'choice2'}];
    $scope.days = ['Monday','Tuesday','Wednesday','Thurday','Friday','Saturday','Sunday'];
    /*scope.hours = ['1','2','3'];
    $scope.mins = ['1','2','3'];

    $scope.times = [{day: 'Wednesday',hour: '13', min: '13'}];*/
  
        $scope.addNewChoice = function() {
          var newItemNo = $scope.choices.length+1;
          $scope.choices.push({'day': 'Computer Science',toTime:'+new Date(1970, 0, 1, 14, 57, 0)+',fromTime:'+new Date(1970, 0, 1, 14, 57, 0)'});
          /*var newItemNo1 = $scope.choices1.length+1;
          $scope.choices1.push({'id':'choice'+newItemNo});
          var newItemNo2 = $scope.choices2.length+1;
          $scope.choices2.push({'id':'choice'+newItemNo});*/
        };
    
        $scope.removeChoice = function() {
          var lastItem = $scope.choices.length-1;
          $scope.choices.splice(lastItem);
          /*var lastItem1 = $scope.choices1.length-1;
          $scope.choices1.splice(lastItem1);
          var lastItem2 = $scope.choices2.length-1;
          $scope.choices2.splice(lastItem2);*/
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
                time: $scope.choices
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

  }
  
});