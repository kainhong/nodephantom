
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Investopedia CN - Test Form' });
};