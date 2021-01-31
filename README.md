# snowpack-plugin-raw

Resolves file import to raw string.

```sh
npm install --save-dev snowpack-plugin-raw
```

```javascript
// snowpack.config.json
{
  "plugins": [
    ["snowpack-plugin-raw", { extensions: [".txt", ".md"] }]
  ]
}
```

## Plugin Options

- extensions: File extensions.
- encoding: File encoding, default `utf-8`.