const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  alertId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Alert",
  },
  duration: {
    type: String,
  },
  summary:{
    type:Object,
    
  }
});

const History = mongoose.model("History", historySchema);

module.exports = { History };
