/* imports */
import { TemplateEngine } from "./TemplateEngine";

/**
 * Reconciler Class for updating the DOM efficently.
 * @class
 * @private
 */
export class Reconciler {

    /**
     * Reconciles the differences and update the DOM.
     * @param {Template} template
     * @param {HTMLElement} container
     */
    static reconcile(template, container) {
        const templateNode = TemplateEngine.processTemplate(template);

        if(container.childElementCount > 0) {
            Reconciler.diff(templateNode, container);
            Reconciler.diffChildren(templateNode, container);
        } else {
            container.appendChild(templateNode);
        }
    }

    /**
     * Walks the DOM tree to determine if the nodes need to be updated.
     * @param {Node} newNode 
     * @param {Node} oldNode
     * @return {Node}
     */
    static walk(newNode, oldNode) {
        if (!oldNode) return newNode;
        else if (!newNode) return null;
        else if (newNode.tagName !== oldNode.tagName) return newNode;
        else {
            Reconciler.diff(newNode, oldNode);

            /* if the element is a component, we dont need to diff its children */
            if (!Reconciler.isComponent(newNode)) Reconciler.diffChildren(newNode, oldNode);

            return oldNode;
        }
    }

    /**
     * Find the differences between two nodes and update them.
     * @param {Node} newNode 
     * @param {Node} oldNode 
     */
    static diff(newNode, oldNode) {
        if (newNode.isEqualNode(oldNode)) return;

        let nodeType = newNode.nodeType;
        let nodeName = newNode.nodeName;

        if (nodeType == 1) Reconciler.diffAttributes(newNode, oldNode);
        else if (nodeType == 3 || nodeType == 8) {
            if (oldNode.nodeValue != newNode.nodeValue) oldNode.nodeValue = newNode.nodeValue;
        }

        if (nodeName == "INPUT") Reconciler.updateInput(newNode, oldNode);
        else if (nodeName == "OPTION") Reconciler.updateAttribute(newNode, oldNode, "selected");
        else if (nodeName == "TEXTAREA") Reconciler.updateTextarea(newNode, oldNode);
    }

    /**
     * Find the differences between the attributes of two nodes and update them.
     * @param {Node} newNode 
     * @param {Node} oldNode 
     */
    static diffAttributes(newNode, oldNode) {
        const newAttributes = newNode.attributes;
        const oldAttributes = oldNode.attributes;

        let length = newAttributes.length - 1;
        for (let i = length; i >= 0; --i) {
            const attribute = newAttributes[i];
            const name = attribute.localName;
            const value = attribute.value;
            const namespace = attribute.namespaceURI;

            if (namespace) {
                if (oldNode.getAttributeNS(namespace, name) == value) {
                    oldNode.setAttributeNS(namespace, name, value);
                }
            } else {
                if (!oldNode.hasAttribute(name)) oldNode.setAttribute(name, value);
                else {
                    if (oldNode.getAttribute(name) != value) {
                        if (value == "null" || value == "undefined") oldNode.removeAttribute(name);
                        else oldNode.setAttribute(name, value);
                    }
                }
            }
        }

        /* remove extra attributes found on the original DOM element that were not on the target element */
        length = oldAttributes.length - 1;
        for (let i = length; i >= 0; --i) {
            const attribute = oldAttributes[i];

            if (attribute.specified) {
                const name = attribute.localName;
                const namespace = attribute.namespaceURI;

                if (namespace) {
                    if (!newNode.hasAttributeNS(namespace, name)) {
                        oldNode.removeAttributeNS(namespace, name);
                    }
                } else {
                    if (!newNode.hasAttribute(name)) oldNode.removeAttribute(name);
                }
            }
        }
    }

    /**
     * Find the differences between the children of two nodes and update them.
     * @param {Node} newNode 
     * @param {Node} oldNode 
     */
    static diffChildren(newNode, oldNode) {
        if (newNode.isEqualNode(oldNode)) return;

        let offset = 0;

        for (let i = 0; ; i++) {
            const oldChild = oldNode.childNodes[i];
            const newChild = newNode.childNodes[i - offset];

            /* if both nodes are empty, do nothing */
            if (!oldChild && !newChild) {
                break;
            }

            /* if there is no new child, remove the old child */
            else if (!newChild) {
                oldNode.removeChild(oldChild);
                i--;
            }

            /* if there is no old child, add the new child */
            else if (!oldChild) {
                oldNode.appendChild(newChild);
                offset++;
            }

            /* if both nodes are the same, see if they need updating */
            else if (Reconciler.isSameNode(newChild, oldChild)) {
                const morphed = Reconciler.walk(newChild, oldChild);
                if (morphed != oldChild) {
                    oldNode.replaceChild(morphed, oldChild);
                    offset++;
                }
            }

            /* else both nodes do not share an ID or placeholder, try to rearrange them */
            else {
                let oldMatch = null;

                const length = oldNode.childNodes.length;
                for (let j = i; j < length; j++) {
                    if (Reconciler.isSameNode(oldNode.childNodes[j], newChild)) {
                        oldMatch = oldNode.childNodes[j];
                        break;
                    }
                }

                if (oldMatch) {
                    const morphed = Reconciler.walk(newChild, oldChild);
                    if (morphed != oldMatch) {
                        oldNode.replaceChild(morphed, oldChild);
                        offset++;
                    }
                }

                else if (!newChild.id && !oldChild.id) {
                    const morphed = Reconciler.walk(newChild, oldChild);
                    if (morphed != oldChild) {
                        oldNode.replaceChild(morphed, oldChild);
                        offset++;
                    }
                }

                else {
                    oldNode.insertBefore(newChild, oldChild);
                    offset++;
                }
            }
        }
    }

    /**
     * Updates an attribute.
     * @param {Node} newNode 
     * @param {Node} oldNode 
     * @param {string} name 
     */
    static updateAttribute(newNode, oldNode, name) {
        if (newNode[name] !== oldNode[name]) {
            oldNode[name] = newNode[name];

            if (newNode[name]) oldNode.setAttribute(name, "");
            else oldNode.removeAttribute(name);
        }
    }

    /**
     * Updates an input element.
     * @param {Node} newNode 
     * @param {Node} oldNode 
     */
    static updateInput(newNode, oldNode) {
        const newValue = newNode.value;
        const oldValue = oldNode.value;

        Reconciler.updateAttribute(newNode, oldNode, "checked");
        Reconciler.updateAttribute(newNode, oldNode, "disabled");

        if (newNode.indeterminate !== oldNode.indeterminate) {
            oldNode.indeterminate = newNode.indeterminate;
        }

        if (oldNode.type == "file") return;

        if (newValue != oldValue) {
            oldNode.setAttribute("value", newValue);
            oldNode.value = newValue;
        }

        if (newValue == "null") {
            oldNode.value = "";
            oldNode.removeAttribute("value");
        }

        if (!newNode.hasAttribute("value")) oldNode.removeAttribute("value");
        else if (oldNode.type == "range") oldNode.value = newValue;
    }

    /**
     * Updates a textarea element.
     * @param {Node} newNode 
     * @param {Node} oldNode 
     */
    static updateTextarea(newNode, oldNode) {
        const newValue = newNode.value;

        if (newValue != oldNode.value) {
            oldNode.value = newValue;
        }

        if (oldNode.firstChild && oldNode.firstChild.nodeValue != newValue) {
            oldNode.firstChild.nodeValue = newValue;
        }
    }

    /**
     * Determines if two nodes are the same.
     * @param {Node} a 
     * @param {Node} b
     * @return {boolean}
     */
    static isSameNode(a, b) {
        if (a.id) return (a.id == b.id);
        if (a.tagName != b.tagName) return false;
        if (a.nodeType == 3) return (a.nodeValue == b.nodeValue);
        return false;
    }

    /**
     * Determines if a node is a Web Component or not.
     * @param {Node} node
     * @return {boolean}
     */
    static isComponent(node) {
        return (node.tagName && node.tagName.includes("-"));
    }
}