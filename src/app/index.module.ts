/// <reference path="../../.tmp/typings/tsd.d.ts" />


/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />
/// <reference path="main/main.controller.ts" />

declare var malarkey: any;
declare var toastr: Toastr;
declare var moment: moment.MomentStatic;

module smileMotivationz {
  'use strict';

  angular.module('smileMotivationz', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ui.router',

    // commons
    'smz.threads',
    'smz.services',

    // modules
    'auth',

    // ui components
    'smz.components.auth',
    'smz.components.teachers',
    'smz.components.user'

  ])
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .config(Config)
    .config(RouterConfig)
    .run(RunBlock)
    .controller('MainController', MainController);

}
