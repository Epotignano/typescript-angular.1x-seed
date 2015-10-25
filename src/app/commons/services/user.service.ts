/**
 * Created by mmasuyama on 10/24/2015.
 */

module app.services {

  interface IUserService {
    // getCollection():any;
    get() : void;
    save(userData:app.domain.User):void;
  }

  export class UserService implements IUserService {

    /* @ngInject */

    constructor(
      private collectionKey: string,
      private userCRUD: any,
      private userData: app.domain.Course,
      private authTokenService : app.services.AuthTokenService,
      private threadsService : app.threads.Threads,
      private thread: Rx.Subject<app.domain.User>) {

      this.thread = new Rx.Subject<app.domain.User>();
      this.collectionKey = 'teachers';
      this.userCRUD  = new app.services.FirebaseCRUD(this.collectionKey);
      this.threadsService.setThread('User', this.thread)
    }

    get() {
      if(!this.userData) {
        this.userCRUD.get(this.authTokenService.getToken())
          .then((result)=> this.thread.onNext({result, type:'read'}))
          .catch((error)=> this.thread.onError({error, type:'read'}))
      } else {
        this.thread.onNext({result: this.userData, type: 'read'})
      }
    }

    save(teacherObj) {
      this.userCRUD.save(teacherObj)
        .then((result)=> this.thread.onNext({result, type:'write'}))
        .catch((error)=> this.thread.onError({error, type:'write'}))
    }
  }

  angular.module('smz.services')
    .service('userService', UserService)
}
