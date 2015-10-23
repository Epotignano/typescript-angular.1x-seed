/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../.tmp/typings/tsd.d.ts" />

module Auth {

  'use strict';

  interface ILogin {

    email: string;
    password: string;
    sendCredentials() : void;

  }

  export class LoginController implements ILogin {
    static $inject = ['authService'];
    email: string;
    password: string;

    constructor(private authService : Auth.AuthService) {
      this.email = 'Initial email';
      this.password =  '12345';
    }

    sendCredentials () {
      this.authService.sendCredentials({email: this.email, password: this.password});

      console.log('Credentials sent');
    }
  }
}

angular.module('auth', [])
  .controller('LoginController', Auth.LoginController);
