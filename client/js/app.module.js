(function() { // Hark! Yield! Pretect the Global Namespace!
    'use strict';
    console.log('Welcome to the Gulped App!');
    
    // The App Agregator (like master.scss in Sass)
    angular.module('app', [

        /* Needed by all modules */ 
        'app.core',
        'app.config',

        /* Feature modules */
        'app.feature'
        
        // put controllers in here?
    ]);

})();


