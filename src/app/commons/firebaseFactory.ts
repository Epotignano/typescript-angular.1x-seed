/**
 * Created by mmasuyama on 10/22/2015.
 */

module app.services {

  export interface IDBFactory {}

  export class DBFactory implements IDBFactory {}

  export function factory () : DBFactory {
    return new Firebase('https://smile-motivationz.firebaseio.com/');
  }

}
