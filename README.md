#Front-End AngularJS Scaffolding

Features include MVC modularity through a local server/live-reload, Gulp automation, Bower for Dependency Management, Sass/Compass, Karma unit testing, development & production builds. Later I would like to add MongoDB.

Git repo: http://github.com/puginabox/front-end-scaffolding.git

## Still yet to finish:
- Compass auto-compiling & autoprefixing
- JS/CSS concat
- JSON minifying
- testing
- clean (for builds)
- Foundation Sass framework
- Image optimization
- Cross-browser autoloading (Safari, Chrome, Opera, Firefox)
- gulp-plumber to prevent tasks from stopping on error

## Structure
    /client
            index.html
            master.css
            /js             ------> built dev scripts
                whatever-is-built.js   
            sass-color-pallettes.html alias
            /components
                /js
                    app.module.js           ----> App Aggregator
                    /core
                        config.js           ----> main Angular config
                        core.module.js      ---->
                    /feature
                        FeatureController.js   ```` all controllers PascalCase
                        feature.html
                        dirFeature.js          ```` all directives prefixed with dir
                /sass
                    master.scss             ----> partial Aggregator
                    /core
                        _mixins.scss
                        _colors.scss
                        _font.scss
                        _typography.scss
                        _base.scss
                        /layout             
                            _layout.scss    ----> default layout for desktop
                            _mobile.scss    ----> media queries
                            _tablet.scss
                            _large.scss
                    /fonts                  ----> all web fonts
                    /functions (if applicable)
                    /maps (if applicable)
                    /sass-color-palletes    ----> very useful reference
                        sass-color-pallettes.html
                        main.css
                        README.html
                /vendor                     ----> manageed by Bower
                    /jquery
                    /modernizr
                    /angular etc
            /img                            ----> un-optimized/gzipped
            /tests
    /server
        /data
        /routes
    /builds 	(created via Node/Gulp)
        /development
            index.html        
            master.css
            /js
                behavior.js
                data.json    
            /img
            /feature
                feature.html
        /production
            index.html        
            master.css
            /js
                behavior.js
                data.json
            /img  	
	/src
        README.md
        gulpfile.js
		package.json
        bower.json
        .bowerrc
        node_modules
    .git
    .gitignore
	
## Requirements

- Install Node (http://nodejs.org/)
	- on OSX install DON'T install via sudo: (https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md). 
- In a cli (I use iTerm),  `npm install -g node-inspector bower gulp`

## Installing Dev Dependencies & Bower Packages
- `npm install`
- `bower install`

## Running
Runs locally, no database required.

####Option 1 - Serve
- `gulp` and browse to `http://localhost:8080`

####Option 2 - Serve and Debug Node


### Production Build
Production is an optimized build. 
- `gulp serve-stage` and go to `http://localhost:7200`

Production optimizations:

- HTML
    -- all views and index.html contatenated & minified
- Javascript
    -- jshint
    -- concat all scripts
    -- uglify to minify and mangle all javascript
    -- preparing Angular's templatecache for html templates
    -- Angular dependency injection annotations using ngAnnotate
    -- source maps
- CSS
    -- css autoprefixer for vendor prefixes
    -- contact & minify CSS
    -- optimize images

- Deploys all js, css, images, fonts, and index.html

## Testing
- `gulp test`

Testing uses Karma.

## How It Works
The app is quite simple and has 2 main routes:
- dashboard
- lecture series list

### The Modules
The app module hierachy:

```
app --> [
        app.module,
        app.layout,
		app.core --> [
			ngAnimate,
			ngRoute,
			ngSanitize,
		]
    ]
```

## Core Module
Core modules shared throughout and include common services. Takes blocks, common, & Angular sub-modules as dependencies. 

## blocks Modules
Block modules - reusable, self-contained blocks of code. These can be extracted and included in other projects as dependencies.

### node-inspector with Gulp
Alternative to running node-inspector in its own tab is to use `gulp-shell`

```javascript
gulp.src('', {read: false})
    .pipe(plug.shell(['node-inspector']));
```

Run `gulp serve-dev-debug` or `gulp serve-dev-debug-brk` to debug node via the Gulp tasks in this project.

```
NOTE: this project is HEAVILY influenced by John Papa's work; https://github.com/johnpapa

