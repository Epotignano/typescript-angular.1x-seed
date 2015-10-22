/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../../.tmp/typings/tsd.d.ts" />
/// <reference path="../../../../src/domain/domain.d.ts" />
/// <reference path="../dataBase.ts" />



module app.common.services {

    interface ICourseDataResource{
      getCourse(courseId : string) : void;
      createCourse(courseData : app.domain.Course) : void;
      getSubject(): void;
    }

    export class CourseService implements ICourseDataResource {

      static $inject = ['rx', 'firebase'];

      constructor(private subject : Rx.Subject<app.domain.Course>, private db: any) {
        this.db = new  app.common.Database("https://smile-motivationz.firebaseio.com/");
      }

      getSubject() {
        return this.subject;
      }

      getCourse(courseId: string) {
        return this.db.child(courseId).on('value', function(snapshot){
          this.subject.onNext({event: 'read', data: snapshot.val()});
        })
      }

      createCourse(courseData : app.domain.Course) {
        this.db.set(courseData, function(error){
            if(error) {
              this.subject.onError({event: 'creation'});
              return;
            }
            this.subject.onNext({event: 'creation'});
        })
      }
    }

    angular.module('smz.services')
      .service('courseService', CourseService)
}
