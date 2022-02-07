const  webpack  = require("webpack");
const path = require("path");


// for a basic config of webpack we need 3 properties
// 1. entry
// 2. output
// 3. mode

// Module exports object
module.exports = { 
    entry: './assets/js/script.js',
    // best practice to put bundled code into a folder named dist
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.bundle.js' 
    },

    // We want webpack to use jquery
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"    
        }),
    ],

    // By default mode is production, but we want development
    mode: 'development'

};

