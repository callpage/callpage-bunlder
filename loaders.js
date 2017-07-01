class Loaders {
	constructor(loader, path) {
		this.loader = loader
		this.path = path
	}
	getLoader() {
		if (this.loader === "babel") {
			return `{test: /\\.js$/, exclude: path.resolve('/${this.path}/'),loader: 'babel-loader', options: {	presets: [ ["es2015", {modules: false}]]}}`
		} else if (this.loader === "scss") {
			return `{test: /\\.s[ac]ss$/, loader: ENV ? ExtractTextPlugin.extract(['css-loader', 'sass-loader']) : [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ]}`
		} else if (this.loader === "eslint") {
			return `{test: /\\.js$/, exclude: /node_modules/ ,enforce: 'pre', loader: 'eslint-loader', options: { emitWarning: true, configFile: path.resolve(process.cwd(), '.eslintrc.js')}}`
		} else if (this.loader === "images") {
			return `{test: /\\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,loaders: [{loader: 'file-loader',options: {name: 'images/[name].[ext]'}},{loader: 'img-loader'}]}`
		} else {
			throw new Error('Invalid loader name')
		}
	}
}

module.exports = function (loaderName, path) {
	const loader = new Loaders(loaderName, path)
	return loader.getLoader()
}
