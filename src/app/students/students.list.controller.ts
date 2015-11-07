/**
 * Created by mmasuyama on 11/5/2015.
 */


module app.modules.students {

  interface IStudentsList {}

  export class StudentsListController implements IStudentsList{
    public student;

    public thread;
    constructor( private teachersService : app.services.StudentsService,
                 private threadsService : app.threads.Threads
    ) {
      this.teachersService.getCollection();

      this.thread = this.threadsService.getThread('Teacher')
    }
  }

  interface ITeacherEditor {}

  export class StudentsEditorController implements ITeacherEditor {

  public student;
  public formFields;

  constructor(public studentsService : app.services.StudentsService, private $translate ){
    this.student = {
      role: 'student'
    };

   this.formFields = [{
       key: 'lastName',
       type: 'input',
       templateOptions: {
         type: 'text',
         label: this.$translate.instant('COMMONS.LAST_NAME')
       }
     },
     {
       key: 'firstName',
       type: 'input',
       templateOptions: {
         type: 'text',
         label: this.$translate.instant('COMMONS.FIRST_NAME')
       }
     }

   ];


   }
  }

}

