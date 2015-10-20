module smileMotivationz {
  'use strict';

  /** @ngInject */
  export function acmeNavbar(): ng.IDirective {

    return {
      restrict: 'E',
      scope: {
        creationDate: '='
      },
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

  }

  /** @ngInject */
  class NavbarController {
    public relativeDate: string;

    constructor(moment: moment.MomentStatic) {
      this.relativeDate = moment(1445312385143).fromNow();
    }
  }
}
