/**
 * Created by mmasuyama on 10/24/2015.
 */

module app.services {

  interface ITeachersService {
    // getCollection():any;
    get(teacherId : string) : void;
    save(teacherData:app.domain.Teacher):void;
    remove(teacherObj : AngularFireObject) : void;

  }

  export class TeachersService implements ITeachersService {

    /* @ngInject */

    constructor(
                private collectionKey: string,
                private teacherCRUD : any,
                private authTokenService : app.services.AuthTokenService,
                private threadsService : app.threads.Threads,
                private thread: Rx.Subject<app.domain.Teacher>) {

      this.thread = new Rx.Subject<app.domain.Teacher>();
      this.collectionKey = 'teachers';
      this.teacherCRUD  = new app.services.FirebaseCRUD(this.collectionKey);
      this.threadsService.setThread('Teacher', this.thread)
    }

    /*getCollection() {
     this.firebaseCRUD.getCollection()
        .then((data) => this.thread.onNext(data))
        .catch((error) => this.thread.onError())
    }*/

    get(teacherId) {
      this.teacherCRUD.get(teacherId)
        .then((result)=> this.thread.onNext({result, type:'read'}))
        .catch((error)=> this.thread.onError({error, type:'read'}))
    }

    save(teacherObj) {
      this.teacherCRUD.save(teacherObj)
        .then((result)=> this.thread.onNext({result, type:'write'}))
        .catch((error)=> this.thread.onError({error, type:'write'}))
    }

    remove(teacherObj) {
      this.teacherCRUD.remove(teacherObj)
        .then((result)=> this.thread.onNext({result, type:'deletion'}))
        .catch((error)=> this.thread.onError({error, type:'deletion'}))
    }
  }

  angular.module('smz.services')
    .service('teachersService', TeachersService)
}
