/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="services/services.ts" />

module app.threads {

  interface IThreads  {
    setThread(threadKey: string, thread: any)
    getThread(threadKey: string)
  }

  export class Threads implements IThreads{

    private threads = {};

    /*@ngInject */
    constructor(){}

  setThread (threadKey: string, thread: any) {
    // TODO change this for dynamically use class.
    // this.threads[threadKey] = new Rx.Subject<threadClass>()

    this.threads[threadKey] = thread;
  }

    getThread (threadKey: string) {
      return this.threads[threadKey]
    }

  }


  angular.module('smz.threads', [])
    .service('threadsService', Threads)
}
