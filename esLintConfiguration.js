class EsLintConfiguration {

    constructor(configuration) {
        this.eslintConfiguration = configuration[0].js.eslint
        this.codeStyle = this.eslintConfiguration.codestyle ? '"eslint:recommended"' : undefined;
        this.johnPapa = this.eslintConfiguration.angular ? '"plugin:angular/johnpapa"' : undefined;
        this.angular = this.eslintConfiguration.angular ?  '"angular"' : undefined;
        this.vue = this.eslintConfiguration.vue ? "vue" : undefined;
        this.rules = [this.codeStyle, this.johnPapa].filter(elem => elem).join(',')
        this.plugins = [this.angular, this.vue].filter(elem => elem).join(',')
    }

    createEsLintConfig() {
       return this.makeEsLintConfig()
    }

    makeEsLintConfig() {
        return `module.exports = { 
            "globals": {
                "angular": ${this.eslintConfiguration.angular ? "1" : "null"}
            },
            "env": {
                "es6": ${this.eslintConfiguration.es6 ? "true" : "false"},
                "browser": true,
                "commonjs": true
            },
            "extends": [${this.rules}],
            "parserOptions": {
                "sourceType": "module"
            },
            "plugins": [${this.plugins}],
            "rules": {}
        }`
    }
}

module.exports = function (esLintConfig) {
    const eslint = new EsLintConfiguration(esLintConfig)
    return eslint.createEsLintConfig()
}
