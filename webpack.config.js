/**
 * Created by n0212893 on 6/28/2016.
 */
module.exports = {
    entry : './src/scripts/app.js',
    output: {
        filename: 'app.js'
    }
};

module.exports = {
    entry : './src/scripts/app.js',
    output : {
        filename: 'app.js'
    },
    moduel: {
        loaders: [ {
            test : /.js$/,
            loader : 'babel-loader',
            query : {
                presets: ['es2015']
            }
        }]
    }
};