module smileMotivationz {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      $stateProvider
        .state('app', {
          abstract: true,
          url: '/',
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
        })
        .state('app.main', {
          url: 'main',
          template: '<h1> I am the main and I know it</h1>'

        })

      $urlRouterProvider.otherwise('/');
    }

  }
}
