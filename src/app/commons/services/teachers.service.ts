/**
 * Created by mmasuyama on 10/24/2015.
 */
/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.services {

  interface ITeachersService {
    getCollection(initConf:any):void;
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
      this.FirebaseCRUDFactory.setInstance('users/teachers');
      this.threadsService.setThread('Teacher', this.thread)
    }

    getCollection() {
     this.FirebaseCRUDFactory.getCollection()
       .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
       .catch((error)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
    }

    get(teacherId) {
      this.FirebaseCRUDFactory.get(teacherId)
        .then((data: any)=> this.thread.onNext({data, type:'read'}))
        .catch((error: any)=> this.thread.onError({error, type:'read'}))
    }

    save(teacherObj) {

      this.FirebaseCRUDFactory.save(teacherObj)
        .then((data)=> this.thread.onNext({data, type:'write'}))
        .catch((error)=> this.thread.onError({error, type:'write'}))
    }

    remove(teacherObj) {
      this.FirebaseCRUDFactory.remove(teacherObj)
        .then((data)=> this.thread.onNext({data, type:'deletion'}))
        .catch((error)=> this.thread.onError({error, type:'deletion'}))
    }
  }

  angular.module('smz.services')
    .service('teachersService', TeachersService)
}
