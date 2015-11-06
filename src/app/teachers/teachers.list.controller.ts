/**
 * Created by mmasuyama on 11/5/2015.
 */


module app.modules.teachers {

  interface ITeachersList {}

  export class teachersListController implements ITeachersList{
    public thread;
    constructor( private teachersService : app.services.TeachersService,
                 private threadsService : app.threads.Threads
    ) {
      this.teachersService.getCollection();
      this.thread = this.threadsService.getThread('Teacher')
    }
  }

  interface ITeacherEditor {}

  export class teachersEditorController implements ITeacherEditor {

    public formFields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email address',
          placeholder: 'Enter email'
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Password'
        }
      },
      {
        key: 'file',
        type: 'file',
        templateOptions: {
          label: 'File input',
          description: 'Example block-level help text here',
          url: 'https://example.com/upload'
        }
      },
      {
        key: 'checked',
        type: 'checkbox',
        templateOptions: {
          label: 'Check me out'
        }
      }
    ];

   constructor(public teachersService : app.services.TeachersService){}
  }

}

