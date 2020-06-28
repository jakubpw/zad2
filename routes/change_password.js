var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('change_password', {
    title: 'Quiz',
    user: req.session.login
  });
});

router.post('/', function (req, res, next) {
  // TO JEST LOGOWANIE
  req.db.run("UPDATE users SET password = ? WHERE id = ?", [req.body.new_password, req.session.user_id]);    
  res.redirect('/logout');
});
module.exports = router;
