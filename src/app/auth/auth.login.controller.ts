/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../.tmp/typings/tsd.d.ts" />

module Auth {

  'use strict';

  interface ILogin {

    email: string;
    password: string;
    err: any;
    sendCredentials() : void;

  }

  export class LoginController implements ILogin {
    static $inject = ['authService'];
    email: string;
    password: string;
    err: any;

    constructor(private authService: app.services.AuthService) {
      this.email = 'Initial email';
      this.password =  '12345';
    }

    sendCredentials () {
      this.authService.signIn({email: this.email, password: this.password})
        .then((err) => this.err = err)
    }
  }
}

angular.module('auth', [])
  .controller('LoginController', Auth.LoginController);
