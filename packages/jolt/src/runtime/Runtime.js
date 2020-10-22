/* imports */
import { Reconciler } from "./Reconciler";

/**
 * @typedef {Object} ComponentOptions
 * @property {string} name
 * @property {Array.<string>} [styles]
 * @property {boolean} [useShadow=true]
 */

/**
 * Observer Callback
 * @callback ObserverCallback
 * @param {string} [name]
 * @param {string} [value]
 */

/**
 * Component Runtime, used to power the component internals.
 * @class
 * @private
 */
export class Runtime {

    /**
     * Wraps a Function Component into a WebComponent class.
     * @param {Function} component
     * @return {CustomElementConstructor} 
     */
    static wrapFunction(component) {
        return class extends HTMLElement {

            constructor() {
                super();

                /* load the component options */
                const { useShadow, styles } = Runtime.getComponentOptions(component);
                this.styles = Runtime.createComponentStyle(styles);

                /**
                 * The component attributes
                 * @type {Object.<string,string>}
                 */
                this.attribs = Runtime.getComponentAttributes(this);

                /** 
                 * The component render root
                 * @type {ShadowRoot|HTMLElement}
                 */
                this.root = useShadow ? this.attachShadow({ mode: "open" }) : this;
            }

            connectedCallback() {
                Runtime.render(component(this.attribs), this.styles, this.root);

                this._observer = Runtime.getAttributeObserver(this, (key, value) => {
                    this.attribs[key] = value;
                    Runtime.render(component(this.attribs), this.styles, this.root);
                });
            }

            disconnectedCallback() {
                this._observer.disconnect();
            }
        };
    }

    /**
     * Gets the component options.
     * @param {CustomElementConstructor|Function} component
     * @return {ComponentOptions}
     */
    static getComponentOptions(component) {
        return {
            styles: component.options.styles,
            useShadow: (component.options.useShadow != undefined) ? component.options.useShadow : true
        };
    }

    /**
     * Gets the component attributes.
     * @param {CustomElementConstructor|Function} component
     * @return {Object.<string,string>}
     */
    static getComponentAttributes(component) {
        const attributes = {};

        for (let attribute of component.attributes) {
            const value = attribute.value;
            attributes[attribute.localName] = (value != "") ? value : true;
        }

        return attributes;
    }

    /**
     * Observes an elements attributes for changes.
     * @param {HTMLElement} element 
     * @param {ObserverCallback} callback
     * @return {MutationObserver}
     */
    static getAttributeObserver(element, callback) {
        const observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.type == "attributes") {
                    const name = mutation.attributeName;
                    callback(name, mutation.target.getAttribute(name));
                }
            }
        });

        observer.observe(element, { attributes: true });
        return observer;
    }

    /**
     * Creates the component stylesheet
     * @param {Array.<string>} styles
     * @return {string}
     */
    static createComponentStyle(styles) {
        if (!styles) return null;

        let style = "";

        for (let sheet of styles) {
            style += sheet;
        }

        return style;
    }

    /**
     * Render the component
     * @param {Template} template 
     * @param {string} styles 
     * @param {HTMLElement} container 
     */
    static render(template, styles, container) {
        if(!template) template = { source: "", data: {} };
        
        if (styles) {
            template.source += `<style>${styles}</style>`;
        }

        Reconciler.reconcile(template, container);
    }
}