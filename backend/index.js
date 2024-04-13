const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20");
const User = require("./Models/UserModal");
const userRoutes = require("./Routes/UserRouter");
const indexRouter = require("./Routes/IndexRoute");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const blogRoutes = require("./Routes/BlogRoutes");

require("dotenv").config();

const app = express();
let loggedInUserProfile = {};

let flag = false;

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 5 seconds timeout
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => {
//       done(err, null);
//     });
// });

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userEmail = profile.emails[0].value;
        let user = await User.findOne({ email: userEmail });

        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

const PORT = process.env.PORT || 5000;

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.use("/", indexRouter);
app.use("/api", userRoutes);
app.use("/api/", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user", chatRoutes);
app.use("/api", userRoutes);
app.use("api", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api", blogRoutes);
app.use("/api", userRoutes);

// app.get(
//   "/auth/google/callback",

//   passport.authenticate("google", {
//     // successRedirect: "http://localhost:3000/home",
//     failureRedirect: "http://localhost:3000/register",
//   }),
//   (req, res) => {
//     req.session.user = req.user;
//     console.log("----req,user", req.user);
//     res.redirect("http://localhost:3000/home");
//   }
// );
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      `${process.env.CLIENT_URL}/register` || "http://localhost:3000/register",
  }),
  (req, res) => {
    // This callback is executed after successful authentication
    // req.user is now populated with the authenticated user
    req.session.user = req.user;
    loggedInUserProfile = req.user;
    flag = true;
    console.log("----req.user", req.user);
    res.redirect("https://thesportsprince.com");
  }
);
app.get("/login/sucess", async (req, res) => {
  if (req.user || (loggedInUserProfile && flag)) {
    flag = false;
    res.status(200).json({
      message: "user Logged in",
      user: req.user || loggedInUserProfile,
    });
    loggedInUserProfile = {};
  } else {
    res.status(500).json({ message: "user not logged in" });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     // credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL,
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
