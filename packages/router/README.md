# Jolt Router

The official router for Jolt

![Actions](https://github.com/OutwalkStudios/jolt/workflows/build/badge.svg)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/OutwalkStudios/jolt-router/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/patreon-donate-green.svg)](https://www.patreon.com/outwalkstudios)
[![Follow Us](https://img.shields.io/badge/follow-on%20twitter-4AA1EC.svg)](https://twitter.com/OutwalkStudios)

---

## Installation

You can install @jolt/router using npm:

Install using [npm](https://www.npmjs.com/package/@jolt/router):
```bash
npm install @jolt/router
```

---

## Routing with Jolt Router

The Router class supports both Push State Routing and Hash Based Routing.
When a route is requested it will render the function component that is tied to the route.

**Example:**
```js
import { Component, html } from "jolt";
import { Router } from "@jolt/router";

const App = () => {
    return html`
        <h1>Hello World!</h1>
    `;
}

Component.create({ name: "app-root" }, App);

Router.set({
    "/": App
});

Router.mount(document.body);
```

The example above set the routes for the Router and sets the default route to render the App component.
Additonally you can create parameterized routes and use the parameter's values elsewhere in your code.
All parameters in routes must start with a colon, that tells the router to accept any value there and save it as a parameter. Adding a question mark at the end of a parameter will mark it as optional.

## Parameterized Routes

You can create routes that act as variables. To create a parameterized route you mark the route fragment with a `:`, 
Additonially adding a `?` to the end of a route marks it as an optional parameter.

**Example:**
```js
import { Component, html } from "jolt";
import { Router } from "@jolt/router";

function UsersPage() {
    const { user } = Router.getParameters();

    return html`
        <h1>Hello ${user}!</h1>
    `;
}

Component.create({ name: "users-page" }, Users);

Router.set({
    "/users/:user" : UsersPage
});

Router.mount(document.body);
```

This example creates a component that welcomes a user, it gets the users name by getting it from the routes parameters.
If the url was `http://www.example.com/users/newuser` the component would render `Hello newuser!`.

The Router uses Push State Routing by default which requires configuring the server.

If you are unable to configure the server or want a simpler approach,
you can enable Hash Based Routing by passing `{ useHash: true }` as a second argument to `Router.mount`.

To setup up Push State Routing configure your server to respond to page requests with your index.html file.
The easiest way to have a server that supports push state routing is to use [@jolt/server](https://www.npmjs.com/package/@jolt/server).

---

## Reporting Issues

If you are having trouble getting something to work with Jolt Router, you can ask in our [discord](https://discord.gg/jMQHZkG) or create a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If you find a bug or if something is not working properly, you can report it by creating a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If Jolt does not fit your needs or is missing a feature you would like to see, let us know! We would greatly appreciate your feedback on it.

You can contact Outwalk Studios directly by email using `support@outwalkstudios.com`.

---

## License

Jolt Router is licensed under the terms of the [**MIT**](https://github.com/OutwalkStudios/jolt/blob/master/LICENSE) license.