const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const fileRoute = require('./routes/markinguploads')
require("dotenv").config();
const userRoutes = require("./routes/chatRegisterRoutes");
const messageRoute = require("./routes/messageRoutes");
const socket = require('socket.io');

const URL = process.env.MONGODB_URL;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success!");
});

app.use('/api/auth', require('./routes/authenticationRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

//give feedback for the topics
//app.use("/api/sendFeedback", require("./routes/evaluationTopics"));

//give feedback for the topics
app.use("/api/sendFeedback", require("./routes/topicEvaluateRoutes"));
//Group Router
app.use("/api/group", require("./routes/groupRoutes"));

//Evaluated docs Router
app.use("/api/evaluateDocs", require("./routes/docsEvaluateRoutes"));

//Evaluated presentations Router
app.use("/api/evaluatePres", require("./routes/presentationEvaRoutes"));

//marking schemes uploading and downloading
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(fileRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
//Student Document Submission Router
//const submissionRouter = require("./routes/submission");
//app.use("/submission", submissionRouter);

//student upload
app.use('/api/studentUpload', require('./routes/studentUpload'));
app.get('*', (req, res) => {
  res.sendstudentUpload(path.join(__dirname, '..', 'build', 'index.html'));
});


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`server running on ${port}`)
})

//web sockets
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
