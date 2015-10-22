/**
 * Created by mmasuyama on 10/21/2015.
 */

  module app.domain {

    export interface IUser {
      id : string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      age: number;
      birthDate: string
    }


    export class User {
      id : string;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      age: number;
      birthDate: string
    }

   export class Student extends User {
      tests: void;

    }

    export class Teacher extends User {
      assignedCourses : void;
      salary: number;
    }

  }




