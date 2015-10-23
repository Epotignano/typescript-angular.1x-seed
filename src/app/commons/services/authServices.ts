/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../../.tmp/typings/tsd.d.ts" />
module app.services {

    interface IAuthService {

      sendCredentials(credentials : FirebaseCredentials)

    }

    export class AuthService  implements  IAuthService {

      static $inject = ['firebase'];

      constructor() {
        console.log('Constructor');
      }

      sendCredentials(credentials: FirebaseCredentials) {
        console.log('Service is something here');

      }
    }

}
