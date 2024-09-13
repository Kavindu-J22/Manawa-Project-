const ChatEvents = require('./chatEvents.js');
const ChatLogger = require('./chatLogger.js');
const { addMessage, getMessagesBygroupId } = require('./chatService.js');
const { Server } = require('socket.io');

let Chat = class Chat {
  socket;
  clients = [];
  logger;
  constructor(server) {
    this.socket = new Server(server, {
      cors: {
        origin: '*'
      }
    });
    this.socket.listen(8080);
    this.logger = new ChatLogger(this.socket);
  }

  init() {
    this.socket.on('connection', (client) => {
      client.on(ChatEvents.JOIN, (data) => this.handleJoin(client, data));
      client.on(ChatEvents.DISCONNECT, (e) => this.handleDisconnect(client));
      this.handleClientEvents(client);
    });
  }

  handleJoin(client, data) {
    this.clients.push({
      userId: data.userId,
      socket: client,
      group: data.groupId,
      name: data.name,
    });
  }

  handleDisconnect(client) {
    this.clients = this.clients.filter((e) => e !== client);
  }

  handleClientEvents(client) {
    client.on(ChatEvents.HISTORY, async (data) => {
      const clientData = this.clients.find((e) => e.socket.id === client.id);
      if (clientData) {
        const messages = await getMessagesBygroupId(client.group);
        client.emit(ChatEvents.HISTORY_RESPONSE, messages);
      }
    });
    client.on(ChatEvents.MESSAGE, async (data) => {
      const userData = this.clients.find((e) => e.socket.id === client.id);
      if (userData) {
        var message = await addMessage(data.message, userData.userId, userData.groupId, userData.name);
        const groupMembers = this.clients.filter((e) => e.groupId == userData.groupId);
        groupMembers.forEach((member) => {
          member.socket.emit(ChatEvents.NEW_MESSAGE, message);
        });
      }
    });
  }
}
module.exports = Chat;
