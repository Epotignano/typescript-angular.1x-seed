/**
 * Created by mmasuyama on 10/25/2015.
 */


module app.components.teacher {

  'use strict';

  interface ITeacherEditor {
    save(data: app.domain.Teacher):any;
    fields : any;
  }

  export class TeacherEditor implements ITeacherEditor {

    public data: app.domain.Teacher;
    public fields: any;

    /*@ngInject*/
    constructor(private teachersService : app.services.TeachersService){
      this.fields = [
        {
          key: 'text',
          type: 'input',
          templateOptions: {
            label: 'Text',
            placeholder: 'Formly is terrific!'
          }
        },
        {
          key: 'nested.story',
          type: 'textarea',
          templateOptions: {
            label: 'Some sweet story',
            placeholder: 'It allows you to build and maintain your forms with the ease of JavaScript :-)',
            description: ''
          },
          expressionProperties: {
            'templateOptions.focus': 'formState.awesomeIsForced'
          }
        },
        {
          key: 'awesome',
          type: 'checkbox',
          templateOptions: { label: '' },
          expressionProperties: {
            'templateOptions.disabled': 'formState.awesomeIsForced',
          }
        },
        {
          key: 'whyNot',
          type: 'textarea',
          hideExpression: 'model.awesome',
          templateOptions: {
            label: 'Why Not?',
            placeholder: 'Type in here... I dare you'
          },

        },
        {
          key: 'custom',
          type: 'custom',
          templateOptions: {
            label: 'Custom inlined',
          }
        }
      ];
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
      templateUrl : 'app/components/teacher/teacher.editor.html'
    };

    return directive;
  }



  angular.module('smz.components.teacher.editor', [])

    .directive('smzTeacherEditor', teacherEditor);

}
