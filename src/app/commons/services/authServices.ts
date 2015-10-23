/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.services {
  'use strict';

  interface IAuthService {
    authInstance: any;
    sendCredentials(credentials : FirebaseCredentials);
  }

  export class AuthService  implements  IAuthService {
    static $inject = ['dbFactory', '$firebaseAuth'];

    constructor(private dbFactory : Firebase , private $firebaseAuth: AngularFireAuthService, public authInstance : any) {
      this.authInstance = this.$firebaseAuth(this.dbFactory);
    }

    sendCredentials(credentials: FirebaseCredentials) {
      return this.authInstance.$authWithPassword(credentials)
        .then(function(result){
          //TODO Delegate and login;
          return {result};

        })

        .catch(function(err){
          return err;
        })
    }
  }

  //TODO esto no deberia estar aca

  angular.module('smz.services')
    .service('authService', AuthService)

}
