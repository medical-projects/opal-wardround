//
// Main OPAL Ward round pkugin application!
//
var services = OPAL.module('opal.wardround.services', []);

var controllers = OPAL.module('opal.wardround.controllers', [
    'opal.services',
    'opal.wardround.services'
]);

var app = OPAL.module('opal.wardround', [
    'ngRoute',
    'ngProgressLite',
    'opal.filters',
    'opal.services',
    'opal.directives',
    'opal.controllers',
    'opal.wardround.controllers'
]);

app.run(['$rootScope', 'ngProgressLite', function($rootScope, ngProgressLite) {
    // When route started to change.
    $rootScope.$on('$routeChangeStart', function() {
        ngProgressLite.set(0);
        ngProgressLite.start();
    });

    // When route successfully changed.
    $rootScope.$on('$routeChangeSuccess', function() {
        ngProgressLite.done();
    });

    // When some error occured.
    $rootScope.$on('$routeChangeError', function() {
        ngProgressLite.set(0);
    });
}]);

app.config(function($routeProvider){
    $routeProvider.when('/', {redirectTo: '/list'})
        .when('/list', {
            controller: 'WardRoundListCtrl',
            resolve: {},
            templateUrl: '/wardround/templates/list.html'
        })
        .when('/:wardround', {
            controller: 'WardRoundCtrl',
            resolve: {
                ward_round: function(wardRoundLoader){ return wardRoundLoader() } 
            },
            templateUrl: '/wardround/templates/detail.html'
        })
})
