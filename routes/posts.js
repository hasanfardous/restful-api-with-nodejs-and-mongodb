const router = require('express').Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');  

//Get all entries
router.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.send(posts)

});

//Record a new entry
router.post('/', async (req, res) => {
    const post = new Post();
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();
    res.send(post);
});

//Find a entry by id
router.get('/:postId', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.postId });
    res.send(post);
});

//Update entry
router.put('/:postId', async (req, res) => {
    const post = await Post.findByIdAndUpdate({
        _id: req.params.postId
    }, req.body, {
        new: true,
        runValidators: true
    });
    res.send(post);
});

//Delete entry
router.delete('/:postId', async (req, res) => {
    const post = await Post.findByIdAndRemove({
        _id: req.params.postId
    }); 
    res.send(post);
});

module.exports = router;