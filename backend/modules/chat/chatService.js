const getMessagesBygroupId = async (groupId) => {
  return [];
};

const getMessagesByUser = async (userId) => { };

const addMessage = async (message, sender, group, name) => {
  return {
    message: message,
    sender: sender,
    group: group,
    name: name
  }
};
module.exports = { getMessagesBygroupId, getMessagesByUser, addMessage }
