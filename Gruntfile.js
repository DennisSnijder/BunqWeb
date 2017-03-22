var fs = require("fs");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        watch: {
            scripts: {
                files: ["src/BunqWeb/Resources/Sass/**/*.scss", "src/BunqWeb/Resources/React/**/*.jsx", "src/BunqWeb/Resources/React/**/*.js"],
                tasks: ["sass"]
            }
        },


        sass: {
            dist: {
                files: {
                    "web/styles/app.css": "src/BunqWeb/Resources/Sass/all.scss"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browserify");



    grunt.registerTask("default", ["sass", "watch"]);
    grunt.registerTask("dev", ["sass"]);
    grunt.registerTask("deploy", ["sass"]);
};
