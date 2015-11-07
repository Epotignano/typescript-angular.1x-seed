/**
 * Created by mmasuyama on 11/5/2015.
 */

module app.components.entities {


  interface IEntityListController {
    columnIsSortable(entity)
  }

  export class EntityListController implements IEntityListController{
    public thread;
    public list;
    public entityConf;
    public options;


    columnIsSortable(entity) {
      return (entity.sort) ? entity.key : ''
    }
  }

  export class ConditionalSortController {

    constructor($element, $attrs, $compile) {
      var scope = $element.scope();
      var entity = scope.$eval($attrs.conditionalSort);
      if(entity.sort) {
        $element.attr('st-sort', entity.key);
      }
    }

  }

  /** @ngInject */
  export function entityList():ng.IDirective {

    var directive = <ng.IDirective> {
      restrict: 'E',
      scope: {
        thread: '=',
        list: '=',
        entityConf: '=',
        options: '='
      },
      templateUrl: 'app/components/entities/entities.list.html',
      controller: EntityListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  /** @ngInject */
  export function conditionalSort():ng.IDirective {

    var directive = <ng.IDirective> {
      restrict: 'A',
      controller: ConditionalSortController,
      link: {
        pre: angular.noop,
        post: function($element, $compile){
          $compile($element[0]);
        }
      },
      controllerAs: 'condSortVm',
      bindToController: true,
    };

    return directive;
  }

}
