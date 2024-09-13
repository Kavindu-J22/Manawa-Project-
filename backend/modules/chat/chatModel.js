const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    message: String,
    senderRef: { type: Schema.Types.ObjectId, ref: 'User' },
    groupRef: { type: Schema.Types.ObjectId, ref: 'Group' },
    sender: String,
  },
  { timestamps: true },
);

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
