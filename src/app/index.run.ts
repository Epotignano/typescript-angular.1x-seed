module smileMotivationz {
  'use strict';

  export class RunBlock {

    static $inject = ['$log', '$rootScope', '$state'];

    constructor($log: ng.ILogService, $rootScope : ng.IRootScopeService,
                authTokenService : app.services.AuthTokenService,
                $state: ng.ui.IStateService) {


      $rootScope.$on('$stateChangeStart', function ()
      {
        $rootScope['loadingProgress'] = true;
      });

      $rootScope.$on('$stateChangeSuccess', function () {

          $rootScope['loadingProgress'] = false;

      });

      $rootScope.$on('$stateChangeStart',	function(event, toState){

        /*var isAuthorized = authTokenService.isAuthorized();

        if(!isAuthorized && toState.name !== 'login'){
          event.preventDefault();
          window.location.hash = '/login'
        }*/
      });

      $log.debug('runBlock end');
    }



  }
}
