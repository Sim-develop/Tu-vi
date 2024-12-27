import mongoose, { models, Schema } from "mongoose";
import { number } from "zod";

const dataItemSchema = new Schema({
  name: { type: String, required: true },
  birth: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  viewedYear: { type: number, required: true },
});

const historySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  data: { type: [dataItemSchema], default: [] },
});

const History = models.History || mongoose.model("History", historySchema);
export default History;
