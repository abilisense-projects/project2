const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  alertId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "alert",
  },
  duration: {
    type: String,
  },
  summary:{
    type:Object,
   
  }
});

const History = mongoose.model("history", historySchema);

module.exports = { History };
