/**
 * Created by mmasuyama on 10/24/2015.
 */
module app.modules.teachers{
  'use strict'

  export class TeachersConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider) {
      $stateProvider
        .state('app.teachers', {
          abstract: true,
          url: '/teachers',
          "views": {
            "content": {
              templateUrl: 'app/teachers/teachers.abstract.html'
            }
          }

        })

        .state('app.teachers.list', {
          url: '/list',
          templateUrl: 'app/teachers/teachers.list.html',
          controller: teachersListController,
          controllerAs: 'vm'
        })

        .state('app.teachers.editor', {
          url: '/editor',
          templateUrl: 'app/teachers/teachers.detail.html',
          controller: teachersEditorController,
          controllerAs : 'vm'
        });


    }
  }

}

angular.module('teachers').config(app.modules.teachers.TeachersConfig);
