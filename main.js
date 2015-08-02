var demoApp = angular.module("demoapp", ["float.block"]);

demoApp.controller("mainCtrl", [ "$scope", "$timeout", function($scope, $timeout){
  console.log("controller...");
  
  $scope.isFixed = true;
  /*var area = angular.element(document.querySelector('.cal'));
  area.removeClass("move");
  area.removeClass("fix");
  area.addClass("fix");
  $timeout(function(){
    area.removeClass("fix");
    area.addClass("move");
    
  }, 1000);
  */
  $timeout(function(){$scope.isFixed = false}, 2000);
}]);