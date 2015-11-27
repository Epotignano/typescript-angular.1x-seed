/**
 * Created by mmasuyama on 11/5/2015.
*/
module app.modules.courses {

  interface ICoursesList {
  }

  export class CoursesListController implements ICoursesList {
    public thread;
    public list: app.domain.Course[];
    public coursesConf;

    /** @ngInject */
    constructor(public coursesService: app.services.CoursesService,
                private threadsService: app.threads.Threads,
                private $translate) {

      this.coursesService.getCollection();
      this.thread = this.threadsService.getThread('Course');

      // list configuration

      this.coursesConf = [
        {
          key: 'name',
          label: $translate.instant('COMMONS.FIRST_NAME'),
          sort: true
        }
      ];

      this.thread.subscribe(
        (data) => this.list = data.data,
        (error) => console.log(error)
      );
    }

    showCourseLabel (course) {
      return course.name
    }

  }

  interface ICoursesEditor {
    save(studentObj)
  }

  export class CoursesEditorController implements ICoursesEditor {

    public course;
    public book;
    public formFields;
    private courseThread;
    private id;
    private successFn;

    /** @ngInject */
    constructor(public coursesService: app.services.CoursesService,
                public threadsService: app.threads.Threads,
                private $translate,
                $stateParams: ng.ui.IStateParamsService,
                private $mdDialog) {

      // data obtaining and save or update logic

      this.successFn = (result) => {
        if (result.EVENT === this.threadsService.defaultEvents.OBJECT_LOAD) {
          this.course = result.data;
          if (!result.data.books) {
            this.course.books = [];
          };
        }
      };

      this.courseThread = threadsService.getThread('Course');

      this.courseThread.subscribe(this.successFn);

      // initialization logic

      if ($stateParams['id']) {
        this.id = $stateParams['id'];
        this.coursesService.get($stateParams['id']);
      } else {
        this.course = {
          name: '',
          books: []
        };
      }
      // initialization end

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

    // methods

    save(studentObj) {
      var _studentObj = angular.copy(studentObj);
      if (this.id) {
        this.coursesService.update(_studentObj, this.id);
      } else {
        this.coursesService.create(_studentObj);
      }
    }

    showBookDialog(ev) {
      this.$mdDialog.show({
        controller: BookDialogController,
        controllerAs: 'dialogVm',
        templateUrl: 'app/courses/book.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      }).then((book) => {
        this.course.books.push(book);
      });
    }
  }

  class BookDialogController {
    public book;
    public section;
    public booksFormFields;
    public sectionFormFields;

    /** @ngInject */
    constructor(private $mdDialog, private $translate) {
      this.book = {
        sections: []
      };

      this.booksFormFields = [{
        key: 'title',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: this.$translate.instant('COURSES.BOOK_NAME')
        }
      },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: this.$translate.instant('COURSES.DESCRIPTION')
          }
        }
      ];

      this.sectionFormFields = [{
        key: 'name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: this.$translate.instant('COURSES.SECTIONS_OF_BOOK')
        }
      }];
    }



    addSection(section) {
      this.book.sections.push(angular.copy(section));
      this.section = {};
    }

    add(book) {
      this.$mdDialog.hide(book);
    }
    cancel() {
      this.$mdDialog.cancel();
    }
  }
}

