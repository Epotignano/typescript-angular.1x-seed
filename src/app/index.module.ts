/// <reference path="../../.tmp/typings/tsd.d.ts" />


/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />


module smileMotivationz {
  'use strict';

  angular.module('smz', [
    // core
    'app.core',

    // navigation
    'app.navigation',

    // toolbar
    'app.toolbar',

    // quick panel
    'app.quick-panel',

    // template components
    'app.components',

    // commons
    'smz.services',

    // Modules
    'auth',
    'dashboard'

  ])
    .config(Config)
    .config(RouterConfig)
    .run(RunBlock)
}
