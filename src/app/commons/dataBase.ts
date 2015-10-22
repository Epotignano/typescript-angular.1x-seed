/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="../../../.tmp/typings/tsd.d.ts" />
/// <reference path="../../../src/domain/domain.d.ts" />

module app.common {

  export class Database {
    db: Firebase;

    constructor(public url: string) {
      this.db = new Firebase(url);
    }

  }

}
