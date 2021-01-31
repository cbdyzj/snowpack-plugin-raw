const { promises: { readFile } } = require('fs')

module.exports = function (snowpackConfig, pluginOptions = { extensions: [] }) {

    return {
        name: 'snowpack-plugin-raw',
        resolve: {
            input: [...pluginOptions.extensions],
            output: ['.js', ...pluginOptions.extensions],
        },
        async load({ filePath }) {
            const { encoding = 'utf-8' } = pluginOptions
            const content = await readFile(filePath, encoding) || ''
            const proxied = content.replace(/\n/g, '\\n').replace(/"/g, '\\"')
            return {
                '.js': `export default "${proxied}";`,
                '': content,
            }
        },
    }
}