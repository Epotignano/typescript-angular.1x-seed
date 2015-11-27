/**
 * Created by mmasuyama on 11/5/2015.
 */

module app.components.entities {


  interface IFilterListController{}

  export class FilterListController implements  IFilterListController{
    public list;
    public options;

    /** @ngInject */ 
    constructor() {}
  }

  /** @ngInject */
  export function listFilter():ng.IDirective {

    var directive = <ng.IDirective> {
      restrict: 'E',
      scope: {
        list: '=',
        options: '='
      },
      templateUrl: 'app/components/entities/list.html',
      controller: FilterListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

}

angular.module('app.components.entities', [])
  .directive('listFilter', app.components.entities.listFilter);
