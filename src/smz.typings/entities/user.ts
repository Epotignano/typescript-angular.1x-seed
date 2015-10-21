/**
 * Created by mmasuyama on 10/21/2015.
 */

  class User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    age: number;
    birthDate: string
  }


  interface IStudent {
    test: void;


  }


  class Student extends User {
    tests: void;

  }


