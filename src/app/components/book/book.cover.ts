/**
 * Created by mmasuyama on 11/19/2015.
 */

'use strict';

module app.components.book {

  class BookCoverController {
    private settings;
    public error;
    public file;
    public progress: any;
    public coverId;
    public coverUrl;
    private uploadPromise;

    /** @ngInject */ 
    constructor(private uploadSettings : app.settings.UploadSettingsService,
                private upload,
                private $timeout) {
      this.uploadSettings.getSettings().then((settings) => {this.settings = settings.upload;});

    }

    validate($file){
      if ($file) {
        try {
          if (this.settings.allowedType.indexOf($file.type) === -1) {
            throw new Error('Only JPG, PNG, GIF Files are allowed');
          }
          if ($file.size > this.settings.maxSize) {
            throw new Error('File must not exceed 2Mb');
          }
          return $file;
        } catch (error) {
          this.error = error.message;
        }
      }
    }

    successFn = (data) => {
      this.coverUrl = data['secure_url'];
      this.coverId = data['public_id'];
      console.log(data);
      this.progress = 0;
    };

    errorFn = (err) => {
      this.error = err.error.message;
    };

    progressFn = (progress) => {
      console.log(progress);
    };

    fileUpload() {
      if (this.file[0]) {
        var uploadParams = {
          upload_preset: this.settings.presets.bookCover
        };
        var oldCoverId = this.coverId;
        this.progress = 0;
        this.uploadPromise = this.upload({
          url: this.settings.url,
          method: 'POST',
          fields: uploadParams,
          file: this.file[0]
        }).then(this.successFn, this.errorFn, this.progressFn);
      }
    }
  }

  export function smzBookCover (): ng.IDirective {

    var directive = <ng.IDirective>{
      scope: {
        coverUrl: '=',
        coverId: '=',
        articleId: '=',
        coverOverlay: '=',
        title1: '=',
        title2: '=',
        corporate: '='
      },
      controller: BookCoverController,
      controllerAs: 'cover',
      templateUrl : 'app/components/book/book.cover.html'
    };

    return directive;

  }


}
/*
angular.module('lixil.ui.article-cover', [])
  .controller('articleCoverCtrl', articleCoverCtrl)
  .directive('articleCover', function() {
    // Runs during compile
    return {
      scope: {
        coverUrl: '=',
        coverId: '=',
        articleId: '=',
        coverOverlay: '=',
        title1: '=',
        title2: '=',
        corporate: '='
      }, // {} = isolate, true = child, false/undefined = no change
      controller: 'articleCoverCtrl as cover',
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: '../modules/lixil-ui-components/articles/article-cover/article-cover.html',
      bindToController: true
    };
  });
*/
