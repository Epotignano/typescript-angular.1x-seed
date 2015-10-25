/**
 * Created by mmasuyama on 10/24/2015.
 */
module smileMotivationz{
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      $stateProvider
        .state('teacher', {
          url: '/teacher',
          templateUrl: 'app/teachers/teachers.abstract.html',

          controllerAs: 'main'
        });

      $urlRouterProvider.otherwise('/');
    }

  }
}
