# Jolt CLI

A CLI tool for Jolt development

![Actions](https://github.com/OutwalkStudios/jolt/workflows/build/badge.svg)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/OutwalkStudios/jolt/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/patreon-donate-green.svg)](https://www.patreon.com/outwalkstudios)
[![Follow Us](https://img.shields.io/badge/follow-on%20twitter-4AA1EC.svg)](https://twitter.com/OutwalkStudios)

---

## Installation

You can install @jolt/cli using npm.

Install globally using [npm](https://www.npmjs.com/package/@jolt/cli):
```bash
npm install -g @jolt/cli
```

---

## Usage

The Jolt CLI comes with several commands to run the development process.

### Generate A Project

You can generate a project using the `create` command.

```
jolt create [project-name] <options>
```

### Generate A Component

You can generate a component using the `generate` command.

```
jolt generate [component-name] <options>
```

### Building A Project

You can build the project by using the `build` command or the `watch` command.

```
# Build the app
jolt build

# Build the app when you make changes to a source file
jolt watch
```

These commands will make a call into the toolchain set in `jolt.json` and run the exposed `build` or `watch` command.

### Running A Development Server

You can run a development server using the `serve` command.

```
jolt serve <options>
```

This will launch a development server and rebuild the app whenever a source file is changed.

### Updating Jolt

You can update the project's CLI and toolchain by using the `update` command.

```
jolt update
```

This command guarantees a compatible and smooth update of jolt dependencies, ensuring your project does not break.

---

## Reporting Issues

If you are having trouble getting something to work with Jolt CLI, you can ask in our [discord](https://discord.gg/jMQHZkG) or create a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If you find a bug or if something is not working properly, you can report it by creating a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If Jolt CLI does not fit your needs or is missing a feature you would like to see, let us know! We would greatly appreciate your feedback on it.

You can contact Outwalk Studios directly by email using `support@outwalkstudios.com`.

## License

Jolt CLI is licensed under the terms of the [**MIT**](https://github.com/OutwalkStudios/jolt/blob/master/LICENSE) license.
