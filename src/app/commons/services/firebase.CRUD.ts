/**
 * Created by mmasuyama on 10/24/2015.
 */


module app.services {
  interface IFirebaseCRUD {
    setInstance(collectionKey:string, query:any);
    getCollection() : ng.IPromise<AngularFireArray>;
    get(objectId: string): ng.IPromise<AngularFireObject>;
    save(objectToSave: AngularFireObject|any): ng.IPromise<Firebase>;
    remove(objectToRemove: AngularFireObject) : ng.IPromise<Firebase>;
  }

  export class FirebaseCRUD implements IFirebaseCRUD {
    private BaseRef : any;

    constructor(private $firebaseObject : AngularFireObjectService,
                private $firebaseArray : AngularFireArrayService,
                private dbFactory : Firebase) {
    }

    setInstance(collectionKey) {
      this.BaseRef = this.dbFactory.child(collectionKey);
    }

    getInstance (): Firebase {
      return this.BaseRef;
    }

    getCollection(): ng.IPromise<AngularFireArray> {
      return this.$firebaseArray(this.BaseRef).$loaded()
    }

    get(objectId: string) : ng.IPromise<AngularFireObject> {
      return this.$firebaseObject(this.BaseRef.child(objectId)).$loaded()
    }

    save(objectToSave) : ng.IPromise<Firebase> {
      if(objectToSave.$save) {
        return objectToSave.$save()
      }
      return this.$firebaseArray(this.BaseRef).$add(objectToSave)
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


