const fs = require('fs')

module.exports = function (snowpackConfig, pluginOptions = { extensions: [] }) {

    const importedByMap = new Map();

    function addImportsToMap(filePath, importedPath) {
        const importedBy = importedByMap.get(importedPath);
        if (importedBy) {
            importedBy.add(filePath);
        } else {
            importedByMap.set(importedPath, new Set([filePath]));
        }
    }

    return {
        name: 'snowpack-plugin-raw',
        resolve: {
            input: [...pluginOptions.extensions],
            output: ['.proxy.js', ...pluginOptions.extensions],
        },
        onChange({ filePath }) {
            if (importedByMap.has(filePath)) {
                const importedBy = importedByMap.get(filePath);
                importedByMap.delete(filePath);
                for (const importerFilePath of importedBy) {
                    this.markChanged(importerFilePath);
                }
            }
        },
        async load({ filePath, isDev }) {
            const { encoding = 'utf-8' } = pluginOptions
            const content = fs.readFileSync(filePath, encoding) || ''
            const proxied = content.replace(/\n/g, '\\n').replace(/"/g, '\\"')
            console.log('load it')
            return {
                '.proxy.js': `export default "${proxied}";`,
                '': content,
            }
        },
    }
}