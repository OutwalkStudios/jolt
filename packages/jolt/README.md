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

You can install jolt using npm:

Install using [npm](https://www.npmjs.com/package/jolt):
```bash
npm install jolt
```

---

 Table of Contents
-----------------
- [Using Components in your Application](#using-components-in-your-application)
- [Event Binding with Jolt](#event-binding-with-jolt)
- [State Management with Jolt](#state-management-with-jolt)

---

## Using Components In Your Application

Components are the building blocks to your application, There are two types of components you can create, function components, and class components, depending on what the component is for will determine which type is a better fit. `Component.create` is used to register the component as a valid WebComponent.

<strong>NOTICE:</strong> 
- Component names are required to have hyphen in the name in order to not conflict with standardized HTML elements.
- Components must be registerd with an element name in order to be available to use.
- Components make use of the [ShadowDOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), this can be disabled by using the `useShadow` option in `Component.create`.

### Function Components

For simple parts of your application or to simply render html, function components are the best option. They dont offer state management or lifecycle functions like class components do, but they can react to changes in the component attributes. An Object containing all the components attributes is passed into the function when rendered.

**Example:**
```js
import { Component, html } from "jolt";

const App = () => {
    return html`
        <h1>Hello World!</h1>
    `;
}

Component.create({ name: "app-root" }, App);

Component.mount(App, document.body);
```

### Class Components

When you are building a component that needs state management or lifecycle methods, you should use class components, A class component has a `state` property for updating the component state, as well as lifecycle methods. An Object containing all the components attributes are passed into the components `render` method when rendered, as well as available as an `attribs` property.

#### Lifecycle Methods
- didLoad() - runs when the component has finished loading.
- shouldUpdate(key, value) - runs when determining if the component should update.
- didUpdate(key, value) - runs when the component has finished updating.
- willUnload() - runs when the component is being removed from the DOM.

**Example:**
```js
import { Component, html } from "jolt";

class HelloWorld extends Component {

    render() {
        return html`
            <h1>Hello World!</h1>
        `;
    }
}

Component.create({ name: "hello-world" }, HelloWorld);
```

---

## Event Binding With Jolt

Jolt has a simple way to bind events to elements. Instead of managing and creating your own event listeners, you can let Jolt manage it all for you! To bind an event to an element you just create a normal event listener but pass a function as the value instead of a string.

```js
html`<button onclick=${() => alert("I was clicked")}>Click Me!</button>`
```

---

## State Management With Jolt

Jolt comes with a built-in solution to state management. State is localized to the component containing the state property. The [Component](#class-components) class contains a `state` property that you can store your state in. When a property in the state object is changed it will update the part of the DOM that changed as a result.

You can set the initial state in the constructor. When using the Component constructor you must always call the super constructor.

```js
import { Component, html } from "jolt";

class MyComponent extends Component {
  constructor() {
    super();

    this.state.set({
      date: new Date()
    });
  }

  render() {
    return html`
      <span>The current date is ${this.state.date}</span>
      <button onclick=${() => this.updateDate()}>Update Date</button>
    `;
  }

  updateDate() {
    this.state.date = new Date();
  };
}

Component.create({ name: "my-component" }, MyComponent);
```

---

## Reporting Issues

If you are having trouble getting something to work with Jolt, you can ask in our [discord](https://discord.gg/jMQHZkG) or create a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If you find a bug or if something is not working properly, you can report it by creating a new [Issue](https://github.com/OutwalkStudios/jolt/issues).

If Jolt does not fit your needs or is missing a feature you would like to see, let us know! We would greatly appreciate your feedback on it.

You can contact Outwalk Studios directly by email using `support@outwalkstudios.com`.

---

## License

Jolt is licensed under the terms of the [**MIT**](https://github.com/OutwalkStudios/jolt/blob/master/LICENSE) license.