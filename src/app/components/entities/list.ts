/**
 * Created by mmasuyama on 11/5/2015.
 */

module app.components.entities {


  interface IEntityListController {
    init()
  }

  export class EntityListController {

    public entityService;
    constructor() {

    }


    init() {
      //this.entityService
    }

  }

  /** @ngInject */
  export function entityList():ng.IDirective {

    var directive = <ng.IDirective> {
      restrict: 'E',
      scope: {
        entityService: '='
      },
      templateUrl: 'app/components/entities/list.html',
      controller: EntityListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }






}
