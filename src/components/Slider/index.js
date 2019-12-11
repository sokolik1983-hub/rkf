import React, { useEffect } from 'react';
import './styles.scss';

function Tinyfade(e, interval, animationSpeed) {
    if (Object.getPrototypeOf(this) !== Tinyfade.prototype) throw new Error("Tinyfade not called as a constructor");

    this.e = (typeof e === "string") ? document.querySelector(e) : e;
    this.e.classList.add("tinyfade-js");
    this.c = this.e.firstElementChild;
    this.c.classList.add("tinyfade-current");
    this.l = {};

    // Set animation speed
    this.s = animationSpeed; if (this.s === undefined) this.s = 750;
    let s = document.createElement("style");
    s.scoped = true;
    s.textContent = ".tinyfade>* {transition: opacity " + this.s + "ms}";
    this.e.appendChild(s, this.c);

    // Set interval
    this.i = interval || 5000;
    this.j = null;
    if (this.i > 0) this.j = setInterval(tf => tf.next(), this.i, this);
}
Tinyfade.prototype.goto = function (c) {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    if (this.j !== null) clearInterval(this.j);
    if (this.i > 0) this.j = setInterval(tf => tf.next(), this.i, this);

    // Show current
    c.classList.add("tinyfade-current");

    // Hide last
    this.c.classList.add("tinyfade-last");
    this.c.classList.remove("tinyfade-current");
    setTimeout(l => l.classList.remove("tinyfade-last"), this.s, this.c);

    // Fire event
    this.fire("goto", c, this.c);

    // Update current
    this.c = c;

}
Tinyfade.prototype.next = function () {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    let e = this.c.nextElementSibling;
    if (!e || e.tagName === "STYLE") e = this.e.firstElementChild;
    this.goto(e);
}
Tinyfade.prototype.prev = function () {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    let e = this.c.previousElementSibling || this.e.lastElementChild;
    this.goto(e);
}
Tinyfade.prototype.pause = function () {
    if (this.j == null) throw new Error("This Tinyfade instance is paused or has been destroyed.");

    clearInterval(this.j);
    this.j = null;
}
Tinyfade.prototype.continue = function () {
    if (this.j != null) throw new Error("This Tinyfade instance is already running.");
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    if (this.i > 0) this.j = setInterval(tf => tf.next(), this.i, this);
}
Tinyfade.prototype.destroy = function () {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    this.e.classList.remove("tinyfade-js");
    this.c.classList.remove("tinyfade-current");
    this.e.getElementsByClassName("tinyfade-last").classList.remove("tinyfade-last");
    this.e.removeChild(this.e.firstElementChild);
    clearInterval(this.j);
    this.e = this.c = this.l = this.s = this.i = this.j = null;
}
Tinyfade.prototype.addEventListener = function (e, f) {
    if (!this.e) throw new Error("This Tinyfade instance has been destroyed.");

    if (!this.l[e]) this.l[e] = [];
    this.l[e].push(f);
}
Tinyfade.prototype.fire = function (e, ...p) {
    (this.l[e] || []).forEach(f => f(...p));
}

const Slider = ({ children }) => {
    useEffect(() => {
        new Tinyfade('.tinyfade', 3000, 1000);
    }, []);
    return <div className="Slider tinyfade">
        {children}
    </div>
};

export default Slider;