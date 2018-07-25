const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Database connection
require('./mongo');

//Models
require('./model/Post')

//Middleware
app.use(bodyParser.json())
    .use(morgan())


//Routes

//Get all entries
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.send(posts)
    } catch (error) {
        res.status(500)
    }
});

//Record a new entry
app.post('/posts', async (req, res) => {
    try {
        const post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.send(post);
    } catch (error) {
        res.status(500)
    }
});

//Find a entry by id
app.get('/posts/:postId', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId });
        res.send(post);
    } catch (error) {
        res.status(500)
    }
});

//Update entry
app.put('/posts/:postId', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate({
            _id: req.params.postId
        }, req.body, {
            new: true,
            runValidators: true
        });
        res.send(post);
    } catch (error) {
        res.status(500)
    }
});

//Delete entry
app.delete('/posts/:postId', async (req, res) => {
    try {
       const post = await Post.findByIdAndRemove({
        _id: req.params.postId
    }); 
    res.send(post);
    } catch (error) {
        res.status(500)
    }
});

const Post = mongoose.model('Post');

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});