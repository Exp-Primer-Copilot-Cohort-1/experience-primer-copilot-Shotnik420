//create a web server
const express = require('express');
const router = express.Router();
//import the comments schema
const commentsSchema = require('../schema/commentsSchema');

//create a route to get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await commentsSchema.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

//create a route to get a specific comment
router.get('/:commentId', async (req, res) => {
    try {
        const comments = await commentsSchema.findById(req.params.commentId);
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

//create a route to submit a comment
router.post('/', async (req, res) => {
    const comments = new commentsSchema({
        name: req.body.name,
        comment: req.body.comment,
        rating: req.body.rating,
        date: req.body.date,
    });
    try {
        const savedComment = await comments.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

//create a route to update a specific comment
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await commentsSchema.updateOne(
            { _id: req.params.commentId },
            {
                $set: {
                    name: req.body.name,
                    comment: req.body.comment,
                    rating: req.body.rating,
                    date: req.body.date,
                },
            }
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

//create a route to delete a specific comment
router.delete('/:commentId', async (req, res) => {
    try {
        const deletedComment = await commentsSchema.deleteOne({
            _id: req.params.commentId,
        });
        res.json(deletedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;const express = require('express');
