// This looks in the `node_modules/` directory thanks to
// rollup-plugin-node-module. We can find the path to the minified
// JavaScript by manually looking in the `node_modules/` directories
// ourselves.
//
// Also, per ES6 imports, we can omit the `.js` at the end.

// Import Font Awesome (https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core)
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

// We are using a subset of icons
library.add(faUserAstronaut)

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch()
