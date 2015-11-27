/**
 * Created by mmasuyama on 10/24/2015.
 */
/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.services {

  interface ICoursesService {
    getCollection():void;
    get(courseId);
    create(courseObj);
    update(courseObj, courseId);
    remove(courseId);
  }

  export class CoursesService implements ICoursesService {
    private collectionKey: string;
    private thread: Rx.Subject<{}>;
    public filteredCollection;
    /* @ngInject */

    constructor(private FirebaseCRUDFactory : app.services.FirebaseCRUD,
                private $firebaseArray : AngularFireArrayService,
                private threadsService : app.threads.Threads) {

      this.thread = new Rx.Subject<{}>();
      this.collectionKey = 'courses';

      this.threadsService.setThread('Course', this.thread);

      this.removeProxy = () => {
        this.remove.apply(this, arguments)
      };

    }

    removeProxy: (studentId) => void;

    getCollection() {
      this.FirebaseCRUDFactory.getCollection(this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}))
        .catch((error)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents['COLLECTION_LOADED']}));
    }

    get(courseId) {
      this.FirebaseCRUDFactory.get(courseId, this.collectionKey)
        .then((data: any)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_LOAD }))
        .catch((error: any)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents.OBJECT_LOAD }));
    }

    create(courseObj) {
      this.FirebaseCRUDFactory.create(courseObj, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_CREATE}))
        .catch((error)=> this.thread.onError({error, 'EVENT': this.threadsService.defaultEvents.OBJECT_CREATE}));
    }

    update(courseObj, courseId) {
      this.FirebaseCRUDFactory.update(courseObj, courseId, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_UPDATE}));
    }

    remove(courseId) {
      this.FirebaseCRUDFactory.remove(courseId, this.collectionKey)
        .then((data)=> this.thread.onNext({data, 'EVENT': this.threadsService.defaultEvents.OBJECT_DELETE}))
        .catch((error)=> this.thread.onError({error, type:'deletion'}));
    }
  }

  angular.module('smz.services')
    .service('coursesService', CoursesService);
}
