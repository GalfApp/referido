'use strict';

/**
 * @ngdoc overview
 * @name rApp
 * @description
 * # rApp
 *
 * Main module of the application.
 */
angular
  .module('rApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ezfb'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/:idReferido', {
        templateUrl: 'views/referido.html',
        controller: 'ReferidoCtrl',
        controllerAs: 'referido'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).config(function (ezfbProvider) {
  /**
   * Basic setup
   *
   * https://github.com/pc035860/angular-easyfb#configuration
   */
  ezfbProvider.setInitParams({
    appId: '1533109903669910'
  });  
});
