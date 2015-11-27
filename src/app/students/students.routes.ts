/**
 * Created by mmasuyama on 10/24/2015.
 */
module app.modules.students{
  'use strict';

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
          url: '/create',
          templateUrl: 'app/students/students.editor.html',
          controller: StudentsEditorController,
          controllerAs : 'vm',
          resolve : {
            'coursesList' : function(FirebaseCRUDFactory : app.services.FirebaseCRUD){
              // TODO pensar una forma de mejorar y automatizar la inyección de estas dependencias.
              return FirebaseCRUDFactory.getCollection('courses').then(function(data){
                return data;
              }).catch(function(error){
                return error;
              });
            }
          }
        })

        .state('app.students.edit', {
          url: '/edit/:id',
          templateUrl: 'app/students/students.editor.html',
          controller: StudentsEditorController,
          controllerAs : 'vm',
          resolve : {
            'coursesList' : function(FirebaseCRUDFactory : app.services.FirebaseCRUD){
              // TODO pensar una forma de mejorar y automatizar la inyección de estas dependencias.
              return FirebaseCRUDFactory.getCollection('courses').then(function(data){
                return data;
              }).catch(function(error){
                return error;
              });
            }
          }
        });

      $translatePartialLoaderProvider.addPart('app/students');

    }
  }

}

angular.module('students').config(app.modules.students.StudentsConfig);
