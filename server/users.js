let users = [];

const trimStr = (str) => str.trim().toLowerCase()

function findUser(user)  {
    const userName = trimStr(user.name);
    const roomName = trimStr(user.room);
    const isExist = users.find((el) => trimStr(el.name) === userName && trimStr(el.room) === roomName);

    return isExist;
}

function addUser(user) {
  
    const isExist = findUser(user)

    !isExist && users.push(user);
    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser };
}

function getRoomUsers(room) {  
    return users.filter((el) => el.room === room)
}

function removeUser(user) {
    const found = findUser(user)
    if (found) { // удаляем юзера который в этой комнате
        users = users.filter((el) => el.name !== found.name && el.room === found.room);
    }
    return found
}

module.exports = { addUser, findUser, getRoomUsers, removeUser };