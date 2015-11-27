/**
 * Created by mmasuyama on 11/5/2015.
 */

module app.modules.students {

  interface IStudentsList {}

  export class StudentsListController implements IStudentsList{
    public thread;
    public list: app.domain.User[];
    public studentConf;
    public showStudentLabel;

    /* @ngInject */
    constructor(public studentsService: app.services.StudentsService,
                private threadsService: app.threads.Threads,
                private $translate
    ) {

    this.studentsService.getCollection();
    this.thread = this.threadsService.getThread('Student');

    // list configuration

    this.showStudentLabel = function(student) {
      return student.lastName + " " +  student.firstName;
    };

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
      {
        key: 'grade',
        label: $translate.instant('COMMONS.GRADE')
      }


    ];

      this.thread.subscribe(
        (data) => this.list = data.data,
        (error) => console.log(error)
      );
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

  /* @ngInject */
  constructor(public studentsService: app.services.StudentsService,
              public threadsService: app.threads.Threads,
              private $translate,
              private $stateParams: ng.ui.IStateParamsService,
              public coursesList,
              private $mdDialog
  ) {

    // data obtaining and save or update logic

    this.successFn = (result) => {
      if (result.EVENT == this.threadsService.defaultEvents.OBJECT_LOAD) {
        this.student = result.data;
      }
    };

    this.studentThread = threadsService.getThread('Student');

    this.studentThread.subscribe(this.successFn);

    if ($stateParams['id']) {
      this.id = $stateParams['id'];
      this.studentsService.get($stateParams['id']);
    } else {
      this.student = {
        role: 'student',
        courses: []
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
     },

     {
       key : 'address',
       type: 'input',
       templateOptions : {
         type: 'text',
         label: this.$translate.instant('COMMONS.ADDRESS')
       }
     },
     {
       key: 'grade',
       type: 'input',
       templateOptions : {
         type: 'text',
         label: this.$translate.instant('COMMONS.GRADE')
       }
     },

     {
       key : 'age',
       type: 'input',
       templateOptions: {
         type: 'number',
         label: this.$translate.instant('COMMONS.AGE')
       }

     },


   ];
  }

    // methods

    save(studentObj) {
      var _studentObj = angular.copy(studentObj);
      if (this.id) {
        this.studentsService.update(_studentObj, this.id);
      } else {
        this.studentsService.create(_studentObj);
      }

    }

    showBookDialog(ev) {
      this.$mdDialog.show({
        locals: {
          coursesList: this.coursesList
        },
        controller: CoursesDialogController,
        controllerAs : 'dialogVm',
        templateUrl: 'app/students/courses.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      }).then((selectedCourses) => {
        var _auxCoursesArray = angular.copy(this.student.courses) || [];
        selectedCourses.forEach((course) => _auxCoursesArray.push({'id': course.$id}));
        this.student.courses = _auxCoursesArray;
      });
    }
  }

  class CoursesDialogController {
    public course;
    public selectedCourses;
    public courseFormFields;
    /* @ngInject */
    constructor(private $mdDialog, private $translate, private coursesList) {
      this.selectedCourses = [];
      this.courseFormFields = [{
        key: 'selectedCourse',
        type: 'autocomplete',
        templateOptions : {
          collection: this['coursesList'],
          labelKey: 'name',
          modelKey: '$id'
        }
      }
      ];
    }

    addCourse(course) {
      this.selectedCourses.push(angular.copy(course.selectedCourse));
      this.course = {};
    }

    add() {
      this.$mdDialog.hide(this.selectedCourses);
    }
    cancel() {
      this.$mdDialog.cancel();
    }
  }

}

