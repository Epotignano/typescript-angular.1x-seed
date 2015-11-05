module smileMotivationz {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider,
                $urlRouterProvider: ng.ui.IUrlRouterProvider,
                $translateProvider) {
      $stateProvider
        .state('app', {
          abstract: true,
          url: '/app',
          views   : {
            'main@'         : {
              templateUrl: 'app/core/layouts/default.html'
            },
            'toolbar@app': {
              templateUrl: 'app/toolbar/toolbar.html',
              controller : 'ToolbarController as vm'
            },
            'navigation@app': {
              templateUrl: 'app/sidenav/navigation/navigation.html',
              controller : 'NavigationController as vm'
            },
            'quickPanel@app': {
              templateUrl: 'app/sidenav/quick-panel/quick-panel.html',
              controller : 'QuickPanelController as vm'
            }
          }
        });


      $urlRouterProvider.otherwise('/app/dashboard');

    }

  }
}
