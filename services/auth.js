const sessionIdMapToUser = new Map();

const setSessionIdMapToUser = (id, user) => {
    sessionIdMapToUser.set(id, user);
};

const getSessionIdMapToUser = (id) => {
    return sessionIdMapToUser.get(id);
};

module.exports = {
    getSessionIdMapToUser,
    setSessionIdMapToUser
};