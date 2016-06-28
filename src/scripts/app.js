console.log('I have a problem');
const sayHello = require('./sayHello');
window.addEventListener('load', function() {
   /* document.getElementById('welcome-message').innerHTML = 'Ray'; */
    document.getElementById('welcome-message').innerHTML = sayHello.greet('Ray');
});