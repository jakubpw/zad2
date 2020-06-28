var express = require('express');
var router = express.Router();
router.get('/:quizId', function (req, res) {
    req.db.get("SELECT tittle, description FROM quiz WHERE id = ?", req.params.quizId,
        function (err, row) {
            req.db.all("SELECT description, result, penalty FROM question WHERE quiz_id = ?", req.params.quizId,
                function (err, rows) {
                    res.render('quiz', {
                        tittle: "Quiz",
                        quiz: row,
                        questions: rows
                    })
                })
        })
})

module.exports = router;