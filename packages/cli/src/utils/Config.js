/* imports */
import { File } from "./File";
import path from "path";
import fs from "fs";

/**
 * Config Utils Class
 * @class
 */
export class Config {

    /**
     * Loads the config from jolt.json
     * @return {Object}
     */
    static loadConfig() {
        try {
            return File.loadJSON(path.join(process.cwd(), "jolt.json"));
        } catch {
            return null;
        }
    }

    /**
     * Loads the toolchain from the config.
     * @param {Object} config
     * @return {Object}
     */
    static loadToolchain(config) {
        const toolchain = (config.toolchain.startsWith("./")) ? path.join(process.cwd(), config.toolchain) : config.toolchain;
        const toolchainPath = require.resolve(toolchain, { paths: [ process.cwd() ] });
        const toolchainInstalled = fs.existsSync(toolchainPath);
        if (config.toolchain && toolchainInstalled) return import(toolchainPath);
        else return null;
    }
}