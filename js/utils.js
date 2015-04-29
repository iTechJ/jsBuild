function extend(Child, Parent) {
    "use strict";
    var F = function () { };
    F.prototype = Parent.prototype;

    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

function mergeLeft(first, second) {
    "use strict";
    var o = {};

    if(!second) {
        return first;
    }

    for (var property in first) {
        if (first.hasOwnProperty(property)) {
            o[property] = second[property] ? second[property] : first[property];
        }
    }
    return o;
}

Element.prototype.hasClassName = function(name) {
    "use strict";
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function(name) {
    "use strict";
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};

Element.prototype.removeClassName = function(name) {
    "use strict";
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
    }
};