module smileMotivationz {
  'use strict';

  export class RunBlock {

    static $inject = ['$log', '$rootScope', 'authTokenService', '$state'];

    constructor($log: ng.ILogService, $rootScope : ng.IRootScopeService, authTokenService : app.services.AuthTokenService, $state: ng.ui.IStateService) {
      $log.debug('runBlock end');


      $rootScope.$on('$stateChangeStart',	function(event, toState){

        var isAuthorized = authTokenService.isAuthorized();

        if(!isAuthorized && toState.name !== 'login'){
          event.preventDefault();
          window.location.hash = '/login'
        }
      });
    }

  }
}
