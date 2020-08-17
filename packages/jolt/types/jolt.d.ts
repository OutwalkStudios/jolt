declare type StateCallback = (state?: State, key?: string | number | symbol, value?: any) => void;

declare class State {
    private prototype: any;

    set(state: object): void;
    static create(callback?: StateCallback): State;
    static createArrayProxy(array: Array<any>, callback?: StateCallback): Array<any>;
}

declare interface Attributes {
    [key: string]: string;
}

declare interface ComponentOptions {
    disableShadowDOM?: boolean;
}

declare abstract class Component extends HTMLElement {
    root: ShadowRoot;
    state: State;
    attribs: Attributes;

    constructor(options: ComponentOptions);

    private connectedCallback(): void;
    private disconnectedCallback(): void;

    abstract render(): Template;

    didLoad(): void;
    didUpdate(): void;
    willUnload(): void;

    static register(name: string, component: CustomElementConstructor|Function): void;
}

interface Template {
    template: HTMLTemplateElement;
    events: Array<Function>;
}

declare function html(strings: TemplateStringsArray, ...values: Array<any>): Template;
declare function render(component: Template, container: HTMLElement): void;

export { Component, State, Template, Attributes, html, render };