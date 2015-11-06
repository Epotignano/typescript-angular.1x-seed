/**
 * Created by mmasuyama on 11/6/2015.
 */


module smileMotivationz {


  export class FormlyConfiguration {

    static inject = ['formlyConfig'];

    /* Formly configuration sector */

    constructor(formlyConfig : any) {
      formlyConfig.setType({
        name: 'input',
        template:'<md-input-container><label>{{ templateOptions.label }}</label> <input ng-model="model[options.key]"></md-input-container>'
      })

    }


  }





}
