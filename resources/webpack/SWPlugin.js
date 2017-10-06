const SWHelper = require("./SWHelper");

// global variable to store the emitted files
let afterEmitFiles = [];
let customOptions = [];

// export the plugin
module.exports = class SwPrecache {
    constructor(options = { publicDir: "web" }) {
        customOptions = options;
    }

    // apply the webpack callbacks
    apply(compiler) {
        // after emit to fetch the new file locations
        compiler.plugin("after-emit", this.afterEmit);

        // done event to create a new updated service worker
        compiler.plugin("done", this.done);
    }

    // files were emitted to filesystem
    afterEmit(compilation, callback) {
        // reset the after emit list
        afterEmitFiles = [];

        // Explore each chunk (build output):
        compilation.chunks.forEach(chunk => {
            // Explore each module within the chunk (built inputs):
            chunk.files.forEach(file => {
                // push this file to the list
                afterEmitFiles.push(`${this.options.target}${this.options.output.publicPath}${file}`);
            });
        });

        callback();
    }

    // compilation has finished
    done(stats) {
        // create the service worker with our after emit files
        SWHelper(afterEmitFiles, customOptions);
    }
};
