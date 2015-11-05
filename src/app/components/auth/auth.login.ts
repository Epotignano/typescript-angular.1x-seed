/**
 * Created by mmasuyama on 10/21/2015.
 */

module app.components.auth {
  'use strict';

  /** @ngInject */
  export function smzLogin():ng.IDirective {

    var directive = <ng.IDirective> {
      restrict: 'E',
      scope: {},
      templateUrl: 'app/components/auth/auth.login.html',
      controller: 'LoginController',
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
}
