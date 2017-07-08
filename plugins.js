class Plugins {
    constructor(configWepback) {
        this.configWepback = configWepback[0];
        this.template = `
            const webpack = require('webpack');
            const path = require('path');
            const glob = require('glob');
            const CleanWebpackPlugin = require('clean-webpack-plugin');`
    }
    getPlugins () {
        this.getNgAnnotatePlugin()
        this.getCopyPlugin()
        this.getScssPlugin()
        return this.template;         
    }

    getNgAnnotatePlugin() {
        if(this.configWepback.js.plugins) {
            if(this.configWepback.js.plugins.ngAnnotate) {
                this.template += `const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');`
            }
        }
    }
    getCopyPlugin() {
        if(this.configWepback.copy) {
            if(this.configWepback.copy.files.length > 0) {
                this.template += `const CopyWebpackPlugin = require('copy-webpack-plugin');`
            }
        }
    }
    getScssPlugin() {
        if(this.configWepback.scss) {
            this.template += `const PurifyCSSPlugin = require('purifycss-webpack'); const ExtractTextPlugin = require("extract-text-webpack-plugin");`
        }
    }
}

module.exports = function (webpackConfig) {
    const plugin = new Plugins(webpackConfig)
    return plugin.getPlugins()
}
