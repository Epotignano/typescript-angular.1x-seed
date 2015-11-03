/**
 * Created by mmasuyama on 10/21/2015.
 */

/// <reference path="../../../.tmp/typings/tsd.d.ts" />
/// <reference path="auth.route.ts" />

module Auth {
  'use strict';

  angular.module('auth', [])
    .config(RouterConfig);
}

