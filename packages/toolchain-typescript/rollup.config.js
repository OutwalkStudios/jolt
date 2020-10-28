/* imports */
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import { dependencies } from "./package.json";
import { builtinModules } from "module";

const plugins = [
    babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [
            [
                "@babel/preset-env",
                {
                    "targets": {
                        "node": "10.6"
                    }
                }
            ]
        ],
        plugins: ["@babel/plugin-proposal-class-properties"]
    }),
    resolve(),
    commonjs(),
    json(),
    terser({
        output: {
            preamble: "/* Copyright (c) 2020 Outwalk Studios */"
        }
    })
];
const external = Object.keys(dependencies).concat(builtinModules)

/* build config */
export default [
    {
        input: "src/index.js",
        output: { file: "dist/toolchain.js", format: "cjs" },
        plugins,
        external,
    },
    {
        input: [
            "src/cmd/build.js",
            "src/cmd/watch.js",
            "src/cmd/lint.js",
            "src/cmd/serve.js"
        ],
        output: { dir: "dist/cmd", format: "cjs", exports: "default" },
        plugins,
        external,
    }
]