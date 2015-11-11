/**
 * Created by mmasuyama on 11/10/2015.
 */

/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

module app.components.toaster {

  class ToasterListener {
    private threadsListener;

    constructor(private threadsService : app.threads.Threads) {

      var thread = this.threadsService.getThreads();

      console.log(thread);

    }
  }

  angular.module('toaster', [])
    .service('toasterService', ToasterListener)
}
