/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="courseService.ts" />

module app.services {
  angular.module('smz.services', ['firebase' , 'ngCookies'])
    .factory('dbFactory', app.services.factory);
}
