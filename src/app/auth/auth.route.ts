/**
 * Created by mmasuyama on 10/21/2015.
 */

/// <reference path="../../../.tmp/typings/tsd.d.ts" />

module Auth {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/auth/auth.login.html'
          });

    }

  }
}
