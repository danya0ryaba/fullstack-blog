import PostModel from "../models/Post.js"


export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({ path: "user", select: ["name", "avatar"] }).exec();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Post get error'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );
        if (!doc) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.json(doc)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Post get error'
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndDelete({ _id: postId });
        if (!doc) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.json({
            success: true
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Post delete error'
        })
    }
}

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
            imageUrl: req.body.imageUrl
        })
        const post = await doc.save()
        res.json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Post create error'
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await PostModel.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                user: req.userId,
            }
        );
        res.json(updatedPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Post update error'
        })
    }
}