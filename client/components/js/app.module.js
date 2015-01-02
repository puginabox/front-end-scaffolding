(function() { // Hark! Yeild! Pretect the Global Namespace!
    'use strict';

    // The App Agregator (like master.scss in Sass)
    angular.module('app', [

        /* Needed by all modules */ 
        'app.core',
        'app.config',

        /* Feature modules */
        'app.feature'
    ]);

})();


