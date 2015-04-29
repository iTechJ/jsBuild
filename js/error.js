/*globals itechart, extend*/
itechart.error = function(selector){
    "use strict";
    itechart.error.superclass.constructor.call(this, selector);
    var self = this;

    self.id = Math.random().toString();

    self.forEach(function(elt){
        var container = self._render();
        container.addClassName("rp-error");
        elt.appendChild(container);
        self._subscribe(elt);
    });

};

extend(itechart.error, itechart.rpComponent);

itechart.error.prototype.flash = function(reason, message) {
    "use strict";
    var self = this,
        TIMEOUT = 5000;

    self.show(reason, message);
    itechart["errorTimeout" + self.id] = setTimeout(function() {
        self.hide();
    }, TIMEOUT);
};