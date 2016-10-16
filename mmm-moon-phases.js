
/* MMM2 Module */

/* spectroman's
 * Module: Moon Phases
 *
 * By Spectroman https://juliochegedus.com
 * MIT Licensed.
 */

Module.register("mmm-moon-phases", {
        defaults: {
                updateInterval: 7200 * 1000, // every 2 hours
                initialLoadDelay: 1
        },
        getDom: function() {
                // fetch a picture, that changes daily but it has the same name - many sites can provide that
                // api.usno.navy.mil/imagery/moon.png is in reality 1024x1024 but we show by default at 200px x 200px
                var src = "http://api.usno.navy.mil/imagery/moon.png";

                var style = "position: absolute; left: 5px; top: -35px;";

                var img = "<img height='200' width='200' src='" + src + "' style='" + style + "'>";

                var wrapper = document.createElement("div");
                wrapper.style.width = "200px";
                wrapper.style.height = "200px";
                wrapper.style.overflow = "hidden";
                wrapper.style.position = "relative";
                wrapper.innerHTML = img;
                Log.info("Updating Moon Picture");
                return wrapper;
        },

        // Define start sequence.
        start: function() {
                Log.info("Starting module: " + this.name);

                this.loaded = false;
                this.scheduleUpdate(this.config.initialLoadDelay);

                this.updateTimer = null;

        },


        scheduleUpdate: function(delay) {
                var nextLoad = this.config.updateInterval;
                if (typeof delay !== "undefined" && delay >= 0) {
                        nextLoad = delay;
                }

                var self = this;
                clearTimeout(this.updateTimer);
                this.updateTimer = setTimeout(function() {
                        self.updateDom();
                }, nextLoad);
        },

});

