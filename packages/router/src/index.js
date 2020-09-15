/* imports */
import { Component } from "jolt";

/**
 * @typedef {Object} RouterOptions
 * @property {boolean} [useHash=false]
 */

/**
 * Creates a Router that handles parsing parameterized routes
 * and rendering the component associated with the current url.
 * @class
 */
export class Router {

    static _routes = {};
    static _container;
    static _parameters;

    /**
     * Set the application routes.
     * @param {Object.<string, CustomElementConstructor|Function} routes
     */
    static set(routes = {}) {
        Router._routes = routes;
    }

    /**
     * Starts the Router's routing mechanism and mounts the application.
     * @param {HTMLElement} container 
     * @param {RouterOptions} options 
     */
    static mount(container, options = {}) {
        Router._container = container;

        const mode = (options.useHash) ? "hashchange" : "popstate";

        window.addEventListener(mode, () => {
            Router._resolve((options.useHash) ? (window.location.hash.slice(1) || "/") : (window.location.pathname || "/"));
        });

        Router._resolve((options.useHash) ? (window.location.hash.slice(1) || "/") : (window.location.pathname || "/"));
    }

    /**
     * Adds a route to the Router's route mapping.
     * @param {string} route 
     * @param {CustomElementConstructor|Function} component 
     */
    static on(route, component) {
        Router._routes[route] = component;
    }

    /**
     * Sets the component to be rendered when the router can not find a matching route.
     * @param {CustomElementConstructor|Function} component 
     */
    static notFound(component) {
        Router._routes["notFound"] = component;
    }

    /**
     * Navigates to the desired url.
     * @param {string} url 
     */
    static navigate(url) {
        window.history.pushState({}, url, (window.location.origin + url));

        Router._resolve(url);
    }

    /**
     * Gets the active route's parameters.
     * @return {Object.<string, string>}
     */
    static getParameters() {
        return Router._parameters;
    }

    /**
     * Matches a url to a route.
     * @param {string} route 
     * @param {string} url 
     * @return {Array}
     * @private
     */
    static _match(route, url) {
        let names = [];
        let index = 0;

        /* parse the route into a regular expression to match against a url */
        const regex = route
            .replace(/([:*])(\w+)\?/g, (full, colon, name) => {
                names[index++] = name;
                return "?([^/]+)?";
            })
            .replace(/([:*])(\w+)/g, (full, colon, name) => {
                names[index++] = name;
                return "([^/]+)";
            });

        const match = url.match(new RegExp(`^${regex}/?$`));

        if (match) {
            Router._parameters = match.slice(1).reduce((params, value, index) => {
                params[names[index]] = value;
                return params;
            }, {});
        }

        return match;
    }

    /**
     * Resolves the component associated with the requested url.
     * @param {string} url 
     * @private
     */
    static _resolve(url) {
        const route = Object.keys(Router._routes).filter((route) => Router._match(route, url))[0];

        if (route != null) Component.mount(Router._routes[route], Router._container);
        else {
            const routeNotFound = Router._routes["notFound"];

            if (!routeNotFound) {
                document.write(`ERROR 404: ${url} not found!`);
                return;
            }

            Component.mount(routeNotFound, Router._container);
        }
    }
}