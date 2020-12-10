<div align="center">
    <img src="https://raw.githubusercontent.com/OutwalkStudios/jolt/master/resources/jolt-logo.svg" alt="Jolt" width="400px" height="300px" />
</div>

<div align="center">
    <p><strong>A JavaScript framework for building lightning fast web apps.</strong></p>
    <p>Build responsive web apps for desktop and mobile platforms.</p>
    <a href="#">
        <img src="https://github.com/OutwalkStudios/jolt/workflows/build/badge.svg" alt="Current build status of Jolt">
    </a>
    <a href="https://github.com/OutwalkStudios/jolt/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Jolt is released under the MIT license">
    </a>
    <a href="https://www.patreon.com/outwalkstudios">
        <img src="https://img.shields.io/badge/patreon-donate-green.svg" alt="Donate on Patreon">
    </a>
    <a href="https://twitter.com/OutwalkStudios">
        <img src="https://img.shields.io/badge/follow-on%20twitter-4AA1EC.svg" alt="Follow us on Twitter">
    </a>
</div>

---

## Installation

To get started building applications in Jolt, the first step is to install the Jolt CLI,
the CLI is used to create projects and handle ongoing tasks such as bundling, linting, and running a development server.

To install the Jolt CLI, run the following command:
```
npm install -g @jolt/cli
```

You can read more on the Jolt CLI's [README](https://github.com/OutwalkStudios/jolt/tree/master/packages/cli#readme).

---

## Getting Started

### Create a new Project

You can create a new project by running the `create` command and supply the app name for the project.
```
jolt create <app-name>
```

The CLI will create a new project with the supplied name, install all the required dependencies, as well as configure the project config.

### Run the Application

The Jolt CLI comes with a built in live reloading development server.
Running the `serve` command will launch a web server, watch your files, and build the app as you make changes to the files.
```
# Navigate to the project folder
cd app-name

# Launch the development server
jolt serve
```

---

## Ecosystem

| Project | Description |
|---------|-------------|
| [jolt](https://www.npmjs.com/package/jolt)      | Core Framework |
| [@jolt/server](https://www.npmjs.com/package/@jolt/server)        | Live Reloading Development Server |
| [@jolt/router](https://www.npmjs.com/package/@jolt/router)      | Single Page Application Routing |
| [@jolt/cli](https://www.npmjs.com/package/@jolt/cli)        | Project Scaffolding |
| [@jolt/toolchain-javascript](https://www.npmjs.com/package/@jolt/toolchain-javascript) | JavaScript Toolchain |
| [@jolt/toolchain-typescript](https://www.npmjs.com/package/@jolt/toolchain-typescript) | TypeScript Toolchain |

---

## Resources

[Get Started Learning Jolt](https://github.com/OutwalkStudios/jolt/tree/master/packages/jolt#readme) - Learn the features provided in the core Jolt package. </br>
[Build a Single Page Application with Jolt](https://github.com/OutwalkStudios/jolt/tree/master/packages/router#readme) - Learn to build an SPA with @jolt/router. </br>
[Use Jolt with TypeScript](https://github.com/OutwalkStudios/jolt/tree/master/packages/toolchain-typescript#readme) - Learn to setup Jolt with TypeScript. </br>

---

## Why Use Jolt

Jolt is a lightweight frontend JavaScript framework. It was developed to make creating web apps in a very simple and easy way. It is designed to only use web standards meaning all the code you write can run directly in a browser without a build step. Unlike other frameworks that utilize a Virtual DOM, Jolt uses the real DOM and only makes changes to the elements that have changed. This makes Jolt very fast when making updates to the DOM. Jolt Components are built as an abstraction over native Web Components with additonal features such as state management and event binding. Templates in Jolt are designed similar to JSX but without the compliation step. If you are looking for a powerful and lightweight framework to build your next app using the tools you love, then Jolt may be the solution your looking for!

---

## Reporting Issues

If you are having trouble getting something to work with Jolt, you can ask in our [discord](https://discord.gg/jMQHZkG) or create a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If you find a bug or if something is not working properly, you can report it by creating a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If Jolt does not fit your needs or is missing a feature you would like to see, let us know! We would greatly appreciate your feedback on it.

You can contact Outwalk Studios directly by email using `support@outwalkstudios.com`.

---

## License

Jolt is licensed under the terms of the [**MIT**](https://github.com/OutwalkStudios/jolt/blob/master/LICENSE) license.
