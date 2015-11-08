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
        label: $translate.instant('COMMONS.LAST_NAME'),
        sort : true
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

  interface IStudentsEditor {
    save(studentObj)
  }

  export class StudentsEditorController implements IStudentsEditor {

  public student;
  private studentThread;
  private id;
  public formFields;
    private successFn;
  constructor(public studentsService : app.services.StudentsService,
              public threadsService : app.threads.Threads,
              private $translate,
              $stateParams:ng.ui.IStateParamsService
  ){

    // Data obtaining and save or update logic

    this.successFn = (result) => {
      if (result.EVENT == this.threadsService.defaultEvents.OBJECT_LOAD) {
        this.student = result.data;
      }
    };

    this.studentThread = threadsService.getThread('Student');

    this.studentThread.subscribe(this.successFn);

    if($stateParams['id']) {
      this.id = $stateParams['id'];
      this.studentsService.get($stateParams['id'])
    } else {
      this.student = {
        role: 'student'
      };
    }



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

    // Methods

    save(studentObj){
      if(this.id) {
        this.studentsService.update(studentObj, this.id)
      } else {
        this.studentsService.create(studentObj);
      }

    }
  }

}

