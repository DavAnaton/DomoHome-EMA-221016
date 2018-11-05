angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('tab.favoris', {
        url: '/favoris',
        views: {
            'tab-favoris': {
                templateUrl: 'templates/tab-favoris.html',
                controller: 'FavorisCtrl'
            }
        }
    })

    .state('tab.capteursList', {
        url: '/capteursList',
        views: {
            'tab-capteursList': {
                templateUrl: 'templates/tab-capteursList.html',
                controller: 'CapteursListCtrl'
            }
        }
    })

    .state('tab.capteurDetail', {
        url: '/capteur/:capteurId',
        views: {
            'tab-capteursList': {
                templateUrl: 'templates/tab-capteurDetail.html',
                controller: 'CapteurDetailCtrl'
            }
        }
    })

    .state('tab.parametres', {
        url: '/parametres',
        views: {
            'tab-parametres': {
                templateUrl: 'templates/tab-parametres.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/favoris');

});
