/**
 * Created by mmasuyama on 10/24/2015.
 */

module app.services {

  export interface IFirebaseCRUD {
    getCollection(collectionKey:string) : ng.IPromise<AngularFireArray>;
    get(objectId: string,collectionKey : string);
    create(objectData, collectionKey);
    update(updateData, updateId, collectionKey);
    remove(removeId, collectionKey);
  }

  export class FirebaseCRUD implements IFirebaseCRUD {

    /** @ngInject */ 
    constructor(private $q : ng.IQService ,
                private $firebaseArray : AngularFireArrayService,
                private dbFactory : Firebase) {
    }

    getCollection(collectionKey): ng.IPromise<AngularFireArray> {
      return this.$firebaseArray(this.dbFactory.child(collectionKey)).$loaded();
    }

    get(objectId: string, collectionKey:string) :any {
      var Promise = this.$q.defer();
      this.dbFactory.child(collectionKey).child(objectId)
        .on('value', function(snapshot){
          Promise.resolve(snapshot.val());
        });
      return Promise.promise;
    }

    create(objectToSave, collectionKey) {
      return this.$firebaseArray(this.dbFactory.child(collectionKey)).$add(objectToSave);
    }

    update(updateData, updateId, collectionKey) {
      var Promise = this.$q.defer();
      this.dbFactory.child(collectionKey).child(updateId).update(updateData, function(result){
        Promise.resolve(result);
      });
      return Promise.promise;

    }

    remove(removeId, collectionKey) {
      var Promise = this.$q.defer();
      this.dbFactory.child(collectionKey).child(removeId).remove(function(result){
        Promise.resolve(result);
      });
      return Promise.promise;

    }
  }

  FirebaseCRUDFactory.$inject = ['$q', '$firebaseArray', 'dbFactory'];

  export function FirebaseCRUDFactory(
    $q : ng.IQService,
    $firebaseArray : AngularFireArrayService,
    dbFactory : Firebase) : FirebaseCRUD {
    return new FirebaseCRUD($q, $firebaseArray, dbFactory);
  }

  angular.module('smz.services')
    .factory('FirebaseCRUDFactory', FirebaseCRUDFactory);


}