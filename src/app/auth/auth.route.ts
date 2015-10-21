/**
 * Created by mmasuyama on 10/21/2015.
 */



module Auth {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/auth/auth.login.html',
          controller: function() {
            console.log('Here');

            console.log(this);
          },
          controllerAs: 'login'
        });

    }

  }
}
