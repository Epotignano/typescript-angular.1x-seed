/**
 * Created by mmasuyama on 11/19/2015.
 */
'use strict';

module app.settings {

  export class UploadSettingsService {

	/** @ngInject */ 
  constructor(private $firebaseObject) {}
    getSettings() {
      var settingsRef = new Firebase(smileMotivationz.ApplicationConstants.firebaseUrl.value + '/settings');
      return this.$firebaseObject(settingsRef).$loaded();
    }
  }

  angular.module('settings', [])
    .service('uploadSettings', UploadSettingsService);
}
