var smileMotivationz;
(function (smileMotivationz) {
    'use strict';
    var MainController = (function () {
        /* @ngInject */
        function MainController($timeout, webDevTec, toastr) {
            this.awesomeThings = new Array();
            this.webDevTec = webDevTec;
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
        MainController.prototype.showToastr = function () {
            toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
            this.classAnimation = '';
        };
        MainController.prototype.getWebDevTec = function () {
            this.awesomeThings = this.webDevTec.tec;
        };
        return MainController;
    })();
    smileMotivationz.MainController = MainController;
})(smileMotivationz || (smileMotivationz = {}));
//# sourceMappingURL=main.controller.js.map