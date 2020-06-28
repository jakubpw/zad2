var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Quiz',
    user: req.session.login
  });
});

router.post('/', function (req, res, next) {
  // TO JEST LOGOWANIE
  req.db.get("SELECT * FROM users WHERE username = ? AND password = ?", [req.body.login, req.body.password],
    function (err, row) {
      if (row != undefined) {
        req.session.login = req.body.login;
        req.session.user_id = row.id;
      }
      res.redirect('/');
    })
});

router.get('/logout', function (req, res, next) {
  delete (req.session.login);
  delete (req.session.user_id);
  res.redirect('/');
});
module.exports = router;
