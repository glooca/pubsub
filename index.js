function PubSub() {
  this.callbacks = {};
}
PubSub.prototype.subscribe = function(ev, callback) {
  if (this.callbacks[ev] && this.callbacks[ev].includes(callback)) return this;
  (this.callbacks[ev] || (this.callbacks[ev] = [])).push(callback);
  return this;
}
PubSub.prototype.unsubscribe = function(ev, callback) {
  if (!this.callbacks[ev]) return this;
  this.callbacks[ev] = this.callbacks[ev].filter(item => item !== callback)
  return this;
}
PubSub.prototype.publish = function(ev, ...args) {
  if (!this.callbacks[ev]) return this;
  this.callbacks[ev].forEach(callback => callback.apply(this, args));
  return this;
}
PubSub.mixin = (object) => {
  Object.assign(object, new PubSub);
  Object.assign(Object.getPrototypeOf(object), PubSub.prototype);
}
module.exports = PubSub;
