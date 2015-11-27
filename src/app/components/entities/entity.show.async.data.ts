/**
 * Created by mmasuyama on 11/20/2015.
 */


module app.components.entities {

  // Firebase Version
  class EntityAsyncController {
    public id;
    public key;
    public data;
    public error;

    /** @ngInject */ 
    constructor(private FirebaseCRUDFactory : app.services.FirebaseCRUD) {
        this.FirebaseCRUDFactory.get(this.id, this.key)
          .then((data) => {
            this.data = data;
          })
          .catch((error) => {
            this.error = error;
          });
    }
  }

  /** @ngInject */
  export function entityAsync():ng.IDirective {
    var directive = <ng.IDirective> {
      restrict: 'A',
      scope: {
        id : '=entityId',
        key : '=entityKey',
        data: '=entityData'
      },
      controller: EntityAsyncController ,
      controllerAs: 'entityVm',
      bindToController: true
    };
    return directive;
  }

  angular.module('smz.components.entities')
    .directive('entityAsync', entityAsync);

}


