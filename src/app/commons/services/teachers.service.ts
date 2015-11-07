/**
 * Created by mmasuyama on 10/24/2015.
 */
/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.services {

  interface ITeachersService {
    getCollection():void;
    get(teacherId);
    create(teacherObj);
    update(teacherObj, teacherId);
    remove(teacherId);
  }

  export class TeachersService implements ITeachersService {
    private collectionKey: string;
    private thread: Rx.Subject<{}>;
    /* @ngInject */

    constructor(private FirebaseCRUDFactory : app.services.FirebaseCRUD,
                private threadsService : app.threads.Threads) {

      this.thread = new Rx.Subject<{}>();
      this.collectionKey = 'users/teachers';

      this.threadsService.setThread('Teacher', this.thread)
    }

    getCollection() {
      this.FirebaseCRUDFactory.getCollection(this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
        .catch((error)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
    }

    get(teacherId) {
      this.FirebaseCRUDFactory.get(teacherId, this.collectionKey)
        .then((data: any)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_LOAD }))
        .catch((error: any)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents.OBJECT_LOAD }))
    }

    create(teacherObj) {
      this.FirebaseCRUDFactory.create(teacherObj, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_CREATE}))
        .catch((error)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents.OBJECT_CREATE}))
    }

    update(teacherObj, teacherId) {
      this.FirebaseCRUDFactory.update(teacherObj, teacherId, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_UPDATE}))
    }

    remove(teacherId) {
      this.FirebaseCRUDFactory.remove(teacherId, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_DELETE}))
        .catch((error)=> this.thread.onError({error, type:'deletion'}))
    }
  }

  angular.module('smz.services')
    .service('teachersService', TeachersService)
}
