declare type StateCallback = (key?: string | number | symbol, value?: any) => void;

declare class State {
    private prototype: any;

    set(state: object): void;
    static createState(callback: StateCallback): State;
    static createArrayProxy(array: Array<any>, callback: StateCallback): Array<any>;
}

declare interface Attributes {
    [key: string]: string;
}

declare interface ComponentOptions {
    name: string,
    styles?: Array<string>,
    useShadow?: boolean;
}

declare interface Template {
    source: string;
    data: Array<any>
}

declare abstract class Component<A = {}, T extends State = {}> extends HTMLElement {

    private observer: MutationObserver;

    attribs: A;
    state: T;
    root: ShadowRoot | HTMLElement;

    private connectedCallback(): void;
    private disconnectedCallback(): void;

    abstract render(attribs?: A): Template | void;

    didLoad(): void;
    didUpdate(): void;
    shouldUpdate(): boolean;
    willUnload(): void;

    static create(options: ComponentOptions, component: CustomElementConstructor | Function): void;
    static mount(component: CustomElementConstructor | Function, container: HTMLElement): void;
}

declare function html(strings: TemplateStringsArray, ...values: Array<any>): Template;

export { Component, State, Attributes, Template, html };