/**
 * Created by mmasuyama on 11/5/2015.
 */


module app.modules.students {

  interface IStudentsList {}


  export class StudentsListController implements IStudentsList{
    public thread;
    public list: app.domain.User[];
    public studentConf;

    constructor( private studentsService : app.services.StudentsService,
                 private threadsService : app.threads.Threads, private $translate
    ) {

    this.studentsService.getCollection();
    this.thread = this.threadsService.getThread('Student');

    // List configuration

    this.studentConf = [
      {
        key: 'lastName',
        label: $translate.instant('COMMONS.LAST_NAME')
      },
      {
        key: 'firstName',
        label: $translate.instant('COMMONS.FIRST_NAME')
      },

    ];

      this.thread.subscribe(
        (data) => this.list = data.data,
        (error) => console.log(error)
      )
    }
  }

  interface IStudentsEditor {}

  export class StudentsEditorController implements IStudentsEditor {


  public formFields;
  constructor(public studentsService : app.services.StudentsService, private $translate ){

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

