class Validator {
    constructor(webpackConfig) {
        this.webpackConfig = webpackConfig;
    }

    validate () {
        this.validateBasePath()
        this.validateBuildPath()
        this.validateVendorPath()
        this.validateEntryJs()
        this.validateEntryScss()
    }

    validateBasePath () {
        this.webpackConfig.forEach(function (config, index) {
            if(config.basePath) {
                if(!(config.basePath.startsWith('/'))) {
                    throw new Error(`base path in object ${index} should start with \'/\' `)
                }
            }
        })
    }
    validateBuildPath () {
        this.webpackConfig.forEach(function (config, index) {
            if(config.buildPath) {
                if(!(config.buildPath.startsWith('/'))) {
                    throw new Error(`build path in object ${index} should start with \'/\' `)
                }
            }
        })
    }
    validateVendorPath () {
        this.webpackConfig.forEach(function (config, index) {
            if(config.vendorPath) {
                if(config.vendorPath.startsWith('/') || config.vendorPath.endsWith('/')) {
                    throw new Error(`vendor path in object ${index} shouldn't start or end with' \'/\' `)
                }
            }
        })
    }
    validateEntryJs() {
        this.webpackConfig.forEach(function (config) {    
            if(config.js) {
                if(config.js.entry.startsWith('./') || config.js.entry.startsWith('/')) {
                    throw new Error(`js entry in object ${index} shouldn't contains './'`)
                }
            }
        })
    }
    validateEntryScss() {
        this.webpackConfig.forEach(function (config) {
            if(config.scss) {
                if(config.scss.entry.startsWith('./') || config.scss.entry.startsWith('/')) {
                    throw new Error(`scss entry in object ${index} shouldn't contains './' or '/'`)
                }
            } 
        })
    }
}

module.exports = function(webpackConfig) {
    const validator = new Validator(webpackConfig);
    validator.validate();
};
