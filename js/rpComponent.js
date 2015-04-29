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