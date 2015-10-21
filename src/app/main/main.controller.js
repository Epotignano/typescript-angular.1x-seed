var smileMotivationz;
(function (smileMotivationz) {
    'use strict';
    var MainController = (function () {
        /* @ngInject */
        function MainController($timeout, toastr) {
            this.awesomeThings = new Array();
            this.classAnimation = '';
            this.activate($timeout);
        }
        MainController.prototype.activate = function ($timeout) {
            this.getWebDevTec();
            var self = this;
            $timeout(function () {
                self.classAnimation = 'rubberBand';
            }, 4000);
        };
        return MainController;
    })();
    smileMotivationz.MainController = MainController;
})(smileMotivationz || (smileMotivationz = {}));
//# sourceMappingURL=main.controller.js.map