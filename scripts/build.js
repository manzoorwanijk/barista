/**
 * script to build Event Espresso packages into `build/` directory.
 *
 * @see https://github.com/WordPress/packages where original script came from.
 *
 *
 * Example:
 *  node ./scripts/build.js
 */

/**
 * External Dependencies
 */
const fs = require( 'fs' );
const path = require( 'path' );
const glob = require( 'glob' );
const babel = require( 'babel-core' );
const chalk = require( 'chalk' );
const mkdirp = require( 'mkdirp' );
const babelTransform = require( 'babel-plugin-transform-react-jsx' );

/**
 * Module Constants
 */
const PACKAGES_DIR = path.resolve( __dirname, '../packages' );
const WORDPRESS_PACKAGES_DIR = path.resolve( __dirname, '../wordpress-packages');
const SRC_DIR = 'src';
const BUILD_DIR = {
    main: 'build',
    module: 'build-module',
};
const DONE = chalk.reset.inverse.bold.green( ' DONE ' );

/**
 * Babel Configuration
 */
const babelDefaultConfig = require( '@wordpress/babel-preset-default' );
babelDefaultConfig.babelrc = false;
const presetEnvConfig = babelDefaultConfig.presets[ 0 ][ 1 ];
const WordPressBabelConfigs = {
    main: Object.assign(
        {},
        babelDefaultConfig,
        { presets: [
                [ 'env', Object.assign(
                    {},
                    presetEnvConfig,
                    { modules: 'commonjs' },
                ) ],
            ] }
    ),
    module: babelDefaultConfig,
};
const defaultBabelConfigs = filterOutWPSpecifics(WordPressBabelConfigs);

let directoryBeingProcessed;

/**
 * Returns the absolute path of all packages
 *
 * @return {Array} Package paths
 */
function getAllPackages(pathToProcess) {
    directoryBeingProcessed = pathToProcess;
    return fs
        .readdirSync( pathToProcess )
        .map( ( file ) => path.resolve( pathToProcess, file ) )
.filter( ( f ) => fs.lstatSync( path.resolve( f ) ).isDirectory() );
}

/**
 * Get the package name for a specified file
 *
 * @param  {String} file File name
 * @return {String}      Package name
 */
function getPackageName( file ) {
    return path.relative( directoryBeingProcessed, file ).split( path.sep )[ 0 ];
}

/**
 * Get Build Path for a specified file
 *
 * @param  {String} file        File to build
 * @param  {String} buildFolder Output folder
 * @return {String}             Build path
 */
function getBuildPath( file, buildFolder ) {
    const pkgName = getPackageName( file );
    const pkgSrcPath = path.resolve( directoryBeingProcessed, pkgName, SRC_DIR );
    const pkgBuildPath = path.resolve( directoryBeingProcessed, pkgName, buildFolder );
    const relativeToSrcPath = path.relative( pkgSrcPath, file );
    return path.resolve( pkgBuildPath, relativeToSrcPath );
}

/**
 * Build a file for the required environments (node and ES5)
 *
 * @param {String} file    File path to build
 * @param {Boolean} silent Show logs
 */
function buildFile( file, silent ) {
    buildFileFor( file, silent, 'main' );
    buildFileFor( file, silent, 'module' );
}

/**
 * Build a file for a specific environment
 *
 * @param {String}  file        File path to build
 * @param {Boolean} silent      Show logs
 * @param {String}  environment Dist environment (node or es5)
 */
function buildFileFor( file, silent, environment ) {
    const buildDir = BUILD_DIR[ environment ];
    const destPath = getBuildPath( file, buildDir );
    const babelOptions = getBabelConfig(environment);
    mkdirp.sync( path.dirname( destPath ) );
    const transformed = babel.transformFileSync( file, babelOptions ).code;
    fs.writeFileSync( destPath, transformed );
    if ( ! silent ) {
        process.stdout.write(
            chalk.green( '  \u2022 ' ) +
            path.relative( directoryBeingProcessed, file ) +
            chalk.green( ' \u21D2 ' ) +
            path.relative( directoryBeingProcessed, destPath ) +
            '\n'
        );
    }
}


/**
 * For the given file the path is read and if the file is located in wordpress-packages then the WordPressBabelConfigs
 * are used. Otherwise, default babel configs are used.
 *
 * @param environment
 * @param file
 */
function getBabelConfig(environment) {
    const sourcedir = path.relative(path.dirname(directoryBeingProcessed), directoryBeingProcessed);
    return sourcedir === 'packages'
        ? defaultBabelConfigs[ environment ]
        : WordPressBabelConfigs[ environment ];
}

/**
 * Build the provided package path
 *
 * @param {String} packagePath absolute package path
 */
function buildPackage( packagePath ) {
    const srcDir = path.resolve( packagePath, SRC_DIR );
    const files = glob.sync( srcDir + '/**/*.js', { nodir: true } )
        .filter( file => ! /\.test\.js/.test( file ) );

    process.stdout.write( `${ path.basename( packagePath ) }\n` );

    files.forEach( file => buildFile( file, true ) );
    process.stdout.write( `${ DONE }\n` );
}


/**
 * Filter out WP specific transforms from babel config that we want on non wp specific packages
 */
function filterOutWPSpecifics(babelConfig) {
    babelConfig.main.plugins[1] = babelTransform;
    babelConfig.module.plugins[1] = babelTransform;
    return babelConfig;
}

process.stdout.write( chalk.inverse( '>> Building packages \n' ) );
getAllPackages(PACKAGES_DIR)
    .forEach( buildPackage );
getAllPackages(WORDPRESS_PACKAGES_DIR)
    .forEach( buildPackage );
process.stdout.write( '\n' );
