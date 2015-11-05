/**
 * Created by mmasuyama on 10/24/2015.
 */
/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.services {

  interface ITeachersService {
    getCollection():void;
    get(teacherId : string) : any;
    save(teacherData:any):any;
    remove(teacherObj : any) : any;

  }

  export class TeachersService implements ITeachersService {
    private collectionKey: string;
    private thread: Rx.Subject<{}>;
    /* @ngInject */

    constructor(private FirebaseCRUDFactory : app.services.FirebaseCRUD,
                private threadsService : app.threads.Threads) {

      this.thread = new Rx.Subject<{}>();
      this.collectionKey = 'teachers';
      FirebaseCRUDFactory.setInstance(this.collectionKey);
      this.threadsService.setThread('Teacher', this.thread)
    }

    getCollection() {
     this.FirebaseCRUDFactory.getCollection()
       .then((result)=> this.thread.onNext({result, type:'read'}))
       .catch((error)=> this.thread.onError({error, type:'read'}))
    }

    get(teacherId) {
      this.FirebaseCRUDFactory.get(teacherId)
        .then((result: any)=> this.thread.onNext({result, type:'read'}))
        .catch((error: any)=> this.thread.onError({error, type:'read'}))
    }

    save(teacherObj) {
      this.FirebaseCRUDFactory.save(teacherObj)
        .then((result)=> this.thread.onNext({result, type:'write'}))
        .catch((error)=> this.thread.onError({error, type:'write'}))
    }

    remove(teacherObj) {
      this.FirebaseCRUDFactory.remove(teacherObj)
        .then((result)=> this.thread.onNext({result, type:'deletion'}))
        .catch((error)=> this.thread.onError({error, type:'deletion'}))
    }
  }

  angular.module('smz.services')
    .service('teachersService', TeachersService)
}
