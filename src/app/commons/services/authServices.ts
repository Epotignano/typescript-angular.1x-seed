/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.services {
  'use strict';

  interface IAuthService {
    authInstance: any;
    signIn(credentials : FirebaseCredentials);
    signUp(userData : app.domain.User);
  }

  export class AuthService  implements  IAuthService {
    static $inject = ['dbFactory', '$firebaseAuth', '$cookieStore'];

    constructor(
      private dbFactory : Firebase ,
      private $firebaseAuth: AngularFireAuthService,
      private $cookieStore : ng.cookies.ICookieStoreService,
      public authInstance : any)
    {
      this.authInstance = this.$firebaseAuth(this.dbFactory);
    }

    signIn(credentials: FirebaseCredentials) {
      return this.authInstance.$authWithPassword(credentials)
        .then(function(result: any){
          //TODO Delegate and login;
          return {result};

        })
      .catch(function(err : any){
          return err;
        })
    }

    signUp () {

    }
  }



  //TODO esto no deberia estar aca

  angular.module('smz.services')
    .service('authService', AuthService)

}
