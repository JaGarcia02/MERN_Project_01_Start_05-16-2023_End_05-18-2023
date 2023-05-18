// import Post from "../models/Post.js";
// import User from "../models/User.js";

// /* Create */
// export const createPost = async (req, res) => {
//   const { userId, description, picturePath } = req.body;
//   try {
//     const user = await User.findById(userId);
//     const newPost = new Post({
//       userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       location: user.location,
//       description,
//       userPicturePath: user.picturePath,
//       picturePath,
//       likes: {},
//       comments: [],
//     });
//     await newPost.save();
//     const post = await Post.find();
//     return res.status(200).json(post);
//   } catch (error) {
//     return res.status(409).json({ message: error.message });
//   }
// };

// /* Read */
// export const getFeedPosts = async (req, res) => {
//   try {
//     const post = await Post.find();
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const getUserPosts = async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const post = await Post.find({ userId });
//     return res.status(200).json(post);
//   } catch (error) {
//     return res.status(404).json({ message: error.message });
//   }
// };

// /* Update  */
// export const likePost = async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;
//   try {
//     const post = await Post.findById(id);
//     const isLiked = post.likes.get(userId);

//     // condition if userId exist
//     if (isLiked) {
//       post.likes.delete(userId);
//     } else {
//       post.likes.set(userId, true);
//     }

//     // update post
//     const updatePost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );
//     return res.status(200).json(updatePost);
//   } catch (error) {
//     return res.status(404).json({ message: error.message });
//   }
// };

import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
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
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const post = await Post.find({ userId });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
