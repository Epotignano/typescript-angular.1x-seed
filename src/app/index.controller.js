(function ()
{
    'use strict';

    angular
        .module('smz')
        .controller('AppController', AppController);

    /** @ngInject */
    function AppController(fuseTheming)
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        //////////
    }
})();
