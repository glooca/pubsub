var assert = require('assert');
var PubSub = require('..');

describe('PubSub', () => {
  describe('Instantiating', () => {
    it('should be cloneable', () => {
      assert.deepStrictEqual(new PubSub, new PubSub);
    });
    it('should be a separate object', () => {
      assert.notStrictEqual(new PubSub, new PubSub);
    });
    it('should have unique subscriptions', () => {
      assert.notStrictEqual((new PubSub).callbacks, (new PubSub).callbacks);
    });
  });
  describe('Extending', () => {
    it('can be extended in ES6 classes', () => {
      class Test extends PubSub {};
      assert((new Test) instanceof PubSub);
    });
    it('can be added to ES6 classes', () => {
      class Base {};
      class Test extends Base {
        constructor() {
          super();
          PubSub.mixin(this);
        }
      };
      const test = new Test;
      assert.deepStrictEqual(test.callbacks, {});
      assert.strictEqual(test.subscribe, PubSub.prototype.subscribe);
      assert.strictEqual(test.unsubscribe, PubSub.prototype.unsubscribe);
      assert.strictEqual(test.publish, PubSub.prototype.publish);
    });
    it('can be extended in prototypes', () => {
      function Test() {
        PubSub.call(this);
      };
      Test.prototype = Object.create(PubSub.prototype);
      assert((new Test) instanceof PubSub);
    });
    it('can be added to prototypes', () => {
      function Test() {
        PubSub.mixin(this);
      };
      const test = new Test;
      assert.deepStrictEqual(test.callbacks, {});
      assert.strictEqual(test.subscribe, PubSub.prototype.subscribe);
      assert.strictEqual(test.unsubscribe, PubSub.prototype.unsubscribe);
      assert.strictEqual(test.publish, PubSub.prototype.publish);
    });
  });
  describe('Messaging', () => {
    it('sends message to single subscriber', () => {
      const pubsub = new PubSub;
      let received = false;
      pubsub.subscribe('test', () => received = true);
      pubsub.publish('test');
      assert(received);
    });
    it('doesn\'t send messages after unsubscribing', () => {
      const pubsub = new PubSub;
      let received = 0;
      const increment = () => received++;
      pubsub.subscribe('test', increment);
      pubsub.publish('test');
      pubsub.unsubscribe('test', increment);
      pubsub.publish('test');
      assert(received === 1);
    });
    it('can\'t subscribe multiple times', () => {
      const pubsub = new PubSub;
      let received = 0;
      const increment = () => received++;
      pubsub.subscribe('test', increment);
      pubsub.subscribe('test', increment);
      pubsub.subscribe('test', increment);
      pubsub.subscribe('test', increment);
      pubsub.publish('test');
      assert(received === 1);
    });
    it('can subscribe multiple functions', () => {
      const pubsub = new PubSub;
      let received = 0;
      pubsub.subscribe('test', () => received++);
      pubsub.subscribe('test', () => received++);
      pubsub.subscribe('test', () => received++);
      pubsub.subscribe('test', () => received++);
      pubsub.publish('test');
      assert(received === 4);
    });
    it('passes all published arguments to subscribers', () => {
      const assertArgs = (...expectedArgs) => {
        return (...args) => {
          assert.deepStrictEqual(args, expectedArgs);
        }
      }
      {
        const pubsub = new PubSub;
        pubsub.subscribe('test', assertArgs('arg1'));
        pubsub.publish('test', 'arg1');
      }
      {
        const pubsub = new PubSub;
        pubsub.subscribe('test', assertArgs(1, 2, 'arg3', 'four'));
        pubsub.publish('test', 1, 2, 'arg3', 'four');
      }
      {
        const pubsub = new PubSub;
        pubsub.subscribe('test', assertArgs());
        pubsub.publish('test');
      }
    });
    it('doesn\'t unsubscribe or publish if not subscribed', () => {
      const pubsub = new PubSub;
      pubsub.unsubscribe('test', console.log);
      pubsub.publish('test');
    });
  });
});
