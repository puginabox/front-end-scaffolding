#UPMC Conference 2012
Port over to AngularJS. Features include modularity, testing, Gulp automation, Bower for Dependency Management, Sass/Compass.

Git repo: http://github.com/puginabox/upmc-conference.git


## Structure
    /client
            index.html
            master.css
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
	- on OSX install DON'T install vi sudo: (https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md). 
- In a cli (I use iTerm),  `npm install -g node-inspector bower gulp`

## Installing Dev Dependencies & Bower Packages
- `npm install`

## Running
Runs locally, no database required.

####Option 1 - Serve
- `gulp serve-dev` and browse to `http://localhost:7200`

####Option 2 - Serve and Debug Node
Type `gulp serve-dev-debug` and browse to `http://localhost:7200` for the client and `http://localhost:8080/debug?port-5858` to debug the server.

####Option 3 - Serve and Debug Node Breaking on 1st Line
Type `gulp serve-dev-debug-brk` and browse to `http://localhost:7200` for the client and `http://localhost:8080/debug?port-5858` to debug the server.

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

Testing uses karma, mocha, chai, sinon, ngMidwayTester libraries.

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
			blocks.exception,
			blocks.logger,
			blocks.router
		]
    ]
```

## Core Module
Core modules shared throughout and include common services. Takes blocks, common, & Angular sub-modules as dependencies. 

## blocks Modules
Block modules - reusable, self-contained blocks of code. These can be extracted and included in other projects as dependencies.

### blocks.logger Module
The `blocks.logger` module handles logging.

### blocks.exception Module
The `blocks.exception` module handles exceptions. It depends on the `blocks.logger` module, because the implementation logs the exceptions.

### blocks.router Module
The `blocks.router` helps adding routes to the $routeProvider.

## node-inspector
    
2. Run server & open it in browser
- `node-debug server/server.js`
    
    This loads http://localhost:8080/debug?port-5858 with the node code in the Chrome debugger

### Manually Run in One Terminal Tab
Run the server with options, and debug
    
`node --debug=5858 server/server.js & node-inspector`    

Or

`node-inspector & node --debug server/server.js`

 - Note: Debug defaults to 5858

### node-inspector with Gulp
Alternative to running node-inspector in its own tab is to use `gulp-shell`

```javascript
gulp.src('', {read: false})
    .pipe(plug.shell(['node-inspector']));
```

Run `gulp serve-dev-debug` or `gulp serve-dev-debug-brk` to debug node via the Gulp tasks in this project.

```
NOTE: this project is HEAVILY influenced by John Papa's work; https://github.com/johnpapa

