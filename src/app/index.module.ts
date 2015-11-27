/// <reference path="../../.tmp/typings/tsd.d.ts" />


/// <reference path="index.route.ts" />

/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />


module smileMotivationz {
  'use strict';

  angular.module('smz', [
      // core
      'app.core',
      // formly
      'formly',
      'lr.upload',
      'ngFileUpload',
      // navigation
      'app.navigation',
      // toolbar
      'app.toolbar',
      // quick panel
      'app.quick-panel',
      // template components
      'app.components',
      // commons
      'smz.components.entities',
      'smz.components.book',
      'smz.services',
      'smz.threads',
      // modules
      'settings',
      'auth',
      'dashboard',
      'courses',
      'teachers',
      'students'
  ])
      .config(Config)
      .config(RouterConfig)
      .run(RunBlock)
      .run(FormlyConfiguration);
}
