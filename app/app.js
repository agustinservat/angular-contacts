'use strict';

angular.module('myApp', [
'ngRoute',
'myApp.contacts'
])
.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsCtrl'
        })
        .when('/contact', {
    						templateUrl: 'contacts/contact.html',
    						controller: 'ContactsCtrl'
    					});

    $routeProvider.otherwise({
        redirectTo: '/contacts'
    });

}]);
