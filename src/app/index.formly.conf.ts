/**
 * Created by mmasuyama on 11/6/2015.
 */


module smileMotivationz {


  export class FormlyConfiguration {

    static inject = ['formlyConfig'];

    /* Formly general configuration sector */

    constructor(formlyConfig : any) {
      formlyConfig.setType({
        name: 'input',
        template:'<md-input-container><label>{{ options.templateOptions.label }}</label> <input ng-model="model[options.key]"></md-input-container>'
      });

      formlyConfig.setType({
        name:'textarea',
        template: '<md-input-container flex><label>{{ options.templateOptions.label }}</label> <textarea ng-model="model[options.key]"></textarea></md-input-container>'
      });

      formlyConfig.setType({
        name: 'radio',
        template: '<md-radio-group ng-model="model[options.key]"><md-radio-button  class="md-primary" ng-repeat="(key, option) in options.templateOptions.options"id="{{$index}}"value="{{ option.value}}">{{option.name }}</md-radio-button></md-radio-group>'
      });


    }


  }





}
