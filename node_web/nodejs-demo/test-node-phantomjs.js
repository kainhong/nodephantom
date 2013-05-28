// file name: phantomTest.js
var phantom = require('node-phantom');
console.log('file:test-node-phantomjs.js');
phantom.create(function(err, ph) {
	console.log('file:test-node-phantomjs.js');
    return ph.createPage(function(err, page) {
        page.open('http://www.google.com', function(status) {
            console.log('opened google?', status);
            var title = page.evaluate(function() {
                return document.title;
            });
            console.log('page title is ' + title);              
        });
    });
    ph.exit();
});