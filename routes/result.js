var express = require('express');
var router = express.Router();
router.get('/:resultId', function (req, res) {
    db.get("SELECT tittle, description FROM quiz WHERE id = ?", req.params.quizId,
        function (err, row) {
            db.all("SELECT description, result, penalty FROM question WHERE quiz_id = ?", req.params.quizId,
                function (err, rows) {
                    res.render('quiz', {
                        quiz: row,
                        questions: rows
                    })
                })
        })
})

module.exports = router;