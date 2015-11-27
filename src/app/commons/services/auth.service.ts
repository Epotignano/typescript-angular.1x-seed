/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../../.tmp/typings/tsd.d.ts" />


module app.services {
  import ApplicationConstants = smileMotivationz.ApplicationConstants;
  'use strict';

  interface IAuthService {
    authInstance: any;
    signIn(credentials : FirebaseCredentials);
    logOut()
  }

  export class AuthService  implements  IAuthService {
    static $inject = ['dbFactory', '$firebaseAuth', '$cookies', '$state', 'authTokenService'];
    
    // private dbFactory;
    // private $firebaseAuth;
    // private $cookies;
    // private $state;
    // private authTokenService;
    private run;
    // public authInstance;

    /** @ngInject */ 
    constructor(
      private dbFactory : Firebase ,
      private $firebaseAuth: AngularFireAuthService,
      private $cookies : ng.cookies.ICookiesService,
      private $state: ng.ui.IStateService,
      private authTokenService : app.services.AuthTokenService,
      public authInstance : any){

      this.authInstance = $firebaseAuth(dbFactory);
    
    }

    signIn(credentials: FirebaseCredentials) {
      return this.authInstance.$authWithPassword(credentials)
        .then(this.run = (result) => { // <-- note syntax here
          this.$state.go('app.dashboard');
          this.$cookies.put('smilemotivationz-email', result.password.email);
          this.authTokenService.setToken(result.uid);
        })
        .catch(function(err : any){
          return err;
        });
    }

    logOut() {
      this.authInstance.$unauth();
      this.authTokenService.removeToken();
      this.$cookies.remove('smilemotivationz-email');
      this.$state.go(ApplicationConstants.loginState.name);
    }
  }


  interface IAuthToken {
    setToken(userId: string);
    getToken():void;
    isAuthorized():boolean;
  }

  export class AuthTokenService implements IAuthToken {

    static $inject = ['$cookies', '$firebaseAuth', 'dbFactory'];

    // private $cookies;
    // private $firebaseAuth;
    // private dbFactory;
    // private authKey;
    // private authInstance;

    /** @ngInject */ 
    constructor(private $cookies : ng.cookies.ICookieStoreService,
                private $firebaseAuth : AngularFireAuthService,
                private dbFactory : Firebase,
                private authKey : string,
                private authInstance : any) {
      this.authKey = 'uid';
      this.authInstance = $firebaseAuth(dbFactory);
    }

    setToken (userId ) {
      this.$cookies.put(this.authKey, userId);
    }

    getUserEmail() {
      return this.$cookies.get('smilemotivationz-email');
    }

    getToken() {
      return this.$cookies.get(this.authKey);
    }

    removeToken() {
      this.$cookies.remove(this.authKey);
    }

    isAuthorized() {
      return !!this.authInstance.$getAuth();
    }

  }

    angular.module('smz.services')
    .service('authService', AuthService)
    .service('authTokenService', AuthTokenService);
}
