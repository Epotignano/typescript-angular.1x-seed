/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../../.tmp/typings/tsd.d.ts" />


module app.services {
  'use strict';

  interface IAuthService {
    authInstance: any;
    signIn(credentials : FirebaseCredentials);
    logOut()
  }

  export class AuthService  implements  IAuthService {
    static $inject = ['dbFactory', '$firebaseAuth', '$cookies', '$state', 'authTokenService'];

    constructor(
      private dbFactory : Firebase ,
      private $firebaseAuth: AngularFireAuthService,
      private $cookies : ng.cookies.ICookiesService,
      private $state: ng.ui.IStateService,
      private authTokenService : app.services.AuthTokenService,
      private run : any,
      public authInstance : any){
        this.authInstance = this.$firebaseAuth(this.dbFactory);
    }

    signIn(credentials: FirebaseCredentials) {
      return this.authInstance.$authWithPassword(credentials)
        .then(this.run = (result) => { // <-- note syntax here
          this.$state.go('home');
          this.$cookies.put('smilemotivationz-email', result.password.email);
          this.authTokenService.setToken(result.uid)
        })
        .catch(function(err : any){
            return err;
          })
    }

    logOut() {
      this.authInstance.$unauth();
    }
  }


  interface IAuthToken {
    setToken(userId: string);
    getToken():void;
    isAuthorized():boolean;
  }

  export class AuthTokenService implements IAuthToken {

    static $inject = ['$cookies', '$firebaseAuth', 'dbFactory'];

    constructor(private $cookies : ng.cookies.ICookieStoreService,
                private $firebaseAuth : AngularFireAuthService,
                private dbFactory : Firebase,
                private authKey : string,
                private authInstance : any) {
        this.authKey = 'uid';
        this.authInstance = this.$firebaseAuth(this.dbFactory);
    }

    setToken (userId ) {
      this.$cookies.put(this.authKey, userId)
    }

    getToken() {
      return this.$cookies.get(this.authKey);
    }

    isAuthorized() {
      return !!this.authInstance.$getAuth();
    }

  }

  angular.module('smz.services')
    .service('authService', AuthService)
    .service('authTokenService', AuthTokenService)

}
