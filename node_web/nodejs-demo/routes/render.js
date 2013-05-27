/*var imgsavepath = "../touzi101/";
var website = [
	{"pagename":"homepage-homepage", "url":"http://www.touzi101.cn/", "title":"", "keyword":"", "description":"", "h1":"", "h2":"", "status":"", "filename":""},
];
var RenderUrlIsToFile, system;
system = require("system");
webpage = requier("webpage");
page = webpage.create();
url = 'http://www.touzi101.cn/';
page.open(url,function(){
            page.render('First-screenshot.png');
    }
);
*/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SiteSchema = new Schema({
    SiteID: { type: Number, required: false },
    SiteUrl: { type: String, required: false }
});

var SiteModel = mongoose.model('Site', SiteSchema);



exports.list = function(req, res){
    var Site;
    console.log("POST: ");
    console.log(req.body);
    Site = new SiteModel({
        SiteUrl: req.body.site_url
    });
    Site.save(function (err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });

    res.render('render', { title: req.body.site_url });
};

