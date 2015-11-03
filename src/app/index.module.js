(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('smz', [

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

        ]);
})();
