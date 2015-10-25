/**
 * Created by mmasuyama on 10/24/2015.
 */

module app.services {

  interface IUserService {
    // getCollection():any;
    get() : void;
    save(userData:any):void;
  }

  export class UserService implements IUserService {


    public collectionKey: string;
    private userData: app.domain.Course;
    private thread: Rx.Subject<{}>;
    private userCRUD: any;


    /* @ngInject */

    constructor(
      private authTokenService : app.services.AuthTokenService,
      private threadsService : app.threads.Threads ) {

      this.thread = new Rx.Subject<app.domain.User>();
      this.collectionKey = 'teachers';
      this.userCRUD  = new app.services.FirebaseCRUD(this.collectionKey);
      this.threadsService.setThread('User', this.thread)
    }

    get() {
      if(!this.userData) {
        this.userCRUD.get(this.authTokenService.getToken())
          .then((result: app.domain.User)=> this.thread.onNext({result: result}))
          .catch((error)=> this.thread.onError({error: error, type:'read'}))
      } else {
        this.thread.onNext({result: this.userData, type: 'read'})
      }
    }

    save(teacherObj) {
      this.userCRUD.save(teacherObj)
        .then((result: any)=> this.thread.onNext({result, type:'write'}))
        .catch((error)=> this.thread.onError({error, type:'write'}))
    }
  }

  angular.module('smz.services')
    .service('userService', UserService)
}
