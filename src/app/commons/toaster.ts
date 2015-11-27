/**
 * Created by mmasuyama on 11/10/2015.
 */

/// <reference path="../../../.tmp/typings/tsd.d.ts" />

module app.threads {

  interface IToaster {
    showToaster()
  }

  export class ToasterListener implements IToaster{
    private toasterThread;
    private arrayObserv;
    private threads;
    private observables = [];

    /** @ngInject */ 
    constructor(private threadsService : Threads) {
      this.toasterThread = new Rx.Subject<{}>();
      // var source = Rx.Observable.ofArrayChanges(this.observables);

      /* source.subscribe(function(obs){
        this.threads = Rx.Observable.merge(obs);
        console.log(this.threads);
      }); */

      this.threadsService.setGeneralListener(this.toasterThread);
      this.toasterThread.subscribe((observable) => this.observables.push(observable));

    }

    showToaster(){

    }
  }

  angular.module('smz.services')
    .service('toasterService', ToasterListener);
}
