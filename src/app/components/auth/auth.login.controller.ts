/**
 * Created by mmasuyama on 10/22/2015.
 */



module SmzAuth {

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

    constructor(private authService: app.services.AuthService, public err: any) {
      this.email = 'Initial email';
      this.password =  '12345';
    }

    signIn () {
      this.authService.signIn({email: this.email, password: this.password})
        .then((err) => this.err = err)
    }
  }
}

angular.module('smz.ui.auth', [])
  .controller('LoginController', SmzAuth.LoginController);
