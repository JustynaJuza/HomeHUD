This project uses Webpack for bundling. Navigate to the project directory containing node_modules and run 

webpack 

to generate the bundle. It should be possible to use webpack's dev server but it requires some more setup, don't know how to do this yet.

Using CSS Modules in Typescript requires generating .d.ts files for each stylesheet, to do that we use https://github.com/Quramy/typed-css-modules with:

npm install -g typed-css-modules

tcm path/to/styles