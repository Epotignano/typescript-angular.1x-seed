/**
 * Created by mmasuyama on 10/22/2015.
 */

/// <reference path="services/services.ts" />

module app.threads {

  interface IThreads  {
    setThread(threadKey: string, thread: any)
    getThread(threadKey: string)
    getThreads()
  }

  export class Threads implements IThreads{

    private threads = {};
    private generalListeners = [];
    /*@ngInject */
    constructor() {}

    public defaultEvents = {'COLLECTION_LOADED' : 'cloaded',
      'COLLECTION_OBJECT_REMOVED': 'coremoved',
      'OBJECT_CREATE' : 'ocreated',
      'OBJECT_LOAD': 'oloaded', 'OBJECT_UPDATE': 'oupdated',
      'OBJECT_DELETE': 'odeleted'};

    setThread (threadKey: string, thread: any) {
      this.threads[threadKey] = thread;
      this.generalListeners.forEach(function(listener) {
      listener.onNext(thread);
      });
    }

    setGeneralListener(thread: any) {
      this.generalListeners.push(thread);
    }

    getGeneralListener () {

    }

    getThread (threadKey: string) {
      return this.threads[threadKey];
    }

    getThreads() {
      return this.threads;
    }
  }


  angular.module('smz.threads', [])
    .service('threadsService', Threads);
}
