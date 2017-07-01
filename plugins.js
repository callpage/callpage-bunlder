class Plugins {
    constructor(configWepback) {
        this.configWepback = configWepback[0];
        this.ngAnnotate = this.configWepback.js.plugins.ngAnnotate ? `const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');` : undefined;
        this.copyFile = this.configWepback.copy.files.length > 0 ? `const CopyWebpackPlugin = require('copy-webpack-plugin');`: undefined;
        this.purifyAndExtract = this.configWepback.scss ? `const PurifyCSSPlugin = require('purifycss-webpack'); const ExtractTextPlugin = require("extract-text-webpack-plugin");`: undefined;
        this.plugins = [this.ngAnnotate, this.copyFile, this.purifyAndExtract].filter(plugin => plugin).join(' ')
    }
    getPlugins () {
        let template = `const webpack = require('webpack');
                                const path = require('path');
                                const glob = require('glob');
                                const CleanWebpackPlugin = require('clean-webpack-plugin');
                                ${this.plugins}
                                `
        return template;
    }
}

module.exports = function (webpackConfig) {
    const plugin = new Plugins(webpackConfig)
    return plugin.getPlugins()
}


