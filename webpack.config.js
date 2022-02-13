

const  webpack  = require("webpack");
const path = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;







// for a basic config of webpack we need 3 properties
// 1. entry
// 2. output
// 3. mode

// Module exports object
module.exports = { 
    entry:{
        app: "./public/assets/js/script.js",//app.bundle.js
        events: "./public/assets/js/events.js",// events.bundle.js
        schedule: "./public/assets/js/schedule.js",// schedule.bundle.js
        tickets: "./public/assets/js/tickets.js",// tickets.bundle.js
    } ,
   
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
                                return url.replace("../", "./public/assets/")
                                
                            }

                        }
                    },
                    // TODO: this might be wrong spot
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
     // best practice to put bundled code into a folder named dist
     output: {
        // path: path.join(__dirname, '/dist'),
        // build will make one file per entry point
         filename: '[name].bundle.js',
         // changed to /public/dist
         path: __dirname +  "/public/dist"
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
        }),

        // new invokes a constructor
        new WebpackPwaManifest({
            name: "Food Event" ,
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events." ,
            start_url: "../public/index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            fingerprints: false,
            inject: false,
            icons: [{
                src: path.resolve("public/assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192,256,384, 512],
                // TODO: might need to add public
                destination: path.join("public", "assets", "icons")
            }]
        })
    ],

    // By default mode is production, but we want development
    mode: 'development'

};

