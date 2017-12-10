'use strict';

angular.module('myApp.contacts', ['ngRoute', 'angular.filter'])

.controller('ContactsCtrl', ['$scope', '$http', '$location', '$rootScope', '$window',function($scope, $http, $location, $rootScope, $window) {
  ($rootScope.contacts) ? $rootScope.contacts :  $rootScope.contacts = null;
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
  var contactSelected = JSON.parse(sessionStorage.getItem("contactSelected"));
  if($rootScope.contactSelected == null || typeof $rootScope.contactSelected === 'undefined'){
    $rootScope.contactSelected = contactSelected;
  }
  var contacts = JSON.parse(sessionStorage.getItem("contacts"));
  if($rootScope.contacts == null || typeof $rootScope.contacts === 'undefined'){
    $rootScope.contacts = contacts;
  }

  angular.element(document).ready(function () {
    $window.scrollTo(0, 0);
    if($rootScope.contacts == null){
      $http.get($scope.url)
                    .success(function(data) {
                        $rootScope.contacts = data;
                        sessionStorage.setItem("contacts", JSON.stringify(data));
                    })
                    .error(function(data) {
                        alert(data);
                        console.log('Error: ' + data);
                    });
      }

  });

  $scope.itemSelected = function(item){

    sessionStorage.setItem("contactSelected", JSON.stringify(item));
    $rootScope.contactSelected = item;
    $location.path('/contact');
  }

  $scope.updateItem = function(){
    var arrayIndex = $rootScope.contacts.findIndex((obj => obj.id == $rootScope.contactSelected.id));
    $rootScope.contacts[arrayIndex].isFavorite = !$rootScope.contacts[arrayIndex].isFavorite;
    $rootScope.contactSelected = $rootScope.contacts[arrayIndex];
    sessionStorage.setItem("contacts", JSON.stringify($rootScope.contacts));
    sessionStorage.setItem("contactSelected", JSON.stringify($rootScope.contacts[arrayIndex]));
  }

}]);
