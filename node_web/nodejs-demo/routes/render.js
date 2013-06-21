//path = require('path');
var moment = require('moment');
var mongoose = require('mongoose');
var SiteSchema = new mongoose.Schema({
    SiteID: { type: Number, required: false },
    SiteUrl: { type: String, required: false },
    SiteTitle: { type: String, required: false },
    SiteScreenshotFileName: { type: String, required: false }
});
var SiteModel = mongoose.model('Site', SiteSchema);
var phantom = require('node-phantom');
var random = Math.floor(Math.random()*100 + 1);


exports.list = function(req, res){
    var today = moment().format('YYYYMMDD-HH-mm-ss');
    var imagename = today + '.png';
    var Site1;
    Site1 = new SiteModel({
        SiteUrl: req.body.fetchUrl,
        SiteScreenshotFileName: './touzi101/'+imagename
    });
    console.log("POST(render.js):");
    console.log('req.body: '+ req.body.fetchUrl);
    if(req.body.fetchUrl == ''){
        res.send(500, { error: 'something blew up' });
    }else{
        try{
            phantom.create(function(err, ph) {
                ph.createPage(function(err, page) {
                    page.open(req.body.fetchUrl, function(err, status) {
                        console.log('opened '+ req.body.fetchUrl +'?', status);
                        page.render('./public/touzi101/' + imagename);
                        Site1.SiteScreenshotFileName = imagename;
                        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                            
                                Site1 = page.evaluate(function(pagesource){

                                    pagesource.SiteTitle = $('title').html();
                                    return pagesource
                                },function(err, result){
                                    if (!err){
                                        console.log(result);
                                    }
                                    
                                }, Site1);
                            
                        });
                    });
                });
                //ph.exit();
            });
            console.log('pagesource: ' + Site1.SiteTitle + ' ssname ' + Site1.SiteScreenshotFileName);
        }
        catch(error){
            console.log("This is never printed."+error);
        }

        Site1.save(function (err) {
            if (!err) {
                SiteModel.findOne( {'SiteUrl':req.body.fetchUrl},function (err, Sites) {
                    if (!err) {
                        console.log('one record of :' + Sites );
                        res.send(200,Sites);
                    } else {
                        res.send(500, { error: 'something blew up' });
                        return console.log(err);
                    }
                });
                //res.send(200,Site1);

                return console.log("created: saved in db~!");
            } else {
                return console.log(err);
            }
        });
    }
};


exports.fetchdata = function(req, res){
    //res.send('mmmmmmmmmmmmmmmmmmd');
    //return console.log('title');
    SiteModel.find( function (err, Sites) {
        if (!err) {
            res.send({ title: req.body.site_url, sitedata:Sites });
            return console.log(req.body.site_url);
        } else {
            res.send({ title: '出错了', sitedata:{} });
            return console.log(err);
        }
    });
};


exports.cleandatas = function(req, res){
    SiteModel.find().remove();
    res.send(200);
};

function renderPage(url){
    // file name: phantomTest.js
    phantom.create(function(err, ph) {
        console.log('notice:renderPage function is work');
        ph.createPage(function(err, page) {
            page.open(url, function(err, status) {
                console.log('opened '+ url +'?', status);
                //page.render('dd.png');
                page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                    setTimeout(function(){
                        page.evaluate(function(){
                            var title;
                            title = $('title').html();
                            return title
                        },function(err, result){
                            console.log(result);
                        });
                    },5000);
                });
            });
        });
        //ph.exit();
    });

}
