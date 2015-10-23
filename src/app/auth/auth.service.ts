/**
 * Created by mmasuyama on 10/23/2015.
 */

module Auth {
  'use strict';

  interface IAuthService {
    sendCredentials(credentials : FirebaseCredentials);
  }

  export class AuthService  implements  IAuthService {

   sendCredentials(credentials: FirebaseCredentials) {
      console.log('Service is something here');
    }
  }

}

angular.module('auth')
  .service('authService', Auth.AuthService);
