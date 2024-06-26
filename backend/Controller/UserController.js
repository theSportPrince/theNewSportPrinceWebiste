const User = require("../Models/UserModal");
const contact = require("../Models/ContactModel");

exports.fetchUser = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("user fetched successfully");
    // Send the user data in the response
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: username }, { mobileNumber: username }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the provided password matches the user's password
    if (password === user.password) {
      // Here, you can create a session or set a cookie for the user
      req.session.userId = user.id;
      return res.status(200).json({ message: "Login successful", user: user });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// exports.getAllUser = async (req, res) => {
//   try {
//     const keyword = req.query.search;
//     const loggedInUser = req.query.userId;
//     console.log(keyword)
//       ? {
//           $or: [
//             { name: { $regex: req.query.search, $option: "i" } },

//             { email: { $regex: req.query.search, $option: "i" } },
//           ],
//         }
//       : {};
//       const users = await User.find(filter).where('_id').ne(loggedInUser);
//     res.send(users);
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.getAllUser = async (req, res) => {
  try {
    const keyword = req.query.search;
    const loggedInUser = req.query.userId;
    let filter = {};
    if (keyword) {
      filter = {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
        ],
      };
    }
    const users = await User.find(filter).where("_id").ne(loggedInUser); // Exclude the logged-in user
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.contactus = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    // Create a new contact instance with the provided details
    const newContact = new contact({
      name,
      email,
      mobile,
      message,
    });
    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data based on the request body
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      facebookLink,
      instagramLink,
      profileImage,
      aboutUs,
    } = req.body;
    user.firstName = firstName;
    user.lastName = lastName;
    user.mobileNumber = mobileNumber;
    user.email = email;
    user.facebook = facebookLink;
    user.instagram = instagramLink;
    user.img_url = profileImage;
    user.about = aboutUs;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
