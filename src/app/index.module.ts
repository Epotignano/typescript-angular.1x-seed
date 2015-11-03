/// <reference path="../../.tmp/typings/tsd.d.ts" />


/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />


module smileMotivationz {
  'use strict';

  angular.module('smz', [
    // Core
    'app.core',

    // Navigation
    'app.navigation',

    // Toolbar
    'app.toolbar',

    // Quick panel
    'app.quick-panel',

    // Components
    'app.components',


    // Modules
    'auth'

  ])
    .config(Config)
    .config(RouterConfig)
    .run(RunBlock)
}
