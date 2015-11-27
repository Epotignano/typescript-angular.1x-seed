/**
 * Created by mmasuyama on 10/24/2015.
 */
module app.modules.courses {
  'use strict';

  export class CoursesConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $translatePartialLoaderProvider) {
      $stateProvider
        .state('app.courses', {
          abstract: true,
          url: '/courses',
          'views': {
            'content': {
              templateUrl: 'app/courses/courses.abstract.html'
            }
          }
        })

        .state('app.courses.list', {
          url: '/list',
          templateUrl: 'app/courses/courses.list.html',
          controller: CoursesListController,
          controllerAs: 'vm'
        })

        .state('app.courses.create', {
          url: '/create',
          templateUrl: 'app/courses/courses.editor.html',
          controller: CoursesEditorController,
          controllerAs : 'vm'
        })
        .state('app.courses.edit', {
          url: '/edit/:id',
          templateUrl: 'app/courses/courses.editor.html',
          controller: CoursesEditorController,
          controllerAs : 'vm'
        });

      $translatePartialLoaderProvider.addPart('app/courses');

    }
  }

}

angular.module('courses').config(app.modules.courses.CoursesConfig);
