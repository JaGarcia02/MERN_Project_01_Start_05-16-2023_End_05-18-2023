import User from "../models/User.js";

/* Read */
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await user.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    return res.status(200).json(formattedFriends);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

/* Update */
export const addRemoveFriend = async (req, res) => {
  const { id, friendId } = req.params;
  try {
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // condition if friends existing in list
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    return res.status(200).json(formattedFriends);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
