/**
 * Created by mmasuyama on 11/5/2015.
 */

module app.components.entities {


  interface IEntityListController {
    init()
  }

  export class EntityListController {
    public thread;
    public list;
    public listElement;
    public options;

    constructor() {
      console.log(this);
      this.thread.subscribe(function(success: any){
        console.log(success.data);
      }, function(error : any){
        console.log(error);
      })
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
        thread: '=',
        list: '=',
        listElement: '=',
        options: '='
      },
      templateUrl: 'app/components/entities/list.html',
      controller: EntityListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

}

angular.module('app.components.entities', [])
  .directive('entityList', app.components.entities.entityList);
