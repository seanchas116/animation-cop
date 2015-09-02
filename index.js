"use strict";

var EVENTS = ["animationstart", "animationiteration", "animationend", "transitionend"];
var arrayForEach = Array.prototype.forEach;

function AnimationCop() {
  var self = this;
  this.onEvent = function (e) {
    self.animatedElems.add(e.target);
  };
}

AnimationCop.prototype.begin = function () {
  var elems = this.elems = document.querySelectorAll("*");
  this.animatedElems = new Set();
  var self = this;
  arrayForEach.call(elems, function (elem) {
    EVENTS.forEach(function (event) {
      elem.addEventListener(event, self.onEvent);
    });
  });
};

AnimationCop.prototype.end = function () {
  var self = this;
  arrayForEach.call(this.elems, function (elem) {
    EVENTS.forEach(function (event) {
      elem.removeEventListener(event, self.onEvent);
    });
  });
  this.elems = [];
};

AnimationCop.prototype.watchFor = function (ms) {
  var self = this;
  this.begin();
  return new Promise(function (resolve) {
    setTimeout(function () {
      self.end();
      resolve();
    }, ms);
  });
};

module.exports = AnimationCop;
