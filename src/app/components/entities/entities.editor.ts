/**
 * Created by mmasuyama on 11/5/2015.
 */

module app.components.entities {

  interface IEntityEditorController {}


  export class EntityEditorController implements IEntityEditorController {

    /** @ngInject */ 
    constructor(){}

  }

  /** @ngInject */
  export function entityEditor():ng.IDirective {

    var directive = <ng.IDirective> {
      restrict: 'E',
      scope: {
        onSubmit: '=',
        onCancel: '=',
        formFields : '=',
        entity: '='
      },
      templateUrl: 'app/components/entities/entities.editor.html',
      controller: EntityEditorController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }


}




