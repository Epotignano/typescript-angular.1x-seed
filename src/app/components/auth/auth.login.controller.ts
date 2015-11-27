/**
 * Created by mmasuyama on 10/22/2015.
 */



module app.components.auth {

  'use strict';

  interface ILogin {

    email: string;
    password: string;
    error: string;
    signIn() : void;
  }

  export class LoginController implements ILogin {
    public email: string;
    public error: string;
    public password: string;

    static $inject = ['authService', '$translate'];
    /** @ngInject */
    constructor(private authService: app.services.AuthService, private $translate
    ) {}

    signIn () {
      this.authService.signIn({email: this.email, password: this.password})
        .then((err) => {
          if(err.code){
            this.error = this.$translate.instant(err.code);
          }
        });
    }
  }
}

angular.module('smz.components.auth', [])
  .controller('LoginController', app.components.auth.LoginController);
