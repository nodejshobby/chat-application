const roomUser = [];

const userJoinRoom = (socketID, username, roomID) => {
  const ActiveUser = { socketID, username, roomID };

  roomUser.push(ActiveUser);
  return ActiveUser;
};

const getCurrentRoomUser = (socketID) => {
  return roomUser.find((user) => user.socketID === socketID);
};

const userLeaveRoom = (socketID) => {
  const userIndex = roomUser.findIndex((user) => user.socketID === socketID);
  if (userIndex !== -1) {
    const userOut = roomUser.splice(userIndex, 1)[0];
    return userOut;
  }
};

const getAllRoomUsers = (roomID) => {
  return roomUser.filter((user) => user.roomID === roomID);
};

module.exports = {
  userJoinRoom,
  getCurrentRoomUser,
  userLeaveRoom,
  getAllRoomUsers,
};
