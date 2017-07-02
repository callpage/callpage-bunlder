const requireLoader = require('./loaders.js');
const requiredPlugins = require('./plugins.js');

class WebpackConfiguration {

    constructor(webpackConfig) {
        this.webpackConfig = webpackConfig;
        this.images = false;
        this.configuration = `
        ${requiredPlugins(this.webpackConfig)}
        const ENV = process.env.NODE_ENV === 'production'
        const configs = [`;
    }

    getPlugins(config) {
        const plugins = [`new CleanWebpackPlugin(['${config.buildPath}'], { root: path.join(__dirname), verbose: true, dry: false })`]
        if (config.scss) {
            plugins.push(`new PurifyCSSPlugin({paths: glob.sync(path.join(__dirname, '/*.html')), minimize: ENV })`)
        }
        if (config.copy) {
            if (config.copy.files.length > 0) {
                plugins.push(`new CopyWebpackPlugin([${this.copy}])`)
            }
        }
        if (config.js.plugins.ngAnnotate) {
            plugins.push(`new ngAnnotate({add: true})`)
        }
        return plugins
    }
    
    getProductionPlugins(config) {
        return [
            config.js ? `new webpack.optimize.UglifyJsPlugin())` : undefined,
            config.scss ? `new ExtractTextPlugin({filename: 'styles/[name].css', allChunks: true})` : undefined
        ].filter(plugin => plugin).join(',')
    }

    getLoaders(config) {
        return [
            config.js.es6 ? requireLoader("babel", config.vendorPath) : undefined,
            config.scss ? requireLoader("scss") : undefined,
            config.eslint ? requireLoader("eslint") : undefined,
            this.hasImages ? requireLoader("images") : undefined
        ].filter(elem => elem).join(',')
    }

    setEntry(config) {
        let entry = []
        if (config.js.entry) {
            entry.push(`'./${config.js.entry}'`)
        }
        if (config.scss) {
            if (config.scss.entry) {
                entry.push(`'./${config.scss.entry}'`)
            }
        }
        return entry;
    }

    setCopy(config) {
        if (config.copy) {
            if (config.copy.files.length > 0) {
                return config.copy.files.map(function (file) {
                    return `{from: '${file.from}', to: '${file.to}'}`
                })
            }
        } else {
            return [];
        }
    }
    
    createConfiguration() {
        this.webpackConfig.forEach(function (config) {
            this.entry = this.setEntry(config)
            this.copy = this.setCopy(config)
            this.plugins = this.getPlugins(config)
            this.loaders = this.getLoaders(config)
            this.productionPlugins = this.getProductionPlugins(config)
            this.configuration += `{
                entry: [${this.entry}],
                ${config.js.sourceMaps ? "devtool: ENV ? 'cheap-source-map' : 'eval'," : ""}
                output: {
                    path: path.join(__dirname, '${config.buildPath}'),
                    filename: '${this.entry.length === 1 ? config.js.output : '[name].js'}',
                    publicPath: './'
                },
            	devServer: {
                    historyApiFallback: true,
                    publicPath: '/',
                    contentBase: path.join(__dirname, '/../src/'),
                    stats: "minimal",
                    open: true 
	            },
                resolve: {
                    modules: ['${config.vendorPath ? config.vendorPath : ''}']
                },
                plugins: [${this.plugins}],
                module: {
                    rules: [${this.loaders}]
                }
            },`
        }.bind(this))
        return `${this.configuration}]  
            if(ENV) {
                configs.forEach(config => config.plugins.push(
                    ${this.productionPlugins}
                    )
            }
	module.exports = configs`
    }
}


module.exports = function (webpackConfig) {
    const webpack = new WebpackConfiguration(webpackConfig)
    return webpack.createConfiguration()
}
