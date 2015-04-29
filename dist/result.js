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
var itechart = {};
itechart.rpComponent = function (selector) {
    "use strict";
    if(!selector) {
        throw "No selector defined!";
    }

    var self = this;

    self.componentList = document.querySelectorAll(selector);

    self._toggleVisibility = function(tag, show) {
        var visible = "rp-visible",
            component = tag.getElementsByClassName("rp-component")[0];
        if(show) {
            component.removeClassName("rp-hidden");
            component.addClassName(visible);
        } else {
            component.removeClassName(visible);
        }
    };

    self._setMsg = function(tag, header, content) {
        var tComponent = tag.getElementsByClassName("rp-component")[0],
            tHeader = tComponent.getElementsByTagName("h2")[0],
            tContent = tComponent.getElementsByClassName("rp-content")[0];

        tHeader.innerText = header;
        tHeader.textContent = header;
        tContent.innerHTML = content;
    };

};

itechart.rpComponent.prototype = {
    constructor: itechart.rpComponent,

    show: function(header, content) {
        "use strict";
        var self = this;
        this.forEach(function(elt) {
            self._toggleVisibility(elt, true);
            if(header || content) {
                self._setMsg(elt, header, content);
            }
        });
    },

    hide: function(preserveMsg){
        "use strict";
        var self = this;

        this.forEach(function(elt) {
            self._toggleVisibility(elt, false);
            if(!preserveMsg) {
                self._setMsg(elt, "", "");
            }

        });
    },

    _subscribe: function(elt){
        "use strict";
        var self = this,
            component = elt.getElementsByClassName("rp-component")[0];

        elt.getElementsByClassName("rp-close").item(0).addEventListener("click", function() {
            self._toggleVisibility(elt, false);
        }, false);
        component.addEventListener("transitionend", function(){
            if(!this.hasClassName("rp-visible")) {
                this.addClassName("rp-hidden");
            }
        }, false);
    },

    _render: function(){
        "use strict";
        var container = document.createElement("div"),
            header = document.createElement("h2"),
            body = document.createElement("p"),
            close = document.createElement("div");

        close.className = "rp-close";
        close.textContent = "x";
        close.innerText = "x";
        body.className = "rp-content";

        container.className += " rp-component";
        container.appendChild(header);
        container.appendChild(body);
        container.appendChild(close);

        return container;
    },

    forEach: function(f) {
        "use strict";
        Array.prototype.forEach.call(this.componentList, f);
    }
};
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

/*globals itechart, extend*/
itechart.modal = function(selector, header, content, func){
    "use strict";
    itechart.modal.superclass.constructor.call(this, selector);
    var self = this;

    self.id = Math.random().toString();

    self.forEach(function(elt){
        var container = self._render();
        elt.appendChild(container);
        self._setMsg(elt, header, content);
        self._subscribe(elt, func);
    });
};

extend(itechart.modal, itechart.rpComponent);

itechart.modal.prototype._subscribe = function(elt, func) {
    "use strict";
    var self = this,
        bCancel = elt.getElementsByClassName("rp-cancel")[0],
        bConfirm = elt.getElementsByClassName("rp-confirm")[0];

    itechart.modal.superclass._subscribe.call(this, elt);

    bCancel.addEventListener("click", function(){
        self._toggleVisibility(elt, false);
    });

    bConfirm.addEventListener("click", function(){
        func();
    });
};

itechart.modal.prototype._render = function() {
    "use strict";
    var tModal = itechart.modal.superclass._render.call(this),
        tHr = document.createElement("hr"),
        bCancel = document.createElement("button"),
        bConfirm = document.createElement("button");

    bCancel.setAttribute("type", "button");
    bConfirm.setAttribute("type", "button");
    bCancel.setAttribute("value", "Cancel");
    bConfirm.setAttribute("value", "Confirm");
    bCancel.textContent = "Cancel";
    bCancel.innerText = "Cancel";
    bConfirm.textContent = "Confirm";
    bConfirm.innerText = "Confirm";
    bCancel.className = "rp-button rp-cancel";
    bConfirm.className = "rp-button rp-confirm";

    tModal.addClassName("rp-modal");
    tModal.appendChild(tHr);
    tModal.appendChild(bConfirm);
    tModal.appendChild(bCancel);

    return tModal;
};