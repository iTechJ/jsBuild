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
}