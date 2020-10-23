/* imports */
import { Runtime } from "../runtime/Runtime";
import { Reconciler } from "../runtime/Reconciler";
import { State } from "./State";

/**
 * Component for building reusable pieces of a UI.
 * @class
 * @extends {HTMLElement}
 */
export class Component extends HTMLElement {

    constructor() {
        super();

        /* load the component options */
        const { useShadow, styles } = Runtime.getComponentOptions(this.constructor);

        /* get the component style */
        this.styles = Runtime.getComponentStyle(styles);

        /* get the component attribs */
        this.constructor.attribs = Runtime.getComponentAttributes(this, (key, value) => {
            if (this.shouldUpdate(key, value)) {
                Runtime.render(this.render(this.constructor.attribs), this.styles, this.root);
                this.didUpdate(key, value);
            }
        });

        /* create the component state */
        this.state = State.createState((key, value) => {
            if (this.shouldUpdate(key, value)) {
                Runtime.render(this.render(this.attribs), this.styles, this.root);
                this.didUpdate(key, value);
            }
        });

        /* create the component root */
        this.root = useShadow ? this.attachShadow({ mode: "open" }) : this;
    }

    /**
     * WebComponent lifecycle method for being added to the DOM.
     * @ignore
     */
    connectedCallback() {
        Runtime.render(this.render(this.attribs), this.styles, this.root);
        this.didLoad();

        this.observer = Runtime.getAttributeObserver(this, (key, value) => {
            this.constructor.attribs[key] = value;
        });
    }

    /**
     * WebComponent lifecycle method for being removed from the DOM.
     * @ignore
     */
    disconnectedCallback() {
        this.willUnload();
        this.observer.disconnect();
    }

    /**
     * Renders the Component.
     * @param {Object.<string,string>} [attribs]
     * @abstract
     * @return {Template}
     */
    render() { }

    /**
     * Component lifecycle method for being added to the DOM.
     * @abstract
     */
    didLoad() { }

    /**
     * Component lifecycle method for when the {@link State} or attributes change.
     * @param {string} [key]
     * @param {*} [value]
     * @abstract
     */
    didUpdate() { }

    /**
     * Component lifecycle method for determining if the view should update or not.
     * @param {string} [key] 
     * @param {*} [value]
     * @return {boolean} 
     */
    shouldUpdate() {
        return true;
    }

    /**
     * Component lifecycle method for being removed from the DOM.
     * @abstract
     */
    willUnload() { }

    /**
     * Registers a Component to make it available as an HTML element.
     * @param {ComponentOptions} options
     * @param {CustomElementConstructor|Function} component
     */
    static create(options, component) {
        component.options = options;

        if (!options.name) {
            console.warn("Jolt: ComponentOptions.name is required.");
            return;
        }

        if (component.create) window.customElements.define(options.name, component);
        else window.customElements.define(options.name, Runtime.wrapFunction(component));
    }

    /**
     * Mounts the component to the container element.
     * @param {CustomElementConstructor|Function} component 
     * @param {HTMLElement} container 
     */
    static mount(component, container) {
        if (component.options) {
            Reconciler.reconcile({
                source: `<${component.options.name}></${component.options.name}>`,
                data: {}
            }, container);
        }
        else console.warn(`Jolt: Components must be registered before being used.`);
    }
}