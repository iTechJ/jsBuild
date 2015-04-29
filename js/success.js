/*globals itechart, extend*/
itechart.success = function(selector){
    "use strict";
    itechart.success.superclass.constructor.call(this, selector);
    var self = this;

    self.id = Math.random().toString();

    self.forEach(function(elt){
        var container = self._render();
        container.addClassName("rp-success");
        elt.appendChild(container);
        self._subscribe(elt);
    });

};

extend(itechart.success, itechart.rpComponent);

itechart.success.prototype.flash = function(reason, message) {
    "use strict";
    itechart.error.prototype.flash.call(this, reason, message);
};
