const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User = require("../Models/UserModal");

const accessChat = asyncHandler(async (req, res) => {
  try {
    const { userId, user } = req.body;

    console.log("-------------------", userId, user._id);
    if (!userId) {
      console.log("userId params not sent with request");
      return;
      res.sendStatus(400);
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat ==
      (await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email",
      }));
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [user._id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );

        res.status(200).send(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// const fetchChats = asyncHandler(async (req, res) => {
//   try {
//     const { userId } = req.query;
//     console.log("fetch chat", userId);
//     // Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
//     if (userId) {
//       Chat.find({ users: { $elemMatch: { $eq: userId } } })
//         .populate("users", "-password")
//         .populate("groupAdmin", "-password")
//         .populate("latestMessage")
//         .sort({ updateat: -1 })
//         .then(async (results) => {
//           results = await User.populate(results, {
//             path: "latestMessage.sender",
//             select: "name pic email",
//           });
//           res.status(200).send(results);
//         });
//     } else {
//       res.status(404).json("user id is not defined");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

const fetchChats = asyncHandler(async (req, res) => {
  try {
    // const { userId } = req.query;

    // if (!userId || userId === null) {
    //   return res.status(400).json({ error: "User ID is required" });
    // }

    // Find all chats where the users array contains the specified userId
    // const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
    const chats = await Chat.find({})
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    // Check if any chats are found
    if (!chats || chats.length === 0) {
      return res.status(404).json({ error: "Chats not found" });
    }

    // Populate sender details for latestMessage
    const populatedChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "FirstName img_url email",
    });

    // Send the populated chats as a response
    res.status(200).json(populatedChats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.groupMembers || !req.body.name) {
    return res.status(400).send({ message: "please fill all the details" });
  }

  var users = JSON.parse(req.body.groupMembers);
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required for the group chat");
  }

  if (
    !req.body.loggedInUser ||
    (req.body.loggedInUser && req.body.loggedInUser.role !== "admin")
  ) {
    return res
      .status(400)
      .send({ message: "Please Login to Create a Group or you are not admin" });
  }

  users.push(req.body.loggedInUser);
  console.log("after pushing the users", users);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.body.loggedInUser,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  try {
    const { chatId, chatName } = req.body;
    const updateChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!updateChat) {
      res.status(404);
      throw new Error("chat not found");
    } else {
      res.json(updateChat);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    );
    if (!added) {
      res.status(404).json({ message: "User not added" });
    } else {
      res.status(200).json({ message: "Successfully added the member", added });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    );
    if (!removed) {
      res.status(404).json({ message: "User not found in group" });
    } else {
      res
        .status(200)
        .json({ message: "Successfully removed the member", removed });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
