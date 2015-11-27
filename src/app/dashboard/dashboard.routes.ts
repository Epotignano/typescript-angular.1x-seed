/**
 * Created by mmasuyama on 11/5/2015.
 */


module app.modules.dashboard {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider) {
      $stateProvider
        .state('app.dashboard', {
          url: '/dashboard',
          views : {
            'content': {
              templateUrl: 'app/dashboard/dashboard.html'
            }
          }
        });

    }

  }
}

angular.module('dashboard')
  .config(app.modules.dashboard.RouterConfig);
