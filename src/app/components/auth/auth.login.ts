/**
 * Created by mmasuyama on 10/21/2015.
 */

module smzUiAuth {
  'use strict';

  /** @ngInject */
  export function smzLogin():ng.IDirective {

    var directive = <ng.IDirective> {
      restrict: 'E',
      scope: {},
      templateUrl: 'app/components/auth/auth.login.html',
      controller: 'LoginController',
      controllerAs: 'login',
      bindToController: true
    };

    return directive;
  }
}
