/**
 * Created by mmasuyama on 10/21/2015.
 */

  module app.domain {

    export class User {
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      age: number;
      birthDate: string
    }

   export class Student extends User {
      tests: any[];
      actual_school : string;
      desired_school : string;
      actual_grade : string

    }

    export class Teacher extends User {
      assignedCourses : any;
    }

  }




