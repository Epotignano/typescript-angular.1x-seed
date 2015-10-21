/**
 * Created by mmasuyama on 10/21/2015.
 */

  /// <reference path="../../../.tmp/typings/tsd.d.ts" />
  /// <reference path="../../../src/smz.typings/entities/user.ts" />

module smzUiAuth {
  'use strict';

  /** @ngInject */
  export function smzLogin(): ng.IDirective {

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'src/components/auth/auth.login.html',
      controller: LoginCtrl,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  interface ILogin {
    simpleLogin: any;
  }

  /** @ngInject */
  class LoginCtrl implements ILogin {

    public user : User;
    public AuthService : AngularFireAuth;

    simpleLogin () {
      this.AuthService.$authWithPassword({email: this.user.email, password: this.user.password})
      .then(function(result){
          console.log(result);
        })
      ;
    }
  }
}
