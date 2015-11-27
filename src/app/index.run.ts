module smileMotivationz {
  'use strict';

  export class RunBlock {

    static $inject = ['$log', '$rootScope', 'authTokenService', '$state'];

    /** @ngInject */ 
    constructor($log: ng.ILogService, $rootScope : ng.IRootScopeService, authTokenService, $state: ng.ui.IStateService) {

      $rootScope.$on('$stateChangeStart', function (event, toState)
      {
        console.log(authTokenService);
        $rootScope['loadingProgress'] = true;
        var isAuthorized = authTokenService.isAuthorized();
         if (!isAuthorized && toState.name !== ApplicationConstants.loginState.name) {
         event.preventDefault();
         window.location.hash = ApplicationConstants.loginState.url;
         }
      });

      $rootScope.$on('$stateChangeSuccess', function () {
          $rootScope['loadingProgress'] = false;
      });

      $log.debug('runBlock end');
    }



  }
}
