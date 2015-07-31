/* badge.js main */

// Base function
var badge = function(userOptions) {
    userOptions = (userOptions) ? userOptions : {};

    var defaults = {
      color : "#ADD8E6",
      font : "Helvetica",
      fontColor : "#000000",
      shape : "square"
    };

    var options, canvas, ctx;

    //Initilize whole badge object
    var init = function(){
      options = mergeOptions(defaults, userOptions);
      canvas = document.createElement('canvas');
      //solve original image
      canvas.height = 32;
      canvas.width = 32;
      ctx = canvas.getContext('2d');
    };

    var shapes = {};

    shapes.square = function(number) {
      ctx.fillStyle = options.color;
      ctx.fillRect(0,0,32,32);

      writeNumber(number);
    };

    shapes.circle = function(number) {
      ctx.fillStyle = options.color;

      ctx.moveTo(0, 0);
      ctx.arc(16, 16, 16, 0, 2 * Math.PI);
      ctx.fill();

      writeNumber(number);
    };

    function writeNumber(number) {
      ctx.font = Math.floor(24 * (number > 99 ? 0.8 : 1)) + "px  " + options.font;
      ctx.fillStyle = options.fontColor;
      ctx.textAlign = 'center';
      ctx.fillText(formatNumber(number), 16, (20 * (number > 99 ? 0.9 : 1)) + 4);
    }

    function formatNumber(number) {
      if (number > 999) {
        return ((number > 9999) ? 9 : Math.floor(number / 1000) ) + 'k+';
      }
      return number;
    }


    //Updates badge
    var update = function(number) {
      var shape = shapes[options.shape];
      if(!shape)
      {
        shape = shapes[defaults.shape];
      }
      //Fill canvas with shape with number
      shape(number);
      //Maybe do some annimations???

      favicon.set();
    };

    var favicon = {};

    favicon.get = function() {
			var icon = false;
			//get link element
			var getIcon = function() {
				var links = document.getElementsByTagName('head')[0].getElementsByTagName('link');
        Array.prototype.forEach.call(links, function(link) {
            if ((/(^|\s)icon(\s|$)/i).test(link)) {
              return link;
            }
        });
				return false;
			};
			icon = getIcon();
			if (icon === false) {
				icon = document.createElement('link');
				icon.setAttribute('rel', 'icon');
				document.getElementsByTagName('head')[0].appendChild(icon);
			}
			icon.setAttribute('type', 'image/png');
			return icon;
		};

    favicon.set = function() {
      var url = canvas.toDataURL('image/png');
      //Probably different in FF
      favicon.get().setAttribute('href', url);
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
