/**
 * Created by mmasuyama on 11/14/2015.
 */

module app.components.entities {

  class AutocompleteController {

    /** @ngInject */ 
    constructor() {}
  }


  export function entityAutocomplete (): ng.IDirective {

    var directive = <ng.IDirective>{

      scope: {
        searchService : '=',
        selectedItem : '='
      },
      templateUrl : 'app/components/entities/autocomplete.html'
    };

    return directive;

  }
}
