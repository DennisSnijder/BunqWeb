var fs = require("fs");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        watch: {
            scripts: {
                files: ["resources/Sass/**/*.scss", "resources/React/**/*.jsx", "resources/React/**/*.js"],
                tasks: ["sass"]
            }
        },


        sass: {
            dist: {
                files: {
                    "web/styles/app.css": "resources/Sass/all.scss"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browserify");



    grunt.registerTask("default", ["sass"]);
    grunt.registerTask("dev", ["sass", "watch"]);
    grunt.registerTask("deploy", ["sass"]);
};
