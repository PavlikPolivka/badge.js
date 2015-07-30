(function(root, undefined) {

  'use strict';


/* badge.js main */

// Base function.
var badge = function(userOptions) {
    userOptions = (userOptions) ? userOptions : {};
    var defaults = {};
    var options;

    //Initilize whole badge object
    var init = function(){
      options = mergeOptions(defaults, userOptions);
    };

    //Updates badge
    var update = function(number) {
    };

    function mergeOptions(defaults, options) {
			var mergedOpt = {};
			var attrname;
			for (attrname in defaults) {
				mergedOpt[attrname] = defaults[attrname];
			}
			for (attrname in options) {
				mergedOpt[attrname] = options[attrname];
			}
			return mergedOpt;
		}

    init();

    return {
      update : update
    };
};


// Version.
badge.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.badge = badge;


}(this));
