/**
 * Created by mmasuyama on 10/22/2015.
 */
/*
module app.services {

    interface ICourseDataResource{
      getCourse(courseId : string) : void;
      createCourse(courseData : any) : void;
      getSubject(): void;
    }

    export class CourseService implements ICourseDataResource {

      static $inject = ['rx', 'firebase'];
      private subject = Rx.Subject;

      constructor() {

      }

      getSubject() {
        return this.subject;
      }

      getCourse(courseId: string) {
        return this.db.child(courseId).on('value', function(snapshot : any){
          this.subject.onNext({event: 'read', data: snapshot.val()});
        })
      }

      createCourse(courseData : any) {
        this.db.set(courseData, function(error: any){
            if(error) {
              this.subject.onError({event: 'creation'});
              return;
            }
            this.subject.onNext({event: 'creation'});
        })
      }
    }

}
*/
