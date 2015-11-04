/**
 * Created by mmasuyama on 10/22/2015.
 */

module app.services {
  angular.module('smz.services', ['firebase', 'ngCookies'])
    .factory('dbFactory', app.services.factory);
}
