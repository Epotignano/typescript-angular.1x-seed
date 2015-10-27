/**
 * Created by mmasuyama on 10/24/2015.
 */


module smileMotivationz.TeachersModule {

  export class TeachersConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider) {
      $stateProvider
        .state('teacher', {
          parent: 'home',
          url: 'teacher',
          templateUrl: 'app/teachers/teachers.abstract.html',
        })

        .state('list', {
          parent:'teacher',
          url: '/list',
          templateUrl: 'app/teachers/teachers.list.html'
        })

        .state('editor', {
          parent: 'teacher',
          url: '/editor',
          templateUrl: 'app/teachers/teachers.detail.html'
        });


    }



  }



  angular.module('teacher', [])
    .config(TeachersConfig)
}
