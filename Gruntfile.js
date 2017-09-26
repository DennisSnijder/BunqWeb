var fs = require("fs");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

		php: {
			dist: {
				options: {
					hostname: 'YOUR_IP_HERE',	
					port: 9000,
					base: 'web',
					keepalive: true,
					open: true
				}
			}
		},

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
    grunt.loadNpmTasks("grunt-php");

    grunt.registerTask("default", ["sass"]);
    grunt.registerTask("serve", ["sass", "php"]);
    grunt.registerTask("dev", ["sass", "watch"]);
    grunt.registerTask("deploy", ["sass"]);
};
