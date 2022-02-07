const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const  webpack  = require("webpack");
const path = require("path");




// for a basic config of webpack we need 3 properties
// 1. entry
// 2. output
// 3. mode

// Module exports object
module.exports = { 
    entry:{
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js",
    } ,
    // best practice to put bundled code into a folder named dist
    output: {
       // path: path.join(__dirname, '/dist'),
        filename: 'main.bundle.js'
        path: __dirname + "/dist", 
    },

    // We want webpack to use jquery
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"    
        }),
        new BundleAnalyzerPlugin({
            // The report outputs to report.HTML file in the dist folder
            analyzerMode: "static", 
        })
    ],

    // By default mode is production, but we want development
    mode: 'development'

};

