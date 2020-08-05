import PubSubMixin from './PubSubMixin.mjs';

/**
 * ========= Usage =========
 */
{
    // ES6 classes
    class Person {
        constructor(name) {
            this.name = name;
            Object.assign(this, PubSubMixin);
        }
        sayHello() {
            this.publish('hello', `${this.name} is saying hello`);
        }
    }
    new Person('Luca')
        .subscribe('hello', console.log)
        .sayHello();
    // Outputs "Luca is saying hello"
}
{
    // Prototypes
    function Person(name) {
        this.name = name;
    };
    Object.assign(Person.prototype, PubSubMixin);
    Person.prototype.sayHello = function() {
        this.publish('hello', `${this.name} is saying hello`);
    }
    new Person('Luca')
        .subscribe('hello', console.log)
        .sayHello();
    // Outputs "Luca is saying hello"
}
