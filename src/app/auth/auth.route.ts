/**
 * Created by mmasuyama on 10/21/2015.
 */

/// <reference path="../../../.tmp/typings/tsd.d.ts" />

module Auth {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $translatePartialLoaderProvider) {

      $stateProvider.state('access', {
        abstract : true,
        url: '/access',
        views: {
          'main@'                       : {
            templateUrl: 'app/core/layouts/basic.html'
          }
        }
      });


      $stateProvider.state('access.pages_auth_login', {
        url  : '/login',
        views: {
          'content': {
            templateUrl: 'app/auth/auth.login.html'
          }
        }
      });

      $translatePartialLoaderProvider.addPart('app/auth/');

    }

  }
}
