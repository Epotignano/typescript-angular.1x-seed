/**
 * Created by mmasuyama on 10/22/2015.
 */



module app.components.auth {

  'use strict';

  interface ILogin {

    email: string;
    password: string;
    err: any;
    signIn() : void;
  }

  export class LoginController implements ILogin {
    static $inject = ['authService'];
    email: string;
    password: string;

    constructor(private authService: app.services.AuthService, public err: any) {}

    signIn () {
      this.authService.signIn({email: this.email, password: this.password})
        .then((err) => this.err = err)
    }
  }
}

angular.module('smz.components.auth', [])
  .controller('LoginController', app.components.auth.LoginController);
