const router = require('express').Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

//Get all entries
router.get('/', async (req, res) => {
    const comments = await Comment.find({})
    res.send(comments)

});

module.exports = router;