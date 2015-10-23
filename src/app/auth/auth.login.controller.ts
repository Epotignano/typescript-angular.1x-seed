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

    email: string;
    password: string;

    constructor() {
      this.email = 'Initial email';
      this.password =  '12345';
    }

    sendCredentials () {
      console.log('Credentials sent');
    }
  }
}

angular.module('auth', [])
  .controller('LoginController', Auth.LoginController);
