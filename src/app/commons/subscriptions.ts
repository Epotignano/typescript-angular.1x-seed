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

    public defaultEvents = ['COLLECTION_LOAD',
      'COLLECTION_OBJECT_REMOVED',
      'OBJECT_LOAD', 'OBJECT_UPDATED',
      'OBJECT_DELETE'];

    setThread (threadKey: string, thread: any) {
      this.threads[threadKey] = thread;
    }

    getThread (threadKey: string) {
      return this.threads[threadKey]
    }

  }


  angular.module('smz.threads', [])
    .service('threadsService', Threads)
}
