# @jolt/toolchain-javascript

This package is used to develop JavaScript projects with [@jolt/cli](https://www.npmjs.com/package/@jolt/cli)

![Actions](https://github.com/OutwalkStudios/jolt/workflows/build/badge.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/OutwalkStudios/jolt/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/patreon-donate-green.svg)](https://www.patreon.com/outwalkstudios)
[![Follow Us](https://img.shields.io/badge/follow-on%20twitter-4AA1EC.svg)](https://twitter.com/OutwalkStudios)

---

## How To Use This Toolchain?

To make this toolchain the active toolchain for @jolt/cli, first install it.
```
npm install --save-dev @jolt/toolchain-javascript
```

then add set the `toolchain` property in `jolt.json` to `@jolt/toolchain-javascript`

```json
{
    "toolchain": "@jolt/toolchain-javascript"
}
```

---

## What Does This Toolchain Do?

This toolchain powers the development commands for @jolt/cli.

This toolchain also offers some extra config options:

#### Options
- targets (default: "> 1.5%, not dead") - a browserlist query for what browsers to target.
- minify (default: true) - determines whether or not the template and css sourcecode should be minified.
- sourcemap (default: false) - determines whether or not sourcemaps are generated.
- preamble (default: null) - text to append to the top of the bundle.
- mappings (default: null) - object that maps aliases to file paths.
- devServer (default: null) - [@jolt/server](https://github.com/OutwalkStudios/jolt/tree/master/packages/server#readme) options.

---

## Reporting Issues

If you are having trouble getting something to work with this toolchain, you can ask in our [discord](https://discord.gg/jMQHZkG) or create a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If you find a bug or if something is not working properly, you can report it by creating a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If this toolchain does not fit your needs or is missing a feature you would like to see, let us know! We would greatly appreciate your feedback on it.

You can contact Outwalk Studios directly using `support@outwalkstudios.com`

---

## License
@jolt/toolchain-javascript is licensed under the terms of the [**MIT**](https://github.com/OutwalkStudios/jolt/blob/master/LICENSE) license.