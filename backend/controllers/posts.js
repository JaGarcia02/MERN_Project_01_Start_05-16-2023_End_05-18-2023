import Post from "../models/Post.js";
import User from "../models/User.js";

/* Create */
export const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body;
  try {
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      like: {},
      comment: [],
    });
    await newPost.save();
    const post = await Post.find();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

/* Read */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.body;
  try {
    const post = await Post.find({ userId });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

/* Update  */
export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    // condition if userId exist
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.like.set(userId, true);
    }

    // update post
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.like },
      { new: true }
    );
    return res.status(200).json(updatePost);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
