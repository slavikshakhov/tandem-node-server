//require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
var cors = require("cors");

const port = process.env.PORT || 4000;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const connection = require("./connection");

const seq = require("sequelize");
const Op = seq.Op;

const User = require("./models/User");
const OfferedLg = require("./models/OfferedLg");
const WantedLg = require("./models/WantedLg");

const chatMembers = [];

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("connect-user", ({ userName }) => {
    console.log("new user connected to server", userName);
    chatMembers.push({ userName, socketId: socket.id });
    socket.broadcast.emit("all-users", chatMembers);
    console.log(chatMembers);
    //socket.broadcast.emit("user-connected", { userId, socketId: socket.id }); // to all clients, exc for this
  });
  // here chatter is who originally received, now sends message, sender who originally sent but now receives message
  socket.on("new-contact", ({ text, chatter, sender }) => {
    const member = chatMembers.filter((m) => {
      return m.userName === chatter.userName;
    });
    console.log(text);
    console.log(chatter);
    console.log(sender);
    console.log(JSON.stringify(chatMembers));
    console.log(JSON.stringify(member));
    //const memberSocketId1 = member[0].socketId;
    const memberSocketId = chatter.socketId;
    //console.log(memberSocketId1, memberSocketId);
    let senderWithSocketId = null;
    if (chatMembers.length !== 0) {
      senderWithSocketId = chatMembers.filter(
        (el) => el.userName === sender.name
      );
    }
    socket.broadcast
      .to(memberSocketId)
      .emit("message-received", { text, chatter, sender: senderWithSocketId });
    //socket.broadcast.emit("message-received", text);
  });

  socket.on("disconnect", () => {
    //socket.broadcast.emit("user-disconnected", users[socket.id]);
    if (chatMembers.length !== 0) {
      chatMembers.map((member) => {
        if (member.socketId === socket.id) {
          let members = chatMembers.splice(indexOf(member), 1);
          socket.broadcast.emit("all-users", members);
          console.log(`disconnecting ${JSON.stringify(member)}`);
        }
      });
    }
  });
});

const dataUsers = [
  { name: "Slavik", password: "sl", city: "Valencia", country: "Spain" },
  { name: "Carlos", password: "ca", city: "Valencia", country: "Spain" },
  { name: "Adrian", password: "ad", city: "Hamburg", country: "Germany" },
  { name: "Robert", password: "ro", city: "Toronto", country: "Canada" },
  { name: "Lena", password: "le", city: "Kremenchug", country: "Ukraine" },
];

const dataLgs = [
  { name: "english" },
  { name: "french" },
  { name: "spanish" },
  { name: "german" },
  { name: "italian" },
  { name: "chinese" },
  { name: "turkish" },
  { name: "russian" },
];
User.belongsToMany(OfferedLg, { through: "UserOfferedLg", timestamps: false });
User.belongsToMany(WantedLg, { through: "UserWantedLg", timestamps: false });

OfferedLg.belongsToMany(User, { through: "UserOfferedLg", timestamps: false });
WantedLg.belongsToMany(User, { through: "UserWantedLg", timestamps: false });

/*
connection.sync({force: true}).then(() => {
    User.bulkCreate(dataUsers)
    .catch(err => console.log(err)); 
}) 
.then(() => {
    OfferedLg.bulkCreate(dataLgs)
    .catch(err => console.log(err));
})
.then(() => {
    WantedLg.bulkCreate(dataLgs)
    .catch(err => console.log(err));
});
*/

const users = require("./routes/users");
const { indexOf } = require("lodash");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/auth", users);

http.listen(port, () => {
  console.log(`server running on port ${port}`);
});
