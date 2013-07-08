var mongoose = require('mongoose');
var SiteSchema = new mongoose.Schema({
    sitelist:{
        siteid: { type: Number, required: false },
        sitename: { type: String, required: false },
        sitedecription: { type: String, required: false },
        pagelist: { 
            pageid :{type: Number, required: false},
            pagename:{type: String, required: false},
            pageurl:{type: String, required: false},
            pagetitle:{type: String, required: false},
            pagedescription{type: String, required: false},
            pagekeywords{type: String, required: false}
         }
    }
});
var InvcnSiteModel = mongoose.model('Site', SiteSchema);
exports.newsite = function (req, res) {
	var newsite = new InvcnSiteModel();


  res.json({
  	name: 'Bob'
  });
};