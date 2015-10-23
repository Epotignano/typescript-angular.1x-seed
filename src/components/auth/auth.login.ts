/**
 * Created by mmasuyama on 10/21/2015.
 */

  /// <reference path="../../../.tmp/typings/tsd.d.ts" />
  /// <reference path="../../../src/domain/user.ts" />

module smzUiAuth {
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
