/**
 * Created by mmasuyama on 11/5/2015.
 */


module app.modules.courses {

  interface ICoursesList {}

  export class CoursesListController implements ICoursesList{
    public thread;
    public list: app.domain.Course[];
    public coursesConf;

    constructor( private coursesService : app.services.CoursesService,
                 private threadsService : app.threads.Threads, private $translate
    ) {

    this.coursesService.getCollection();
    this.thread = this.threadsService.getThread('Course');

    // List configuration

    this.coursesConf = [
      {
        key: 'name',
        label: $translate.instant('COMMONS.FIRST_NAME'),
        sort : true
      }
    ];

      this.thread.subscribe(
        (data) => this.list = data.data,
        (error) => console.log(error)
      )
    }
  }

  interface ICoursesEditor {
    save(studentObj)
  }

  export class CoursesEditorController implements ICoursesEditor {

  public student;
  private studentThread;
  private id;
  public formFields;
    private successFn;
  constructor(public coursesService : app.services.CoursesService,
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

    this.studentThread = threadsService.getThread('Course');

    this.studentThread.subscribe(this.successFn);

    if($stateParams['id']) {
      this.id = $stateParams['id'];
      this.coursesService.get($stateParams['id'])
    }

   this.formFields = [
     {
       key: 'name',
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
        this.coursesService.update(studentObj, this.id)
      } else {
        this.coursesService.create(studentObj);
      }

    }
  }

}

