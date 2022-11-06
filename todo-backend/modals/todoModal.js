const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  activity: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  timetaken: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true }
})

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;