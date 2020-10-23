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
  * Attribute Callback
  * @callback AttributeCallback
  * @param {string} [key]
  * @param {string} [value]
  */

/**
 * Component Runtime
 * @class
 * @private
 */
export class Runtime {

    /**
     * Wraps a Function Component into a Web Component.
     * @param {Function} component 
     * @return {CustomElementConstructor}
     */
    static wrapFunction(component) {
        return class extends HTMLElement {

            constructor() {
                super();

                /* load the component options */
                const { useShadow, styles } = Runtime.getComponentOptions(component);

                /* get the component style */
                this.styles = Runtime.getComponentStyle(styles);

                /* get the component attribs */
                this.constructor.attribs = Runtime.getComponentAttributes(this, () => {
                    Runtime.render(component(this.constructor.attribs), this.styles, this.root);
                });

                /* create the component root */
                this.root = useShadow ? this.attachShadow({ mode: "open" }) : this;
            }

            connectedCallback() {
                Runtime.render(component(this.constructor.attribs), this.styles, this.root);

                this.observer = Runtime.getAttributeObserver(this, (key, value) => {
                    this.constructor.attribs[key] = value;
                });
            }

            disconnectedCallback() {
                this.observer.disconnect();
            }
        }
    }

    /**
     * Gets the options for the component.
     * @param {CustomElementConstructor|Function} component
     * @return {ComponentOptions}
     */
    static getComponentOptions(component) {
        const styles = component.options.styles;
        const useShadow = component.options.useShadow;

        return {
            styles: (styles != undefined) ? styles : [],
            useShadow: (useShadow != undefined) ? useShadow : true
        };
    }

    static getComponentStyle(styles) {
        let style = "";

        for (let sheet of styles) {
            style += sheet;
        }

        return style;
    }

    /**
     * Gets the component attributes as a proxy object.
     * @param {CustomElementConstructor|Function} component 
     * @param {AttributeCallback} callback
     * @return {Object.<string, *>}
     */
    static getComponentAttributes(component, callback) {
        const attributes = new Proxy({}, {
            set: (target, key, value) => {
                if (key == "prototype" || target[key] == value) return true;

                if (target[key] != undefined) {
                    target[key] = value;
                    callback(key, value);
                    return true;
                }

                target[key] = value;
                return true;
            }
        });

        for (let attribute of component.attributes) {
            const value = attribute.value;
            attributes[attribute.localName] = (value != "") ? value : true;
        }

        return attributes;
    }

    /**
     * Gets a MutationObserver to watch for attribute changes.
     * @param {HTMLElement} element 
     * @param {MutationObserver} callback 
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
     * Renders the component
     * @param {Template} template 
     * @param {string} styles 
     * @param {HTMLElement} container
     */
    static render(template, styles, container) {
        if (!template) template = { source: "", data: {} }

        if (styles.length > 0) {
            template.source += `<style>${styles}</style>`;
        }

        Reconciler.reconcile(template, container);
    }
}