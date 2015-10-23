/**
 * Created by mmasuyama on 10/21/2015.
 */

/// <reference path="user.ts" />
/// <reference path="location.ts" />

  module app.domain {

    interface ICourse {
      name : string;
      category : string;
      teacherId : string;
      studentsList : Student[];
    }


    export class Course implements ICourse {

      constructor(
        public name : string,
        public category : string,
        public teacherId : string,
        public studentsList : Student[]) {


      }
    }

  }


