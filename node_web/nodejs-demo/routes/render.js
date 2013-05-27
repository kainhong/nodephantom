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
exports.list = function(req, res){
  res.send("respond with a resource");
};
