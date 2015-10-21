module smileMotivationz {
  'use strict';

  export class MainController {


    public classAnimation: string;

    /* @ngInject */
    constructor ($timeout: ng.ITimeoutService, toastr: Toastr) {
      this.awesomeThings = new Array();

      this.classAnimation = '';

      this.activate($timeout);
    }

    activate($timeout: ng.ITimeoutService) {
      this.getWebDevTec();

      var self = this;

      $timeout(function() {
        self.classAnimation = 'rubberBand';
      }, 4000);
    }


  }
}
