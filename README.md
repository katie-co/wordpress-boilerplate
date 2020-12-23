A super fast Wordpress theme boilerplate to style to taste

## Setup local environment

Ensure you are running at least Node 15.2.0 & npm 7.0.8.

Spin up a new WordPress site using [Local by Flywheel](https://localwp.com/)
* Site name: yoursitename.local
* PHP Version: 7.4+
* Web Server: nginx or Apache
* Database: MySQL 8.0+
 
Set [WordPress environment](https://developer.wordpress.org/reference/functions/wp_get_environment_type/) using `wp_get_environment_type()`. This function provides a standardized way for developers to differentiate how they handle specific functionality between production and development sites.

Add the following code to `wp-config.php`
``` bash
// Set Wordpress environment
define( 'WP_ENVIRONMENT_TYPE', 'local' );
```

## Build setup
``` bash
# clone this repository into the local theme directory
cd path/to/themes/directory
git clone https://github.com/katie-co/wordpress-boilerplate
npm install

# update proxy server in `gulpfile.js` (line 26) to match your local domain

# launch site and watch for changes
gulp

# view all commands
gulp --tasks
```

Add vendor scripts to `gulpfile.js` (line 85), these are concatenated and output to `vendors/all.js`

GitHub Actions will run `gulp build` task to generate compressed `style.css` file at each pull request

*Note* All commands run from local node_modules directories so there should be no need to install anything globally.