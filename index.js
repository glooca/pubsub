const PubSubMixin = {
    callbacks: {},
    subscribe(ev, callback) {
        if (this.callbacks[ev] && this.callbacks[ev].includes(callback)) return this;
        (this.callbacks[ev] || (this.callbacks[ev] = [])).push(callback);
        return this;
    },
    unsubscribe(ev, callback) {
        if (!this.callbacks[ev]) return this;
        this.callbacks[ev] = this.callbacks[ev].filter(item => item !== callback)
        return this;
    },
    publish(ev, ...args) {
        this.callbacks[ev].forEach(callback => callback.apply(this, args));
        return this;
    }
}
module.exports = PubSubMixin;
