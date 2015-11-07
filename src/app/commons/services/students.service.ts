/**
 * Created by mmasuyama on 10/24/2015.
 */
/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.services {

  interface IStudentsService {
    getCollection():void;
    get(teacherId : string) : any;
    save(teacherData:any):any;
    remove(teacherObj : any) : any;

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

    // particular implementation for this service only

    getCollection() {
      this.FirebaseCRUDFactory.getCollection(this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
        .catch((error)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
    }

    get(studentId) {
      this.FirebaseCRUDFactory.get(studentId, this.collectionKey)
        .then((data: any)=> this.thread.onNext({data, type:'read'}))
        .catch((error: any)=> this.thread.onError({error, type:'read'}))
    }

    save(studentObj) {
      this.FirebaseCRUDFactory.save(studentObj, this.collectionKey)
        .then((data)=> this.thread.onNext({data, type:'write'}))
        .catch((error)=> this.thread.onError({error, type:'write'}))
    }

    remove(studentObj) {
      this.FirebaseCRUDFactory.remove(studentObj)
        .then((data)=> this.thread.onNext({data, type:'deletion'}))
        .catch((error)=> this.thread.onError({error, type:'deletion'}))
    }
  }

  angular.module('smz.services')
    .service('studentsService', StudentsService)
}
