/**
 * Created by mmasuyama on 10/24/2015.
 */


module app.services {
  interface IFirebaseCRUD {
    getCollection(collectionKey:string) : ng.IPromise<AngularFireArray>;
    get(objectId: string,collectionKey : string): ng.IPromise<AngularFireObject>;
    save(objectToSave: AngularFireObject|any, collectionKey:string): ng.IPromise<Firebase>;
    remove(objectToRemove: AngularFireObject) : ng.IPromise<Firebase>;
  }

  export class FirebaseCRUD implements IFirebaseCRUD {


    constructor(private $firebaseObject : AngularFireObjectService,
                private $firebaseArray : AngularFireArrayService,
                private dbFactory : Firebase) {
    }


    getCollection(collectionKey): ng.IPromise<AngularFireArray> {
      return this.$firebaseArray(this.dbFactory.child(collectionKey)).$loaded()
    }

    get(objectId: string, collectionKey:string) : ng.IPromise<AngularFireObject> {
      return this.$firebaseObject(this.dbFactory.child(collectionKey).child(objectId)).$loaded()
    }

    save(objectToSave, collectionKey) : ng.IPromise<Firebase> {
      if(objectToSave.$save) {
        return objectToSave.$save()
      }
      return this.$firebaseArray(this.dbFactory.child(collectionKey)).$add(objectToSave)
    }

    remove(objectToRemove: AngularFireObject) : ng.IPromise<Firebase> {
      return objectToRemove.$remove()
    }
  }

  FirebaseCRUDFactory.$inject = ['$firebaseObject', '$firebaseArray', 'dbFactory'];

  export function FirebaseCRUDFactory(
    $firebaseObject : AngularFireObjectService,
    $firebaseArray : AngularFireArrayService,
    dbFactory : Firebase) : FirebaseCRUD {
    return new FirebaseCRUD($firebaseObject, $firebaseArray, dbFactory)
  }

  angular.module('smz.services')
    .factory('FirebaseCRUDFactory', FirebaseCRUDFactory)


}


