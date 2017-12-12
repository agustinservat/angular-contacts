'use strict';

angular.module('myApp.contacts', ['ngRoute', 'angular.filter'])

.controller('ContactsCtrl', ['$scope', '$http', '$location', '$rootScope', '$window',function($scope, $http, $location, $rootScope, $window) {
  // ($rootScope.contacts) ? $rootScope.contacts :  $rootScope.contacts = null;
  $scope.contacts = [];
  $scope.contactSelected = [];
  $scope.url = 'https://s3.amazonaws.com/technical-challenge/v3/contacts.json';
  $scope.urlStarTrue = '../public/assets/favorite_star_true/favorite-true.png';
  $scope.urlStarTrue2x = '../public/assets/favorite_star_true/favorite-true2x.png';
  $scope.urlStarFalse = '../public/assets/favorite_star_false/favorite-false.png';
  $scope.urlStarFalse2x = '../public/assets/favorite_star_false/favorite-false2x.png';
  $scope.urlUserLarge = '../public/assets/user_large/user_large.png';
  $scope.urlUserSmall = '../public/assets/user_small/user_small.png';

  if($location.path() == '/contacts'){
      sessionStorage.removeItem("contactSelected");
      // sessionStorage.clear();
  }
  $scope.contactSelected = JSON.parse(sessionStorage.getItem("contactSelected"));

  $scope.contacts = JSON.parse(sessionStorage.getItem("contacts"));

  angular.element(document).ready(function () {
    $window.scrollTo(0, 0);
    if($scope.contacts == null || typeof $scope.contacts === 'undefined'){
      $http.get($scope.url)
                    .success(function(data) {
                        $scope.contacts = data;
                        sessionStorage.setItem("contacts", JSON.stringify(data));
                    })
                    .error(function(data) {
                        alert(data);
                        console.log('Error: ' + data);
                    });
      }

  });

  $scope.itemSelected = function(item){
    $scope.contactSelected = item;
    sessionStorage.setItem("contactSelected", JSON.stringify(item));
    $location.path('/contact');
  }

  $scope.updateItem = function(){
    var arrayIndex = $scope.contacts.findIndex((obj => obj.id == $scope.contactSelected.id));
    $scope.contacts[arrayIndex].isFavorite = !$scope.contacts[arrayIndex].isFavorite;
    $scope.contactSelected = $scope.contacts[arrayIndex];
    sessionStorage.setItem("contacts", JSON.stringify($scope.contacts));
    sessionStorage.setItem("contactSelected", JSON.stringify($scope.contacts[arrayIndex]));
  }

}]);
