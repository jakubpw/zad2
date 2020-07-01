var express = require('express');
var router = express.Router();
router.get('/:quizId', function (req, res) {
    req.db.all("SELECT questions.description, questions.result, results.answer, results.time, questions.penalty FROM question questions, (SElECT * FROM result WHERE quiz_id = ? AND user_id = ?) results WHERE questions.id = results.question_id", req.params.quizId, req.session.user_id,
        function (err, rows) {
            req.db.all("SELECT user_login, result FROM ranking WHERE quiz_id = ? ORDER BY result DESC LIMIT 5", req.params.quizId,
                function (err, rows2) {
                    res.render('result', {
                        tittle: "Quiz",
                        results: rows,
                        ranking: rows2
                    })
                })
        })
})

module.exports = router;