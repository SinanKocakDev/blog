import Post from "../models/postModel.js"
import slugify from "slugify";

export const getAllPosts = async (req,res) => {
    const posts = await Post.find().sort({ createdAt: "desc"})

    res.status(200).json({
        posts
    })
}

export const getHomePosts = async (req,res) => {
    const posts = await Post.find().sort({ createdAt: "desc"}).limit(5)
    res.status(200).json({
        posts
    })
}

export const detailPost = async (req, res) => {
    const { slug } = req.params;
    try {
      const post = await Post.findOne({ slug });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const createPost = async (req,res) => {

    const { title, body } = req.body

    if(!title || !body ) return res.status(400).json({
        message: 'All fields are required!'
    })

    const newPost = new Post({
        title,
        body,
        slug: slugify(title, { lower: true})
    })

    const post = await Post.create(newPost)

    res.status(201).json({
        post
    })
}

export const updatePost = async (req, res) => {
    const { slug } = req.params;
    try {
      const post = await Post.findOne({ slug });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const { title, body } = req.body;

      const updatedData = {
        title,
        body,
        slug: slugify(title, { lower: true })
      };

      const updatedPost = await Post.findOneAndUpdate({ slug }, updatedData, { new: true, runValidators: true });

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  };


export const deletePost = async (req,res) => {
    const post = await Post.findById(req.params.id)

    await post.deleteOne()

    res.status(200).json({
        success: "post deleted!"
    })
}


export const getSlug = async (req, res) => {
    const { slug } = req.params;
    console.log(slug)
    try {
      const post = await Post.findOne({ slug });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json({ success: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };