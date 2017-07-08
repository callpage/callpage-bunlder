# callpage-webpack

This is an smart tool that, thanks to simple object configuration, is able to create webpack configuration

### Getting started

Install the plugin:
```
npm install --save-dev callpage-webpack
```
### Usage

Add to your package.json scripts command e.g ``` "create" : "path/to/node_modules/callpage-webpack/core.js" ```

### Example configration

```The  exported value must be an array!```

```javascript

module.exports = [
  {
      vendorPath: "node_modules",
      buildPath: "/build",
      js: {
            
      }
  }
]
```
