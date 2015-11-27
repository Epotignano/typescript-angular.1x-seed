/**
 * Created by mmasuyama on 11/5/2015.
 */


module app.modules.teachers {

  interface ITeachersList {}

  export class teachersListController implements ITeachersList{
    public list : app.domain.Teacher[] = [];
    public teacherConf;
    public thread;

    /** @ngInject */ 
    constructor( private teachersService : app.services.TeachersService,
                 private threadsService : app.threads.Threads,
                 private $translate
    ) {
      this.teachersService.getCollection();
      this.thread = this.threadsService.getThread('Teacher');

      this.teacherConf = [{
        key: 'email',
        label: $translate.instant('COMMONS.EMAIL')
        }];

      this.thread.subscribe(
        (data) => this.list = data.data,
        (error) => console.log(error)
      );
    }
  }

  interface ITeacherEditor {
    save(teacherObj)
  }

  export class teachersEditorController implements ITeacherEditor {

  public teacher;
  public formFields;
  private successFn;
  private teacherThread;
  private id;

  /** @ngInject */ 
  constructor(public teachersService: app.services.TeachersService, 
    private threadsService : app.threads.Threads, 
    private $translate, 
    private $stateParams ){

    if($stateParams['id']) {
      this.id = $stateParams['id'];
      this.teachersService.get($stateParams['id']);
    } else {
      this.teacher = {
        role: 'teacher',
        registered: false
      };
    }

   this.formFields = [{
       key: 'email',
       type: 'input',
       templateOptions: {
         type: 'email',
         label: this.$translate.instant('COMMONS.EMAIL')
       }
     }];


    this.successFn = (result) => {
      if (result.EVENT == this.threadsService.defaultEvents.OBJECT_LOAD) {
        this.teacher = result.data;
      }
    };

    this.teacherThread = threadsService.getThread('Teacher');

    this.teacherThread.subscribe(this.successFn);
   }

    // Methods

    save(teacherObj){
      if(this.id) {
        this.teachersService.update(teacherObj, this.id);
      } else {
        this.teachersService.create(teacherObj);
      }

    }
  }

}