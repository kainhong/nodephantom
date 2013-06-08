


var phantom = require('node-phantom');
    // file name: phantomTest.js
phantom.create(function(err, ph) {
        console.log('notice:______________renderPage function is work');
        return ph.createPage(function(err, page) {
            return page.open('https://github.com/Obvious/phantomjs/blob/master/test/tests.js', function(err, status) {
                console.log('opened '+ 'https://github.com/Obvious/phantomjs/blob/master/test/tests.js' +'?', status);
                page.render('sdgsa.png');
                return page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
                    setTimeout(function(){
                       return page.evaluate(function(){
                            var title;
                            title = $('title').html();
                            return title
                        },function(err, result){
                            console.log(result);
                            ph.exit();
                        });
                    },1000);
                });
            });
        });
       // ph.exit();
    });