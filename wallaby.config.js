module.exports = function (wallaby) {


  var compilerOptions = require('./tsconfig.json').compilerOptions;
  compilerOptions.module = 'system';


  return {
    files: [{
        pattern: 'node_modules/systemjs/dist/system-polyfills.js',
        instrument: false
      },
      {
        pattern: 'node_modules/systemjs/dist/system.js',
        instrument: false
      },
      {
        pattern: 'node_modules/core-js/client/shim.js',
        instrument: false
      },

      {
        pattern: 'node_modules/zone.js/dist/zone.js',
        instrument: false
      },
      {
        pattern: 'node_modules/zone.js/dist/long-stack-trace-zone.js',
        instrument: false
      },
      {
        pattern: 'node_modules/zone.js/dist/proxy.js',
        instrument: false
      },
      {
        pattern: 'node_modules/zone.js/dist/sync-test.js',
        instrument: false
      },
      {
        pattern: 'node_modules/zone.js/dist/jasmine-patch.js',
        instrument: false
      },
      {
        pattern: 'node_modules/zone.js/dist/async-test.js',
        instrument: false
      },
      {
        pattern: 'node_modules/zone.js/dist/fake-async-test.js',
        instrument: false
      },
      {
        pattern: 'node_modules/reflect-metadata/Reflect.js',
        instrument: false
      },
      {
        pattern: 'node_modules/jquery/dist/jquery.min.js',
        instrument: false

      },

      {
        pattern: './systemjs.config.js',
        instrument: false
      },

      {
        pattern: './demo-app/**/*+(ts|html|css)',
        load: false
      },
      {
        pattern: './component-package/**/*+(ts|html|css)',
        load: false
      },
      {
        pattern: 'node_modules/intl/dist/Intl.js',
        instrument: false
      },

    ],


    tests: [{
      pattern: "./tests/**/*.spec.ts",
      load: false
    }],


    middleware: function (app, express) {
      app.use('/node_modules', express.static(require('path').join(__dirname, 'node_modules')));
    },


    testFramework: 'jasmine',


    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },


    preprocessors: {
      '**/*.js': function (file) {
        return file.content.replace('moduleId: module.id', 'moduleId: __moduleName');
      }
    },


    debug: true,


    setup: function (wallaby) {
      wallaby.delayStart();


      System.config({
        transpiler: 'none',
        defaultJSExtensions: true,
        meta: {
          './demo-app/*': {
            scriptLoad: true,
            format: 'register'
          }
        }
      });

      var promises = [
        Promise.all([
          System.import('@angular/core/testing'),
          System.import('@angular/platform-browser-dynamic/testing')
        ])


        .then(function (providers) {
          var coreTesting = providers[0];
          var browserTesting = providers[1];


          coreTesting.TestBed.initTestEnvironment(
            browserTesting.BrowserDynamicTestingModule,
            browserTesting.platformBrowserDynamicTesting());
        })
      ];


      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        promises.push(System['import'](wallaby.tests[i]));
      }


      Promise.all(promises).then(function () {
        wallaby.start();
      }).catch(function (e) {
        setTimeout(function () {
          console.log(e);
          throw e;
        }, 0);
      });
    }
  };
};
