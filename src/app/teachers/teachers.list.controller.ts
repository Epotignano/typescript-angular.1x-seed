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

  public teacher;
  public formFields;
  constructor(public teachersService : app.services.TeachersService, private $translate ){

    this.teacher = {
      role: 'teacher'
    }

   this.formFields = [{
       key: 'email',
       type: 'input',
       templateOptions: {
         type: 'email',
         label: this.$translate.instant('COMMONS.EMAIL')
       }
     }];


   }
  }

}

