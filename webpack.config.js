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
        app: "./assets/js/script.js",//app.bundle.js
        events: "./assets/js/events.js",// events.bundle.js
        schedule: "./assets/js/schedule.js",// schedule.bundle.js
        tickets: "./assets/js/tickets.js",// tickets.bundle.js
    } ,
    // best practice to put bundled code into a folder named dist
    output: {
       // path: path.join(__dirname, '/dist'),
       // build will make one file per entry point
        filename: '[name].bundle.js',
        path: __dirname + "/dist", 
    },
    // Used to compress jpgs
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // Makes img file names readable
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace("../", "/assets/")
                            }

                        }
                    }
                ]
            }
        ]
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

