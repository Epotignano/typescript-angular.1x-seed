/**
 * Created by mmasuyama on 10/25/2015.
 */


module app.components.teacher {

  'use strict';

  interface ITeacherEditor {
    save(data: app.domain.Teacher):any
  }

  export class TeacherEditor implements ITeacherEditor {

    public data: app.domain.Teacher;
    private thread : any;
    /*@ngInject*/
    constructor(private teachersService : app.services.TeachersService, private threadsService: app.threads.Threads ){
          this.thread = this.threadsService.getThread("Teacher")
    }

    save(data: app.domain.Teacher): any {
      this.teachersService.save(data)
    }
  }

  export function teacherEditor() : ng.IDirective {
    var directive = <ng.IDirective> {
      restrict: 'EA',
      scope: {
        data : '='
      },
      controller: TeacherEditor,
      controllerAs: 'editorVm',
      templateUri : 'app/components/teacher/teacher.editor.ts'
    }

    return directive;
  }



  angular.module('smz.components.teacher.editor', ['formly'])
    .directive('smzTeacherEditor', teacherEditor);

}
