/**
 * Created by mmasuyama on 10/21/2015.
 */

/// <reference path="../../../.tmp/typings/tsd.d.ts" />

module Auth {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $translatePartialLoaderProvider) {
      $stateProvider.state('app.pages_auth_login', {
        url  : 'login',
        views: {
          'main@'                       : {
            templateUrl: 'app/core/layouts/basic.html'
          },
          'content@app.pages_auth_login': {
            templateUrl: 'app/auth/auth.login.html'
          }
        }
      });

      $translatePartialLoaderProvider.addPart('app/auth/');

    }

  }
}
