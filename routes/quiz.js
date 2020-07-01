var express = require('express');
var router = express.Router();
router.get('/:quizId', function (req, res) {
    req.db.get("SELECT result FROM ranking WHERE user_login = ? AND quiz_id = ?", req.session.login, req.params.quizId,
        function (err, solve) {
            req.db.get("SELECT tittle, description FROM quiz WHERE id = ?", req.params.quizId,
                function (err, row) {
                    req.db.all("SELECT id AS question_id, description, result, penalty FROM question WHERE quiz_id = ?", req.params.quizId,
                        function (err, rows) {
                            res.render('quiz', {
                                tittle: "Quiz",
                                quiz: row,
                                questions: rows,
                                solve: solve
                            })
                        })
                })
        })
})

router.post('/:quizId', function (req, res) {
    var dataStructure = JSON.parse(req.body.results);
    var user_result = 0;
    var stmt = req.db.prepare("INSERT INTO result (question_id, quiz_id, user_id, answer, time) VALUES (?, ?, ?, ?, ?)");
    for (var i = 0; i < dataStructure.length; i++) {
        stmt.run(dataStructure[i].question_id, req.params.quizId, req.session.user_id,
            dataStructure[i].answer, dataStructure[i].time);
        user_result += dataStructure[i].time + (dataStructure[i].answer = dataStructure[i].resulr ? 0 : dataStructure[i].penalty);
    }
    stmt.finalize();
    req.db.run("INSERT INTO ranking (quiz_id, user_login, result) VALUES (?, ?, ?)", req.params.quizId, req.session.login, user_result);
    res.redirect("/result/" + req.params.quizId);
})

module.exports = router;