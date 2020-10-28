/**
 * @typedef {Object} Template
 * @param {string} source
 * @param {Object} data
 */

/**
 * TemplateEngine for components.
 * @class
 * @private
 */
export class TemplateEngine {

    /**
     * Creates a Template to be processed.
     * @param {TemplateStringsArray} strings 
     * @param {Array.<*>} values
     * @return {Template}
     */
    static createTemplate(strings, values) {
        const data = [];

        /* piece together the template strings with the template values */
        let source = strings.reduce((combined, string, i) => {
            const value = (values[i] != undefined) ? values[i] : "";

            /* if the string is an event, add an event marker and add the event to the data */
            if (string.match(/ on[a-z]*="?$/) && typeof value == "function") {
                data.push(value);
                return combined + string + "{{e}}";
            }

            /* if the value is a template, merge it with the this template */
            else if (TemplateEngine.isTemplate(value)) {
                data.concat(value.data);
                return combined + string + value.source;
            }

            /* if the value is an array of templates, merge them into this template */
            else if (TemplateEngine.isTemplateArray(value)) {
                let source = "";

                for (let fragment of value) {
                    data.concat(fragment.data);
                    source += fragment.source;
                }

                return combined + string + source;
            }
            /* else add the string with its value to the template */
            else {
                return combined + string + value;
            }
        }, "").replace(/<([a-z]+-[a-z]+)([^/>]*)\/>/g, `<$1$2></$1>`);

        return { source, data };
    }

    /**
     * Processes the Template into a DOM Tree.
     * @param {Template} template
     * @return {DocumentFragment} 
     */
    static processTemplate({ source, data }) {
        const template = document.createElement("template");
        template.innerHTML = source;

        if (data.length > 0) {
            const walker = document.createTreeWalker(template.content, 1);

            let currentNode;
            let index = 0;

            while ((currentNode = walker.nextNode())) {

                if (currentNode.hasAttributes()) {
                    const length = currentNode.attributes.length - 1;

                    for (let i = length; i >= 0; --i) {
                        const attribute = currentNode.attributes[i];

                        /* if the attribute has an event marker then bind it as an event */
                        if (attribute.value == "{{e}}") {
                            currentNode.addEventListener(attribute.localName.slice(2), data[index++]);
                            currentNode.removeAttribute(attribute.localName);
                        }
                    }
                }
            }
        }

        return template.content;
    }

    /**
     * Checks if an object is a template.
     * @param {*} value
     * @return {boolean} 
     */
    static isTemplate(value) {
        return (
            typeof value == "object" &&
            value.source &&
            value.data
        );
    }

    /**
     * Checks if an object is an array of templates.
     * @param {*} value
     * @param {boolean} 
     */
    static isTemplateArray(value) {
        return (
            Array.isArray(value) &&
            value[0] &&
            value[0].source &&
            value[0].data
        );
    }
}

/**
 * Creates a template to be rendered.
 * @param {TemplateStringsArray} strings 
 * @param  {...*} values
 * @param {Template}
 */
export function html(strings, ...values) {
    return TemplateEngine.createTemplate(strings, values);
}