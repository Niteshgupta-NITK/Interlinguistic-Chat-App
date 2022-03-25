
const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (!room || !username) {
    return {
      error: "Username and Room is required!",
    };
  }
  const existinguser = users.find((user) => {
    return user.username == username && user.room == room;
  });
  if (existinguser) {
    return {
      error: "Username is in use!",
    };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user.id == id;
  });
  if (index == -1) return { error: "User is not in room" };
  return users.splice(index, 1)[0];
};

const getUser = (id) => {
 return users.find((user)=> user.id===id);
};

const getUserInRoom = (room) => {
    room = room.trim().toLowerCase();
   return users.filter((user)=>user.room===room);
};
module.exports = {getUser,getUserInRoom,addUser,removeUser};