/**
 * Created by mmasuyama on 10/24/2015.
 */
/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.services {

  interface IStudentsService {
    getCollection():void;
    get(studentId);
    create(studentObj);
    update(studentObj, studentId);
    remove(studentId);
  }

  export class StudentsService implements IStudentsService {
    private collectionKey: string;
    private thread: Rx.Subject<{}>;
    public filteredCollection;
    /* @ngInject */

    constructor(private FirebaseCRUDFactory : app.services.FirebaseCRUD,
                private $firebaseArray : AngularFireArrayService,
                private threadsService : app.threads.Threads) {

      this.thread = new Rx.Subject<{}>();
      this.collectionKey = 'users/students';

      this.threadsService.setThread('Student', this.thread)
    }

    getCollection() {
      this.FirebaseCRUDFactory.getCollection(this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
        .catch((error)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
    }

    get(studentId) {
      this.FirebaseCRUDFactory.get(studentId, this.collectionKey)
        .then((data: any)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_LOAD }))
        .catch((error: any)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents.OBJECT_LOAD }))
    }

    create(studentObj) {
      this.FirebaseCRUDFactory.create(studentObj, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_CREATE}))
        .catch((error)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents.OBJECT_CREATE}))
    }

    update(studentObj, studentId) {
      this.FirebaseCRUDFactory.update(studentObj, studentId, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_UPDATE}))
    }

    remove(studentId) {
      this.FirebaseCRUDFactory.remove(studentId, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_DELETE}))
        .catch((error)=> this.thread.onError({error, type:'deletion'}))
    }
  }

  angular.module('smz.services')
    .service('studentsService', StudentsService)
}
