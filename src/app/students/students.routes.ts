/**
 * Created by mmasuyama on 10/24/2015.
 */
module app.modules.students{
  'use strict'

  export class StudentsConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $translatePartialLoaderProvider) {
      $stateProvider
        .state('app.students', {
          abstract: true,
          url: '/students',
          "views": {
            "content": {
              templateUrl: 'app/students/students.abstract.html'
            }
          }
        })

        .state('app.students.list', {
          url: '/list',
          templateUrl: 'app/students/students.list.html',
          controller: StudentsListController,
          controllerAs: 'vm'
        })

        .state('app.students.create', {
          url: '/editor',
          templateUrl: 'app/students/students.editor.html',
          controller: StudentsEditorController,
          controllerAs : 'vm'
        });

      $translatePartialLoaderProvider.addPart('app/students');

    }
  }

}

angular.module('students').config(app.modules.students.StudentsConfig);
