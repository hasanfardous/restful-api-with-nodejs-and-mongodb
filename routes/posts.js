const router = require('express').Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');  
const Comment = mongoose.model('Comment');

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

//Comments section

router.post('/:postId/comment', async (req, res) => {
    //find a comment that is requested for
    const post = await Post.findOne({ _id: req.params.postId});
    
    //make a comment with post id
    const comment = new Comment();
    comment.content = req.body.content;
    comment.post = post._id;
    await comment.save();
    
    //update post table's data with comment id
    post.comments.push(comment._id);
    await post.save();

    res.send(comment);
});

//individual comments show with every posts
router.get('/:postId/comment', async (req, res) => {
    const post = await Post.findOne({_id: req.params.postId}).populate('comments');
    
    res.send(post);
});

module.exports = router;