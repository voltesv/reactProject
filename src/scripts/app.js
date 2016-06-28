console.log('I have a problem');
var sayHello = require('./sayHello');
document.getElementById('welcome-message')
    .innerHTML = sayHello.greet('Your name');