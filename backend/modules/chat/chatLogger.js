class ChatLogger {
  constructor(socket) {
    socket.on('connection', (client) => {
      console.log(`New socket connection -> ${client.id}`);
      client.onAny((ev, data) => {
        console.log(`New Event -> ${ev} | ${client.id}`);
        console.log(data);
      });
      client.on('disconnect', () => {
        console.log(`Socket connection disconnect -> ${client.id}`);
      });
    });
  }
}

module.exports = ChatLogger;
