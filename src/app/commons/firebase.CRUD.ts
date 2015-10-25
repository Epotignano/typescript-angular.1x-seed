/**
 * Created by mmasuyama on 10/24/2015.
 */


module app.services {
  interface IFirebaseCRUD {
    getCollection() : any;
    get(objectId: string): ng.IPromise<AngularFireObject>;
    save(objectToSave: AngularFireObject|any): ng.IPromise<Firebase>;
    remove(objectToRemove: AngularFireObject) : ng.IPromise<Firebase>;
  }

  export class FirebaseCRUD implements IFirebaseCRUD {

    static $inject = ['$firebaseObject', '$firebaseArray', 'dbFactory'];

    private $firebaseObject : AngularFireObjectService;
    private $firebaseArray : AngularFireArrayService;
    private dbFactory : Firebase;
    private collectionKey : string;

    constructor(param) {
      this.collectionKey = param;
    }

    getCollection() {
      return this.$firebaseArray(this.dbFactory.child(this.collectionKey)).$loaded();
    }

    get(objectId: string) : ng.IPromise<AngularFireObject> {
      return this.$firebaseObject(this.dbFactory.child(this.collectionKey).child(objectId)).$loaded()
    }

    save(objectToSave) : ng.IPromise<Firebase> {
      if(objectToSave.$save) return objectToSave.$save();
      return this.$firebaseArray(this.dbFactory.child(this.collectionKey)).$add(objectToSave)
    }

    remove(objectToRemove: AngularFireObject) : ng.IPromise<Firebase> {
      return objectToRemove.$remove()
    }

  }

}


