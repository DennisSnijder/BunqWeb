const glob = require("glob");
const swPrecache = require("sw-precache");

const PRODUCTION = process.env.NODE_ENV === "production";
const DEVELOPMENT = !PRODUCTION;

const SWHelper = (fileList = false, options = { publicDir: "web" }) => {
    let staticFiles = [];

    if (PRODUCTION) {
        if (fileList) {
            // merge the afterEmitFiles list and remove duplicates
            staticFiles = staticFiles.concat(fileList);
        } else {
            // do a glob on the dist folder for webpack output files
            staticFiles = staticFiles.concat(glob.sync("/assets/dist/*"));
        }
    }

    // write the precache file
    swPrecache.write(
        options.publicDir + "/sw.js",
        {
            staticFileGlobs: staticFiles,
            stripPrefix: options.publicDir,
            // runtimeCaching which matches patterns and applies the specific handlers
            runtimeCaching: [
                {
                    // cache api attachements in production mode
                    urlPattern: /\/api\/attachment\/[.]*/,
                    handler: DEVELOPMENT ? "networkFirst" : "cacheFirst"
                },
                {
                    // dont cache api requests
                    urlPattern: /\/api/,
                    handler: "networkOnly"
                },
                {
                    // for debug purposes we want to load maps from network first when we can
                    urlPattern: /[.]?(map)/,
                    handler: "networkFirst"
                },
                {
                    urlPattern: /[.]?(html|js|css|json|png|jpg|svg|gif|jpeg|woff|woff2|ttf|eot)/,
                    handler: DEVELOPMENT ? "networkFirst" : "cacheFirst"
                }
            ]
        },
        () => {
            // finished writing service worker to file
        }
    );
};

module.exports = SWHelper;
