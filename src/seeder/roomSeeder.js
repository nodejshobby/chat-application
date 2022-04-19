require("dotenv").config();
require("../config/Database");
const Room = require("../model/roomModel");
const roomSeed = [
  { name: "Javascript" },
  { name: "Graphics Design" },
  { name: "Web Design" },
  { name: "Backend Programming" },
  { name: "Artificial Intelligence" },
  { name: "Entertainment" },
  { name: "Data Science" },
];

const insertRoom = () => {
  roomSeed.forEach((room) => {
    Room(room)
      .save()
      .then((data) => {
        console.log(`${data.name} was sucesfully inserted`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};

insertRoom();
